export default {
  props: ['item'],
  setup() { return { store: Vue.inject('itemsStore') }; },
  template: `<article class="service-card">
    <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name + ' architecture'" @error="item.imageUrl = ''" class="architecture-image" />
    <div class="d-flex justify-content-between align-items-start gap-3"><span class="tier" :class="'tier-' + item.category.slice(-1)">{{ store.tierLabel(item.category) }}</span><button class="pin-button" :class="{ pinned: store.isPinned(item.id) }" :aria-label="(store.isPinned(item.id) ? 'Unpin ' : 'Pin ') + item.name" :aria-pressed="store.isPinned(item.id)" @click="store.togglePin(item)"><span aria-hidden="true">{{ store.isPinned(item.id) ? '★' : '☆' }}</span></button></div>
    <h2 class="h4 mt-3">{{ item.name }}</h2><p class="service-purpose">{{ item.description }}</p>
    <div class="service-bottom"><p class="owner"><span>Owning team</span><strong>{{ item.location }}</strong></p><p class="review" :class="{ 'review-warning': store.review(item).warning }">{{ store.review(item).text }}</p><router-link :to="'/items/' + item.id" class="service-link" :aria-label="'View service: ' + item.name">View service <span aria-hidden="true">↗</span></router-link></div>
  </article>`,
};
