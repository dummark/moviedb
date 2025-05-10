import React from 'react';
import Movie from '../movie';
import './movie-list.css';

const MovieList = ({ movies }) => {
	const elements = movies.map(item => {
		const { id, ...itemProps } = item;

		return (
			<li key={id} className='movie-li'>
				<Movie {...itemProps} />
			</li>
		);
	});

	return <div className='movie-list'>{elements}</div>;
};

export default MovieList;
