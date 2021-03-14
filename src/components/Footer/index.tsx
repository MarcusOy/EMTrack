import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => (
	<DefaultFooter
		copyright='2020 Team 19'
		links={[
			{
				key: 'EMTrack: ERIS',
				title: 'EMTrack: ERIS',
				href: 'https://purdue.edu',
				blankTarget: true,
			},
		]}
	/>
);

export default Footer;
