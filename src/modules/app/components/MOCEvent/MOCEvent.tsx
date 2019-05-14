import React from 'react';
import {Moment} from "moment";
import cx from 'classnames';

import s from './MOCEvent.module.scss';

export interface CalendarEvent {
    time: Moment;
    isFirstChunk: boolean;
    isLastChunk: boolean;
    text: string;
    wrapText: boolean;
}

interface Props {
    data: CalendarEvent
}

export const MOCEvent = (props: Props) => {
    const {isFirstChunk, isLastChunk, wrapText, text, time} = props.data;

    const contentClasses = cx(s.Highlight, {
        [s.Highlight_leftMargin]: isFirstChunk,
        [s.Highlight_rightMargin]: isLastChunk,
    });
    const textClasses = cx(s.Text, {
        [s.Text_wrapped]: wrapText,
    });
    const timeString = time.format("HH:mm");

    const renderText = wrapText && <div className={s.Time}>
        {timeString}
    </div>;

    return (
        <div className={s.Root}>
            <div className={contentClasses}>
                <div className={s.TextContainer}>
                    <div className={textClasses}>
                        {text}
                    </div>
                    {renderText}
                </div>
            </div>
        </div>
    )
};
