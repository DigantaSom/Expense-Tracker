import { FC, useState, ChangeEvent, useEffect } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  editReportItem,
  editReportItemDate,
  deleteReportItem,
} from '../../redux/report/report.actions';

import { ItemFieldType, ConfirmType } from '../../types';
import { IReportItem } from '../../redux/report/report.types';

import Spinner from '../spinner/spinner.component';
import FormInput from '../form-input/form-input.component';
import EditConfirmButtons from '../edit-confirm-buttons/edit-confirm-buttons.component';

import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

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

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { actionLoading } = useSelector((state: RootState) => state.report);

  const [editField, setEditField] = useState<ItemFieldType>('');
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [editedFormData, setEditedFormData] = useState({
    editedItem: item,
    editedDescription: reportItem.description ? reportItem.description : '',
    editedCost: cost,
    editedRecipient: recipient,
    editedMedium: medium,
    editedDate: dayjs(date).format('YYYY-MM-DD'),
  });
  const [editedTime, setEditedTime] = useState(dayjs(date).format('hh:mm'));

  useEffect(() => {
    if (actionLoading.loading && actionLoading.id === reportItemId) {
      setIsActionLoading(true);
    } else {
      setIsActionLoading(false);
    }
  }, [actionLoading.loading, actionLoading.id, reportItemId]);

  const {
    editedItem,
    editedDescription,
    editedCost,
    editedRecipient,
    editedMedium,
    editedDate,
  } = editedFormData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedFormData({
      ...editedFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmEdit = (confirmType: ConfirmType) => {
    const reportItemToDispatch: IReportItem = {
      id: reportItemId,
      item: editedItem,
      description: editedDescription,
      cost: editedCost,
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
    if (!window.confirm('Are you sure you want to delete this Report Item?')) {
      return;
    }
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
              <FormInput
                type='text'
                name='editedItem'
                value={editedItem}
                handleChange={handleChange}
                required
              />
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
                isClickDisabled={actionLoading.loading}>
                {isActionLoading && actionLoading.field === 'Name' ? (
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
              isClickDisabled={actionLoading.loading}>
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
                <FormInput
                  type='text'
                  name='editedDescription'
                  value={editedDescription}
                  handleChange={handleChange}
                  required // since, should not edit it empty
                />
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
                  isClickDisabled={actionLoading.loading}>
                  {isActionLoading && actionLoading.field === 'Description' ? (
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
              <ItemInfo>Rs. {cost}</ItemInfo>
            )}
          </td>
          <EditDeleteCell>
            {editField === 'Cost' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Cost')}
                isClickDisabled={actionLoading.loading}>
                {isActionLoading && actionLoading.field === 'Cost' ? (
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
              <FormInput
                type='text'
                name='editedRecipient'
                value={editedRecipient}
                handleChange={handleChange}
                required
              />
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
                isClickDisabled={actionLoading.loading}>
                {isActionLoading && actionLoading.field === 'Recipient' ? (
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
              <FormInput
                type='text'
                name='editedMedium'
                value={editedMedium}
                handleChange={handleChange}
                required
              />
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
                isClickDisabled={actionLoading.loading}>
                {isActionLoading && actionLoading.field === 'Medium' ? (
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
                isClickDisabled={actionLoading.loading}>
                {isActionLoading && actionLoading.field === 'Date' ? (
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
