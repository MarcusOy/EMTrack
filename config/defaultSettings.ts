import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
	pwa?: boolean;
	logo?: string;
} = {
	navTheme: 'light',
	// 拂晓蓝
	primaryColor: '#1890ff',
	layout: 'mix',
	contentWidth: 'Fluid',
	fixedHeader: false,
	fixSiderbar: true,
	colorWeak: false,
	title: 'EMTrack: ERIS',
	pwa: false,
	logo: 'https://img.icons8.com/bubbles/344/apple-health.png',
	iconfontUrl: '',
};

export default Settings;
