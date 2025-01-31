import React from 'react'
import { formatDate } from '../utils/dataFomat.js';
import { getGenreData } from '../hooks/useGenres.js'

const Card = ({ manga, genres }) => {
    return (
        <div className="card bg-base-100 w-[70%] max-w-xs mx-auto shadow-xl my-2 min-w-[200px]">
            <figure>
                <img
                    src={manga.poster}
                    alt={manga.title}
                    loading="lazy"
                    className="h-49 w-full object-cover sm:h-64 lg:h-56 xl:h-64"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-base md:text-lg font-bold">
                    {manga.title}
                </h2>
                <p className="text-sm text-gray-500">{formatDate(manga.updatedAt)}</p>
                <div className="card-actions justify-start">
                    {getGenreData(manga.genres, genres).map((genre) => (
                        <div key={genre.id} className="badge badge-outline">
                            {genre.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        
    )
}

export default Card