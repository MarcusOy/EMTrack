import { PageContainer } from '@ant-design/pro-layout';
import {
	Alert,
	Button,
	Card,
	Col,
	Drawer,
	Form,
	Input,
	Menu,
	Modal,
	Select,
	Dropdown,
	Row,
	Statistic,
	Table,
	Tag,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import faker from 'faker';
import React, { useState } from 'react';

interface ISubscriberRow {
	firstName: string;
	lastName: string;
	address: string;
	phonenumber: string;
	manage: 'View Subscriber' | 'View Subscriber';
}

const dataSource: ISubscriberRow[] = new Array(50)
	.fill(null)
	.map<ISubscriberRow>(() => {
		return {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			address: faker.address.streetAddress(),
			phonenumber: faker.phone.phoneNumber(),
			manage: faker.random.arrayElement([
				'View Subscriber',
				'View Subscriber',
			]),
		};
	});

const menu = (
	<Menu>
		<Menu.Item key='1'>#1</Menu.Item>
		<Menu.Item key='2'>#2</Menu.Item>
		<Menu.Item key='3'>#3</Menu.Item>
	</Menu>
);

const SubscriberPage = () => {
	const columns = [
		{
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'firstName',
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phonenumber',
			key: 'phonenumber',
		},
		{
			title: 'Manage',
			key: 'manage',
			dataIndex: 'manage',
			// eslint-disable-next-line react/display-name
			render: (status: 'Follow-up Needed' | 'Resolved') => (
				<Tag
					onClick={() => setIsModalVisible(true)}
					color={status == 'Follow-up Needed' ? 'red' : 'blue'}
				>
					{status.toUpperCase()}
				</Tag>
			),
		},
	];

	const [visible, setVisible] = useState(false);

	// Modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const { Option } = Select;

	return (
		<>
			<PageContainer waterMarkProps={{ fontSize: 0 }}>
				<Card>
					<Alert
						message='This is the Subscribers Dashboard, where a Manager can update and manage subscriber records.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>
					<Row gutter={16}>
						<Col span={12}>
							<Statistic title='Active Subscribers' value={122} />
						</Col>
						<Col span={12}>
							<Statistic
								title='Revenue From Subscribers'
								value={12567}
								precision={2}
							/>
						</Col>
						<Col span={12}>
							<br />
							<br />
						</Col>
					</Row>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>

			<Modal
				title='Subscriber Information'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				{' '}
				<Row gutter={16}>
					<Col span={12}>
						<Statistic title='Subscriber Plan' value={'Premium'} />
					</Col>
					<Col span={12}>
						<Statistic title='Claims Made' value={13} />
					</Col>
					<Col span={12}>
						<br />
						<br />
					</Col>
					<Col span={12}>
						<br />
						<br />
					</Col>
					<Col span={12}>
						<Statistic title='Expired' value={'False'} />
					</Col>
					<Col span={12}>
						<Statistic title='Billing Info' value={'Visa *5555'} />
					</Col>
				</Row>
				<br />
				<br />
				<TextArea rows={4} placeholder={'Subscriber update notes?'} />
			</Modal>
		</>
	);
};

export default SubscriberPage;
