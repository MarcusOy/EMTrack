import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Select, Typography } from 'antd';
import { DataStore } from '@/data/DataStore';

const Welcome = () => {
	const { Option, OptGroup } = Select;
	const role = DataStore.useState((s) => s.role);
	function handleChange(value: any) {
		DataStore.update((s) => {
			localStorage.setItem('role', value);
			window.location.reload();
		});
	}

	return (
		<PageContainer>
			<Card>
				<Typography.Title>Role Selection</Typography.Title>
				<Alert
					message='Welcome to EMTrack, a prototype by Team 19. To get started, select a role with the dropdown below.'
					type='info'
					showIcon
					banner
					style={{
						marginBottom: 24,
					}}
				/>
				<Select
					placeholder='Select a role'
					defaultValue={role}
					style={{ width: 200 }}
					onChange={handleChange}
				>
					<OptGroup label='Manager'>
						<Option value='operator'>Operator</Option>
						<Option value='emt'>EMT</Option>
					</OptGroup>
					<OptGroup label='Managerial'>
						<Option value='supervisor'>Supervisor</Option>
						<Option value='manager'>Manager</Option>
						<Option value='cmo'>CMO</Option>
					</OptGroup>
				</Select>
				{role ? (
					<Alert
						message='Now that you have selected a role, click a menu item on the left.'
						type='success'
						showIcon
						banner
						style={{
							marginTop: 24,
						}}
					/>
				) : (
					<></>
				)}
			</Card>
		</PageContainer>
	);
};

export default Welcome;
