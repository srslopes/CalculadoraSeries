import {Temporada} from './temporada.entity';

export interface SerieAPI {
    id: number;
    name: string;
    poster_path: string;
    seasons: any[];
    episode_run_time?: any[];
}
