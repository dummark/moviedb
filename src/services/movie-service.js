import genres from '../assets/genres.json';

export default class MovieService {
	_apiBase = 'https://api.themoviedb.org/';

	movieUrl = `${this._apiBase}3/search/movie?query=`;

	options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjM4NmI5YWYwM2RlMzcxN2QxYjUwYzgxODBkODEyMCIsIm5iZiI6MTczODIyNjQ4OC4xMTY5OTk5LCJzdWIiOiI2NzliM2IzODQ0NDhkYTNkMmFiZDg1ZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KIM-t2pNrEvaGALH0mSUx6ugQnD-2mVpvTXiF8WBHrM',
		},
	};

	async getResource(query) {
		const res = await fetch(`${this.movieUrl}${query}`, this.options);
		if (!res.ok) {
			throw new Error(`Could not fetch ${query}, received ${res.status}`);
		}
		const movieList = await res.json();
		return movieList.results.map(movie => ({
			id: movie.id,
			title: movie.title,
			release_date: movie.release_date,
			genres: movie.genre_ids.map(id => {
				const genre = genres.find(g => g.id === id);
				return genre.name;
			}),
			overview: movie.overview,
			vote_average: movie.vote_average,
			popularity: movie.popularity,
			img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
		}));
	}
}
