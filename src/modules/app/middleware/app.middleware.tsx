import {AppInitActionType} from "../state";

export const appMiddleware  = state => next => action => {
    const {dispatch} = state;
    const {type} = action;

    if (type === AppInitActionType) {

    }

    next(action);
};

