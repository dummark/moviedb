import React, { useState } from 'react';
import { Typography } from 'antd';
import './film-item.css';

const { Text, Paragraph } = Typography;

const FilmItem = ({ title, overview, release_date, img, genres }) => {
	const [ellipsis, setEllipsis] = useState(true);

	return (
		<li className='film-item'>
			<img className='film-image' src={img} alt={title} />
			<div className='film-info'>
				<Text className='film-element'>{title}</Text>
				<Text className='film-element' type='secondary'>
					{release_date}
				</Text>
				<Text className='film-element film-genres'>
					{genres.length > 0 ? (
						genres.map(genre => <Text keyboard>{genre}</Text>)
					) : (
						<Text keyboard>Unknown</Text>
					)}
				</Text>
				<Paragraph
					className='film-element'
					ellipsis={ellipsis ? { rows: 6 } : false}
				>
					{overview}
				</Paragraph>
			</div>
		</li>
	);
};

export default FilmItem;
