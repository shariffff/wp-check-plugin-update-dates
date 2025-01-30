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
import SimpleCopy from "@/components/simple-copy";
import { CodeBlock } from "./code-block"
import LinkIcon from "./ui/Link";
import { ModeSwitch } from "./mode-switch";



export default function PluginChecker() {
  const [plugins, setPlugins] = useState<string>("");
  const [results, setResults] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const exclude = [
    'object-cache.php',
    'hosting',
    'wpmudev-updates',
    'wp-defender',
    'forminator-pro',
    'wp-hummingbird',
    'wpmu-dev-seo',
    'wp-smush-pro',
    'wpmudev_install-1081723',
    'beehive-pro',
    'beehive-analytics',
    'branda-pro',
    'hummingbird-pro',
    'hustle-pro',
    'shipper-pro',
    'smartcrawl-pro',
    'smush-pro',
    'snapshot-pro',
    'the-hub-client',
    'wpmu-dev-dashboard',
    'wpmu-dev-videos',
    'forminator',
    'branda-white-labeling',
    'broken-link-checker',
    'defender-security',
    'hummingbird-performance',
    'wordpress-popup',
    'smartcrawl-seo',
    'wp-smushit',
    'shipper',
    'snapshot-backups',
    'wpmudev-videos',
    'ultimate-branding',
    'hustle'
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const queryParams = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams('');

    const queryPlugins = queryParams.get('plugins')?.split(',') || [];

    const pluginSlugs = [...plugins
      .split("\n")
      .map((slug) => slug.trim())
      .filter(Boolean),
    ...queryPlugins
    ]
      .filter(slug => !exclude.includes(slug)); // Filter out excluded plugins

    const data = await fetchPluginData(pluginSlugs);
    setResults(data);
    setIsLoading(false);
  };

  const sortedResults = useMemo(() => {
    return [...results];
  }, [results]);

  const premiumPlugins = useMemo(() => {
    return [...new Set(
      sortedResults
        .filter(plugin => plugin.error)
        .map(plugin => plugin.slug)
    )].join('\n');
  }, [sortedResults]);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Check WordPress Plugin Update Dates</CardTitle>
            <SimpleCopy></SimpleCopy>
          </div>
          <div>
            <ModeSwitch />
          </div>
        </div>


      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={plugins || (typeof window !== 'undefined'
              ? new URLSearchParams(window.location.search).get('plugins')?.replace(/,/g, '\n')
              : '')}
            onChange={(e) => setPlugins(e.target.value)}
            placeholder="Enter plugin slugs, one per line (e.g., contact-form-7) or use ?plugins=slug1,slug2 in URL"
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
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead>Plugin Name</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedResults.filter(plugin => !plugin.error).map((plugin) => (
                  <TableRow
                    key={plugin.slug}
                    className="text-sky-400"
                  >
                    <TableCell>{plugin.name}</TableCell>
                    <TableCell className="text-violet-400">
                      {formatLastUpdated(plugin.last_updated)}
                    </TableCell>
                    <TableCell>
                      <Button variant="link">
                        <a href={`https://wordpress.org/plugins/${plugin.slug}`} target="_blank" rel="noopener noreferrer">
                          <LinkIcon />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {
          premiumPlugins && (
            <div className="mt-4">
              <h6 className="text-sm py-3">List of premium plugins</h6>
              <CodeBlock code={premiumPlugins} />
            </div>

          )
        }

      </CardContent>
    </Card>
  );
}
