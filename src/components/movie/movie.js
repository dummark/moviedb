import React from 'react';
import { Typography } from 'antd';
import './movie.css';
const { Text, Title, Paragraph } = Typography;

const Movie = ({ id, img, name, date, genres, overview }) => {
	return (
		<div className='movie'>
			<img src={img} className='img' alt='img' />
			<div className='movie-info'>
				<Title level={4}>{name}</Title>
				<Paragraph>
					<Text type='secondary'>{date}</Text>{' '}
				</Paragraph>
				<Paragraph>{genres} </Paragraph>
				<Paragraph>
					<Text>{overview}</Text>{' '}
				</Paragraph>
			</div>
		</div>
	);
};

export default Movie;
