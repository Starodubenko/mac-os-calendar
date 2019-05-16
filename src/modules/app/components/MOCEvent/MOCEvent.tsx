import React, {forwardRef, useMemo} from 'react';
import {Moment} from "moment";
import cx from 'classnames';

import s from './MOCEvent.module.scss';

export interface CalendarEvent {
    id: string;
    time: Moment;
    isFirstChunk: boolean;
    isLastChunk: boolean;
    text: string;
    wrapText: boolean;
}

interface Props {
    data: CalendarEvent
}

export const MOCEvent = forwardRef((props: Props, ref: React.MutableRefObject<HTMLDivElement>) => {
    const {isFirstChunk, isLastChunk, wrapText, text, time} = props.data;

    const contentClasses = useMemo(() => cx(s.Highlight, {
        [s.Highlight_leftMargin]: isFirstChunk,
        [s.Highlight_rightMargin]: isLastChunk,
    }), [isFirstChunk, isLastChunk]);
    const textClasses = useMemo(() => cx(s.Text, {
        [s.Text_wrapped]: wrapText,
    }), [wrapText]);
    const timeString = useMemo(() => time.format("HH:mm"), [time]);
    const renderText = useMemo(() => wrapText && <div className={s.Time}>
        {timeString}
    </div>, [timeString, wrapText]);

    return (
        <div className={s.Root} ref={ref}>
            <div className={contentClasses}>

            </div>
            <div className={s.TextContainer}>
                <div className={textClasses}>
                    {text}
                </div>
                {renderText}
            </div>
        </div>
    )
});
