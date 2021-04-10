import { Badge, Tabs } from 'antd';
import React from 'react';
import type { NoticeIconTabProps } from './NoticeList';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type NoticeIconProps = {
	count?: number;
	bell?: React.ReactNode;
	className?: string;
	loading?: boolean;
	onClear?: (tabName: string, tabKey: string) => void;
	onItemClick?: (
		item: API.NoticeIconItem,
		tabProps: NoticeIconTabProps
	) => void;
	onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
	onTabChange?: (tabTile: string) => void;
	style?: React.CSSProperties;
	onPopupVisibleChange?: (visible: boolean) => void;
	popupVisible?: boolean;
	clearText?: string;
	viewMoreText?: string;
	clearClose?: boolean;
	emptyImage?: string;
	children?: React.ReactElement<NoticeIconTabProps>[];
};

const NoticeIcon = () => {
	const getNotificationBox = (): React.ReactNode => {
		const notificationBox = getNotificationBox();
		const trigger = (
			<span>
				<Badge
					style={{ boxShadow: 'none' }}
					className={styles.badge}
				></Badge>
			</span>
		);
		if (!notificationBox) {
			return trigger;
		}

		return (
			<HeaderDropdown
				placement='bottomRight'
				overlay={notificationBox}
				overlayClassName={styles.popover}
				trigger={['click']}
			>
				{trigger}
			</HeaderDropdown>
		);
	};
};

export default NoticeIcon;
