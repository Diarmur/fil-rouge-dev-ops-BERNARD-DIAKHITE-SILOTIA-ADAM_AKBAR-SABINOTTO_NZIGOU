<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
.blog {
  font-family: 'DM Sans', sans-serif;
}

.loading {
  padding: 4rem 2rem;
  color: #888;
  font-size: 14px;
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 3rem 2rem 2rem;
  border-bottom: 0.5px solid #e2e2e2;
}
.hero-featured { cursor: pointer; }
.featured-img {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  background: #E6F1FB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  margin-bottom: 1rem;
}
.featured-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}
.featured-excerpt { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 1rem; }
.featured-meta { display: flex; align-items: center; gap: 0.75rem; font-size: 12px; color: #666; }
.avatar {
  width: 26px; height: 26px; border-radius: 50%;
  background: #185FA5; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 500;
}
.dot { color: #ccc; }

.hero-side {
  display: flex; flex-direction: column; gap: 1rem;
  border-left: 0.5px solid #e2e2e2; padding-left: 2rem;
}
.side-post {
  padding-bottom: 1rem;
  border-bottom: 0.5px solid #e2e2e2;
  cursor: pointer;
}
.side-post:last-child { border-bottom: none; padding-bottom: 0; }
.side-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; line-height: 1.3; margin-bottom: 0.4rem;
}
.side-meta { font-size: 11px; color: #888; }

/* Tags */
.tag {
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.tag--blue  { color: #185FA5; }
.tag--green { color: #3B6D11; }
.tag--amber { color: #854F0B; }
.tag--coral { color: #993C1D; }
.tag--gray  { color: #888; }

/* Latest */
.latest { padding: 2rem; }
.section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem; }
.section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #888; }
.section-link { font-size: 12px; color: #185FA5; text-decoration: none; cursor: pointer; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.card {
  border: 0.5px solid #e2e2e2; border-radius: 12px;
  padding: 1rem; cursor: pointer;
  transition: border-color 0.2s, transform 0.15s;
}
.card:hover { border-color: #aaa; transform: translateY(-2px); }
.card-thumb {
  width: 100%; aspect-ratio: 16/9; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; margin-bottom: 0.75rem;
}
.card-thumb--blue  { background: #E6F1FB; }
.card-thumb--green { background: #EAF3DE; }
.card-thumb--amber { background: #FAEEDA; }
.card-title { font-family: 'Playfair Display', serif; font-size: 1rem; line-height: 1.3; margin-bottom: 0.5rem; }
.card-meta { font-size: 11px; color: #888; }

/* Newsletter */
.newsletter {
  margin: 0 2rem 2rem;
  background: #f7f7f5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}
.nl-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 0.4rem; }
.nl-sub { font-size: 13px; color: #666; margin-bottom: 1.25rem; }
.nl-form { display: flex; gap: 0.5rem; max-width: 380px; margin: 0 auto; }
.nl-form input {
  flex: 1; padding: 8px 12px; font-size: 13px;
  border: 0.5px solid #ccc; border-radius: 8px;
  outline: none;
}
.nl-form input:focus { border-color: #888; }
.nl-form button {
  padding: 8px 16px; font-size: 13px; font-weight: 500;
  background: #111; color: #fff;
  border: none; border-radius: 8px; cursor: pointer;
}
</style>
