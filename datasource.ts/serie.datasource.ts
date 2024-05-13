import useSWR from 'swr';

import {SerieAPI} from '@/entity/serie.api.entity';

export class SerieDatasource {
    public SerieDatasource() {}

    public async getTitulos(titulo: string) {
        const url = `${process.env.TMDB_SEARCH?.replace('{{titulo}}', titulo)}`;
        const resposta = await this.buscar(url);
        return resposta;
    }

    public async getSerie(id: number) {
        const url = `${process.env.TMDB_SERIE?.replace('{{id}}', `${id}`)}`;
        const resposta = await this.buscar(url);
        return resposta;
    }

    public async getTemporada(id: number, temporada: number) {
        const url = `${process.env.TMDB_SERIE?.replace(
            '{{id}}',
            `${id}`,
        )}/season/${temporada}`;
        const resposta = await this.buscar(url);
        return resposta;
    }

    private async buscar(url: string) {
        try {
            const resposta = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `${process.env.TMDB_AUTHORIZATION}`,
                },
            });
            const json = await resposta.json();
            return json;
        } catch (error) {
            return null;
        }
    }
}

export default function Buscar(caminho: string) {
    let resultado;
    const {data} = useSWR(caminho, async (url: string) => {
        return await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: `${process.env.TMDB_AUTHORIZATION}`,
            },
        }).then(async (res) => {
            resultado = await res.json();
            console.log('resultado');
            console.log(resultado);
        });
    });
    return data;
}
