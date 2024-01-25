import moment from 'moment';

export const isDate = (value, rest) => {
  // const { req, location, path } = rest;
  // console.log({ value, req, location, path });

  if (!value) {
    return false;
  }

  const date = moment(value);

  if (date.isValid()) {
    return true;
  }
  return false;
};
