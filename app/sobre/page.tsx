/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <Link href={'/'}>
                <div className='absolute top-0 left-0 m-4 flex items-center ps-3 cursor-pointer'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-arrow-left-circle'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fill-rule='evenodd'
                            d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z'
                        />
                    </svg>
                </div>
            </Link>
            <div className='m-20 align-middle justify-center flex flex-col'>
                <label className=''>CALCULADORA DE SÉRIES</label>
                <label>
                    Calcule quanto tempo da sua vida foi gasto assistindo
                    series.
                </label>
                <label>
                    Digite o nome da série desejada para o sistema procurá-la na
                    base de dados, selecione entre as opções adequadas para
                    adicioná-la a sua lista.
                </label>
                <label>
                    Digite o nome da série desejada para o sistema procurá-la na
                    base de dados, selecione entre as opções adequadas para
                    adicioná-la a sua lista.
                </label>
                <label>
                    Para cada série adicionada ou removida o total de tempo
                    assistido é atualizado.
                </label>
                <label>
                    Clique no botão "Remover" no card da série caso deseje
                    excluí-la da lista.
                </label>
                <label>
                    Projeto desenvolvido para teste técnico de uma vaga de
                    estágio.
                </label>
                <label>
                    O sistema usa a base de dados The Movie Database(TMDB).
                </label>
                <label>
                    O objetivo é demonstrar a aptidão no uso de tecnologias como
                    NEXTjs, Tailwind CSS, chamadas de API, etc.
                </label>
                <label>Link github:</label>
                <Link href={'https://github.com/srslopes/CalculadoraSeries'}>
                    <label className='text-blue-500 cursor-pointer hover:text-blue-300'>
                        https://github.com/srslopes/CalculadoraSeries
                    </label>
                </Link>
            </div>
        </div>
    );
}
