import {Episodio} from './episodio.entity';

export interface Temporada {
    id: number;
    episodios?: Episodio[];
    duracao: number;
}
