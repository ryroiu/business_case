import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';
import ServiceCard from './components/service-card-component.js';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', component: LandingPageComponent, meta: { title: 'Home' } },
    { path: '/items', component: CollectionPageComponent, meta: { title: 'Services' } },
    { path: '/items/:id', component: ItemDetailPageComponent, meta: { title: 'Service' } },
    { path: '/about', component: AboutPageComponent, meta: { title: 'About' } },
    { path: '/:pathMatch(.*)*', component: { template: '<section class="container py-5"><h1 tabindex="-1">Page not found</h1><router-link to="/items">Back to services</router-link></section>' }, meta: { title: 'Page not found' } },
  ],
});

const app = Vue.createApp({
  setup() {
    const store = Vue.reactive({ items: [], isLoading: true, error: '', pins: [], storageWarning: '', announcement: '', search: '', team: '', tier: '', pinnedOnly: false });
    const pinKey = 'signpost:pins:v1';
    try {
      const raw = localStorage.getItem(pinKey);
      try { const saved = JSON.parse(raw || '[]'); store.pins = Array.isArray(saved) ? [...new Set(saved.filter(id => typeof id === 'string'))] : []; } catch { store.pins = []; }
    } catch { store.storageWarning = 'Pins are available for this visit only.'; }
    store.isPinned = id => store.pins.includes(id);
    store.togglePin = item => {
      store.pins = store.isPinned(item.id) ? store.pins.filter(id => id !== item.id) : [...store.pins, item.id];
      store.announcement = `${item.name} ${store.isPinned(item.id) ? 'pinned' : 'unpinned'}.`;
      try { localStorage.setItem(pinKey, JSON.stringify(store.pins)); } catch { store.storageWarning = 'Pins are available for this visit only.'; }
    };
    store.clearFilters = () => { store.search = ''; store.team = ''; store.tier = ''; store.pinnedOnly = false; };
    store.tierLabel = tier => ({ 'Tier 1': 'Tier 1 · Critical', 'Tier 2': 'Tier 2 · Important', 'Tier 3': 'Tier 3 · Supporting' })[tier] || tier;
    store.review = item => {
      const value = item.lastReviewed;
      const date = new Date(`${value}T00:00:00Z`);
      const today = new Date();
      const midnight = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value || date.getTime() > midnight) return { text: 'Review date unverified', warning: true };
      return { text: (midnight - date.getTime()) / 86400000 > 90 ? 'Review overdue' : `Reviewed ${value}`, warning: (midnight - date.getTime()) / 86400000 > 90 };
    };
    store.safeLink = value => {
      if (/^#\/about\?resource=(runbook|on-call|repository)&service=[a-z0-9-]+$/.test(value)) return value;
      try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : ''; } catch { return ''; }
    };
    store.load = async () => {
      store.isLoading = true; store.error = '';
      try {
        const response = await fetch('items-template.csv', { cache: 'no-store' });
        if (!response.ok) throw new Error('Network error');
        const parsed = Papa.parse(await response.text(), { header: true, skipEmptyLines: 'greedy' });
        const columns = ['id', 'name', 'description', 'category', 'image_url', 'location', 'repository_url', 'runbook_url', 'on_call_url', 'last_reviewed'];
        if (parsed.errors.length || columns.some(key => !parsed.meta.fields?.includes(key))) throw new Error('Invalid columns');
        const seen = new Set();
        store.items = parsed.data.map(row => {
          const field = key => String(row[key] || '').trim();
          const id = field('id');
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || seen.has(id) || !field('name') || !field('description') || !field('location') || !['Tier 1', 'Tier 2', 'Tier 3'].includes(field('category'))) throw new Error('Invalid record');
          seen.add(id);
          const image = field('image_url');
          return { id, name: field('name'), description: field('description'), category: field('category'), location: field('location'), imageUrl: /^https:\/\//.test(image) ? store.safeLink(image) : '', repositoryUrl: store.safeLink(field('repository_url')), runbookUrl: store.safeLink(field('runbook_url')), onCallUrl: store.safeLink(field('on_call_url')), lastReviewed: field('last_reviewed') };
        }).sort((a, b) => a.name.localeCompare(b.name));
      } catch { store.items = []; store.error = 'The service catalog could not be loaded. Try again or contact the catalog steward.'; }
      finally { store.isLoading = false; }
    };
    Vue.provide('itemsStore', store);
    store.load();
    return { store };
  },
});
app.component('navbar-component', NavbarComponent);
app.component('service-card', ServiceCard);
app.component('catalog-status', {
  setup() { return { store: Vue.inject('itemsStore') }; },
  template: `<div v-if="store.isLoading" class="notice" role="status">Loading services…</div><div v-else-if="store.error" class="notice warning" role="alert"><p>{{ store.error }}</p><button class="btn btn-primary" @click="store.load">Retry</button></div>`,
});
app.use(router);
router.afterEach((to, from) => {
  document.title = `${to.meta.title} · Signpost`;
  Vue.nextTick(() => { if (from.matched.length) document.querySelector('main h1')?.focus({ preventScroll: true }); window.scrollTo(0, 0); });
});
app.mount('#app');
