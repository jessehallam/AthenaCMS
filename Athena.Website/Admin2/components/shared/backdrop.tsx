import * as React from 'react';
import * as ReactDOM from 'react-dom';

function BackdropComponent() {
    return <div className='backdrop' />;
}

export default function Backdrop(props: React.ComponentProps<'div'>) {
    return ReactDOM.createPortal(<BackdropComponent />, document.body);
}

export function attachToBody<P extends {}>(Component: React.ComponentType<P>) {
    return class BodyMountedComponent extends React.Component<P> {
        render() {
            return ReactDOM.createPortal(<Component {...this.props} />, document.body);
        }
    };
}
