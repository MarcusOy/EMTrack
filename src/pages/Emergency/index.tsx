import { PageContainer } from '@ant-design/pro-layout';
import {
	Alert,
	Button,
	Card,
	Drawer,
	Form,
	Input,
	Menu,
	Modal,
	Select,
	Dropdown,
	Table,
	Tag,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import faker from 'faker';
import React, { useState } from 'react';

interface ICallRow {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	isNewEmergency: boolean;
	emergency?: IEmergencyRow;
	status: 'No Team Dispatched' | 'Dispatched';
}

interface IEmergencyRow {
	emergencyDesc: string;
	emergencyType: 'Grade 1' | 'Grade 2' | 'Grade 3';
	emergencyDetails: string;
	additionalInformation: string;
	status: 'No Team Dispatched' | 'Dispatched';
}

const dataSource: ICallRow[] = new Array(50).fill(null).map<ICallRow>((e) => {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		phoneNumber: faker.phone.phoneNumber(),
		address: faker.address.streetAddress(),
		isNewEmergency: faker.random.boolean(),
		emergency: {
			emergencyDesc: faker.lorem.words(4),
			emergencyType: faker.random.arrayElement([
				'Grade 1',
				'Grade 2',
				'Grade 3',
			]),
			emergencyDetails: faker.lorem.paragraph(),
			additionalInformation: faker.lorem.paragraph(),
			status: faker.random.arrayElement(['Dispatched', 'Dispatched']),
		},
		status: faker.random.arrayElement(['No Team Dispatched', 'Dispatched']),
	};
});

const menu = (
	<Menu>
		<Menu.Item key='1'>#1</Menu.Item>
		<Menu.Item key='2'>#2</Menu.Item>
		<Menu.Item key='3'>#3</Menu.Item>
	</Menu>
);

const CallPage = () => {
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
			title: 'Emergency',
			dataIndex: 'emergency',
			key: 'emergency',
			// eslint-disable-next-line react/display-name
			render: (emergency: IEmergencyRow) => (
				<p>{emergency.emergencyDesc}</p>
			),
		},
		{
			title: 'Status',
			key: 'status',
			dataIndex: 'status',
			// eslint-disable-next-line react/display-name
			render: (status: 'No Team Dispatched' | 'Dispatched') => (
				<Tag
					onClick={() =>
						setIsModalVisible(
							status == 'No Team Dispatched' ? true : false
						)
					}
					color={status == 'No Team Dispatched' ? 'red' : 'blue'}
				>
					{status.toUpperCase()}
				</Tag>
			),
		},
	];

	// Drawer
	const [visible, setVisible] = useState(false);
	const [isNewEmergency, setIsNewEmergency] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

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

	const { Option, OptGroup } = Select;

	return (
		<>
			<PageContainer waterMarkProps={{ fontSize: 0 }}>
				<Card>
					<Alert
						message='This is the Emergency Dashboard, where an operator will dispatch teams to emergencies.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>
					<Button
						type='primary'
						onClick={showDrawer}
						style={{ marginBottom: 24 }}
					>
						Dispatch Team
					</Button>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
			<Drawer
				title='Emergency'
				placement='right'
				closable={false}
				onClose={onClose}
				visible={visible}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button onClick={onClose} type='primary'>
							Submit
						</Button>
					</div>
				}
			>
				<Form layout='vertical' hideRequiredMark>
					<Form.Item
						name='teamName'
						label='Team Name'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder='Team 19' />
					</Form.Item>
					<Form.Item
						name='isNewEmergency'
						label='Emergency to Dispatch to?'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Dropdown.Button overlay={menu}>#1</Dropdown.Button>
					</Form.Item>
					{isNewEmergency ? (
						<>
							<Form.Item
								name='emergencyDesc'
								label='Phone Number'
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input placeholder='Armed Robbery' />
							</Form.Item>
							<Form.Item
								name='emergencyType'
								label='Emergency Type'
								rules={[
									{
										required: true,
									},
								]}
							>
								<Select placeholder='Select a grade'>
									<Option value={1}>Grade 1</Option>
									<Option value={2}>Grade 2</Option>
									<Option value={3}>Grade 3</Option>
								</Select>
							</Form.Item>
							<Form.Item
								name='emergencyDetails'
								label='Emergency Details'
								rules={[
									{
										required: true,
									},
								]}
							>
								<TextArea placeholder='Shots fired, three wounded, scene clear.' />
							</Form.Item>
							<Form.Item
								name='additionalInformation'
								label='Additional Information'
								rules={[
									{
										required: true,
									},
								]}
							>
								<TextArea placeholder='Main entrance blocked, use side road.' />
							</Form.Item>
						</>
					) : (
						<></>
					)}
				</Form>
			</Drawer>
			<Modal
				title='Resolve Emergency'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				{' '}
				<p>Phone Number: (555) 555-555</p>
				<p>
					Follow up with a team and enter any additional details
					regarding dispatch status below:
				</p>
				<TextArea rows={4} />
			</Modal>
		</>
	);
};

export default CallPage;
