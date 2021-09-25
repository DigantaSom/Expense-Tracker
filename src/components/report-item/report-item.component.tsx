import { FC, useState, useEffect, ChangeEvent } from 'react';
import dayjs from 'dayjs';

import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectReportActionLoading } from '../../redux/report/report.selectors';
import {
  editReportItem,
  editReportItemDate,
  deleteReportItem,
} from '../../redux/report/report.actions';

import { EditFormType, ItemFieldType, ConfirmType } from '../../types';
import { IReportItem } from '../../redux/report/report.types';

import getNumberWithCommas from '../../utils/getNumberWithCommas';

import Spinner from '../spinner/spinner.component';
import FormInput from '../form-input/form-input.component';
import TextAreaInput from '../text-area-input/text-area-input.component';
import EditConfirmButtons from '../edit-confirm-buttons/edit-confirm-buttons.component';

import {
  ReportItemContainer,
  Column1,
  Column2,
  Column3,
  ItemRootHeader,
  ItemHeading,
  ItemSubheading,
  ItemInfo,
  EditDeleteCell,
  EditCellContent,
  DeleteCellContent,
} from './report-item.styles';

interface ReportItemProps {
  index: number;
  reportItem: IReportItem;
}

const ReportItem: FC<ReportItemProps> = ({ index, reportItem }) => {
  const { id: reportItemId, item, cost, recipient, medium, date } = reportItem;

  const initialFormData: EditFormType = {
    editedItem: item,
    editedDescription: reportItem.description ? reportItem.description : '',
    // typecasted 'editedCost' to float while dispatching, since html input always gives string
    editedCost: cost.toString(),
    editedRecipient: recipient,
    editedMedium: medium,
    editedDate: dayjs(date).format('YYYY-MM-DD'),
  };

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const reportActionLoading = useSelector(selectReportActionLoading);

  const [editField, setEditField] = useState<ItemFieldType>('');
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [editedFormData, setEditedFormData] = useState<EditFormType>(initialFormData);
  const [editedTime, setEditedTime] = useState(dayjs(date).format('hh:mm'));

  useEffect(() => {
    if (reportActionLoading.loading && reportActionLoading.id === reportItemId) {
      setIsActionLoading(true);
    } else {
      setIsActionLoading(false);
    }
  }, [reportActionLoading.loading, reportActionLoading.id, reportItemId]);

  const {
    editedItem,
    editedDescription,
    editedCost,
    editedRecipient,
    editedMedium,
    editedDate,
  } = editedFormData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedFormData({
      ...editedFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmEdit = (confirmType: ConfirmType) => {
    if (confirmType === 'Cancelled') {
      setEditedFormData({
        ...editedFormData,
        ...initialFormData,
      });
      setEditField('');
      return;
    }

    const reportItemToDispatch: IReportItem = {
      id: reportItemId,
      item: editedItem,
      description: editedDescription,
      cost: parseFloat(editedCost),
      recipient: editedRecipient,
      medium: editedMedium,
      date: new Date(`${editedDate}T${editedTime}`).toISOString(),
    };

    if (confirmType === 'Confirmed' && currentUser) {
      if (editField === 'Date') {
        dispatch(editReportItemDate(reportItemToDispatch, date, currentUser));
      } else {
        dispatch(editReportItem(reportItemToDispatch, editField, currentUser));
      }
    }

    setEditField('');
  };

  const handleDeleteItem = () => {
    if (currentUser) {
      dispatch(deleteReportItem(reportItemId as string, date, currentUser));
    }
  };

  return (
    <ReportItemContainer data-aos='zoom-in-up' data-aos-duration='600'>
      <colgroup>
        <Column1 span={1} />
        <Column2 span={1} />
        <Column3 span={1} />
      </colgroup>

      <thead>
        <tr>
          <ItemRootHeader colSpan={4}>Item {index}</ItemRootHeader>
        </tr>
        <tr>
          <ItemHeading>Item</ItemHeading>
          <ItemHeading>Information</ItemHeading>
          <ItemHeading colSpan={2}>Actions</ItemHeading>
        </tr>
      </thead>

      <tbody>
        <tr>
          <ItemSubheading>Name</ItemSubheading>
          <td>
            {editField === 'Name' ? (
              <TextAreaInput name='editedItem' handleChange={handleChange} required>
                {editedItem}
              </TextAreaInput>
            ) : (
              <ItemInfo>{item}</ItemInfo>
            )}
          </td>
          <EditDeleteCell>
            {editField === 'Name' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Name')}
                isClickDisabled={reportActionLoading.loading}>
                {isActionLoading && reportActionLoading.field === 'Name' ? (
                  <Spinner size='small' />
                ) : (
                  <AiOutlineEdit />
                )}
              </EditCellContent>
            )}
          </EditDeleteCell>
          <EditDeleteCell rowSpan={6}>
            <DeleteCellContent
              onClick={handleDeleteItem}
              isClickDisabled={reportActionLoading.loading}>
              {isActionLoading && editField !== '' ? (
                <Spinner size='small' />
              ) : (
                <FiTrash2 />
              )}
            </DeleteCellContent>
          </EditDeleteCell>
        </tr>

        {reportItem.description ? (
          <tr>
            <ItemSubheading>Description</ItemSubheading>
            <td>
              {editField === 'Description' ? (
                <TextAreaInput
                  name='editedDescription'
                  handleChange={handleChange}
                  required>
                  {editedDescription}
                </TextAreaInput>
              ) : (
                <ItemInfo>{reportItem.description}</ItemInfo>
              )}
            </td>
            <EditDeleteCell>
              {editField === 'Description' ? (
                <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
              ) : (
                <EditCellContent
                  onClick={() => setEditField('Description')}
                  isClickDisabled={reportActionLoading.loading}>
                  {isActionLoading && reportActionLoading.field === 'Description' ? (
                    <Spinner size='small' />
                  ) : (
                    <AiOutlineEdit />
                  )}
                </EditCellContent>
              )}
            </EditDeleteCell>
          </tr>
        ) : null}

        <tr>
          <ItemSubheading>Cost</ItemSubheading>
          <td>
            {editField === 'Cost' ? (
              <FormInput
                type='number'
                min='0'
                name='editedCost'
                value={editedCost}
                handleChange={handleChange}
                required
              />
            ) : (
              <ItemInfo>Rs. {getNumberWithCommas(cost)}</ItemInfo>
            )}
          </td>
          <EditDeleteCell>
            {editField === 'Cost' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Cost')}
                isClickDisabled={reportActionLoading.loading}>
                {isActionLoading && reportActionLoading.field === 'Cost' ? (
                  <Spinner size='small' />
                ) : (
                  <AiOutlineEdit />
                )}
              </EditCellContent>
            )}
          </EditDeleteCell>
        </tr>

        <tr>
          <ItemSubheading>Recipient</ItemSubheading>
          <td>
            {editField === 'Recipient' ? (
              <TextAreaInput name='editedRecipient' handleChange={handleChange} required>
                {editedRecipient}
              </TextAreaInput>
            ) : (
              <ItemInfo>{recipient}</ItemInfo>
            )}
          </td>
          <EditDeleteCell>
            {editField === 'Recipient' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Recipient')}
                isClickDisabled={reportActionLoading.loading}>
                {isActionLoading && reportActionLoading.field === 'Recipient' ? (
                  <Spinner size='small' />
                ) : (
                  <AiOutlineEdit />
                )}
              </EditCellContent>
            )}
          </EditDeleteCell>
        </tr>

        <tr>
          <ItemSubheading>Medium</ItemSubheading>
          <td>
            {editField === 'Medium' ? (
              <TextAreaInput name='editedMedium' handleChange={handleChange} required>
                {editedMedium}
              </TextAreaInput>
            ) : (
              <ItemInfo>{medium}</ItemInfo>
            )}
          </td>
          <EditDeleteCell>
            {editField === 'Medium' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Medium')}
                isClickDisabled={reportActionLoading.loading}>
                {isActionLoading && reportActionLoading.field === 'Medium' ? (
                  <Spinner size='small' />
                ) : (
                  <AiOutlineEdit />
                )}
              </EditCellContent>
            )}
          </EditDeleteCell>
        </tr>

        <tr>
          <ItemSubheading>Date</ItemSubheading>
          <td>
            {editField === 'Date' ? (
              <>
                <FormInput
                  type='date'
                  name='editedDate'
                  value={dayjs(editedDate).format('YYYY-MM-DD')}
                  handleChange={handleChange}
                  required
                />
                <FormInput
                  type='time'
                  name='editedTime'
                  value={editedTime}
                  handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditedTime(e.target.value)
                  }
                  required
                />
              </>
            ) : (
              <ItemInfo>
                {dayjs(date).format(
                  `${editedTime === '12:00' ? '' : 'hh:mm A [-]'} DD MMMM[, ]YYYY`,
                )}
              </ItemInfo>
            )}
          </td>
          <EditDeleteCell>
            {editField === 'Date' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Date')}
                isClickDisabled={reportActionLoading.loading}>
                {isActionLoading && reportActionLoading.field === 'Date' ? (
                  <Spinner size='small' />
                ) : (
                  <AiOutlineEdit />
                )}
              </EditCellContent>
            )}
          </EditDeleteCell>
        </tr>
      </tbody>
    </ReportItemContainer>
  );
};

export default ReportItem;
