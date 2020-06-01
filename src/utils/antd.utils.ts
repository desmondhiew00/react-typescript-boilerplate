import _ from 'lodash';

export const columnSorter = {
  dateTime: (field: string) => (a: any, b: any) => {
    let aa: number = 0;
    let bb: number = 0;
    if (a[field]) aa = new Date(_.get(a, field, '')).getTime();
    if (b[field]) bb = new Date(_.get(b, field, '')).getTime();
    return bb > aa ? 1 : -1;
  },
  string: (field: string) => (a: any, b: any) => _.get(a, field, '').localeCompare(_.get(b, field, '')),
  number: (field: string) => (a: any, b: any) => _.get(a, field, 0) - _.get(b, field, 0)
};
