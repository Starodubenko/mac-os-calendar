import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {CalendarEvent, MOCEvent} from "../MOCEvent";

import s from './MOCEventList.module.scss';

interface Props {
    list: CalendarEvent[];
    allowedHeight: number;
}

const useHiddenCount = (
    listCount,
    itemHeight: number,
    availableHeight: number
) => {
    const [hiddenCount, setHiddenCount] = useState(0);

    useLayoutEffect(() => {
        const listContainerHeight = listCount * itemHeight;
        const result = Math.ceil(
            Math.max(0, listContainerHeight - availableHeight) / itemHeight
        );

        setHiddenCount(result);
    }, [availableHeight]);

    return hiddenCount;
};

export const MOCEventList = (props: Props) => {
    const {list, allowedHeight} = props;

    const listContainerRef = useRef<HTMLDivElement>();
    const itemRefs = [];
    const hiddenCount = useHiddenCount(
        list.length,
        22, //todo вынести в константу styled component
        allowedHeight
    );

    const renderList = useMemo(() => list.reduce((acc, event, index) => {
        const isNotLast = list.length !== index + 1;

        if (index < list.length - hiddenCount) {
            acc.push(<MOCEvent key={'Event' + event.id} data={event} ref={instance => {
                itemRefs.push(instance)}
            }/>);
            if (isNotLast) {
                acc.push(<div key={'Divider' + event.id} className={s.Divider} />)
            }
        }

        return acc;
    }, []), [hiddenCount, list]);

    const renderExpander = useMemo(() => (
        hiddenCount ? <div>
            {`${hiddenCount} more...`}
        </div>: ""
    ), [hiddenCount]);

    return (
        <div className={s.Root} ref={listContainerRef}>
            {renderList}
            {renderExpander}
        </div>
    )
};
