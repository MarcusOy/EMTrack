import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
	Alert,
	Button,
	Card,
	Drawer,
	Form,
	Input,
	message,
	Modal,
	Popconfirm,
	Select,
	Space,
	Switch,
	Table,
	Tag,
	Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import faker from 'faker';
import React, { useState } from 'react';

interface IShiftRow {
	name: string;
	clockIn: Date;
	clockOut: Date;
}

const clockInTime = new Date();
clockInTime.setHours(8);
clockInTime.setMinutes(0);
clockInTime.setSeconds(0);
clockInTime.setMilliseconds(0);
const clockOutTime = new Date();
clockOutTime.setHours(16);
clockOutTime.setMinutes(0);
clockOutTime.setSeconds(0);
clockOutTime.setMilliseconds(0);

const dataSource: IShiftRow[] = new Array(
	faker.random.number({ min: 3, max: 7 })
)
	.fill(null)
	.map<IShiftRow>(() => {
		return {
			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			clockIn: new Date(
				clockInTime.getTime() +
					faker.random.number({ min: -30, max: 30 }) * 60 * 1000
			),
			clockOut: new Date(
				clockOutTime.getTime() +
					faker.random.number({ min: -30, max: 30 }) * 60 * 1000
			),
		};
	});

console.log(dataSource);
const ShiftPage = () => {
	const [isClockIn, setIsClockIn] = useState(true);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Clocked In',
			dataIndex: 'clockIn',
			key: 'clockIn',
			// eslint-disable-next-line react/display-name
			render: (time: Date) => (
				<>
					<Tag
						color={
							time >
							new Date(clockInTime.getTime() + 5 * 60 * 1000)
								? 'red'
								: time <
								  new Date(
										clockInTime.getTime() - 5 * 60 * 1000
								  )
								? 'green'
								: 'blue'
						}
					>
						{time > new Date(clockInTime.getTime() + 5 * 60 * 1000)
							? 'Late'
							: time <
							  new Date(clockInTime.getTime() - 5 * 60 * 1000)
							? 'Early'
							: 'On time'}
					</Tag>
					<span>{time.toLocaleTimeString()}</span>{' '}
				</>
			),
		},
		{
			title: 'Clocked Out',
			dataIndex: 'clockOut',
			key: 'clockOut',
			// eslint-disable-next-line react/display-name
			render: (time: Date) => (
				<>
					<Tag
						color={
							time >
							new Date(clockOutTime.getTime() + 5 * 60 * 1000)
								? 'green'
								: time <
								  new Date(
										clockOutTime.getTime() - 5 * 60 * 1000
								  )
								? 'red'
								: 'blue'
						}
					>
						{time > new Date(clockOutTime.getTime() + 5 * 60 * 1000)
							? 'Overtime'
							: time <
							  new Date(clockOutTime.getTime() - 5 * 60 * 1000)
							? 'Released Early'
							: 'On time'}
					</Tag>
					<span>{time.toLocaleTimeString()}</span>{' '}
				</>
			),
		},
	];

	return (
		<>
			<PageContainer waterMarkProps={{ fontSize: 0 }}>
				<Card>
					<Alert
						message='This is the Shift Dashboard, where an EMT manages their shift.'
						type='info'
						showIcon
						banner
						style={{
							marginBottom: 24,
						}}
					/>

					<Card
						title='Upcoming shift'
						extra={
							<Popconfirm
								title={`Are you sure to ${
									isClockIn ? 'clock in' : 'clock out'
								}?`}
								onConfirm={() => setIsClockIn(!isClockIn)}
								// onCancel={cancel}
								okText='Yes'
								cancelText='No'
							>
								<Button type='primary'>
									{isClockIn ? 'Clock in' : 'Clock out'}
								</Button>
							</Popconfirm>
						}
						style={{ width: 300, marginBottom: 24 }}
					>
						<span>
							<CalendarOutlined /> {new Date().toDateString()}
						</span>
						<br />
						<span>
							<ClockCircleOutlined />{' '}
							{`${clockInTime.toLocaleTimeString()} to ${clockOutTime.toLocaleTimeString()}`}
						</span>
					</Card>
					<Typography.Title level={4}>
						Team Attendance
					</Typography.Title>

					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</PageContainer>
		</>
	);
};

export default ShiftPage;
