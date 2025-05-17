import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const Spinner = () => {
	return (
		<Flex gap='middle' vertical>
			<Spin tip='Loading...'>
				<Alert
					message='Фильмы загружаются'
					description='А пока посмотрите на этот великолепный спиннер :)'
					type='info'
				/>
			</Spin>
		</Flex>
	);
};

export default Spinner;
