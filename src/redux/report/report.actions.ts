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
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.utils';

import { ItemFieldType, RedirectToType } from '../../types';
import {
  IReportItem,
  FetchExpenseReportDispatchType,
  FETCH_EXPENSE_REPORT_START,
  FETCH_EXPENSE_REPORT_SUCCESS,
  FETCH_EXPENSE_REPORT_FAILURE,
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

// Fetch all items of an Expense Report by year and month together
export const fetchExpenseReport =
  (year: string, month: string, currentUser: IUser) =>
  async (dispatch: Dispatch<FetchExpenseReportDispatchType>) => {
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

    try {
      const reportSnapshot = await getDocs(reportCollectionRef);

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

      const monthReportItemCountPropertyName = `${month.toLowerCase()}${year}ReportItemCount`;

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
    const prevMonthReportItemCountPropertyName = `${prevMonth.toLowerCase()}${prevYear}ReportItemCount`;
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
    const newMonthReportItemCountPropertyName = `${newMonth.toLowerCase()}${newYear}ReportItemCount`;
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

      const monthReportItemCountPropertyName = `${month.toLowerCase()}${year}ReportItemCount`;
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
