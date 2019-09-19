import * as React from 'react';
import * as ReactDOM from 'react-dom';

function BackdropComponent() {
    return <div className='backdrop' />;
}

export default function Backdrop(props: React.ComponentProps<'div'>) {
    return ReactDOM.createPortal(<BackdropComponent />, document.body);
}
