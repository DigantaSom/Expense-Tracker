export type RedirectToType = 'Same' | 'Home';

export type ItemFieldType =
  | 'Name'
  | 'Description'
  | 'Cost'
  | 'Recipient'
  | 'Medium'
  | 'Date'
  | '';

export type EditFormType = {
  editedItem: string;
  editedDescription?: string;
  editedCost: string;
  editedRecipient: string;
  editedMedium: string;
  editedDate: string;
};

export type MonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
  | '';

export type ConfirmType = 'Confirmed' | 'Cancelled';

export type SizeType = 'small' | 'large';
