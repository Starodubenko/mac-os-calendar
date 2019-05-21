import React, {FunctionComponent, useMemo} from 'react';
import cx from 'classnames';
import { Moment } from "moment";
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

export interface ICellDimensions {
    height: number;
    width: number;
}

interface Props {
    data: ICell
    dimensions: ICellDimensions
}

export const MOCCell: FunctionComponent<Props> = ({
    data: {isHoliday, isCurrentDay, date, eventList, isCurrentMonthDay},
    dimensions: {height, width}
}) => {
    const cellHeaderHeight = 30;
    const cellEventListHeight = height - cellHeaderHeight;
    const dayNumberString = useMemo(() => date.date(), [date]);
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
        !!eventList.length && <MOCEventList list={eventList} allowedHeight={cellEventListHeight}/>
    );

    return (
        <div className={rootClasses} style={{height, width}}>
            <div className={s.TopBorder}/>
            <div className={s.RightBorder}/>
            <div className={s.Day} >
                <div className={dayNumberClasses}>
                    {dayNumberString}
                </div>
                {renderMonthString}
            </div>
            {renderEventList()}
        </div>
    )
};
