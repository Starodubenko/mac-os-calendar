import React, {FunctionComponent, useMemo, useState, useCallback, useRef, useEffect} from 'react';
import moment, { Moment } from 'moment'
import { MOCCell, ICell } from '../MOCCell/MOCCell';
import { CalendarEvent } from '../MOCEvent';
import { MOCSwitcher } from '../MOCSwitcher';

import s from './MOCCalendarTable.module.scss';

interface Props {
    
}

const vacationData = [
    {
      name: 'Евгений Голубцов',
      startDate: '15.05.2019',
      endDate: '26.05.2019',
    },
    {
      name: 'Валерия Борисова',
      startDate: '03.06.2019',
      endDate: '07.06.2019',
    },
    {
      name: 'Валерия Борисова',
      startDate: '27.05.2019',
      endDate: '31.05.2019',
    },
    {
      name: 'Андрей Копылов',
      startDate: '27.05.2019',
      endDate: '09.06.2019',
    },
    {
      name: 'Святослав Подмагаев',
      startDate: '22.04.2019',
      endDate: '30.04.2019',
    },
    {
      name: 'Кирилл Мельников',
      startDate: '14.04.2019',
      endDate: '30.04.2019',
    }
];

interface IApiEvent {
    name: string;
    startDate: Moment;
    endDate: Moment;
}

const convertVacationData = (apiData): IApiEvent[] => { //todo Sorting on each date based in term of vacation
  return apiData.map(({name, startDate, endDate}) => {
      return {
          name,
          startDate: moment(startDate, 'DD.MM.YYYY', true),
          endDate: moment(endDate, 'DD.MM.YYYY', true),
      }
  })
}

const isHoliday = (date: Moment) => {
    return date.weekday() === 6 || date.weekday() === 0;
}

const isLastWeekDay = (date: Moment) => {
    return date.weekday() === 0;
}

const isCurrentMonthDay = (date: Moment, currentMonthNumber: number) => {
    return date.month() === currentMonthNumber;
}

const isCurrentDay = (date: Moment) => {
    return date.isSame(moment(), 'date');
}

const getEventList = (day: Moment, eventDataList: IApiEvent[]): CalendarEvent[] => {
    const sortetByLasts = eventDataList.sort((a, b) => a.startDate.diff(a.endDate, 'days') - b.startDate.diff(b.endDate, 'days'))
    return sortetByLasts.reduce((acc, evendData) => {
        if (day.isBetween(evendData.startDate, evendData.endDate, 'date', '[]')) {
            const isZeroTime = !!(day.hours() && day.minutes() && day.seconds() && day.milliseconds());
            const isFirstWeekDay = day.weekday() === 1;
            const isFirstChunk = evendData.startDate.isSame(day, 'date');
            const isLastChunk = evendData.endDate.isSame(day, 'date');

            acc.push({
                id: Math.round(Math.random() * 1000).toString(),
                time: day,
                isFirstChunk,
                isLastChunk,
                text: (isFirstChunk || isFirstWeekDay) && evendData.name,
                wrapText: isZeroTime || isLastWeekDay(day) && isFirstChunk,
            });
        }
        return acc;
    }, [])
}

const getCellData = (date: Moment, currentMonth: number): ICell => {
    return {
        date: date,
        isHoliday: isHoliday(date),
        isCurrentMonthDay: isCurrentMonthDay(date, currentMonth),
        isCurrentDay: isCurrentDay(date),
        eventList: getEventList(date, convertVacationData(vacationData)),
    }
}

const getCalendarCells = (currentMonthNumber: number) => { // todo rework using memoization based on (currentMonthNumber and getCellData)
    const totalCellsCount = 7 * 6
    const currentMonthDate = moment().set('month', currentMonthNumber).hours(0).minutes(0).seconds(0).milliseconds(0);
    const firstMonthDate = currentMonthDate.clone().set('date', 1);
    const firstMonthWeekDayNumber = firstMonthDate.weekday();
    const daysInCurrentMonth = currentMonthDate.daysInMonth();
    const lastCurrentMonthDay = currentMonthDate.clone().set('date', daysInCurrentMonth);
    const leftDays = totalCellsCount - (daysInCurrentMonth + firstMonthWeekDayNumber - 1);
    
    const previousMonthCells = [];
    for(let i = 1; i <= firstMonthWeekDayNumber - 1; i++) {
        const nextDate = firstMonthDate.clone().subtract(i, 'days');
        const cellData = getCellData(nextDate, currentMonthNumber);
        previousMonthCells.unshift(cellData);
    }
    
    const currentMonthCells = [];
    for(let i = 0; i < daysInCurrentMonth; i++) {
        const nextDate = firstMonthDate.clone().add(i, 'days');
        const cellData = getCellData(nextDate, currentMonthNumber);
        currentMonthCells.push(cellData);
    }
    
    const nextMonthCells = [];
    for(let i = 1; i <= leftDays; i++) {
        const nextDate = lastCurrentMonthDay.clone().add(i, 'days');
        const cellData = getCellData(nextDate, currentMonthNumber);
        nextMonthCells.push(cellData);
    }
    
    return [...previousMonthCells, ...currentMonthCells, ...nextMonthCells];
}

export const MOCCalendarTable: FunctionComponent<Props> = (props) => {
    const [currentMonthYear, setCurrentMonthYear] = useState<Moment>(moment());
    const currentMonthYearRef = useRef<Moment>();
    useEffect(() => {
        currentMonthYearRef.current = currentMonthYear;
    });
    const calendarCells = useMemo<ICell[]>(() => getCalendarCells(currentMonthYear.month()), [currentMonthYear])

    const renderCurrentMonthYear = useMemo(() => {
        return <>
            <span className={s.HeaderMonth}>{currentMonthYear.format('MMM')}</span>
            <span className={s.HeaderYear}>{currentMonthYear.year()}</span>
        </>
    }, [currentMonthYear]);
    const renderTableHeader = useMemo(() => {
        const result = [];
        for (let i=1; i<=7; i++) {
            result.push(<div key={`TableHeader${i}`} className={s.TableHeaderWeekDay}>
                {moment().weekday(i).format('ddd')}
            </div>)
        }
        return result;
    }, []);

    const renderContent = useMemo(() => calendarCells.map(cellData => {
        const rightBorder = !isLastWeekDay(cellData.date) && <div className={s.RightBorder}/>;

        return (
            <div className={s.Cell}>
                <div className={s.TopBorder}/>
                {rightBorder}
                <MOCCell key={cellData.date.toISOString()} data={cellData}/>
            </div>
        )
    }), [calendarCells])

    const switcherHandler = useCallback((value: number) => {
        const newDate = currentMonthYearRef.current.clone();
        if(value === 0) {
            setCurrentMonthYear(newDate);
        } else {
            setCurrentMonthYear(newDate.add(value, 'month'));
        }
    }, [currentMonthYear])

    return (
        <div className={s.Root}>
            <div className={s.Header}>
                <div className={s.SubHeader}>
                    <div className={s.CurrentMonthYear}>{renderCurrentMonthYear}</div>
                    <div className={s.TableControl}>
                        <MOCSwitcher nowTitle="Current month" onChangeHandler={switcherHandler} />
                    </div>
                </div>
                <div className={s.TableHeader}>
                    {renderTableHeader}
                </div>
            </div>
            <div className={s.Content}>
                {renderContent}
            </div>
        </div>
    )
};
