"use server"

import type { Plugin } from "./types"

export async function fetchPluginData(plugins: string[]): Promise<Plugin[]> {
  const pluginData: Plugin[] = await Promise.all(
    plugins.map(async (slug) => {
      const response = await fetch(`https://api.wordpress.org/plugins/info/1.0/${slug}.json`)
      if (!response.ok) {
        return { slug, name: slug, last_updated: "", isClosed: false, error: true }
      }
      const data = await response.json()
      return {
        slug: data.slug,
        name: data.name,
        last_updated: data.last_updated || "",
        isClosed: data.active_installs === 0,
        error: false,
      }
    }),
  )
  return pluginData
}

