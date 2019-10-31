export interface LoadingSpinnerProps {
    show?: boolean;
}

export function LoadingSpinner({ show }: LoadingSpinnerProps) {
    if (!show) return null;
    return <i className='fas fa-circle-notch fa-spin mr-2' />;
}
