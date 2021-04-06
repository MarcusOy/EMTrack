import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
	Alert,
	Button,
	Card,
	DatePicker,
	Drawer,
	Form,
	Input,
	Popconfirm,
	Select,
	Table,
	Tag,
	Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import faker from 'faker';
import React, { useState } from 'react';

type ReportType =
	| 'Exception Report'
	| 'Attendence Report'
	| 'Performance Report'
	| 'Revenue Report';
const ReportTypes = [
	'Exception Report',
	'Attendence Report',
	'Performance Report',
	'Revenue Report',
];

interface IReportRow {
	name: string;
	type: ReportType;
	generatedOn: Date;
	generatedBy: string;
}

const dataSource: IReportRow[] = new Array(
	faker.random.number({ min: 3, max: 7 })
)
	.fill(null)
	.map<IReportRow>(() => {
		const reportType = faker.random.arrayElement(ReportTypes);
		const name = ['Exception Report'].includes(reportType)
			? `${reportType} for Base Station ${faker.random.number(20)}`
			: ['Attendence Report'].includes(reportType)
			? `${reportType} for Team ${faker.random.number(50)}`
			: reportType;
		return {
			name: name,
			type: reportType as ReportType,
			generatedOn: faker.date.past(0.5),
			generatedBy: `${faker.name.lastName()}, ${faker.name.firstName()}`,
		};
	});

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
		// eslint-disable-next-line react/display-name
		render: (reportType: ReportType) => (
			<>
				<Tag
					color={
						reportType == 'Attendence Report'
							? 'red'
							: reportType == 'Exception Report'
							? 'blue'
							: reportType == 'Performance Report'
							? 'orange'
							: 'green'
					}
				>
					{reportType}
				</Tag>
			</>
		),
	},
	{
		title: 'Generated On',
		dataIndex: 'generatedOn',
		key: 'generatedOn',
		// eslint-disable-next-line react/display-name
		render: (date: Date) => <span>{date.toLocaleString()}</span>,
	},
	{
		title: 'Generated By',
		dataIndex: 'generatedBy',
		key: 'generatedBy',
	},
];

const ReportPage = () => {
	// Drawer
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	const { Option } = Select;
	const { RangePicker } = DatePicker;

	return (
		<>
			<PageContainer waterMarkProps={{ fontSize: 0 }}>
				<Card>
					<Alert
						message='This is the Report Dashboard, where a manager can produce and view reports.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>
					<Typography.Title level={4}>Reports</Typography.Title>
					<Button
						type='primary'
						onClick={showDrawer}
						style={{ marginBottom: 24 }}
					>
						New Report
					</Button>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
			<Drawer
				title='Report'
				placement='right'
				width='25rem'
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
							Generate
						</Button>
					</div>
				}
			>
				<Form layout='vertical' hideRequiredMark>
					<Form.Item
						name='reportType'
						label='Report Type'
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select placeholder='Select a report type'>
							{ReportTypes.map((t, i) => {
								return (
									<Option key={i} value={i}>
										{t}
									</Option>
								);
							})}
						</Select>
					</Form.Item>
					<Form.Item
						name='timeRange'
						label='Time Range'
						rules={[
							{
								required: true,
							},
						]}
					>
						<RangePicker />
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
};

export default ReportPage;