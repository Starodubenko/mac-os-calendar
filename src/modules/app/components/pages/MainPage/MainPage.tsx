import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../../../store";

import s from './MainPage.module.scss';
import {MOCEvent} from "../../MOCEvent";
import moment from "moment";

interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

export const MainPageComponent = (props: Props) => {
    const dateWithTime = moment();
    const dateWithoutTime = moment().hours(0).minutes(0).seconds(0);

    const eventData = [
        {
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: true,
            text: 'qwerty ytrewq',
            wrapText: false,
        },
        {
            time: dateWithoutTime,
            isFirstChunk: false,
            isLastChunk: true,
            text: 'qwerty ytrewq',
            wrapText: false,
        },
        {
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq',
            wrapText: false,
        },
        {
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq',
            wrapText: !!(dateWithoutTime.hours() || dateWithoutTime.minutes() || dateWithoutTime.seconds()),
        },
        {
            time: dateWithTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq',
            wrapText: !!(dateWithTime.hours() || dateWithTime.minutes() || dateWithTime.seconds()),
        },
        {
            time: dateWithoutTime,
            isFirstChunk: true,
            isLastChunk: false,
            text: 'qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq qwerty ytrewq',
            wrapText: true,
        },
    ];

    const events = eventData.map(event => (<MOCEvent data={event}/>));

    return (
        <div className={s.Root}>
            {events}
        </div>
    )
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {};

export const MainPage = connect<StateProps, DispatchProps, any, RootState>(mapStateToProps, mapDispatchToProps)(MainPageComponent);

