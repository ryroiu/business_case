export default {
  setup() { return { route: VueRouter.useRoute() }; },
  template: `<header class="site-header"><div class="container nav-inner"><router-link to="/" class="brand" aria-label="Signpost home"><span class="brand-icon" aria-hidden="true">↗</span>signpost<span class="brand-divider">/</span><span class="brand-caption">Service catalog</span></router-link><nav aria-label="Main navigation"><router-link to="/" exact-active-class="active">Home</router-link><router-link to="/items" :class="{ active: route.path.startsWith('/items') }">Services</router-link><router-link to="/about" active-class="active">About</router-link></nav></div></header>`,
};
