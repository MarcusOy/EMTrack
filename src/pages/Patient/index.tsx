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
	Row,
	Col,
	Space,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import faker from 'faker';
import React, { useState } from 'react';

interface ICallRow {
	firstName: string;
	lastName: string;
	treatment?: ITreatmentRow;
	injuries?: IInjuriesRow;
	status: 'Update' | 'Update';
}

interface ITreatmentRow {
	treatmentDesc: string;
	treatmentLocation: string;
}

interface IInjuriesRow {
	injuryDesc: string;
}

const dataSource: ICallRow[] = new Array(50).fill(null).map<ICallRow>(() => {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		treatment: {
			treatmentDesc: faker.lorem.words(4),
			treatmentLocation: faker.address,
		},
		injuries: {
			injuryDesc: faker.lorem.words(4),
		},
		status: faker.random.arrayElement(['Update', 'Update']),
	};
});

const menu = (
	<Menu>
		<Menu.Item key='1'>#1</Menu.Item>
		<Menu.Item key='2'>#2</Menu.Item>
		<Menu.Item key='3'>#3</Menu.Item>
	</Menu>
);

const PatientPage: React.FC = () => {
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
			title: 'Treatment',
			dataIndex: 'treatment',
			key: 'treatment',

			// eslint-disable-next-line react/display-name
			render: (treatment: ITreatmentRow) => (
				<p>{treatment.treatmentDesc}</p>
			),
		},
		{
			title: 'Injuries',
			dataIndex: 'injuries',
			key: 'injuries',

			// eslint-disable-next-line react/display-name
			render: (injuries: IInjuriesRow) => <p>{injuries.injuryDesc}</p>,
		},
		{
			/*
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
        */
		},
	];

	// Drawer
	const [visible, setVisible] = useState(false);
	// const [isNewEmergency, setIsNewEmergency] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	// Modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	// const showModal = () => {
	// 	setIsModalVisible(true);
	// };

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
						message='This is the Patient Dashboard, where an EMT can update patient care data on scene.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>
					<Row>
						<Col span={12}>
							<Input size='medium' placeholder='First Name' />
							<br />
							<br />
							<Input size='medium' placeholder='Last Name' />
							<br />
							<br />
							<TextArea
								placeholder='Treatment'
								autoSize={{ minRows: 3, maxRows: 5 }}
							/>
							<br />
							<br />
							<TextArea
								placeholder='Injuries'
								autoSize={{ minRows: 3, maxRows: 5 }}
							/>
							<br />
							<br />
						</Col>
						<Col span={12}>
							<TextArea
								placeholder='Additional Details'
								autoSize={{ minRows: 10, maxRows: 15 }}
							/>
						</Col>
					</Row>
					<Button type='primary' style={{ marginBottom: 24 }}>
						Add Patient
					</Button>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
			<Drawer
				title='Emergency'
				placement='right'
				width={350}
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
						name='patientName'
						label='Patient Full Name'
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
					{/* {isNewEmergency ? (
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
					)} */}
				</Form>
			</Drawer>
			<Modal
				title='Update Patient Care'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				{' '}
				<p>Phone Number: (555) 555-555</p>
				<p>
					Follow up with a team and enter any additional details
					regarding patient status below:
				</p>
				<TextArea rows={4} />
			</Modal>
		</>
	);
};

export default PatientPage;
