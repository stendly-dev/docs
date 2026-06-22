import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const optionalVerificationToken = (value: string | undefined): string | undefined => {
    const token = value?.trim();
    return token && !/replace|example|change[_-]?me|placeholder/i.test(token) ? token : undefined;
};
const googleVerification = optionalVerificationToken(process.env.GOOGLE_SITE_VERIFICATION);
const yandexVerification = optionalVerificationToken(process.env.YANDEX_SITE_VERIFICATION);
const bingVerification = optionalVerificationToken(process.env.BING_SITE_VERIFICATION);

const config: Config = {
    title: 'Stendly Docs',
    tagline: 'Non-custodial payments on Solana — SDK documentation & API reference',
    favicon: 'img/favicon.ico',

    url: 'https://stendly.com',
    baseUrl: '/en-us/docs/',
    trailingSlash: true,

    organizationName: 'stendly',
    projectName: 'stendly-docs',
    clientModules: [require.resolve('./src/analytics.ts')],
    customFields: {
        analytics: {
            sentryDsn: process.env.DOCS_SENTRY_DSN,
            posthogToken: process.env.DOCS_POSTHOG_PROJECT_TOKEN,
            posthogHost: process.env.DOCS_POSTHOG_HOST,
            environment: process.env.APP_ENV || process.env.NODE_ENV,
            release: process.env.SENTRY_RELEASE || process.env.GIT_SHA,
        },
    },

    onBrokenLinks: 'throw',
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'throw',
        },
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/stendly-dev/stendly-docs/tree/main/',
                    routeBasePath: '/',
                    showLastUpdateTime: false,
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
                sitemap: {
                    lastmod: null,
                    changefreq: 'daily',
                    priority: 1.0,
                    ignorePatterns: [],
                    filename: 'sitemap.xml',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/stendly-social-card.png',
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: false,
        },
        navbar: {
            title: 'Stendly',
            logo: {
                alt: 'Stendly Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docsSidebar',
                    position: 'left',
                    label: 'Documentation',
                },
                {
                    to: '/sdk/python',
                    label: 'Python SDK',
                    position: 'left',
                },
                {
                    to: '/sdk/node',
                    label: 'Node SDK',
                    position: 'left',
                },
                {
                    to: '/sdk/dotnet',
                    label: '.NET SDK',
                    position: 'left',
                },
                {
                    href: 'https://dashboard.stendly.com',
                    label: 'Dashboard',
                    position: 'right',
                },
                {
                    href: 'https://github.com/stendly-dev',
                    label: 'GitHub',
                    position: 'right',
                },
                {
                    href: 'https://api.stendly.com/openapi.json',
                    label: 'OpenAPI',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Documentation',
                    items: [
                        {label: 'Getting Started', to: '/getting-started/'},
                        {label: 'Python SDK', to: '/sdk/python'},
                        {label: 'Node.js SDK', to: '/sdk/node'},
                        {label: '.NET SDK', to: '/sdk/dotnet'},
                        {label: 'API Reference', to: '/api-reference/intents'},
                    ],
                },
                {
                    title: 'Resources',
                    items: [
                        {label: 'Dashboard', href: 'https://dashboard.stendly.com'},
                        {label: 'Status', href: 'https://status.stendly.com'},
                        {label: 'Changelog', to: '/resources/changelog'},
                        {label: 'FAQ', to: '/resources/faq'},
                        {label: 'OpenAPI', to: '/resources/openapi'},
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {label: 'GitHub', href: 'https://github.com/stendly-dev'},
                        {label: 'Email', href: 'mailto:support@stendly.com'},
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Stendly. All rights reserved.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['bash', 'json', 'yaml', 'python', 'csharp', 'typescript'],
        },
        metadata: [
            {
                name: 'description',
                content: 'Stendly Documentation — integrate non-custodial USDC payments on Solana with Python, Node.js, and .NET SDKs.'
            },
            {
                name: 'keywords',
                content: 'stendly, solana, usdc, payments, crypto, non-custodial, sdk, python, nodejs, dotnet'
            },
        ],
    } satisfies Preset.ThemeConfig,

    headTags: [
        ...(googleVerification ? [{
            tagName: 'meta',
            attributes: {name: 'google-site-verification', content: googleVerification},
        }] : []),
        ...(yandexVerification ? [{
            tagName: 'meta',
            attributes: {name: 'yandex-verification', content: yandexVerification},
        }] : []),
        ...(bingVerification ? [{
            tagName: 'meta',
            attributes: {name: 'msvalidate.01', content: bingVerification},
        }] : []),
        {
            tagName: 'meta',
            attributes: {
                property: 'og:title',
                content: 'Stendly Documentation',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:description',
                content: 'Integrate non-custodial USDC payments on Solana with Python, Node.js, and .NET SDKs.',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:type',
                content: 'website',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:url',
                content: 'https://stendly.com/en-us/docs/',
            },
        },
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Stendly Documentation',
                url: 'https://stendly.com/en-us/docs/',
                description: 'Documentation for Stendly — non-custodial USDC payments on Solana.',
            }),
        },
    ],
};

export default config;
