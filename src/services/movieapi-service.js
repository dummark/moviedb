export default class MovieapiService {
	options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjM4NmI5YWYwM2RlMzcxN2QxYjUwYzgxODBkODEyMCIsIm5iZiI6MS43MzgyMjY0ODgxMTY5OTk5ZSs5LCJzdWIiOiI2NzliM2IzODQ0NDhkYTNkMmFiZDg1ZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUlpMn5_nItaSW3_UHv45hAYenauBHSx-3DQ74DKKt8',
		},
	};

	async getMovieList(name, options = this.options) {
		const res = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${name}`,
			options
		);
		if (!res.ok) {
			throw new Error(`Фильмов с названием ${name} не существует`);
		}
		const body = await res.json();
		return body;
	}

	async getGenres() {
		const res = await fetch(
			'https://api.themoviedb.org/3/genre/movie/list?language=en',
			this.options
		).then(res => res.json);
		const genres = await res.json();
		return genres;
	}
}
