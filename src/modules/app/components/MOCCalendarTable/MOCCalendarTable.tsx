import React, {FunctionComponent, useMemo, useState, useCallback, useRef, useEffect} from 'react';
import moment, { Moment } from 'moment'
import { MOCCell } from '../MOCCell/MOCCell';
import { MOCSwitcher } from '../MOCSwitcher';
import { useResizeDimentions, MOCResizeableBlock } from '../MOCResizeableBlock';
import { WEEKS_ON_VIEW, DAYS_IN_WEEK, getCalendarCells, convertVacationData } from './utils';

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

export const MOCCalendarTable: FunctionComponent<Props> = (props) => {
    const {height, width, onResizeHandler} = useResizeDimentions();
    const dimensions = useMemo(() => ({
        height: height / WEEKS_ON_VIEW,
        width: width / DAYS_IN_WEEK,
    }), [height, width]);
    const [currentMonthYear, setCurrentMonthYear] = useState<Moment>(moment());
    const currentMonthYearRef = useRef<Moment>();
    useEffect(() => {
        currentMonthYearRef.current = currentMonthYear;
    });
    const calendarCells = getCalendarCells(currentMonthYear.year(), currentMonthYear.month(), convertVacationData(vacationData))

    const renderCurrentMonthYear = useMemo(() => {
        return <>
            <span className={s.HeaderMonth}>{currentMonthYear.format('MMM')}</span>
            <span className={s.HeaderYear}>{currentMonthYear.year()}</span>
        </>
    }, [currentMonthYear]);
    const renderTableHeader = useMemo(() => {
        const result = [];
        for (let i = 1; i <= DAYS_IN_WEEK; i++) {
            result.push(<div key={`TableHeader${i}`} className={s.TableHeaderWeekDay}>
                {moment().weekday(i).format('ddd')}
            </div>)
        }
        return result;
    }, []);

    const renderContent = useMemo(() => 
        calendarCells.map(cellData => <MOCCell data={cellData} dimensions={dimensions} key={JSON.stringify(cellData)}/>),
        [calendarCells, dimensions]
    )

    const switcherHandler = useCallback((value: number) => {
        const newDate = currentMonthYearRef.current.clone();
        if(value === 0) {
            setCurrentMonthYear(moment());
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
            <MOCResizeableBlock className={s.Content} onResize={onResizeHandler}>
                {renderContent}
            </MOCResizeableBlock>
        </div>
    )
};
