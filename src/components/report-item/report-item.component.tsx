import { FC, useState, ChangeEvent, useEffect } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { editReportItem, editReportItemDate } from '../../redux/report/report.actions';

import { ItemFieldType, ConfirmType } from '../../types';
import { IReportItem } from '../../redux/report/report.types';

import FormInput from '../form-input/form-input.component';
import EditConfirmButtons from '../edit-confirm-buttons/edit-confirm-buttons.component';

import {
  ReportItemContainer,
  ItemRootHeader,
  ItemHeading,
  ItemSubheading,
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
  const [editedFormData, setEditedFormData] = useState({
    editedItem: item,
    editedDescription: reportItem.description ? reportItem.description : '',
    editedCost: cost,
    editedRecipient: recipient,
    editedMedium: medium,
    editedDate: date,
  });
  const [isActionLoading, setIsActionLoading] = useState(false);

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
      date: editedDate,
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

  return (
    <ReportItemContainer>
      <colgroup>
        <col span={1} style={{ width: '20%' }} />
        <col span={1} style={{ width: '60%' }} />
        <col span={1} style={{ width: '20%' }} />
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
              item
            )}
          </td>
          <EditDeleteCell>
            {isActionLoading && actionLoading.field === 'Name' ? (
              <div>Loading...</div>
            ) : editField === 'Name' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Name')}
                isClickDisabled={actionLoading.loading}>
                Edit
              </EditCellContent>
            )}
          </EditDeleteCell>
          <EditDeleteCell rowSpan={6}>
            <DeleteCellContent isClickDisabled={actionLoading.loading}>
              Delete Item
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
                reportItem.description
              )}
            </td>
            <EditDeleteCell>
              {isActionLoading && actionLoading.field === 'Description' ? (
                <div>Loading...</div>
              ) : editField === 'Description' ? (
                <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
              ) : (
                <EditCellContent
                  onClick={() => setEditField('Description')}
                  isClickDisabled={actionLoading.loading}>
                  Edit
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
              <>Rs. {cost}</>
            )}
          </td>
          <EditDeleteCell>
            {isActionLoading && actionLoading.field === 'Cost' ? (
              <div>Loading...</div>
            ) : editField === 'Cost' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Cost')}
                isClickDisabled={actionLoading.loading}>
                Edit
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
              recipient
            )}
          </td>
          <EditDeleteCell>
            {isActionLoading && actionLoading.field === 'Recipient' ? (
              <div>Loading...</div>
            ) : editField === 'Recipient' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Recipient')}
                isClickDisabled={actionLoading.loading}>
                Edit
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
              medium
            )}
          </td>
          <EditDeleteCell>
            {isActionLoading && actionLoading.field === 'Medium' ? (
              <div>Loading...</div>
            ) : editField === 'Medium' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Medium')}
                isClickDisabled={actionLoading.loading}>
                Edit
              </EditCellContent>
            )}
          </EditDeleteCell>
        </tr>

        <tr>
          <ItemSubheading>Date</ItemSubheading>
          <td>
            {editField === 'Date' ? (
              <FormInput
                type='date'
                name='editedDate'
                value={dayjs(editedDate).format('YYYY-MM-DD')}
                handleChange={handleChange}
                required
              />
            ) : (
              dayjs(date).format('DD MMMM[, ]YYYY')
            )}
          </td>
          <EditDeleteCell>
            {isActionLoading && actionLoading.field === 'Date' ? (
              <div>Loading...</div>
            ) : editField === 'Date' ? (
              <EditConfirmButtons handleConfirmEdit={handleConfirmEdit} />
            ) : (
              <EditCellContent
                onClick={() => setEditField('Date')}
                isClickDisabled={actionLoading.loading}>
                Edit
              </EditCellContent>
            )}
          </EditDeleteCell>
        </tr>
      </tbody>
    </ReportItemContainer>
  );
};

export default ReportItem;
