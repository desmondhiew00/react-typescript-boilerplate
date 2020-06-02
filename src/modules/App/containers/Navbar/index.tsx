/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { RootState } from 'store/types';
import { setSidebarCollapsed } from '@actions/app.actions';
import { requestLogout } from '@actions/auth.actions';

import './style/index.scss';

const { Header } = Layout;

const NavbarComponent = (props: Props) => {
  const { collapsed } = props;

  const triggerCollapse = () => {
    setSidebarCollapsed(!collapsed)();
  };

  return (
    <Header className="navbar">
      {collapsed ? (
        <MenuUnfoldOutlined className="icon trigger" onClick={triggerCollapse} />
      ) : (
        <MenuFoldOutlined className="icon trigger" onClick={triggerCollapse} />
      )}

      <div style={{ flex: '1 1 0%' }} />

      <SettingOutlined className="icon action" onClick={() => props.history.push(`/settings/account`)} />

      <Dropdown overlay={UserDropDownMenu}>
        <UserOutlined className="icon action mr-3" />
      </Dropdown>
    </Header>
  );
};

const UserDropDownMenu = (
  <Menu>
    <Menu.Item>
      <NavLink to="/settings/account">
        <UserOutlined className="mr-2" />
        Account Setting
      </NavLink>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a onClick={() => requestLogout()()}>
        <div>
          <LogoutOutlined className="mr-2" />
          Logout
        </div>
      </a>
    </Menu.Item>
  </Menu>
);

const mapStateToProps = (state: RootState) => ({
  collapsed: state.app.sidebar.collapsed
});
const connector = connect(mapStateToProps, {});
export const Navbar = withRouter(connector(NavbarComponent));
export default Navbar;

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = RouteComponentProps & PropsFromRedux;
