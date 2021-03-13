﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'Home',
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
    access: 'canAdmin'
  },
  {
    name: 'Calls',
    path: '/calls',
    component: './Call',
    icon: 'PhoneOutlined',
    access: 'isOperator'

  },
  {
    name: 'Emergencies',
    path: '/emergencies',
    component: './Emergency',
    icon: 'WarningOutlined',
    access: 'isOperator'
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];