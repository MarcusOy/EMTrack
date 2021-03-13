import { DataStore } from './data/DataStore';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
	currentUser?: API.CurrentUser | undefined;
}) {
	const { currentUser } = initialState || {};
	const role = DataStore.getRawState().role;

	return {
		canAdmin: currentUser && currentUser.access === 'admin',
		isOperator: role == 'operator',
		isEMT: role == 'emt',
		isSupervisor: role == 'supervisor',
		isManager: role == 'manager',
		isCMO: role == 'cmo',
	};
}
