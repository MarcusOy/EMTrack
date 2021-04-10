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
	emergency?: IEmergencyRow;
	documentation?: IDocumentationRow;
	status: 'Update' | 'Update';
}

interface IEmergencyRow {
	emergencyDesc: string;
}

const dataSource: IDocumentationRow[] = new Array(50)
	.fill(null)
	.map<IDocumentationRow>(() => {
		return {
			emergency: faker.lorem.words(4),
			documentation: faker.lorem.words(25),
			status: faker.random.arrayElement(['Update', 'Update']),
		};
	});

const DocumentationPage: React.FC = () => {
	const columns = [
		{
			title: 'Emergency',
			dataIndex: 'emergency',
			key: 'emergency',

			// eslint-disable-next-line react/display-name
		},
		{
			title: 'Documentation',
			dataIndex: 'documentation',
			key: 'documentation',

			// eslint-disable-next-line react/display-name
		},
	];

	// Drawer
	const [visible, setVisible] = useState(false);
	const onClose = () => {
		setVisible(false);
	};

	// Modal
	const [isModalVisible, setIsModalVisible] = useState(false);

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
						message='This is the Field Documentation Page. An EMT may record documentation of a scene and link it to an emergency.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>
					<Row>
						<Col span={12}>
							<Select placeholder='Select an existing emergency'>
								<Option value={1}>
									Fire on 123 Main Street
								</Option>
								<Option value={2}>
									Homicide on 111 Elm Ave
								</Option>
								<Option value={3}>
									Heart Attack on 175th Place
								</Option>
							</Select>
							<br />
							<br />
						</Col>
						<TextArea
							placeholder='Field Documentation'
							autoSize={{ minRows: 10, maxRows: 15 }}
						/>
					</Row>
					<br />
					<br />
					<Button type='primary' style={{ marginBottom: 24 }}>
						Upload Documentation
					</Button>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
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

export default DocumentationPage;
