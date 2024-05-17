/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';

import {ControleSeries} from '@/controle/controle.series';
import {DuracaoConvertida} from '@/entity/duracaoconvertida.entity';
import {Serie} from '@/entity/serie.entity';

export default function Home() {
    const [lista, setLista] = useState<Serie[]>([]);
    const [total, setTotal] = useState<DuracaoConvertida[]>([]);
    const [pesquisa, setPesquisa] = useState('');
    const [adicionada, setAdicionada] = useState(0);
    const [removida, setRemovida] = useState(0);
    const [resultados, setResultados] = useState<Serie[]>([]);

    useEffect(() => {
        const buscarSerie = async (id: number) => {
            if (id > 0) {
                const controle = ControleSeries.getControle();
                await controle.adicionarSerie(id);
                setLista(controle.lista);
                const arr = [controle.duracao];
                setTotal(arr);
            }
        };
        buscarSerie(adicionada);
    }, [adicionada]);

    useEffect(() => {
        const removerSerie = async (id: number) => {
            if (id > 0) {
                const controle = ControleSeries.getControle();
                controle.removerSerie(id);
                setLista(controle.lista);
                const arr = [controle.duracao];
                if (controle.duracaoTotal == 0) {
                    setTotal([]);
                    console.log('vazio');
                }
                setTotal(arr);
            }
        };
        removerSerie(removida);
    }, [removida]);

    useEffect(() => {
        const buscarResultados = async (titulo: string) => {
            const controle = ControleSeries.getControle();
            let lista: Serie[] = [];
            if (titulo) {
                lista = await controle.buscarTitulos(titulo);
                setResultados(lista);
            } else setResultados([]);
        };
        buscarResultados(pesquisa);
    }, [pesquisa]);

    function handleChange(termo: string) {
        setPesquisa(termo);
        console.log('Pesquisa:', termo);
    }
    function handleAdiconar(id: number) {
        setPesquisa('');
        setAdicionada(id);
    }
    function handleremover(id: number) {
        setRemovida(id);
    }
    function search(event: any) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    }

    return (
        <div className='bg-slate-950'>
            <div className='bg-slate-950'>
                <div
                    className='
                    Cabeçalho
                    container
                    alingn-top
                    m-4
                    w-full
                    h-auto
                    flex flex-col
                    items-center
                    '
                >
                    <div
                        className='
                        Titulo
                        mx-4
                        mt-4
                        w-auto
                        align-top
                        justify-center
                        flex flex-row
                        h-auto
                        '
                    >
                        <label
                            className='
                            Titulo
                            m-4
                            text-white
                            font-sans
                            subpixel-antialiased
                            text-4xl
                            '
                        >
                            Calculadora de Séries
                        </label>
                    </div>
                    <div
                        className='
                        TotalCalculadora
                        mx-4
                        mt-4
                        w-auto
                        align-top
                        justify-center
                        flex flex-row
                        h-auto'
                    >
                        {total?.map((duracao) => {
                            if (
                                duracao.dias == 0 &&
                                duracao.horas == 0 &&
                                duracao.minutos == 0
                            )
                                return;
                            return (
                                <label
                                    key={'duracao'}
                                    className='Titulo
                                    m-4
                                    text-white
                                    font-sans
                                    subpixel-antialiased
                                    text-2xl'
                                >
                                    Total: {duracao.dias} dias, {duracao.horas}{' '}
                                    horas e {duracao.minutos} minutos
                                </label>
                            );
                        })}
                    </div>
                    <div
                        className='
                BarraPesquisa
                container
                flex flex-row
                grid-rows-1
                text-center
                w-auto
                items-center'
                    >
                        <div
                            className='
                            Elementos
                            m-4
                            aligh-top
                            flex flex-col
                            h-auto
                            justify-center
                            w-auto
                            '
                        >
                            <div
                                className='
                                CaixaPesquisa
                                h-auto
                                w-fill
                                justify-center
                                flex flex-row
                                ps-3'
                            >
                                <div className='relative w-full'>
                                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                        <svg
                                            className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 20 20'
                                        >
                                            <path
                                                stroke='currentColor'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
                                                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type='text'
                                        id='simple-search'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        placeholder='Procurar série...'
                                        value={pesquisa}
                                        onKeyDown={(event) => search(event)}
                                        onChange={(event) =>
                                            handleChange(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div
                                className='Resultados
                                        container
                                        h-auto

                                        flex flex-col
                                        justify-items-center
                                        '
                            >
                                <div className='bg-white divide-y ml-3 divide-gray-100 rounded-lg shadow w-fill dark:bg-gray-700'>
                                    <ul
                                        className=' text-sm text-gray-700 dark:text-gray-200'
                                        aria-labelledby='dropdown-button'
                                    >
                                        {resultados
                                            ?.slice(0, 3)
                                            .map((serie: Serie) => {
                                                return (
                                                    <li key={serie.id}>
                                                        <button
                                                            value={serie.id}
                                                            onClick={(event) =>
                                                                handleAdiconar(
                                                                    parseInt(
                                                                        event
                                                                            .currentTarget
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            type='button'
                                                            className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                                        >
                                                            {serie.titulo}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='Corpo
                            m-4
                            align-top
                            h-auto
                            w-fill
                            bg-slate-950
                            '
                >
                    <div
                        className='Lista
                                container
                                h-auto
                                w-fill
                                justify-center
                                flex flex-wrap flex-row
                                overflow-y-auto
                                '
                    >
                        {lista?.map((serie: Serie) => {
                            console.log(serie.duracaoConvertida);
                            return (
                                <div className='m-4 w-1/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                                    <img
                                        className='p-5 rounded-t-lg object-cover'
                                        src={serie.imagemUrl}
                                        alt='Sunset in the mountains'
                                    ></img>
                                    <div className='px-4 pb-4 container justify-items-center'>
                                        <a href='#'>
                                            <h5 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
                                                {serie.titulo}
                                            </h5>
                                            <h5 className='text-md font-semibold tracking-tight text-gray-900 dark:text-white'>
                                                {serie.duracaoConvertida?.dias}{' '}
                                                dias,{' '}
                                                {serie.duracaoConvertida?.horas}{' '}
                                                horas e{' '}
                                                {
                                                    serie.duracaoConvertida
                                                        ?.minutos
                                                }{' '}
                                                minutos
                                            </h5>
                                        </a>
                                        <div className='flex items-center justify-between'>
                                            <button
                                                key={serie.id}
                                                value={serie.id}
                                                onClick={(event) => {
                                                    handleremover(
                                                        parseInt(
                                                            event.currentTarget
                                                                .value,
                                                        ),
                                                    );
                                                    console.log(
                                                        event.currentTarget
                                                            .value,
                                                    );
                                                }}
                                                className='mt-4 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Link href={'/sobre'}>
                <div className='absolute top-0 right-0 m-4 flex items-center ps-3 cursor-pointer className='bg-slate-950'>'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-question-circle'
                        viewBox='0 0 16 16'
                    >
                        <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                        <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94' />
                    </svg>
                </div>
            </Link>
        </div>
    );
}
