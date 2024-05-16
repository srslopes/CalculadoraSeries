export class SerieDatasource {
    public SerieDatasource() {}

    public async getTitulos(titulo: string) {
        const url: string = `https://api.themoviedb.org/3/search/tv?query=${titulo}&include_adult=false&language=en-US&page=1`;
        const resposta = await this.buscar(url);
        return resposta;
    }

    public async getSerie(id: number) {
        const url = `https://api.themoviedb.org/3/tv/${id}`;
        const resposta = await this.buscar(url);
        return resposta;
    }

    public async getTemporada(id: number, temporada: number) {
        const url = `https://api.themoviedb.org/3/tv/${id}/season/${temporada}`;
        const resposta = await this.buscar(url);
        return resposta;
    }

    private async buscar(url: string) {
        try {
            const resposta = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTBkMjViZTdlNTM5MzI2MzliYTI5NGE4NTEwODhhMSIsInN1YiI6IjY2M2Y3M2Y1MTgwYjBkZDllOGI2MWFhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J3h3rM8RbG73bF0YI9Io9Bb_YuuAQC3whGPuMLotw2k',
                },
            });
            const json = await resposta.json();
            return json;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
