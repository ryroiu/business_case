export default {
  setup() {
    const store = Vue.inject('itemsStore');
    const teams = Vue.computed(() => [...new Set(store.items.map(item => item.location))].sort());
    const tiers = Vue.computed(() => [...new Set(store.items.map(item => item.category))].sort());
    const filtered = Vue.computed(() => {
      const words = store.search.toLowerCase().trim().split(/\s+/).filter(Boolean);
      return store.items.filter(item => words.every(word => `${item.id} ${item.name} ${item.description} ${item.location}`.toLowerCase().includes(word)) && (!store.team || item.location === store.team) && (!store.tier || item.category === store.tier) && (!store.pinnedOnly || store.isPinned(item.id)));
    });
    return { store, teams, tiers, filtered };
  },
  template: `<section class="container page-space"><p class="eyebrow">THE CATALOG</p><div class="page-heading"><div><h1 tabindex="-1">Services</h1><p class="muted">Find an owner. Open a runbook. Get your bearings.</p></div><span class="catalog-count">{{ store.items.length }} services</span></div>
    <div class="filters"><div class="search-control"><label for="search">Search services</label><input id="search" class="form-control" type="search" v-model="store.search" placeholder="Name, purpose, or team" /></div><div><label for="team">Owning team</label><select id="team" class="form-select" v-model="store.team"><option value="">All teams</option><option v-for="team in teams" :key="team">{{ team }}</option></select></div><div><label for="tier">Service tier</label><select id="tier" class="form-select" v-model="store.tier"><option value="">All tiers</option><option v-for="tier in tiers" :key="tier" :value="tier">{{ store.tierLabel(tier) }}</option></select></div></div>
    <div class="filter-footer"><label class="check-label"><input type="checkbox" v-model="store.pinnedOnly" /> Pinned only</label><button class="text-button" @click="store.clearFilters">Clear filters</button></div><p class="tier-help">Tier 1: core customer journeys · Tier 2: important functionality · Tier 3: supporting services</p>
    <catalog-status></catalog-status><template v-if="!store.isLoading && !store.error"><p class="result-count" role="status">{{ filtered.length }} of {{ store.items.length }} services shown</p><div v-if="!store.items.length" class="empty-state"><h2 class="h4">The catalog is empty</h2><p>The catalog steward has not added any service records yet.</p></div><div v-else-if="!filtered.length" class="empty-state"><h2 class="h4">No services match</h2><p>Try another name or clear your filters to see every service.</p><button class="btn btn-outline-primary" @click="store.clearFilters">Show all services</button></div><div v-else class="service-grid"><service-card v-for="item in filtered" :key="item.id" :item="item"></service-card></div></template></section>`,
};
