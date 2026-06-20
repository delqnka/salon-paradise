import * as react from 'react';

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

declare const BookingWidget: react.ForwardRefExoticComponent<BookingWidgetProps & react.RefAttributes<BookingWidgetHandle>>;

export { type BookingBlock, type BookingServiceItem, type BookingSuccessDetails, BookingWidget, type BookingWidgetHandle, type BookingWidgetProps, type OpeningDayRecord, type PublicStaffMember };
