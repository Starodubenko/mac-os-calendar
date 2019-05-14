import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {ActionFunction0} from "redux-actions";
import {Route, Switch} from "react-router";
import {appInitAction} from "../../state";
import {MainPage} from "../pages";
import {RootState} from "../../../store";

import s from './App.module.scss';


interface StateProps {
}

interface DispatchProps {
    appInitAction: ActionFunction0<any>;
}

type Props = StateProps & DispatchProps

const AppComponent = (props: Props) => {
    useEffect(() => {
        props.appInitAction();
    }, []);

    return (
        <div className={s.Root}>
            <Switch>
                <Route exact path="/" component={MainPage}/>
            </Switch>
        </div>
    )
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {
    appInitAction,
};

export const App = connect<StateProps, DispatchProps, any, RootState>(mapStateToProps, mapDispatchToProps)(AppComponent);

