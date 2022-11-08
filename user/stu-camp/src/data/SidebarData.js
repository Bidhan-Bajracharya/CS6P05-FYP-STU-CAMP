import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/setting',
    icon: <IoIcons.IoMdSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Theme',
    path: '/theme',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Sign out',
    path: '/signout',
    icon: <GoIcons.GoSignOut />,
    cName: 'nav-text'
  },
];