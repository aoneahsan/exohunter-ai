import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Lock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { sitemapData, iconMap, type SitemapPage } from '@/config/sitemap';

/**
 * Simple fuzzy search scoring algorithm
 * Scores based on:
 * - Exact matches (highest score)
 * - Word start matches
 * - Contains matches
 * - Character sequence matches
 */
const fuzzyScore = (text: string, query: string): number => {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact match
  if (textLower === queryLower) return 1000;

  // Contains exact query
  if (textLower.includes(queryLower)) return 500;

  // Word start matches
  const words = textLower.split(/\s+/);
  const queryWords = queryLower.split(/\s+/);
  let wordScore = 0;

  for (const qWord of queryWords) {
    for (const word of words) {
      if (word.startsWith(qWord)) {
        wordScore += 200;
      }
    }
  }

  if (wordScore > 0) return wordScore;

  // Character sequence scoring
  let charScore = 0;
  let queryIndex = 0;

  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      charScore += 10;
      queryIndex++;
    }
  }

  // All characters found in sequence
  if (queryIndex === queryLower.length) {
    return charScore;
  }

  return 0;
};

/**
 * Search a page across all searchable fields
 */
const searchPage = (page: SitemapPage, query: string): number => {
  if (!query) return 1; // Show all when no query

  let totalScore = 0;

  // Search title (highest weight)
  totalScore += fuzzyScore(page.title, query) * 3;

  // Search description (medium weight)
  totalScore += fuzzyScore(page.description, query) * 2;

  // Search keywords (lower weight)
  for (const keyword of page.keywords) {
    totalScore += fuzzyScore(keyword, query);
  }

  return totalScore;
};

const Sitemap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort pages based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return sitemapData;
    }

    const results = sitemapData.map((category) => {
      const scoredPages = category.pages
        .map((page) => ({
          page,
          score: searchPage(page, searchQuery),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.page);

      return {
        category: category.category,
        pages: scoredPages,
      };
    }).filter((category) => category.pages.length > 0);

    return results;
  }, [searchQuery]);

  const totalPages = useMemo(() => {
    return filteredData.reduce((sum, category) => sum + category.pages.length, 0);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-space-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Sitemap
          </h1>
          <p className="text-lg text-gray-300">
            Navigate all pages and features of ExoHunter AI
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 border-space-700 bg-space-800/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search pages, features, and content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-space-600 bg-space-900/50 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-400">
                Found {totalPages} {totalPages === 1 ? 'page' : 'pages'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {filteredData.length > 0 ? (
          <div className="space-y-12">
            {filteredData.map((category) => (
              <div key={category.category}>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.pages.map((page) => {
                    const Icon = iconMap[page.icon];
                    return (
                      <Link
                        key={page.path}
                        to={page.path}
                        className="group transition-transform hover:scale-105"
                      >
                        <Card className="h-full border-space-700 bg-space-800/50 backdrop-blur transition-colors hover:border-purple-500/50 hover:bg-space-800/80">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                {Icon && (
                                  <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400 transition-colors group-hover:bg-purple-500/20">
                                    <Icon className="h-6 w-6" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                                    {page.title}
                                  </CardTitle>
                                </div>
                              </div>
                              {page.isProtected && (
                                <Lock className="h-4 w-4 text-gray-500" aria-label="Requires login" />
                              )}
                            </div>
                            <CardDescription className="text-gray-400">
                              {page.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {page.keywords.slice(0, 4).map((keyword) => (
                                <span
                                  key={keyword}
                                  className="rounded-full bg-space-700/50 px-2.5 py-0.5 text-xs text-gray-300"
                                >
                                  {keyword}
                                </span>
                              ))}
                              {page.keywords.length > 4 && (
                                <span className="rounded-full bg-space-700/50 px-2.5 py-0.5 text-xs text-gray-400">
                                  +{page.keywords.length - 4} more
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-space-700 bg-space-800/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-gray-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                No pages found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search query or browse all pages by clearing the search
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats Footer */}
        <div className="mt-12 border-t border-space-700 pt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="border-space-700 bg-space-800/30 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {sitemapData.reduce((sum, cat) => sum + cat.pages.length, 0)}
                </div>
                <div className="mt-1 text-sm text-gray-400">Total Pages</div>
              </CardContent>
            </Card>
            <Card className="border-space-700 bg-space-800/30 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {sitemapData.length}
                </div>
                <div className="mt-1 text-sm text-gray-400">Categories</div>
              </CardContent>
            </Card>
            <Card className="border-space-700 bg-space-800/30 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {sitemapData.reduce(
                    (sum, cat) => sum + cat.pages.filter((p) => p.isProtected).length,
                    0
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-400">Protected Pages</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
