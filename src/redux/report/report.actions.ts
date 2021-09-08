import { Dispatch } from 'redux';
import { History } from 'history';
import dayjs from 'dayjs';

import { writeBatch, increment, doc, collection, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.utils';

import {
  IReportItem,
  AddReportItemDispatchType,
  ADD_REPORT_ITEM_START,
  ADD_REPORT_ITEM_SUCCESS,
  ADD_REPORT_ITEM_FAILURE,
} from './report.types';
import { IUser } from '../user/user.types';
import { RedirectToType } from '../../types';

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

      const monthReportCountPropertyName = `${month.toLowerCase()}${year}ReportItemCount`;

      const reportYearDocSnapshot = await getDoc(reportsYearDocRef);

      if (!reportYearDocSnapshot.exists()) {
        batch.set(reportsYearDocRef, {
          [monthReportCountPropertyName]: increment(1),
        });
      } else {
        batch.update(reportsYearDocRef, {
          [monthReportCountPropertyName]: increment(1),
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
