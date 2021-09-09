import {
  ReportActionType,
  IReportItem,
  FETCH_EXPENSE_REPORT_START,
  FETCH_EXPENSE_REPORT_SUCCESS,
  FETCH_EXPENSE_REPORT_FAILURE,
  ADD_REPORT_ITEM_START,
  ADD_REPORT_ITEM_SUCCESS,
  ADD_REPORT_ITEM_FAILURE,
} from './report.types';

interface IDefaultState {
  report: IReportItem[];
  loading: boolean;
  error: string;
}

const defaultState: IDefaultState = {
  report: [],
  loading: false,
  error: '',
};

const reportReducer = (
  state: IDefaultState = defaultState,
  action: ReportActionType,
): IDefaultState => {
  switch (action.type) {
    // Fetch all items of an Expense Report by year and month together
    case FETCH_EXPENSE_REPORT_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EXPENSE_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: false,
        error: '',
      };
    case FETCH_EXPENSE_REPORT_FAILURE:
      return {
        ...state,
        report: [],
        loading: false,
        error: action.payload,
      };

    // Add a new report item
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
