<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Post = {
  id: number
  title: string
  content: string
  created_at: string
}

const posts = ref<Post[]>([])
const title = ref('')
const content = ref('')
const error = ref('')

async function loadPosts() {
  const response = await fetch('/api/posts')
  posts.value = await response.json()
}

async function createPost() {
  error.value = ''

  if (!title.value || !content.value) {
    error.value = 'Le titre et le contenu sont obligatoires.'
    return
  }

  await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value
    })
  })

  title.value = ''
  content.value = ''
  await loadPosts()
}

async function deletePost(id: number) {
  await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  })

  await loadPosts()
}

onMounted(loadPosts)
</script>

<template>
  <main class="container">
    <section class="hero">
      <h1>Mini-blog DevOps</h1>
      <p>Application fil rouge conteneurisée avec Vue, Express et PostgreSQL.</p>
    </section>

    <section class="card">
      <h2>Créer un article</h2>

      <form @submit.prevent="createPost">
        <input v-model="title" type="text" placeholder="Titre de l'article" />
        <textarea v-model="content" placeholder="Contenu de l'article"></textarea>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit">Publier</button>
      </form>
    </section>

    <section class="posts">
      <h2>Articles publiés</h2>

      <article v-for="post in posts" :key="post.id" class="card post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <small>{{ new Date(post.created_at).toLocaleString() }}</small>

        <button class="delete" @click="deletePost(post.id)">
          Supprimer
        </button>
      </article>

      <p v-if="posts.length === 0">Aucun article pour le moment.</p>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px;
  font-family: Arial, sans-serif;
}

.hero {
  margin-bottom: 32px;
}

.hero h1 {
  font-size: 42px;
  margin-bottom: 8px;
}

.card {
  background: #f7f7f7;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

textarea {
  min-height: 120px;
}

button {
  width: fit-content;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.delete {
  margin-top: 12px;
}

.error {
  color: #b00020;
}
</style>
