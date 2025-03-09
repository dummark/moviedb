import React, { useState, useEffect } from 'react';
import FilmItem from '../film-item';
import './film-list.css';
import MovieService from '../../services/movie-service';

const FilmList = () => {
	const [films, setFilms] = useState([]);
	const movieService = new MovieService();

	useEffect(() => {
		movieService
			.getResource('matrix')
			.then(data => setFilms(Array.isArray(data) ? data : [data]))
			.catch(error => console.error(error));
	}, []);

	return (
		<ul className='film-list'>
			{films.map(obj => (
				<FilmItem key={obj.id} {...obj} />
			))}
		</ul>
	);
};

export default FilmList;
