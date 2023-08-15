import queryString from 'query-string';
import { ToastType } from 'react-hot-toast';
export const generateToastQuery = (message: string, type: ToastType) => {
  return queryString.stringify({
    toast_message: message,
    toast_type: type,
  });
};
