import React, {FunctionComponent, useEffect, useRef} from 'react';
import cx from 'classnames';

import s from './MOCResizeableBlock.module.scss';

interface ComponentProps {
    className?: string;
    onResize: (height: number, width: number) => void;
}

export const MOCResizeableBlock: FunctionComponent<ComponentProps> = (props) => {
    const iframeRef = useRef<HTMLIFrameElement>();
    useEffect(() => {
        iframeRef.current.contentWindow.onresize = (event: any) => {
            props.onResize(event.currentTarget.innerHeight, event.currentTarget.innerWidth);
        };
        props.onResize(iframeRef.current.contentWindow.innerHeight, iframeRef.current.contentWindow.innerWidth);
    }, []);

    const rootClasses = cx(s.Root, props.className);

    return (
        <div className={rootClasses}>
            <iframe className={s.IFrame} width="100%" height="100%" ref={iframeRef}/>
            {props.children}
        </div>
    )
};
