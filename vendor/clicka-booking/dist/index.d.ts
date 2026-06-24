import * as React from 'react';
import React__default from 'react';

type BookingContextValue = {
    /**
     * Open the booking modal. Pass a service id to pre-select it. If the salon
     * record hasn't loaded yet, the call is queued and fired as soon as it does.
     */
    open: (service?: string) => void;
    /** Close the booking modal. No-op if it isn't open. */
    close: () => void;
    /** True once the salon record is loaded and the modal is mountable. */
    isReady: boolean;
    /** Non-null if the salon fetch failed (network, 404, etc.). */
    error: Error | null;
    /** The raw salon record once loaded, or null while loading / on error. */
    salon: Record<string, unknown> | null;
};
declare const BookingContext: React__default.Context<BookingContextValue | null>;
type BookingProviderProps = {
    children?: React__default.ReactNode;
    /**
     * Salon slug. If omitted, the provider tries (in order):
     * 1. `window.__CLICKA_SALON_SLUG`
     * 2. `<meta name="clicka:salon" content="...">`
     * 3. `process.env.NEXT_PUBLIC_SALON_SLUG` (Next.js / Vite-replaced)
     * 4. `process.env.NEXT_PUBLIC_CLICKA_SALON`
     */
    salonSlug?: string;
    /**
     * Engine origin. If omitted, the provider tries (in order):
     * 1. `window.__CLICKA_ENGINE_URL`
     * 2. `<meta name="clicka:engine" content="...">`
     * 3. `process.env.NEXT_PUBLIC_CLICKA_ENGINE`
     * 4. `process.env.NEXT_PUBLIC_CLICKA_API_URL`
     * 5. Default: `https://clicka.bg`
     */
    engineUrl?: string;
    /**
     * BCP-47 locale. If omitted, the provider derives it from
     * `<html lang>`, then `<body data-lang>`, then `navigator.language`,
     * defaulting to `bg-BG`.
     */
    locale?: string;
    /** Stripe success URL. Defaults to current page with `?booked=1`. */
    successUrl?: string;
    /** Stripe cancel URL. Defaults to current page with `?cancelled=1`. */
    cancelUrl?: string;
    /** CSS gradient for accent fills. */
    accentGradient?: string;
    /** Custom price formatter. */
    formatPrice?: (amount: number) => string;
    /** Analytics callback (replaces internal fbq/gtag). */
    onEvent?: (name: 'booking_started' | 'booking_completed', payload?: {
        serviceName?: string;
        value?: number;
        currency?: string;
    }) => void;
    /** Prefix for `/terms` and `/privacy` legal links. */
    basePath?: string;
    /**
     * When true (default), the provider attaches a document-level click handler
     * that opens the modal for any element matching `[data-clicka-book]`.
     * The attribute value (when non-empty) is passed as the service id.
     */
    autoTriggers?: boolean;
    /**
     * When true (default), the provider opens the modal on mount if the URL
     * contains `?service=<id>` or `?book=1`.
     */
    honorUrlParams?: boolean;
};
declare function BookingProvider({ children, salonSlug, engineUrl, locale, successUrl, cancelUrl, accentGradient, formatPrice, onEvent, basePath, autoTriggers, honorUrlParams, }: BookingProviderProps): React__default.JSX.Element;

type BookingButtonProps = React__default.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Pre-select this service id when opening the modal. */
    service?: string;
};
/**
 * Drop-in button that opens the booking modal. Must be used inside a
 * `<BookingProvider>`. Accepts every native `<button>` prop so consumers
 * keep their own classes, styles, ARIA, etc.
 *
 * @example
 *   <BookingButton>Reserve</BookingButton>
 *   <BookingButton service="balayage" className="btn btn_solid">Book balayage</BookingButton>
 */
declare const BookingButton: React__default.ForwardRefExoticComponent<React__default.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Pre-select this service id when opening the modal. */
    service?: string;
} & React__default.RefAttributes<HTMLButtonElement>>;

/**
 * Access the booking modal from anywhere inside a `<BookingProvider>`.
 *
 * @throws if called outside a `<BookingProvider>` tree.
 */
declare function useBooking(): BookingContextValue;

type OpeningDayRecord = Record<string, {
    open: string;
    close: string;
} | null>;

type BookingBlock = {
    date: string;
    allDay: boolean;
    start?: string;
    end?: string;
    note?: string;
};

type CancelPolicyAction = 'full_refund' | 'keep_deposit' | 'keep_full';

type BookingSuccessDetails = {
    serviceName: string;
    dateLabel: string;
    time: string;
};
type PublicStaffMember = {
    id: string;
    name: string;
    slug: string;
    bio: string | null;
    avatarUrl: string | null;
    serviceIds: string[];
};
/** One bookable row — either a base service or an expanded variant. */
type BookingServiceItem = {
    id: string;
    name: string;
    description?: string;
    duration: number;
    price?: number;
    category?: string;
    images?: string[];
    variants?: {
        label: string;
        price: number;
        duration?: number;
    }[];
    payment_type?: 'none' | 'deposit' | 'full';
    deposit_amount?: number;
    cancel_policy_hours?: number;
    cancel_policy_action?: CancelPolicyAction;
};
type BookingWidgetHandle = {
    open: (serviceId?: string) => void;
    close: () => void;
};
type BookingWidgetProps = {
    /** Business slug used for all API calls. */
    slug: string;
    /** Raw salon record straight from DB / getPublicSalonPageData. */
    salon: Record<string, unknown>;
    /** Pre-processed opening hours. Derived from salon if omitted. */
    openingHours?: OpeningDayRecord;
    /** Pre-processed booking blocks. Derived from salon if omitted. */
    bookingBlocks?: BookingBlock[];
    /** Base path for /terms and /privacy links. Default: ''. */
    basePath?: string;
    /**
     * Origin of the booking engine API.
     * Set this when the client site is a SEPARATE repo from the engine.
     * Example: 'https://engine.clicka.bg'
     * Leave empty (default) when the site runs inside the engine repo.
     */
    engineUrl?: string;
    /** CSS gradient string for accent fills. Defaults to a solid gradient from primaryColor. */
    accentGradient?: string;
    /**
     * Stripe success redirect URL (white-label: keep users on the salon's own domain).
     * Should land on a page that reads `?booking_id=` from the query string.
     */
    successUrl?: string;
    /** Stripe cancel redirect URL. */
    cancelUrl?: string;
    /** BCP-47 locale for date/label formatting. If omitted, falls back to `salon.language`. */
    locale?: string;
    /** Pluggable price formatter. Default: `${n} €`. */
    formatPrice?: (amount: number) => string;
    /** Analytics callback. If provided, replaces direct window.fbq / gtag calls. */
    onEvent?: (name: 'booking_started' | 'booking_completed', payload?: {
        serviceName?: string;
        value?: number;
        currency?: string;
    }) => void;
};

declare const BookingWidget: React.ForwardRefExoticComponent<BookingWidgetProps & React.RefAttributes<BookingWidgetHandle>>;

export { type BookingBlock, BookingButton, type BookingButtonProps, BookingContext, type BookingContextValue, BookingProvider, type BookingProviderProps, type BookingServiceItem, type BookingSuccessDetails, BookingWidget, type BookingWidgetHandle, type BookingWidgetProps, type OpeningDayRecord, type PublicStaffMember, useBooking };
