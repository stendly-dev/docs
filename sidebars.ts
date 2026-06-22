import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    docsSidebar: [
        'welcome',
        {
            type: 'category',
            label: 'Getting Started',
            link: {type: 'doc', id: 'getting-started/overview'},
            items: [
                'getting-started/create-account',
                'getting-started/create-wallet',
                'getting-started/api-keys',
                'getting-started/environments',
                'getting-started/first-payment',
            ],
        },
        {
            type: 'category',
            label: 'SDK Quickstarts',
            link: {type: 'generated-index', title: 'SDK Quickstarts', slug: '/sdk'},
            items: [
                'sdk/python',
                'sdk/node',
                'sdk/dotnet',
                'sdk/curl',
            ],
        },
        {
            type: 'category',
            label: 'API Reference',
            link: {type: 'generated-index', title: 'API Reference', slug: '/api-reference'},
            items: [
                'api-reference/intents',
                'api-reference/terminals',
                'api-reference/webhooks',
                'api-reference/merchant',
                'api-reference/errors',
            ],
        },
        {
            type: 'category',
            label: 'Guides',
            link: {type: 'generated-index', title: 'Guides', slug: '/guides'},
            items: [
                'guides/payment-flow',
                'guides/webhook-security',
                'guides/error-handling',
                'guides/rate-limiting',
                'guides/production-checklist',
            ],
        },
        {
            type: 'category',
            label: 'Resources',
            link: {type: 'generated-index', title: 'Resources', slug: '/resources'},
            items: [
                'resources/faq',
                'resources/changelog',
                'resources/openapi',
                'resources/support',
            ],
        },
    ],
};

export default sidebars;
