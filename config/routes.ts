export default [
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
		access: 'canAdmin',
	},
	{
		name: 'Calls',
		path: '/calls',
		component: './Call',
		icon: 'PhoneOutlined',
		access: 'isOperator',
	},
	{
		name: 'Shift',
		path: '/shift',
		component: './Shift',
		icon: 'ClockCircleOutlined',
		access: 'isEMT',
	},
	{
		name: 'Emergencies',
		path: '/emergencies',
		component: './Emergency',
		icon: 'WarningOutlined',
		access: 'isOperator',
	},
	{
		name: 'Patients',
		path: '/patients',
		component: './Patient',
		icon: 'WarningOutlined',
		access: 'isEMT',
	},
	{
		name: 'Subscribers',
		path: '/subscribers',
		component: './Subscribers',
		icon: 'WarningOutlined',
		access: 'isManager',
	},
	{
		name: 'Reports',
		path: '/reports',
		component: './Report',
		icon: 'ExceptionOutlined',
		access: 'isManager',
	},
	{
		name: 'Base Stations',
		path: '/basestations',
		component: './BaseStation',
		icon: 'BankOutlined',
		access: 'isManager',
  },
  {
		name: 'Documentation',
		path: '/documentation',
		component: './Documentation',
		icon: 'ExceptionOutlined',
		access: 'isEMT',
	},
	{
		path: '/',
		redirect: '/welcome',
	},
	{
		component: './404',
	},
];
