import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../../../store";

import s from './MainPage.module.scss';

interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

export const MainPageComponent = (props: Props) => {
    return (
        <div className={s.Root}>
        </div>
    )
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {};

export const MainPage = connect<StateProps, DispatchProps, any, RootState>(mapStateToProps, mapDispatchToProps)(MainPageComponent);

