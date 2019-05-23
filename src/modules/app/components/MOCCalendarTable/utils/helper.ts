import moment, { Moment } from 'moment'
import { ICell } from '../../MOCCell/MOCCell';
import { CalendarEvent } from '../../MOCEvent';
import { DAYS_IN_WEEK, WEEKS_ON_VIEW, LAST_WEEK_DAY_INDEX, FIRST_WEEK_DAY_INDEX } from './constants';

export interface IApiEvent {
    name: string;
    startDate: Moment;
    endDate: Moment;
}

export function convertVacationData(apiData): IApiEvent[] {
    return apiData.map(({name, startDate, endDate}) => ({
        name,
        startDate: moment(startDate, 'DD.MM.YYYY', true),
        endDate: moment(endDate, 'DD.MM.YYYY', true),
    }))
}

export function isHoliday(date: Moment) {
    return date.weekday() === LAST_WEEK_DAY_INDEX || date.weekday() === FIRST_WEEK_DAY_INDEX;
}

export function isLastWeekDay(date: Moment) {
    return date.weekday() === 0;
}

export function isCurrentMonthDay(date: Moment, currentMonthNumber: number) {
    return date.month() === currentMonthNumber;
}

export function isCurrentDay(date: Moment) {
    return date.isSame(moment(), 'date');
}

export function getCellData(date: Moment, currentMonth: number, eventDataList: IApiEvent[]): ICell {
    return {
        date: date,
        isHoliday: isHoliday(date),
        isCurrentMonthDay: isCurrentMonthDay(date, currentMonth),
        isCurrentDay: isCurrentDay(date),
        eventList: getEventList(date, eventDataList),
    }
}

export function getEventData(day: Moment, evendData: IApiEvent) {
    const isZeroTime = !!(day.hours() && day.minutes() && day.seconds() && day.milliseconds());
    const isFirstWeekDay = day.weekday() === 1;
    const isFirstChunk = evendData.startDate.isSame(day, 'date');
    const isLastChunk = evendData.endDate.isSame(day, 'date');

    return {
        id: Math.round(Math.random() * 1000).toString(),
        time: day,
        isFirstChunk,
        isLastChunk,
        text: (isFirstChunk || isFirstWeekDay) ? evendData.name : '',
        wrapText: isZeroTime || isLastWeekDay(day) && isFirstChunk,
    }
}

export function getEventList(day: Moment, eventDataList: IApiEvent[]): CalendarEvent[] {
    const sortetByLasts = eventDataList.sort((a, b) => a.startDate.diff(a.endDate, 'days') - b.startDate.diff(b.endDate, 'days'))
    return sortetByLasts.reduce((acc, evendData) => {
        if (day.isBetween(evendData.startDate, evendData.endDate, 'date', '[]')) {
            acc.push(getEventData(day, evendData));
        }
        return acc;
    }, [])
}

export function getCalendarCells(currentYearNumber: number,currentMonthNumber: number, eventDataList: IApiEvent[]): ICell[] { // todo rework using memoization based on (currentMonthNumber and getCellData)
    const totalCellsCount = DAYS_IN_WEEK * WEEKS_ON_VIEW
    const currentMonthDate = moment().set('year', currentYearNumber).set('month', currentMonthNumber).hours(0).minutes(0).seconds(0).milliseconds(0);
    const firstMonthDate = currentMonthDate.clone().set('date', 1);
    const firstMonthWeekDayNumber = firstMonthDate.weekday() === 0 ? DAYS_IN_WEEK : firstMonthDate.weekday();
    const daysInCurrentMonth = currentMonthDate.daysInMonth();
    const lastCurrentMonthDay = currentMonthDate.clone().set('date', daysInCurrentMonth);
    const leftDays = totalCellsCount - (daysInCurrentMonth + firstMonthWeekDayNumber - 1);
    
    const previousMonthCells = [];
    for(let i = 1; i <= firstMonthWeekDayNumber - 1; i++) {
        const nextDate = firstMonthDate.clone().subtract(i, 'days');
        const cellData = getCellData(nextDate, currentMonthNumber, eventDataList);
        previousMonthCells.unshift(cellData);
    }
    
    const currentMonthCells = [];
    for(let i = 0; i < daysInCurrentMonth; i++) {
        const nextDate = firstMonthDate.clone().add(i, 'days');
        const cellData = getCellData(nextDate, currentMonthNumber, eventDataList);
        currentMonthCells.push(cellData);
    }
    
    const nextMonthCells = [];
    for(let i = 1; i <= leftDays; i++) {
        const nextDate = lastCurrentMonthDay.clone().add(i, 'days');
        const cellData = getCellData(nextDate, currentMonthNumber, eventDataList);
        nextMonthCells.push(cellData);
    }
    
    return [...previousMonthCells, ...currentMonthCells, ...nextMonthCells];
}