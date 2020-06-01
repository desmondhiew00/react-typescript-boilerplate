export const SIDEBAR_MENU: SIDEBAR_MENU[] = [
  {
    name: 'Home',
    to: '/home',
    icon: 'DashboardOutlined'
  },
  {
    name: 'User Accounts',
    to: '/users',
    icon: 'TeamOutlined'
  }
  // {
  //   name: 'Tenants',
  //   to: '/tenants',
  //   icon: 'HddOutlined'
  // },
  // {
  //   name: 'Settings',
  //   to: '/settings',
  //   icon: 'UserOutlined',
  //   subMenu: [
  //     { name: 'Account Settings', to: '/account' },
  //     { name: 'Security Settings', to: '/security' }
  //   ]
  // }
];

interface Menu {
  name: string;
  to: string;
  icon?: string;
  group?: string;
  permissionAuth?: () => boolean;
}
export interface SIDEBAR_MENU extends Menu {
  subMenu?: Menu[];
}
