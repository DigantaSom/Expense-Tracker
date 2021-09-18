import { Dispatch } from 'redux';
import { History } from 'history';
import dayjs from 'dayjs';

import {
  writeBatch,
  increment,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.utils';

import { ItemFieldType, MonthType, RedirectToType } from '../../types';
import {
  IReportItem,
  FetchExpenseReportDispatchType,
  FETCH_EXPENSE_REPORT_START,
  FETCH_EXPENSE_REPORT_SUCCESS,
  FETCH_EXPENSE_REPORT_FAILURE,
  FetchReportRefsByYearDispatchType,
  FETCH_REPORT_REFS_BY_YEAR_START,
  FETCH_REPORT_REFS_BY_YEAR_SUCCESS,
  FETCH_REPORT_REFS_BY_YEAR_FAILURE,
  ISetSelectedMonth,
  SET_SELECTED_MONTH,
  AddReportItemDispatchType,
  ADD_REPORT_ITEM_START,
  ADD_REPORT_ITEM_SUCCESS,
  ADD_REPORT_ITEM_FAILURE,
  EditReportItemDispatchType,
  EDIT_REPORT_ITEM_START,
  EDIT_REPORT_ITEM_SUCCESS,
  EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR,
  EDIT_REPORT_ITEM_FAILURE,
  DeleteReportItemDispatchType,
  DELETE_REPORT_ITEM_START,
  DELETE_REPORT_ITEM_SUCCESS,
  DELETE_REPORT_ITEM_FAILURE,
  IClearReport,
  CLEAR_REPORT,
} from './report.types';
import { IUser } from '../user/user.types';

import getMonthNumber from '../../utils/getMonthNumber';

// Fetch all items of an Expense Report by year and month together
export const fetchExpenseReport =
  (year: string, month: string, currentUser: IUser) =>
  async (dispatch: Dispatch<FetchExpenseReportDispatchType>) => {
    if (!year || !month) {
      return;
    }

    dispatch({
      type: FETCH_EXPENSE_REPORT_START,
    });

    const expenseReportToDispatch: IReportItem[] = [];

    const reportCollectionRef = collection(
      firestore,
      'reports',
      currentUser.id,
      year,
      currentUser.id,
      month,
    );
    const q = query(reportCollectionRef, orderBy('date'));

    try {
      const reportSnapshot = await getDocs(q);

      if (reportSnapshot.empty) {
        dispatch({
          type: FETCH_EXPENSE_REPORT_FAILURE,
          payload: 'No report found.',
        });
        alert('No report found.');
        return;
      }

      reportSnapshot.forEach(doc => {
        expenseReportToDispatch.push({
          id: doc.id,
          ...doc.data(),
        } as IReportItem);
      });

      dispatch({
        type: FETCH_EXPENSE_REPORT_SUCCESS,
        payload: expenseReportToDispatch,
      });
    } catch (err: any) {
      dispatch({
        type: FETCH_EXPENSE_REPORT_FAILURE,
        payload: err.message,
      });
      alert('Failed to load the Expense Report.');
    }
  };

// Fetch expense report refs by their Year
export const fetchReportRefs =
  (year: string, currentUser: IUser) =>
  async (dispatch: Dispatch<FetchReportRefsByYearDispatchType>) => {
    if (!year) {
      return;
    }

    dispatch({
      type: FETCH_REPORT_REFS_BY_YEAR_START,
    });

    const reportsYearCollectionRef = collection(
      firestore,
      'reports',
      currentUser.id,
      year,
    );

    let monthReportCountObj: Record<string, number> = {};
    const months: string[] = [];
    const monthsToDispatch: MonthType[] = [];

    try {
      const snap = await getDocs(reportsYearCollectionRef);
      snap.forEach(doc => {
        monthReportCountObj = { ...doc.data() };
      });

      // console.log(monthReportCountObj);
      const monthReportCountObjProperties = Object.keys(monthReportCountObj);

      if (Object.keys(monthReportCountObj).length === 0) {
        dispatch({
          type: FETCH_REPORT_REFS_BY_YEAR_FAILURE,
          payload: `No report found for the year ${year}`,
        });
        // alert('No report found for this year.');
        return;
      }

      for (let i = 0; i < monthReportCountObjProperties.length; i++) {
        if (monthReportCountObj[monthReportCountObjProperties[i]] > 0) {
          months.push(
            monthReportCountObjProperties[i].split('-')[0] +
              monthReportCountObjProperties[i].split('-')[1],
          );
        }
      }
      // Sort the months by their number
      months.sort((a: any, b: any) => a.slice(0, 2) - b.slice(0, 2));

      // To show just the month name, not its number
      months.forEach(month => {
        monthsToDispatch.push(month.slice(5) as MonthType);
      });

      dispatch({
        type: FETCH_REPORT_REFS_BY_YEAR_SUCCESS,
        payload: {
          year,
          months: monthsToDispatch as MonthType[],
        },
      });
    } catch (err: any) {
      dispatch({
        type: FETCH_REPORT_REFS_BY_YEAR_FAILURE,
        payload: err.message,
      });
    }
  };

// Set selected month in redux
export const setSelectedMonth =
  (month: MonthType) => async (dispatch: Dispatch<ISetSelectedMonth>) => {
    dispatch({
      type: SET_SELECTED_MONTH,
      payload: month,
    });
  };

export const addReportItem =
  (
    newReportItem: IReportItem,
    currentUser: IUser,
    redirectTo: RedirectToType,
    history: History<unknown>,
  ) =>
  async (dispatch: Dispatch<AddReportItemDispatchType>) => {
    dispatch({
      type: ADD_REPORT_ITEM_START,
    });

    const year = dayjs(newReportItem.date).format('YYYY');
    const month = dayjs(newReportItem.date).format('MMMM');

    const reportsYearDocRef = doc(
      firestore,
      'reports',
      currentUser.id,
      year,
      currentUser.id,
    );
    const reportsMonthCollectionRef = collection(
      firestore,
      'reports',
      currentUser.id,
      year,
      currentUser.id,
      month,
    );
    const reportsMonthDocRef = doc(reportsMonthCollectionRef);

    try {
      const batch = writeBatch(firestore);

      // await addDoc(reportsMonthCollectionRef, newReportItem);
      batch.set(reportsMonthDocRef, newReportItem);

      const monthReportItemCountPropertyName = `${getMonthNumber(
        month as MonthType,
      )}num-${month}-${year}-ReportItemCount`;

      const reportYearDocSnapshot = await getDoc(reportsYearDocRef);

      if (!reportYearDocSnapshot.exists()) {
        batch.set(reportsYearDocRef, {
          [monthReportItemCountPropertyName]: increment(1),
        });
      } else {
        batch.update(reportsYearDocRef, {
          [monthReportItemCountPropertyName]: increment(1),
        });
      }

      await batch.commit();

      dispatch({
        type: ADD_REPORT_ITEM_SUCCESS,
      });
      alert('Added new Expense Report Item!');

      if (redirectTo === 'Home') {
        history.push('/');
      }
    } catch (err: any) {
      dispatch({
        type: ADD_REPORT_ITEM_FAILURE,
        payload: err.message,
      });
      alert('Failed to add a new expense report item.');
    }
  };

// Edit a report item (not its date field)
export const editReportItem =
  (reportItem: IReportItem, editedField: ItemFieldType, currentUser: IUser) =>
  async (dispatch: Dispatch<EditReportItemDispatchType>) => {
    if (editedField === 'Date') {
      return;
    }

    dispatch({
      type: EDIT_REPORT_ITEM_START,
      payload: {
        id: reportItem.id as string,
        field: editedField,
      },
    });

    const year = dayjs(reportItem.date).format('YYYY');
    const month = dayjs(reportItem.date).format('MMMM');

    const reportRef = doc(
      firestore,
      'reports',
      currentUser.id,
      year,
      currentUser.id,
      month,
      reportItem.id as string,
    );

    // since we do not want 'id' field in an individual report item inside firestore
    const { id, ...reportItemInFirestore } = reportItem;

    try {
      await updateDoc(reportRef, { ...reportItemInFirestore });

      dispatch({
        type: EDIT_REPORT_ITEM_SUCCESS,
        payload: reportItem,
      });
      alert('Item edited successfully.');
    } catch (err: any) {
      dispatch({
        type: EDIT_REPORT_ITEM_FAILURE,
        payload: err.message,
      });
      alert('Failed to edit expense report item.');
    }
  };

// Edit report item's date field
export const editReportItemDate =
  (reportItem: IReportItem, prevDate: string, currentUser: IUser) =>
  async (dispatch: Dispatch<EditReportItemDispatchType>) => {
    dispatch({
      type: EDIT_REPORT_ITEM_START,
      payload: {
        id: reportItem.id as string,
        field: 'Date',
      },
    });

    const prevYear = dayjs(prevDate).format('YYYY');
    const prevMonth = dayjs(prevDate).format('MMMM');
    const prevMonthReportItemCountPropertyName = `${getMonthNumber(
      prevMonth as MonthType,
    )}num-${prevMonth}-${prevYear}-ReportItemCount`;
    const prevReportsYearDocRef = doc(
      firestore,
      'reports',
      currentUser.id,
      prevYear,
      currentUser.id,
    );
    const prevReportRef = doc(prevReportsYearDocRef, prevMonth, reportItem.id as string);

    const newYear = dayjs(reportItem.date).format('YYYY');
    const newMonth = dayjs(reportItem.date).format('MMMM');
    const newMonthReportItemCountPropertyName = `${getMonthNumber(
      newMonth as MonthType,
    )}num-${newMonth}-${newYear}-ReportItemCount`;
    const newReportsYearDocRef = doc(
      firestore,
      'reports',
      currentUser.id,
      newYear,
      currentUser.id,
    );
    const newReportRef = doc(newReportsYearDocRef, newMonth, reportItem.id as string);

    const batch = writeBatch(firestore);

    try {
      // -- Remove doc from previous path in firestore --

      batch.delete(prevReportRef);
      batch.update(prevReportsYearDocRef, {
        [prevMonthReportItemCountPropertyName]: increment(-1),
      });

      // -- Add doc to new path in firestore --

      // since we do not want 'id' field in an individual report-item inside firestore
      const { id, ...reportItemInFirestore } = reportItem;

      batch.set(newReportRef, { ...reportItemInFirestore });

      // -- Modify the respective report-item-count fields --

      const newReportYearDocSnapshot = await getDoc(newReportsYearDocRef);
      if (!newReportYearDocSnapshot.exists()) {
        batch.set(newReportsYearDocRef, {
          [newMonthReportItemCountPropertyName]: increment(1),
        });
      } else {
        batch.update(newReportsYearDocRef, {
          [newMonthReportItemCountPropertyName]: increment(1),
        });
      }

      // -- Commit changes to firestore, then dispatch to reducer accordingly --

      await batch.commit();

      if (prevYear !== newYear || prevMonth !== newMonth) {
        dispatch({
          type: EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR,
          payload: {
            reportId: reportItem.id as string,
          },
        });
      } else {
        dispatch({
          type: EDIT_REPORT_ITEM_SUCCESS,
          payload: reportItem,
        });
      }

      alert('Item edited successfully.');
    } catch (err: any) {
      dispatch({
        type: EDIT_REPORT_ITEM_FAILURE,
        payload: err.message,
      });
      alert('Failed to edit expense report item.');
    }
  };

// Delete a report item
export const deleteReportItem =
  (id: string, date: string, currentUser: IUser) =>
  async (dispatch: Dispatch<DeleteReportItemDispatchType>) => {
    dispatch({
      type: DELETE_REPORT_ITEM_START,
      payload: {
        reportId: id,
      },
    });

    if (!window.confirm('Are you sure you want to delete this Report Item?')) {
      dispatch({
        type: DELETE_REPORT_ITEM_FAILURE,
        payload: 'Deletion denied.',
      });
      return;
    }

    const year = dayjs(date).format('YYYY');
    const month = dayjs(date).format('MMMM');

    const reportsYearDocRef = doc(
      firestore,
      'reports',
      currentUser.id,
      year,
      currentUser.id,
    );
    const reportItemRef = doc(reportsYearDocRef, month, id);

    const batch = writeBatch(firestore);

    try {
      const reportItemSnapshot = await getDoc(reportItemRef);
      if (!reportItemSnapshot.exists()) {
        dispatch({
          type: DELETE_REPORT_ITEM_FAILURE,
          payload: 'Found no item to delete.',
        });
        alert('Found no item to delete.');
        return;
      }

      batch.delete(reportItemRef);

      const monthReportItemCountPropertyName = `${getMonthNumber(
        month as MonthType,
      )}num-${month}-${year}-ReportItemCount`;
      batch.update(reportsYearDocRef, {
        [monthReportItemCountPropertyName]: increment(-1),
      });

      await batch.commit();

      dispatch({
        type: DELETE_REPORT_ITEM_SUCCESS,
        payload: {
          reportId: id,
        },
      });
      alert('Item deleted successfully.');
    } catch (err: any) {
      dispatch({
        type: DELETE_REPORT_ITEM_FAILURE,
        payload: err.message,
      });
      alert('Failed to delete the report item.');
    }
  };

// Clear Report state
export const clearReport = () => async (dispatch: Dispatch<IClearReport>) => {
  dispatch({
    type: CLEAR_REPORT,
  });
};
