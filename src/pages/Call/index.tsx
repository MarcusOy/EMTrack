import { PageContainer } from '@ant-design/pro-layout';
import {
	Alert,
	Button,
	Card,
	Drawer,
	Form,
	Input,
	Modal,
	Select,
	Switch,
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
	status: 'Follow-up Needed' | 'Resolved';
}

interface IEmergencyRow {
	emergencyDesc: string;
	emergencyType: 'Grade 1' | 'Grade 2' | 'Grade 3';
	emergencyDetails: string;
	additionalInformation: string;
	status: 'Unresolved' | 'Resolved';
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
			status: faker.random.arrayElement(['Unresolved', 'Resolved']),
		},
		status: faker.random.arrayElement(['Follow-up Needed', 'Resolved']),
	};
});

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
			render: (status: 'Follow-up Needed' | 'Resolved') => (
				<Tag
					onClick={() =>
						setIsModalVisible(
							status == 'Follow-up Needed' ? true : false
						)
					}
					color={status == 'Follow-up Needed' ? 'red' : 'blue'}
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
						message='This is the Call Dashboard, where an operator will log incoming calls from constituents. If a follow up is to be recorded, click the red status tag that says "FOLLOW-UP NEEDED."'
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
						New Call
					</Button>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
			<Drawer
				title='Call'
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
						name='firstName'
						label='First Name'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder='John' />
					</Form.Item>
					<Form.Item
						name='lastName'
						label='Last Name'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder='Doe' />
					</Form.Item>
					<Form.Item
						name='phoneNumber'
						label='Phone Number'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder='555-555-5555' />
					</Form.Item>
					<Form.Item
						name='address'
						label='Address'
						rules={[
							{
								required: true,
							},
						]}
					>
						<TextArea
							rows={2}
							placeholder='123 Lee Lane, West Lafayette, IN 46907'
						/>
					</Form.Item>
					<Form.Item
						name='isNewEmergency'
						label='Is this a new Emergency?'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Switch
							checked={isNewEmergency}
							onChange={(v) => setIsNewEmergency(v)}
						/>
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
				title='Resolve Call'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				{' '}
				<p>Phone Number: (555) 555-555</p>
				<p>
					Follow up with caller and enter any additional details
					below:
				</p>
				<TextArea rows={4} />
			</Modal>
		</>
	);
};

export default CallPage;
