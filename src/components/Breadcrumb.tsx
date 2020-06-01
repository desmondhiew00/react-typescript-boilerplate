import React from 'react';
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import _ from 'lodash';

const BreadcrumbComponent: React.FC<Props> = props => {
  const { excludes, children } = props;
  const { title, subTitle, tags, extra, avatar, backIcon, footer, onBack } = props; // Antd PageHeader Props
  // eslint-disable-next-line react/destructuring-assignment
  const parts = props.location.pathname.split('/');
  const slicedParts = parts.slice(1, parts.length);
  const validParts = filterValidPaths(slicedParts);
  _.remove(validParts, (v: string) => _.includes(excludes, v));
  const home = { path: '/dashboard', breadcrumbName: 'Home' };

  const breadcrumb = _.map(validParts, (val: string, index: number) => {
    let p = '';
    if (index > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = index - 1; i >= 0; i--) {
        p += `/${validParts[i]}`;
      }
    }
    return { path: `${p}/${val}`, breadcrumbName: _.startCase(val) };
  });
  breadcrumb.unshift(home);

  return (
    <PageHeader
      breadcrumb={{
        routes: breadcrumb,
        itemRender: ({ path, breadcrumbName }) => {
          if (path === _.get(breadcrumb, `[${breadcrumb.length - 1}].path`)) return <span>{breadcrumbName}</span>;
          return <NavLink to={path}>{breadcrumbName}</NavLink>;
        }
      }}
      ghost={false}
      title={title}
      subTitle={subTitle}
      tags={tags}
      extra={extra}
      avatar={avatar}
      backIcon={backIcon}
      footer={footer}
      onBack={onBack}
    >
      {children}
    </PageHeader>
  );
};

const filterValidPaths = (parts: string[]): string[] => {
  const routes = Array.from(parts);
  return _.remove(routes, (part: string) => !checkValidId(part));
};
const checkValidId = (str: string): boolean => {
  const number = !_.isNaN(_.toNumber(str)) ? _.toNumber(str) : null;
  return _.isNumber(number);
};

BreadcrumbComponent.defaultProps = {
  excludes: ['dashboard', '404']
};
const Breadcrumb = withRouter(BreadcrumbComponent);
export { Breadcrumb };
export default Breadcrumb;

interface Props extends RouteComponentProps, Partial<PageHeaderProps> {
  excludes?: string[];
}
