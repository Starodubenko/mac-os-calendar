import React, {useCallback, useMemo} from 'react';
import moment from 'moment';
import cx from 'classnames';

import s from './MOCSwitcher.module.scss';

interface Props {
    dateUnit: string;
    nowTitle: string;
    onChangeHandler: (value: number, dateUnit: string) => void;
}

export const MOCSwitcher = (props: Props) => {
    const clickHandler = useCallback((number: number) => () => {
        const result = number === 0 ? moment().get(props.dateUnit as any) : number;

        props.onChangeHandler(result, props.dateUnit);
    }, [])

    const middleButtonClasses = useMemo(() => cx(s.Button, s.Middle), [])

    return (
        <div className={s.Root}>
            <div className={s.Button} onClick={clickHandler(-1)}>
                {'<'}
            </div>
            <div className={middleButtonClasses} onClick={clickHandler(0)}>
                {props.nowTitle}
            </div>
            <div className={s.Button} onClick={clickHandler(1)}>
                {'>'}
            </div>
        </div>
    )
};
