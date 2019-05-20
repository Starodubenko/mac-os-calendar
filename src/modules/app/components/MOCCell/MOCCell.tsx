import React, {FunctionComponent, useMemo, useState, useCallback} from 'react';
import cx from 'classnames';
import { Moment } from "moment";
import { MOCResizeableBlock, useResizeDimentions } from '../MOCResizeableBlock';
import { MOCEventList } from '../MOCEventList';
import { CalendarEvent } from '../MOCEvent';

import s from './MOCCell.module.scss';


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

export const MOCCell: FunctionComponent<Props> = ({data: {isHoliday, isCurrentDay, date, eventList, isCurrentMonthDay}}) => {
    const dayNumberString = useMemo(() => date.date(), [date]);
    const {height, onResizeHandler} = useResizeDimentions();

    const rootClasses = useMemo(() =>
            cx(s.Root, {
                [s.Holiday]: isHoliday,
            }),
        [isHoliday]
    );
    const dayNumberClasses = useMemo(() =>
            cx(s.DayNumber, {
                [s.DayNumber_current]: isCurrentDay,
                [s.DayNumber_notCurrenWithMonth]: dayNumberString === 1 && !isCurrentDay,
                [s.NotCurrentMonth]: !isCurrentMonthDay,
            }),
        [isCurrentDay]
    );

    const renderMonthString = useMemo(()=> {
        const firstDayClasses = cx(s.firstDay, {
            [s.NotCurrentMonth]: !isCurrentMonthDay,
        });
        
        return dayNumberString === 1 && <div className={firstDayClasses}>
            {date.format('MMM')}
        </div>
    }, [dayNumberString]);

    const renderEventList = () => (
        !!eventList.length && <MOCResizeableBlock className={s.EventListWrapper} onResize={onResizeHandler}>
            <MOCEventList list={eventList} allowedHeight={height}/>
        </MOCResizeableBlock>
    );

    return (
        <div className={rootClasses}>
            <div className={s.Day}>
                <div className={dayNumberClasses}>
                    {dayNumberString}
                </div>
                {renderMonthString}
            </div>
            {renderEventList()}
        </div>
    )
};
