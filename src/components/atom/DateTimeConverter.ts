/* eslint-disable @typescript-eslint/explicit-function-return-type */
import moment from 'moment';

export const DateTimeConverter = (date: number, format: string) => {
  return moment.unix(date).format(format);
};
