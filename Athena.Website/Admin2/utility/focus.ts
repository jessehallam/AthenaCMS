export default function focus(element: HTMLElement) {
    setTimeout(() => element && element.focus());
}
