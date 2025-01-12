import React from 'react'
import useMangaData from '../hooks/useMangaData';
import useUserData from '../hooks/useUserData';

const Status = () => {
    const { mangaData } = useMangaData();
    const totalManga = mangaData?.length;
    const { user } = useUserData();
    const totalUser = user?.length;
    const totalChapter = mangaData?.reduce((total, manga) => total + manga.chapters.length, 0);
    console.log(totalChapter);
    
    return (
        <>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                    <div className="stat-title">Số truyện</div>
                    <div className="stat-value">{totalManga}</div>
                    <div className="stat-desc">1/11 - 12/12</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Số tài khoản</div>
                    <div className="stat-value">{totalUser}</div>
                    <div className="stat-desc">↗︎ 100 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Tổng số chương</div>
                    <div className="stat-value">{totalChapter}</div>
                    <div className="stat-desc">↘︎ 30 (14%)</div>
                </div>
            </div></>
    )
}

export default Status