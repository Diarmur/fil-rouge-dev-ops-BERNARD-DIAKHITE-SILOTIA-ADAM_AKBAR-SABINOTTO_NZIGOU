<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="nav">
    <span class="nav-logo">Meridian</span>
    <ul class="nav-links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/technology">Technology</RouterLink></li>
      <li><RouterLink to="/culture">Culture</RouterLink></li>
      <li><RouterLink to="/science">Science</RouterLink></li>
    </ul>
    <span class="nav-tag">Subscribe</span>
  </nav>
  <RouterView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 0.5px solid #e2e2e2;
}
.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-links a {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #111;
}
.nav-tag {
  font-size: 11px;
  border: 0.5px solid #ccc;
  border-radius: 100px;
  padding: 3px 10px;
  color: #666;
  cursor: pointer;
}
</style>
