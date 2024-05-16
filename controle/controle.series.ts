import {DuracaoConvertida} from '../entity/duracaoconvertida.entity';
import {Serie} from '../entity/serie.entity';
import {SerieRepository} from '../repository/serie.repository';

export class ControleSeries {
    public lista: Array<Serie> = [];
    public resultados: Array<Serie> = [];
    public duracaoTotal: number;
    public duracao: DuracaoConvertida;
    private static controle: ControleSeries;
    private static instanciado: boolean = false;

    public constructor() {
        ControleSeries.instanciado = true;
        this.duracaoTotal = 0;
        this.duracao = new DuracaoConvertida(this.duracaoTotal);
        this.atualizarDuracao(0);
    }

    private atualizarDuracao(valor: number) {
        this.duracaoTotal += valor;
        this.duracao = new DuracaoConvertida(this.duracaoTotal);
    }

    public static getControle(): ControleSeries {
        if (!ControleSeries.instanciado)
            ControleSeries.controle = new ControleSeries();
        return ControleSeries.controle;
    }
    public async buscarTitulos(titulo: string): Promise<Serie[]> {
        const repositorio = new SerieRepository();
        const series: Serie[] = await repositorio.buscarTitulos(titulo);
        return series;
    }

    public async adicionarSerie(id: number) {
        if (!this.serieExiste(id)) {
            const repositorio = new SerieRepository();
            const serie = await repositorio.buscarSerie(id);
            this.lista.push(serie);
            let valor = 0;
            if (serie.duracao) valor = serie.duracao;
            this.atualizarDuracao(valor);
            this.desenharLista();
            this.resultados = [];
        }
    }

    public removerSerie(id: number) {
        this.lista.forEach((serie) => {
            let indice = this.lista.indexOf(serie);
            if (serie.id == id) {
                this.lista.splice(indice, 1);
                let valor = 0;
                if (serie.duracao) valor = -serie.duracao;
                this.atualizarDuracao(valor);
                this.desenharLista();
            }
        });
    }

    public limparLista() {
        this.lista = [];
        this.desenharLista();
    }

    private serieExiste(id: number): boolean {
        let resultado: boolean = false;
        this.lista.forEach((elemento) => {
            resultado = elemento.id == id;
        });
        return resultado;
    }

    public desenharLista() {
        this.lista.forEach((serie) => {
            // this.desenharCard(serie);
        });
    }

    // public async desenharCard(serie: Serie) {
    //     return (
    //         <div className='max-w-sm rounded overflow-hidden shadow-lg'>
    //             <img
    //                 className='w-full'
    //                 src={`https://image.tmdb.org/t/p/w342/${serie.imagemUrl}`}
    //                 alt='Sunset in the mountains'
    //             ></img>
    //             <div className='px-6 py-4'>
    //                 <div className='font-bold text-xl mb-2'>{serie.titulo}</div>
    //                 <p className='text-gray-700 text-base'>{`${serie.duracaoConvertida.dias} dias, ${serie.duracaoConvertida.horas} horas, ${serie.duracaoConvertida.total} minutos`}</p>
    //             </div>
    //         </div>
    //     );
    // }
}
