import * as Sentry from '@sentry/browser';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import posthog from 'posthog-js/dist/module.full.no-external';
import siteConfig from '@generated/docusaurus.config';

type AnalyticsConfig = {
    sentryDsn?: string;
    posthogToken?: string;
    posthogHost?: string;
    environment?: string;
    release?: string;
};

const analytics = (siteConfig.customFields?.analytics || {}) as AnalyticsConfig;
let lastPagePath: string | null = null;

if (ExecutionEnvironment.canUseDOM) {
    Sentry.init({
        dsn: analytics.sentryDsn,
        enabled: Boolean(analytics.sentryDsn),
        environment: analytics.environment,
        release: analytics.release,
        sendDefaultPii: false,
        tracesSampleRate: 0.05,
        integrations: [
            Sentry.replayIntegration({maskAllText: true, maskAllInputs: true, blockAllMedia: true}),
        ],
        replaysSessionSampleRate: 0.01,
        replaysOnErrorSampleRate: 1,
        beforeSend(event) {
            if (event.request) {
                delete event.request.cookies;
                delete event.request.data;
                delete event.request.headers;
            }
            event.tags = {...event.tags, app: 'docs'};
            return event;
        },
    });

    if (analytics.posthogToken) {
        posthog.init(analytics.posthogToken, {
            api_host: analytics.posthogHost || '/x7r',
            ui_host: 'https://us.posthog.com',
            defaults: '2026-05-30',
            disable_external_dependency_loading: true,
            capture_pageview: 'history_change',
            capture_pageleave: true,
            autocapture: false,
            rageclick: false,
            capture_dead_clicks: false,
            capture_heatmaps: true,
            capture_performance: {network_timing: true, web_vitals: true},
            capture_exceptions: true,
            person_profiles: 'identified_only',
            session_recording: {
                sampleRate: 1,
                maskAllInputs: true,
                maskTextSelector: '*',
                blockSelector: '[data-analytics-sensitive], [data-analytics-block]',
                recordBody: false,
                recordHeaders: false,
                strictMinimumDuration: true,
            },
            enable_recording_console_log: false,
            mask_all_text: true,
            mask_all_element_attributes: true,
            mask_personal_data_properties: true,
            custom_personal_data_properties: ['email', 'identifier', 'invoice', 'address', 'token', 'code'],
            property_denylist: ['email', 'identifier', 'otp', 'pin', 'private_key', 'api_key', 'authorization', 'address', 'signature'],
            save_campaign_params: true,
            save_referrer: true,
            loaded(instance) {
                instance.register({
                    app: 'docs',
                    environment: analytics.environment,
                    release: analytics.release,
                    event_schema_version: 2,
                });
                instance.startSessionRecording(true);
            },
            logs: {
                captureConsoleLogs: false,
                serviceName: 'stendly-docs',
                environment: analytics.environment,
                serviceVersion: analytics.release,
                maxBufferSize: 50,
                maxLogsPerInterval: 200,
            },
            before_send(event) {
                if (!event) return null;
                for (const key of Object.keys(event.properties)) {
                    if (/(email|otp|pin|private|secret|api[_-]?key|authorization|address|signature)$/i.test(key)) {
                        delete event.properties[key];
                    }
                }
                for (const key of ['$current_url', '$pathname', '$referrer']) {
                    const value = event.properties[key];
                    if (typeof value === 'string') {
                        try {
                            const url = new URL(value, window.location.origin);
                            event.properties[key] = `${url.origin}${url.pathname}`;
                        } catch {
                            delete event.properties[key];
                        }
                    }
                }
                return event;
            },
        });
    }
}

function capturePage(): void {
    const path = window.location.pathname;
    if (lastPagePath === path) return;
    lastPagePath = path;
    const properties = {
        event_schema_version: 2,
        app: 'docs',
        environment: analytics.environment,
        release: analytics.release,
        page_path: path,
        page_title: document.title,
        locale: path.startsWith('/ru-ru/') ? 'ru-ru' : 'en-us',
    };
    posthog.capture('docs_page_view', properties);
    if (path.includes('/getting-started/')) posthog.capture('docs_getting_started_view', properties);
    if (path.includes('/api-reference/')) posthog.capture('docs_api_reference_view', properties);
    if (path.includes('/webhook')) posthog.capture('docs_webhooks_view', properties);
}

function captureClick(event: MouseEvent): void {
    const element = event.target as Element | null;
    const anchor = element?.closest('a');
    if (anchor) {
        const href = anchor.getAttribute('href') || '';
        if (href.includes('openapi.json')) {
            posthog.capture('openapi_json_click', {page: window.location.pathname});
            posthog.capture('open_openapi_click', {page: window.location.pathname});
        } else if (href.includes('openapi.yaml')) {
            posthog.capture('openapi_yaml_click', {page: window.location.pathname});
            posthog.capture('open_openapi_click', {page: window.location.pathname});
        } else if (href.includes('/sdk/python') || href.includes('pypi.org')) {
            posthog.capture('python_sdk_click', {page: window.location.pathname});
            posthog.capture('sdk_link_click', {page: window.location.pathname, language: 'python'});
        } else if (href.includes('/sdk/node') || href.includes('npmjs.com')) {
            posthog.capture('node_sdk_click', {page: window.location.pathname});
            posthog.capture('sdk_link_click', {page: window.location.pathname, language: 'node'});
        } else if (href.includes('/sdk/dotnet') || href.includes('nuget.org')) {
            posthog.capture('dotnet_sdk_click', {page: window.location.pathname});
            posthog.capture('sdk_link_click', {page: window.location.pathname, language: 'dotnet'});
        }
    }
    if (element?.closest('button[class*="copy"], button[aria-label*="Copy"], button[title*="Copy"]')) {
        posthog.capture('copy_code_click', {page: window.location.pathname, section: 'code_block'});
    }
}

if (ExecutionEnvironment.canUseDOM) {
    window.addEventListener('error', event => {
        Sentry.captureException(event.error || new Error(event.message), {tags: {app: 'docs'}});
        posthog.logger.error('docs window error', {app: 'docs', error_code: 'WINDOW_ERROR', page_path: window.location.pathname});
        posthog.capture('frontend_error', {page: window.location.pathname, error_code: 'WINDOW_ERROR'});
    });
    window.addEventListener('unhandledrejection', event => {
        Sentry.captureException(event.reason, {tags: {app: 'docs'}});
        posthog.logger.error('docs unhandled rejection', {app: 'docs', error_code: 'UNHANDLED_REJECTION', page_path: window.location.pathname});
        posthog.capture('frontend_error', {page: window.location.pathname, error_code: 'UNHANDLED_REJECTION'});
    });
    document.addEventListener('click', captureClick);
    capturePage();
}

export function onRouteDidUpdate(): void {
    capturePage();
}
