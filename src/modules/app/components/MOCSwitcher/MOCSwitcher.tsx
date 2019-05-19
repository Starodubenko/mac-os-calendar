import React, {useCallback, useMemo} from 'react';
import cx from 'classnames';

import s from './MOCSwitcher.module.scss';

interface Props {
    nowTitle: string;
    onChangeHandler: (value: number) => void;
}

export const MOCSwitcher = (props: Props) => {
    const clickHandler = useCallback((number: number) => () => {
        props.onChangeHandler(number);
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
