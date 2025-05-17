import React from 'react';
import './error-indicator.css';
import { Alert } from 'antd';

const ErrorIndicator = () => {
	return (
		<Alert
			className='error-indicator'
			message='Что-то пошло не по плану'
			description='Но скоро всё обязательно восстановится'
			type='info'
		/>
	);
};

export default ErrorIndicator;
