/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Layout, Menu, Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Scrollbar from 'react-custom-scrollbars';
import _ from 'lodash';
import { splitStringToArray } from '@utils';
import * as Icons from '@ant-design/icons';
import { APP_NAME, SIDEBAR_MENU } from '@constants';
import { RootState } from 'store/types';
import { setSidebarCollapsed } from '@actions/app.actions';

import './style/index.scss';

const THEME = { theme: 'dark', width: 256, collapsedWidth: 80 };

const { Sider } = Layout;
const { SubMenu } = Menu;

const parseSelectedKeys = (selectedKeys: string, menuItems: SIDEBAR_MENU[]): string[] => {
  if (_.isEmpty(selectedKeys)) return [];
  const splitted: string[] = splitStringToArray(selectedKeys, '/');
  splitted.shift();
  let selected = '';
  let findMenus = menuItems;
  _.map(splitted, (value: string) => {
    const find = _.find(findMenus, (menu: SIDEBAR_MENU) => menu.to === `/${value}`);
    if (find) {
      selected += find.to;
      findMenus = _.get(find, 'subMenu', []);
    }
  });
  // eslint-disable-next-line consistent-return
  return [selected];
};

const SidebarComponent = (props: Props) => {
  const { location } = props;
  const { pathname } = location;
  const isTablet = useMediaQuery({ maxWidth: 1224 });

  const [mobileView, setMobileView] = useState(false);

  const [collapsed, setCollapsed] = useState(props.collapsed);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setCollapsed(props.collapsed);
  }, [props.collapsed]);

  useEffect(() => {
    if (isTablet) setSidebarCollapsed(true);
  }, [isTablet, mobileView]);

  useEffect(() => {
    const urlPath = props.location.pathname;
    if (urlPath === '/404') return;
    setSelectedKeys(parseSelectedKeys(urlPath, SIDEBAR_MENU));
    const splitted = urlPath.split('/').splice(1);
    const keys: string[] = [];
    let current = '';
    _.map(splitted, (s: string) => {
      current += `/${s}`;
      keys.push(current);
    });
    keys.splice(-1, 1);
    if (!collapsed) setOpenKeys(keys);
    // setLastOpenKeys(keys);
  }, [pathname]);

  const handleClick = (e: { key: string }) => {
    props.history.push(e.key);
    setSelectedKeys(parseSelectedKeys(e.key, SIDEBAR_MENU));
  };

  const onBreakpoint = (broken: boolean) => {
    setMobileView(broken);
    if (broken) setSidebarCollapsed(true)();
  };

  const SidebarMenu = (
    <Menu
      theme="dark"
      className="menu"
      mode="inline"
      onClick={handleClick}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      forceSubMenuRender
    >
      {_.map(SIDEBAR_MENU, (menu: SIDEBAR_MENU) => renderMenuItem(menu))}
    </Menu>
  );

  const SidebarTitle = (
    <div className="sidebar_app-title text-center">
      <Link to="/">
        <img src={require('@assets/logo.png')} alt="logo" />
        {mobileView || !collapsed ? (
          <h1 className="fade-in" style={{ animationDuration: '.8s' }}>
            {APP_NAME}
          </h1>
        ) : null}
      </Link>
    </div>
  );

  return (
    <div className="sidebar">
      {mobileView && (
        <Drawer
          placement="left"
          visible={mobileView ? !collapsed : false}
          bodyStyle={{ padding: 0, background: THEME.theme === 'dark' ? '#001529' : undefined }}
          closable={false}
          className="drawer"
          onClose={() => setSidebarCollapsed(true)()}
        >
          {SidebarTitle}
          {SidebarMenu}
        </Drawer>
      )}

      <Sider
        className="sider"
        theme="dark"
        width={THEME.width}
        trigger={null}
        collapsible
        collapsed={mobileView ? true : collapsed}
        breakpoint="md"
        onBreakpoint={onBreakpoint}
        collapsedWidth={mobileView ? 0 : THEME.collapsedWidth}
      >
        {SidebarTitle}
        <div className="menu-container">
          <Scrollbar autoHide renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
            {SidebarMenu}
          </Scrollbar>
        </div>
      </Sider>
    </div>
  );
};

const renderThumb = ({ style, ...p }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div style={{ ...style, borderRadius: 5, backgroundColor: '#FFF', opacity: 0.7 }} {...p} />
);

const renderMenuItem = (menu: SIDEBAR_MENU, { toPrefix = '' }: { toPrefix?: string } = {}) => {
  const { icon = null, name } = menu;
  if (menu.permissionAuth && !menu.permissionAuth()) return null;

  const subMenu = _.get(menu, 'subMenu', []);
  const grouped = _.groupBy(subMenu, 'group');

  const to = `${toPrefix || ''}${menu.to}`;
  const ItemIcon = icon ? Icons[icon] : null;

  const title = (
    <span className="flex content-center items-center">
      {ItemIcon && <ItemIcon />}
      <span>{name}</span>
    </span>
  );

  if (_.isEmpty(subMenu)) {
    return <Menu.Item key={to}>{title}</Menu.Item>;
  }

  interface SubMenu {
    name: string;
    items: SIDEBAR_MENU[];
  }
  const subMenuItems: SubMenu[] = [];
  _.mapKeys(grouped, (val: SIDEBAR_MENU[], key: string) => {
    subMenuItems.push({ name: key, items: val });
  });

  return (
    <SubMenu key={to} title={title}>
      {_.map(subMenuItems, (group: SubMenu) => {
        if (group.name === 'undefined') {
          return _.map(group.items, (item: SIDEBAR_MENU) => renderMenuItem(item, { toPrefix: to }));
        }
        return (
          <Menu.ItemGroup key={group.name} title={group.name}>
            {_.map(group.items, (item: SIDEBAR_MENU) => renderMenuItem(item, { toPrefix: to }))}
          </Menu.ItemGroup>
        );
      })}
    </SubMenu>
  );
};

const mapStateToProps = (state: RootState) => ({
  collapsed: state.app.sidebar.collapsed
});
const connector = connect(mapStateToProps, {});
export const Sidebar = withRouter(connector(SidebarComponent));
export default Sidebar;

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = RouteComponentProps & PropsFromRedux;
