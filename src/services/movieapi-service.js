export default class MovieapiService {
	url = 'https://api.themoviedb.org/3';
	options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjM4NmI5YWYwM2RlMzcxN2QxYjUwYzgxODBkODEyMCIsIm5iZiI6MS43MzgyMjY0ODgxMTY5OTk5ZSs5LCJzdWIiOiI2NzliM2IzODQ0NDhkYTNkMmFiZDg1ZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUlpMn5_nItaSW3_UHv45hAYenauBHSx-3DQ74DKKt8',
		},
	};

	_apiKey = '66386b9af03de3717d1b50c8180d8120';

	async getMovieList(name, options = this.options) {
		const res = await fetch(
			`${this.url}/search/movie?query=${name}&api_key=${this._apiKey}`
		);
		if (!res.ok) {
			throw new Error(`Фильмов с названием ${name} не существует`);
		}
		const body = await res.json();
		return body;
	}

	async getGenres() {
		const res = await fetch(
			`${this.url}/genre/movie/list?language=en&api_key=${this._apiKey}`
		);
		if (!res.ok) {
			throw new Error('Не удалось получить список жанров');
		}
		const data = await res.json();
		return data;
	}
}
