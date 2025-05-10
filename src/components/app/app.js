import React, { useEffect, useState } from 'react';
import MovieList from '../movie-list';
import { Typography } from 'antd';
import MovieapiService from '../../services/movieapi-service';
import { format } from 'date-fns';
import './app.css';

const { Text } = Typography;

const App = () => {
	const movieapi = new MovieapiService();

	const [movies, setMovies] = useState([]);

	const textReduction = (text, symbols) => {
		if (text.length <= symbols) {
			return text;
		} else {
			const arr = text.slice(0, symbols).split(' ');
			return `${arr.slice(0, arr.length - 1).join(' ')}...`;
		}
	};

	useEffect(() => {
		const genresNames = async ([...id]) => {
			const res = await movieapi.getGenres();
			const genreNames = res.results.map(el => {
				if (el.id === id) {
					return el.name;
				}
			});
			return genreNames;
		};

		const getMovieInfo = async name => {
			const res = await movieapi.getMovieList(name);
			const movieInfo = res.results.map(movie => ({
				id: movie.id,
				name: movie.original_title,
				date: movie.release_date
					? format(new Date(movie.release_date), 'MMMM d, yyyy')
					: 'Дата неизвестна',
				genres: <Text keyboard>{genresNames(movie.genre_ids).join(`, `)}</Text>,
				overview: textReduction(movie.overview, 200),
				img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			}));
			setMovies(movieInfo);
		};

		getMovieInfo('new');
	}, []);

	return (
		<div>
			<MovieList movies={movies} />
		</div>
	);
};

export default App;

// {
// 	"adult": false,
// 	"backdrop_path": null,
// 	"genre_ids": [],
// 	"id": 555879,
// 	"original_language": "en",
// 	"original_title": "Matrix",
// 	"overview": "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
// 	"popularity": 0.3877,
// 	"poster_path": "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
// 	"release_date": "1998-12-31",
// 	"title": "Matrix",
// 	"video": false,
// 	"vote_average": 7.041,
// 	"vote_count": 49
// }
