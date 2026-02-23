const BASE = import.meta.env.BASE_URL;

/**
 * Load global texts
 */
export async function loadTexts() {
    const res = await fetch(`${BASE}content/texts.json`);
    return res.json();
}

/**
 * Load organizers data
 */
export async function loadOrganizers() {
    const res = await fetch(`${BASE}content/organizers.json`);
    return res.json();
}

/**
 * Load partners data
 */
export async function loadPartners() {
    const res = await fetch(`${BASE}content/partners.json`);
    return res.json();
}

/**
 * Load events data
 */
export async function loadEvents() {
    try {
        const indexRes = await fetch(`${BASE}content/events/index.json`);
        if (!indexRes.ok) throw new Error('Failed to load events index');

        const { events: ids } = await indexRes.json();

        const events = await Promise.all(ids.map(async (id) => {
            try {
                const res = await fetch(`${BASE}content/events/${id}/event.json`);
                if (!res.ok) return null;
                const event = await res.json();
                event.basePath = `${BASE}content/events/${id}/`;
                return event;
            } catch (e) {
                console.error(`Failed to load event ${id}`, e);
                return null;
            }
        }));

        const validEvents = events.filter(e => e !== null);

        return validEvents.sort((a, b) => {
            const parseDate = (d) => {
                const parts = d.split('. ');
                if (parts.length < 3) return new Date();
                return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
            };
            return parseDate(b.date) - parseDate(a.date);
        });

    } catch (e) {
        console.error("Error loading events:", e);
        return [];
    }
}

/**
 * Load a single event by ID
 */
export async function loadEvent(id) {
    try {
        const res = await fetch(`${BASE}content/events/${id}/event.json`);
        if (!res.ok) return null;
        const event = await res.json();
        event.basePath = `${BASE}content/events/${id}/`;
        return event;
    } catch (e) {
        console.error(`Failed to load event ${id}`, e);
        return null;
    }
}

/**
 * Parse Czech date format "d. m. yyyy" to Date object
 */
export function parseCzechDate(d) {
    const parts = d.split('. ');
    if (parts.length < 3) return new Date();
    return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
}
