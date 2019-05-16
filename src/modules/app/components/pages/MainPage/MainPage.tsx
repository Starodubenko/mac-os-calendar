import React, {ChangeEvent, SyntheticEvent, useCallback, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "../../../../store";
import moment from "moment";
import {MOCEventList} from "../../MOCEventList";

import s from './MainPage.module.scss';

interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

export const MainPageComponent = (props: Props) => {
    const dateWithTime = moment();
    const dateWithoutTime = moment().hours(0).minutes(0).seconds(0);

    const eventListData = [
        {
            id: Math.round(Math.random() * 1000).toString(),
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: true,
            text: 'qwerty ytrewq',
            wrapText: false,
        },
        {
            id: Math.round(Math.random() * 1000).toString(),
            time: dateWithoutTime,
            isFirstChunk: false,
            isLastChunk: true,
            text: 'qwerty ytrewq',
            wrapText: false,
        },
        {
            id: Math.round(Math.random() * 1000).toString(),
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq',
            wrapText: false,
        },
        {
            id: Math.round(Math.random() * 1000).toString(),
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq',
            wrapText: !!(dateWithoutTime.hours() || dateWithoutTime.minutes() || dateWithoutTime.seconds()),
        },
        {
            id: Math.round(Math.random() * 1000).toString(),
            time: dateWithTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq',
            wrapText: !!(dateWithTime.hours() || dateWithTime.minutes() || dateWithTime.seconds()),
        },
        {
            id: Math.round(Math.random() * 1000).toString(),
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq',
            wrapText: true,
        },
    ];

    const [listHeight, setListHeight] = useState(100);
    const onHeightInputChange = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
        setListHeight(+event.currentTarget.value);
    }, []);

    return (
        <div className={s.Root}>
            <input type="text" value={listHeight} onChange={onHeightInputChange}/>
            <MOCEventList list={eventListData} allowedHeight={listHeight}/>
        </div>
    )
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {};

export const MainPage = connect<StateProps, DispatchProps, any, RootState>(mapStateToProps, mapDispatchToProps)(MainPageComponent);

