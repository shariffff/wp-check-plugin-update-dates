"use client";

import { useState, useMemo } from "react";
import { fetchPluginData } from "@/app/actions";
import type { Plugin } from "@/app/types";
import { formatLastUpdated } from "@/app/utils/formatDate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type SortOption = "newest" | "oldest";

export default function PluginChecker() {
  const [plugins, setPlugins] = useState<string>("");
  const [results, setResults] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption] = useState<SortOption>("newest");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const pluginSlugs = plugins
      .split("\n")
      .map((slug) => slug.trim())
      .filter(Boolean);
    const data = await fetchPluginData(pluginSlugs);
    setResults(data);
    setIsLoading(false);
  };

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      if (a.error && !b.error) return 1;
      if (!a.error && b.error) return -1;
      const dateA = new Date(formatLastUpdated(a.last_updated)).getTime();
      const dateB = new Date(formatLastUpdated(b.last_updated)).getTime();
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [results, sortOption]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check WordPress Plugin Update Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={plugins}
            onChange={(e) => setPlugins(e.target.value)}
            placeholder="Enter plugin slugs, one per line (e.g., contact-form-7)"
            className="min-h-[100px]"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Checking..." : "Check Plugins"}
          </Button>
        </form>

        {sortedResults.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results:</h2>

            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plugin Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedResults.map((plugin) => (
                  <TableRow
                    key={plugin.slug}
                    className={plugin.error ? "opacity-20 " : "text-sky-400 "}
                  >
                    <TableCell>{plugin.name}</TableCell>
                    <TableCell>{plugin.slug}</TableCell>
                    <TableCell className="text-violet-400 text-sm">
                      {plugin.error
                        ? "Not found"
                        : formatLastUpdated(plugin.last_updated)}
                    </TableCell>
                    <TableCell>
                      { plugin.error ? "" :    <Button variant="link">
                        <a href={`https://wordpress.org/plugins/${plugin.slug}`} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                        </a>

                      </Button>        }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
