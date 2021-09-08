import {
  IReport,
  ReportActionType,
  ADD_REPORT_ITEM_START,
  ADD_REPORT_ITEM_SUCCESS,
  ADD_REPORT_ITEM_FAILURE,
} from './report.types';

interface IDefaultState {
  report: IReport | null;
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  report: null,
  loading: false,
  error: '',
};

const reportReducer = (
  state: IDefaultState = defaultState,
  action: ReportActionType,
): IDefaultState => {
  switch (action.type) {
    case ADD_REPORT_ITEM_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_REPORT_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case ADD_REPORT_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reportReducer;
