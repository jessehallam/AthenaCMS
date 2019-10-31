export interface IDashboardSpan {
    content: string | IDashboardSpan[];
    span?: number;
}

export const defaultDashboard: IDashboardSpan = {
    content: [
        {
            /* column 1 */
            content: [{ content: 'title' }, { content: 'richedit' }, { content: 'meta' }],
            span: 9
        },
        {
            /* column 2 */
            content: [
                { content: 'status' },
                { content: 'taxonomy?taxonomyId=1&title=Categories' },
                { content: 'taxonomy?taxonomyId=2&title=Tags' },
                { content: 'excerpt' }
            ]
        }
    ]
};
