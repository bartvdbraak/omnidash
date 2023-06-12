import { MetadataRoute } from 'next'
import { metadata } from './layout'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${metadata.metadataBase}`,
      lastModified: new Date(),
    },
  ]
}
