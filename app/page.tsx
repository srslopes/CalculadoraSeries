'use client';

import useSWR from 'swr';

import {Serie} from '@/entity/serie.entity';
import {SerieRepository} from '@/repository/serie.repository';

interface MovieResponse {
    results: Movie[];
}
interface Movie {
    title: string;
    overview: string;
    id: Number;
    poster_path: string;
}

export default function Home() {
    const repository = new SerieRepository();
    let sopranos: Serie = {
        id: 0,
        titulo: '',
    };
    repository
        .buscarSerie(79864)
        .then((res) => {
            sopranos = res;
        })
        .then(() => {
            let total: number = 0;
            if (sopranos.duracao) total += sopranos.duracao;
            let dias = total / 1440;
            total = total % 1440;
            let horas = total / 60;
            total = total % 60;

            return (
                <div className='max-w-sm rounded overflow-hidden shadow-lg'>
                    <img
                        className='w-full'
                        src={`https://image.tmdb.org/t/p/w342/${sopranos.imagemUrl}`}
                        alt='Sunset in the mountains'
                    ></img>
                    <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>
                            {sopranos.titulo}
                        </div>
                        <p className='text-gray-700 text-base'>{`${dias} dias, ${horas} horas, ${total} minutos`}</p>
                    </div>
                </div>
            );
        });

    // const {data, error, isLoading} = useSWR<MovieResponse>(
    //     'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    //     async (url: string) => {
    //         return await fetch(url, {
    //             headers: {
    //                 accept: 'application/json',
    //                 Authorization:
    //                     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTBkMjViZTdlNTM5MzI2MzliYTI5NGE4NTEwODhhMSIsInN1YiI6IjY2M2Y3M2Y1MTgwYjBkZDllOGI2MWFhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J3h3rM8RbG73bF0YI9Io9Bb_YuuAQC3whGPuMLotw2k',
    //             },
    //         }).then((res) => res.json());
    //     },
    // );

    // if (error) return <div>Failed to load</div>;
    // if (isLoading) return <div>Loading...</div>;

    // console.log(data);
    // return (
    //     <div className='grid grid-flow-row-dense grid-cols-3 grid-rows-3'>
    //         {data?.results.map(({id, title, overview, poster_path}) => (
    //             <CardMovie
    //                 key={`${id}`}
    //                 title={title}
    //                 overview={overview}
    //                 id={id}
    //                 poster_path={poster_path}
    //             />
    //         ))}
    //     </div>
    // );
}

const CardMovie: React.FC<Movie> = (props) => {
    return (
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
            {/* <Image
                src='https://image.tmdb.org/t/p/w342/pbV2eLnKSIm1epSZt473UYfqaeZ.jpg'
                className='w-full'
                width={200}
                height={200}
                alt='Picture of the author'
            /> */}
            <img
                className='w-full'
                src={`https://image.tmdb.org/t/p/w342/${props.poster_path}`}
                alt='Sunset in the mountains'
            ></img>
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{props.title}</div>
                <p className='text-gray-700 text-base'>{props.overview}</p>
            </div>
            <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    #photography
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    #travel
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    #winter
                </span>
            </div>
        </div>
    );
};
