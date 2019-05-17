import React, {useCallback, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "../../../../store";
import moment from "moment";
import {MOCEventList} from "../../MOCEventList";

import s from './MainPage.module.scss';
import {MOCResizeableBlock} from "../../MOCResizeableBlock";

interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

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

export const MainPageComponent = (props: Props) => {
    const [listHeight, setListHeight] = useState();
    const onResizeHandler = useCallback((height: number) => {
        setListHeight(height);
    }, []);

    return (
        <div className={s.Root}>
            <div className={s.Cell}>
                <div className={s.CellHeader} />
                <MOCResizeableBlock className={s.EventListWrapper} onResize={onResizeHandler}>
                    <MOCEventList list={eventListData} allowedHeight={listHeight}/>
                </MOCResizeableBlock>
            </div>
        </div>
    )
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {};

export const MainPage = connect<StateProps, DispatchProps, any, RootState>(mapStateToProps, mapDispatchToProps)(MainPageComponent);

