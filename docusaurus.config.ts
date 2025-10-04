import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Blog - Vertexcover',
  tagline: 'One TIL at a time',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  plugins: [
    "./src/plugins/tailwind-plugin.js",
    "./src/plugins/learnings-plugin.js",
    // async function disableCssMinifier() {
    //   return {
    //     name: 'disable-css-minifier',
    //     configureWebpack(config, isServer) {
    //       if (config.optimization && config.optimization.minimizer) {
    //         config.optimization.minimizer = config.optimization.minimizer.filter(
    //           minimizer => minimizer.constructor.name !== 'CssMinimizerPlugin'
    //         );
    //       }
    //       return config;
    //     },
    //   };
    // },
  ],
  

  // Set the production url of your site here
  url: 'https://blog.vertexcover.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vertexcover-io', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, 
        // {
        //   sidebarPath: './sidebars.ts',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl:
        //   //   'https://github.com/vertexcover-io/blogv2',
        // },
        gtag: {
          trackingID: 'G-0JS91KNQLR',
          anonymizeIP: false,
        },
         blog: {
           routeBasePath: '/',
           blogSidebarTitle: 'All posts',
           blogSidebarCount: 'ALL',
           showReadingTime: true,
           feedOptions: {
             type: ['rss', 'atom'],
             xslt: true,
           },
           // Please change this to your repo.
           // Remove this to remove the "edit this page" links.
           // editUrl:
           //   'https://github.com/vertexcover-io/blog',
           // Useful options to enforce blogging best practices
           onInlineTags: 'warn',
           onInlineAuthors: 'warn',
           onUntruncatedBlogPosts: 'warn',
         },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'generator',
        content: 'vertex cover',
      },
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/vertexcover.png',
    navbar: {
      title: 'Vertexcover',
      logo: {
        alt: 'Vertexcover Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {to: '/', label: 'Blog', position: 'left', exact: true},
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/learnings', label: 'Learnings', position: 'left'},
        {to: '/about-us', label: 'About Us', position: 'left'},
        {
          href: 'https://github.com/vertexcover-io',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/vertexcover-io',
              className: 'footer-github-link',
              'aria-label': 'GitHub repository',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Codeshelf, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
