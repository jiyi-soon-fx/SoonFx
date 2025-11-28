import { en, zhCN } from './locales';

type Locale = typeof en;
type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

export class I18nService {
    private currentLocale: 'en' | 'zh-CN' = 'en';
    private messages: Record<'en' | 'zh-CN', Locale> = {
        en,
        'zh-CN': zhCN
    };
    private listeners: (() => void)[] = [];

    constructor() {
        // Check URL param or localStorage
        const params = new URLSearchParams(window.location.search);
        const lang = params.get('lang');
        if (lang === 'zh-CN' || lang === 'zh') {
            this.currentLocale = 'zh-CN';
        } else if (lang === 'en') {
            this.currentLocale = 'en';
        } else {
            // Check navigator
            // const navLang = navigator.language;
            // if (navLang.startsWith('zh')) {
            //     this.currentLocale = 'zh-CN';
            // }
            this.currentLocale = 'en';
        }
    }

    public get locale() {
        return this.currentLocale;
    }

    public setLocale(lang: 'en' | 'zh-CN') {
        if (this.currentLocale !== lang) {
            this.currentLocale = lang;
            this.updateURL();
            this.notifyListeners();
            this.updatePage();
        }
    }

    public toggleLocale() {
        this.setLocale(this.currentLocale === 'en' ? 'zh-CN' : 'en');
    }

    public t(key: string, params?: Record<string, string | number>): string {
        const keys = key.split('.');
        let value: any = this.messages[this.currentLocale];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as any)[k];
            } else {
                return key;
            }
        }

        if (typeof value !== 'string') {
            return key;
        }

        if (params) {
            return Object.entries(params).reduce((acc, [k, v]) => {
                return acc.replace(`{${k}}`, String(v));
            }, value);
        }

        return value;
    }

    public subscribe(listener: () => void) {
        this.listeners.push(listener);
    }

    private notifyListeners() {
        this.listeners.forEach(l => l());
    }

    private updateURL() {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', this.currentLocale);
        window.history.replaceState({}, '', url.toString());
    }

    public updatePage() {
        // Update elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                el.textContent = this.t(key);
            }
        });

        // Update elements with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) {
                (el as HTMLInputElement).placeholder = this.t(key);
            }
        });

        // Update title
        document.title = this.t('meta.title');
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLocale;
    }
}

export const i18n = new I18nService();

