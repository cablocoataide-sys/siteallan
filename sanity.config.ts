import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuração do cliente Sanity
export const client = createClient({
  projectId: 'va3uk7s9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Helper para gerar URLs de imagens
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
