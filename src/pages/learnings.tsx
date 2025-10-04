import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import { LearningsCard } from '../components/LearningsCard';

interface Learning {
  id: string;
  metadata: {
    title: string;
    date: string;
    type: 'daily' | 'weekly';
    tags: string[];
  };
  content: string;
}

export default function Learnings() {
  const { learnings = [] } = usePluginData('learnings-plugin') as { learnings: Learning[] };
  const [filterType, setFilterType] = useState<'all' | 'daily' | 'weekly'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      learnings.flatMap((learning) => learning.metadata.tags || [])
    )
  ).sort();

  // Filter learnings
  const filteredLearnings = learnings.filter((learning) => {
    const typeMatch = filterType === 'all' || learning.metadata.type === filterType;
    const tagMatch = !selectedTag || learning.metadata.tags?.includes(selectedTag);
    return typeMatch && tagMatch;
  });

  // Extract excerpt from content (first paragraph)
  const getExcerpt = (content: string): string => {
    const paragraphs = content.split('\n\n');
    const firstParagraph = paragraphs.find(p => p.trim() && !p.startsWith('#'));
    return firstParagraph ? firstParagraph.substring(0, 200) + '...' : '';
  };

  return (
    <Layout
      title="Learnings"
      description="Daily and weekly learnings from the Vertexcover team"
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Learnings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Daily and weekly insights from our engineering journey
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filterType === 'all'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('daily')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filterType === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setFilterType('weekly')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filterType === 'weekly'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
              }`}
            >
              Weekly
            </button>
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredLearnings.length} of {learnings.length} learnings
        </div>

        {/* Learnings Grid */}
        {filteredLearnings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLearnings.map((learning) => (
              <LearningsCard
                key={learning.id}
                title={learning.metadata.title}
                date={learning.metadata.date}
                type={learning.metadata.type}
                tags={learning.metadata.tags}
                excerpt={getExcerpt(learning.content)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No learnings found for the selected filters.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
