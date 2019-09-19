export interface DashboardSpan {
    content: string | DashboardSpan[];
    key?: React.ReactText;
    span?: number;
}

export const defaultDashboard: DashboardSpan = {
    content: [
        /* First column: */
        {
            content: [{ content: 'title' }, { content: 'editor', span: 4 }, { content: 'meta' }],
            span: 9
        },
        /* Second column: */
        {
            content: [
                { content: 'status' },
                { content: 'taxonomy?type=1&title=Categories' },
                { content: 'taxonomy?type=2&title=Tags' },
                { content: 'excerpt' }
            ],
            span: 3
        }
    ]
};

export function keyDashboard(span: DashboardSpan) {
    let counter = 0;

    function key(span: DashboardSpan) {
        span.key = ++counter;
        if (Array.isArray(span.content)) {
            span.content.forEach(key);
        }
    }

    key(span);
}
