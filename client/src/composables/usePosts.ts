import { ref } from 'vue'

export interface Post {
  id: number
  title: string
  excerpt: string
  category: string
  author: string
  published_at: string // ISO string
}

export function usePosts() {
  const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

  async function getFeatured(): Promise<Post | null> {
    const res = await fetch(`/api/posts/featured`)
    if (!res.ok) return null
    return res.json()
  }

  async function getLatest(limit = 3): Promise<Post[]> {
    const res = await fetch(`/api/posts?limit=${limit}`)
    if (!res.ok) return []
    return res.json()
  }

  async function getSidebar(limit = 4): Promise<Post[]> {
    const res = await fetch(`/api/posts?limit=${limit}&offset=1`)
    if (!res.ok) return []
    return res.json()
  }

  return { getFeatured, getLatest, getSidebar }
}
