import type { AutoCompleteProps } from 'antd/es/auto-complete';
import React from 'react';

export type HeaderSearchProps = {
	onSearch?: (value?: string) => void;
	onChange?: (value?: string) => void;
	onVisibleChange?: (b: boolean) => void;
	className?: string;
	placeholder?: string;
	options: AutoCompleteProps['options'];
	defaultVisible?: boolean;
	visible?: boolean;
	defaultValue?: string;
	value?: string;
};

const HeaderSearch = () => {
	return <div></div>;
};

export default HeaderSearch;
