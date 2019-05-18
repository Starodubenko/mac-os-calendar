import React, {FunctionComponent, useEffect, useMemo, useRef, useState, useCallback} from 'react';
import cx from 'classnames';
import moment, { Moment } from "moment";

import s from './MOCCell.module.scss';
import { MOCResizeableBlock } from '../MOCResizeableBlock';
import { MOCEventList } from '../MOCEventList';
import { CalendarEvent } from '../MOCEvent';

export interface ICell {
    date: Moment;
    isHoliday: boolean;
    isCurrentMonthDay: boolean;
    isCurrentDay: boolean;
    eventList: CalendarEvent[];
}

interface Props {
    data: ICell
}

export const MOCCell: FunctionComponent<Props> = (props) => {
    const rootClasses = useMemo(() =>
            cx(s.Root, {[s.Holiday]: props.data.isHoliday}),
        [props.data.isHoliday]
    );
    const dayNumberClasses = useMemo(() =>
            cx(s.DayNumber, {[s.DayNumber_current]: props.data.isCurrentDay}),
        [props.data.isCurrentDay]
    );
    const dayNumberString = useMemo(() => props.data.date.days(), [props.data.date]);

    const renderMonthString = useMemo(()=> (
        dayNumberString === 1 && <div className={s.firstDay}>
            { props.data.date.format('MMM')}
        </div>
    ), [dayNumberString]);

    const [listHeight, setListHeight] = useState();
    const onResizeHandler = useCallback((height: number) => {
        setListHeight(height);
    }, []);

    return (
        <div className={rootClasses}>
            <div className={s.TopBorder}/>
            
            <div className={s.RightBorder}/>
            <div className={s.Day}>
                <div className={dayNumberClasses}>
                    {dayNumberString}
                </div>
                {renderMonthString}
            </div>
            <MOCResizeableBlock className={s.EventListWrapper} onResize={onResizeHandler}>
                <MOCEventList list={props.data.eventList} allowedHeight={listHeight}/>
            </MOCResizeableBlock>
        </div>
    )
};
