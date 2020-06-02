import { ColProps } from 'antd/lib/grid/col';

export const Layout = {
  default: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 }
    }
  },
  fit: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 21 },
      md: { span: 21 }
    }
  },
  vertical: {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  },
  horizontal: { labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  tailDefault: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 17, offset: 7 }
    }
  }
};

export const getFormLayout = (type: LayoutType): Layout => {
  if (type === undefined) return Layout.default;
  if (type === 'horizontal') return Layout.horizontal;
  if (type === 'default') return Layout.default;
  if (type === 'fit') return Layout.fit;
  if (type === 'vertical') return Layout.vertical;
  if (type instanceof Object) return Layout.default;
  return Layout.default;
};

declare const LayoutTypes: ['horizontal', 'default', 'fit', 'vertical', object];
export declare type LayoutType = typeof LayoutTypes[number];
export interface Layout {
  labelCol: ColProps;
  wrapperCol: ColProps;
}
