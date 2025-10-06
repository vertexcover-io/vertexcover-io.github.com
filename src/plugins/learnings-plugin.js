const path = require('path');
const fs = require('fs-extra');
const {normalizeUrl} = require('@docusaurus/utils');

module.exports = function learningsPlugin(context, options) {
  const {siteConfig} = context;

  return {
    name: 'learnings-plugin',

    async loadContent() {
      const learningsDir = path.join(context.siteDir, 'learnings');

      if (!await fs.pathExists(learningsDir)) {
        return [];
      }

      const files = await fs.readdir(learningsDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

      const learnings = await Promise.all(
        mdxFiles.map(async (filename) => {
          const filePath = path.join(learningsDir, filename);
          const content = await fs.readFile(filePath, 'utf-8');

          // Extract frontmatter
          const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
          const match = content.match(frontmatterRegex);

          let metadata = {
            title: filename.replace(/\.mdx?$/, ''),
            date: new Date().toISOString(),
            type: 'daily',
            tags: []
          };

          if (match) {
            const frontmatter = match[1];
            frontmatter.split('\n').forEach(line => {
              const [key, ...valueParts] = line.split(':');
              if (key && valueParts.length) {
                const value = valueParts.join(':').trim();
                if (key.trim() === 'tags') {
                  // Parse array format [tag1, tag2]
                  metadata.tags = value
                    .replace(/[\[\]]/g, '')
                    .split(',')
                    .map(t => t.trim());
                } else if (key.trim() === 'title') {
                  metadata.title = value.replace(/^["']|["']$/g, '');
                } else {
                  metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
                }
              }
            });
          }

          const id = filename.replace(/\.mdx?$/, '');
          const permalink = normalizeUrl([siteConfig.baseUrl, 'learnings', id]);

          return {
            id,
            metadata: {
              ...metadata,
              permalink,
            },
            content: content.replace(frontmatterRegex, '').trim(),
            filePath,
          };
        })
      );

      // Sort by date (newest first)
      learnings.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));

      return learnings;
    },

    async contentLoaded({content, actions}) {
      const {setGlobalData, addRoute} = actions;
      setGlobalData({learnings: content});

      // Create routes for each learning
      content.forEach((learning) => {
        addRoute({
          path: learning.metadata.permalink,
          component: '@site/src/components/LearningPage.tsx',
          exact: true,
          modules: {
            learning: learning.filePath,
          },
          customData: learning,
        });
      });
    },

    async postBuild({content, outDir}) {
      // Optional: Generate JSON file for client-side consumption
      const learningsJson = path.join(outDir, 'learnings.json');
      await fs.writeJSON(learningsJson, content);
    }
  };
};
