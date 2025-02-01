"use server"

import type { Plugin } from "./types"

export async function fetchPluginData(plugins: string[]): Promise<Plugin[]> {
  const pluginData: Plugin[] = await Promise.all(
    plugins.map(async (slug) => {
      const response = await fetch(`https://api.wordpress.org/plugins/info/1.0/${slug}.json`)

      const data = await response.json()

      // Handle closed plugins
      if (data.error === "closed") {
        return {
          slug: data.slug,
          name: data.name,
          last_updated: data.last_updated || "",
          isClosed: true,
          premium: false
        }
      }
      // Handle "not found" errors
      if (data.error === "Plugin not found.") {
        return {
          slug,
          name: slug,
          last_updated: "",
          isClosed: false,
          premium: true
        };
      }

      // Regular plugin response
      return {
        slug: data.slug,
        name: data.name,
        last_updated: data.last_updated || "",
        isClosed: false,
        premium: false,
      }
    }),
  )
  return pluginData
}
