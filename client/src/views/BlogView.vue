<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePosts, type Post } from '@/composables/usePosts'

const { getFeatured, getLatest, getSidebar } = usePosts()

const featured  = ref<Post | null>(null)
const sidePosts = ref<Post[]>([])
const cards     = ref<Post[]>([])
const loading   = ref(true)

onMounted(async () => {
  ;[featured.value, sidePosts.value, cards.value] = await Promise.all([
    getFeatured(),
    getSidebar(4),
    getLatest(3),
  ])
  loading.value = false
})

// Derive initials from author name  e.g. "Sophie Laurent" → "SL"
function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// Format ISO date  e.g. "2026-06-03T..." → "June 3, 2026"
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  })
}

// Map category to a tag color class
const categoryColor: Record<string, string> = {
  technology: 'blue',
  science:    'green',
  culture:    'amber',
  design:     'coral',
  environment:'green',
}
function tagColor(category: string) {
  return categoryColor[category.toLowerCase()] ?? 'gray'
}
</script>

<template>
  <main class="blog">
    <div v-if="loading" class="loading">Loading…</div>

    <template v-else>
      <!-- Hero -->
      <section class="hero" v-if="featured">
        <article class="hero-featured">
          <div class="featured-img">📄</div>
          <div :class="['tag', `tag--${tagColor(featured.category)}`]">
            {{ featured.category }}
          </div>
          <h1 class="featured-title">{{ featured.title }}</h1>
          <p class="featured-excerpt">{{ featured.excerpt }}</p>
          <div class="featured-meta">
            <span class="avatar">{{ initials(featured.author) }}</span>
            <span>{{ featured.author }}</span>
            <span class="dot">·</span>
            <span>{{ formatDate(featured.published_at) }}</span>
          </div>
        </article>

        <aside class="hero-side">
          <div v-for="post in sidePosts" :key="post.id" class="side-post">
            <div :class="['tag', `tag--${tagColor(post.category)}`]">{{ post.category }}</div>
            <h2 class="side-title">{{ post.title }}</h2>
            <p class="side-meta">{{ post.author }}</p>
          </div>
        </aside>
      </section>

      <!-- Latest grid -->
      <section class="latest">
        <div class="section-header">
          <span class="section-label">Latest</span>
          <a class="section-link">View all →</a>
        </div>
        <div class="cards">
          <article v-for="card in cards" :key="card.id" class="card">
            <div :class="['card-thumb', `card-thumb--${tagColor(card.category)}`]">📄</div>
            <div :class="['tag', `tag--${tagColor(card.category)}`]">{{ card.category }}</div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-meta">
              {{ shortDate(card.published_at) }}
            </p>
          </article>
        </div>
      </section>

      <!-- Newsletter -->
      <div class="newsletter">
        <h2 class="nl-title">Stay in the loop</h2>
        <p class="nl-sub">New stories, twice a week. No noise.</p>
        <div class="nl-form">
          <input type="email" placeholder="your@email.com" />
          <button>Subscribe</button>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
/* paste your existing <style scoped> block here unchanged */
.loading {
  padding: 4rem 2rem;
  color: #888;
  font-size: 14px;
}
</style>
