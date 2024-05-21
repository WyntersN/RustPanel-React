import { MenuDataItem } from '@ant-design/pro-components';
import React from 'react';

import * as AntdIcons from '@ant-design/icons';
const allIcons: { [key: string]: any } = AntdIcons;

// FIX从接口获取菜单时icon为string类型
const fixMenuItemIcon = (menus: MenuDataItem[]): MenuDataItem[] => {
  menus.forEach((item) => {
    if (item.icon && typeof item.icon === 'string' && allIcons[item.icon]) {
      item.icon = React.createElement(allIcons[item.icon]);
    }
  });
  return menus;
};

export default fixMenuItemIcon;
