import React, { useEffect, useState } from 'react';
import MovieList from '../movie-list';
import MovieapiService from '../../services/movieapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { Offline, Online } from 'react-detect-offline';
import { format } from 'date-fns';
import './app.css';
import { Alert } from 'antd';

const App = () => {
	const movieapi = new MovieapiService();

	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const textReduction = (text, symbols) => {
		if (text.length <= symbols) {
			return text;
		} else {
			const arr = text.slice(0, symbols).split(' ');
			return `${arr.slice(0, arr.length - 1).join(' ')}...`;
		}
	};

	const getMovieInfo = async name => {
		setLoading(false);
		try {
			const genreRes = await movieapi.getGenres();
			const genreMap = {};
			genreRes.genres.forEach(genre => {
				genreMap[genre.id] = genre.name;
			});

			const res = await movieapi.getMovieList(name);
			const movieInfo = res.results.map(movie => ({
				id: movie.id,
				name: movie.original_title,
				date: movie.release_date
					? format(new Date(movie.release_date), 'MMMM d, yyyy')
					: 'Дата неизвестна',
				genres: movie.genre_ids.map(id => genreMap[id]),
				overview: textReduction(movie.overview, 200),
				img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			}));

			setMovies(movieInfo);
			setError(false);
		} catch (e) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovieInfo('cuckold');
	});

	const hasData = !(loading || error);

	const errorMessage = error ? <ErrorIndicator /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = hasData ? <MovieList movies={movies} /> : null;

	return (
		<div>
			<Online>
				{errorMessage}
				{spinner}
				{content}
			</Online>
			<Offline>
				<Alert
					className='error-indicator'
					message='Отсутствует подключение к интернету'
					description='Проверьте подключение'
					type='info'
				/>
			</Offline>
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
