import {Temporada} from './temporada.entity';

export interface Serie {
    id: number;
    titulo: string;
    imagemUrl?: string;
    temporadas?: Temporada[];
    duracao?: number;
}
