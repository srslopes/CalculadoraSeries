import ResolvingViewport from 'next/dist/lib/metadata/types/metadata-interface.js';

import {SerieDatasource} from '@/datasource.ts/serie.datasource';
import {DuracaoConvertida} from '@/entity/duracaoconvertida.entity';
import {EpisodioAPI} from '@/entity/episodio.api.entity';
import {Episodio} from '@/entity/episodio.entity';
import {SerieAPI} from '@/entity/serie.api.entity';
import {Serie} from '@/entity/serie.entity';
import {TemporadaAPI} from '@/entity/temporada.api.entity';
import {Temporada} from '@/entity/temporada.entity';

export class SerieRepository {
    public SerieRepository() {}

    public async buscarTitulos(titulo: string): Promise<Serie[]> {
        const datasource = new SerieDatasource();
        const resultado: any = await datasource.getTitulos(titulo);
        let series: Serie[] = new Array();
        if (!resultado) return series;
        const vetor: any[] = resultado['results'];
        const tamanho = vetor.length;
        series = new Array(tamanho);
        for (let i = 0; i < tamanho; i++) {
            const serie: Serie = {
                id: resultado['results'][i]['id'],
                titulo: resultado['results'][i]['original_name'],
            };
            series[i] = serie;
        }
        return series;
    }

    public async buscarSerie(id: number) {
        console.log(`id:`);
        const datasource = new SerieDatasource();
        let resultado: SerieAPI = await datasource.getSerie(id);
        if (!resultado) console.log('not working');
        console.log(`name: ${resultado.name}`);
        let serie: Serie = {
            id: id,
            titulo: resultado.name,
            imagemUrl:
                'https://image.tmdb.org/t/p/w342' + resultado.poster_path,
        };
        let duracaoMedia = 0;
        if (resultado['episode_run_time']) {
            let soma = 0;
            for (let i = 0; i < resultado['episode_run_time'].length; i++) {
                soma += resultado['episode_run_time'][i];
            }
            duracaoMedia = Math.trunc(
                soma / resultado['episode_run_time'].length,
            );
        }
        const tamanho = resultado.seasons.length;
        let temporadas: Temporada[] = new Array(tamanho);
        let duracaoTotal = 0;
        for (let i = 0; i < tamanho; i++) {
            const busca: TemporadaAPI = await datasource.getTemporada(
                serie.id,
                resultado.seasons[i]['season_number'],
            );
            console.log(`temporada: ${resultado.seasons[i]['season_number']}`);
            const array: EpisodioAPI[] = busca.episodes;
            let tamanhoTemporada = array.length;
            let episodios: Episodio[] = new Array(tamanho);
            let duracaoTemporada = 0;
            for (let j = 0; j < tamanhoTemporada; j++) {
                let valor = duracaoMedia;
                if (busca.episodes[j]['runtime'])
                    valor = busca.episodes[j]['runtime'];
                const episodio: Episodio = {
                    duracao: valor,
                };
                console.log(`titulo: ${busca.episodes[j]['name']}`);
                console.log(`        ${episodio.duracao} min`);
                duracaoTemporada += episodio.duracao;
                episodios[j] = episodio;
            }
            const temporada: Temporada = {
                id: busca.episodes[i]['id'],
                duracao: duracaoTemporada,
            };
            console.log(`total:${temporada.duracao} min`);
            duracaoTotal += temporada.duracao;
            temporadas[i] = temporada;
        }
        serie.temporadas = temporadas;
        serie.duracao = duracaoTotal;
        console.log(`duracao: ${duracaoTotal}`);
        let total = serie.duracao;
        let dias = Math.trunc(total / 1440);
        total = total % 1440;
        let horas = Math.trunc(total / 60);
        total = total % 60;
        serie.duracaoConvertida = {dias: dias, horas: horas, minutos: total};
        console.log(`${dias} dias, ${horas} horas, ${total} minutos`);
        return serie;
    }

    private busca: any = (caminho: string) => {
        fetch(caminho, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${process.env.TMDB_AUTHORIZATION}`,
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    };
}
