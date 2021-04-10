import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Avatar, Card, Table, Tag, Typography } from 'antd';
import faker from 'faker';
import { padStart } from 'lodash';
import React, { useState } from 'react';

type BaseStationStatus = 'Idle' | 'Responding' | 'Out of Service';
const BaseStationStatuses = ['Idle', 'Responding', 'Out of Service'];
interface IEmt {
	name: string;
	image: string;
}
interface IBaseStationRow {
	id: string;
	location: string;
	status: BaseStationStatus;
	emts: IEmt[];
}

const dataSource: IBaseStationRow[] = new Array(25)
	.fill(null)
	.map<IBaseStationRow>((_, i) => {
		return {
			id: `BS-${padStart(i.toString(), 4, '0')}`,
			location: faker.address.streetAddress(),
			status: faker.random.arrayElement(
				BaseStationStatuses
			) as BaseStationStatus,
			emts: new Array(faker.random.number({ min: 4, max: 7 }))
				.fill(null)
				.map<IEmt>(() => {
					return {
						name: `${faker.name.firstName()} ${faker.name.lastName()}`,
						image: faker.image.people(),
					};
				}),
		};
	});

const BaseStationPage = () => {
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			// eslint-disable-next-line react/display-name
			render: (status: BaseStationStatus) => (
				<>
					<Tag
						color={
							status == 'Idle'
								? 'green'
								: status == 'Responding'
								? 'red'
								: 'gray'
						}
					>
						{status}
					</Tag>
				</>
			),
		},
		{
			title: 'On Duty',
			dataIndex: 'emts',
			key: 'emts',
			// eslint-disable-next-line react/display-name
			render: (emts: IEmt[]) => (
				<Avatar.Group
					maxCount={4}
					maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
				>
					{emts.map((e) => {
						return (
							<Avatar
								key={e.name}
								src={`https://loremflickr.com/320/240/portrait?random=${faker.random.alphaNumeric(
									10
								)}`}
							/>
						);
					})}
					{/* <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
					<Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
					<Tooltip title='Ant User' placement='top'>
						<Avatar
							style={{ backgroundColor: '#87d068' }}
							icon={<UserOutlined />}
						/>
					</Tooltip>
					<Avatar
						style={{ backgroundColor: '#1890ff' }}
						icon={<AntDesignOutlined />}
					/> */}
				</Avatar.Group>
			),
		},
	];

	return (
		<>
			<PageContainer waterMarkProps={{ fontSize: 0 }}>
				<Card>
					<Alert
						message='This is the Base Station Dashboard, where a manager can get an overview of base stations.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>

					<Typography.Title level={4}>Base Stations</Typography.Title>

					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
		</>
	);
};

export default BaseStationPage;
