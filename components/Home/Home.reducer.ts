export interface HomeFormState {
  enteredText: string;
  duration: number | undefined;
}

export enum HomeActionTypes {
  SET_TEXT = 'SET_TEXT',
  SET_DURATION = 'SET_DURATION',
}

export interface HomeFormAction {
  type: HomeActionTypes;
  payload: string | number;
}

export function homeFormReducer(state: HomeFormState, action: HomeFormAction) {
  switch (action.type) {
    case HomeActionTypes.SET_TEXT:
      return {...state, enteredText: action.payload as string};
    case HomeActionTypes.SET_DURATION:
      return {...state, duration: action.payload as number};
    default:
      return state;
  }
}
