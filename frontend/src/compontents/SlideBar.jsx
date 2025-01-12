import React from 'react';
import { Link } from 'react-router-dom';

const SlideBar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col min-h-screen">

            {/* Navigation */}
            <nav className="flex-grow">
                <ul>
                    <li className="p-4 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                        <Link to={"/admin"}>
                            <span className='font-bold '>Dashboard</span>
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                        <Link to={"/admin"}>
                            <span>Hiển thị truyện</span>
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                        <span>Phân tích</span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SlideBar;
