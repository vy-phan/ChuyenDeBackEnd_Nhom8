import React from 'react';
import { Link } from 'react-router-dom';

const SlideBar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col min-h-screen">

            {/* Navigation */}
            <nav className="flex-grow">
                <ul>
                    <Link to={"/admin"}>
                        <li className="p-4 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                            <span className='font-bold '>Dashboard</span>
                        </li>
                    </Link>
                    <Link to={"/admin"}>
                        <li className="p-4 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                            <span>Hiển thị truyện</span>
                        </li>
                    </Link>
                    <Link to={"/admin/the-loai"}>
                        <li className="p-4 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                            <span>Hiển thị thể loại</span>
                        </li>
                    </Link>
                </ul>
            </nav>
        </aside>
    );
};

export default SlideBar;
