import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

function Navbar() {
    const [sticky, setSticky] = useState(false); // Define sticky state
    const [theme, setTheme] = useState('light'); // Define theme state

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Books', path: '/books' },
        { label: 'Contact', path: '/contact' },
        { label: 'About', path: '/about' },
    ];

    return (
        <div
            className={`
                max-w-screen-2xl 
                container 
                mx-auto 
                md:px-20 
                px-4 
                fixed 
                top-0 
                left-0 
                right-0 
                z-50 
                ${
                    sticky
                        ? 'sticky-navbar shadow-2xl bg-base-200 duration-300 transition-all ease-in-out'
                        : ''
                }
            `}
        >
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    {/* Mobile Dropdown Menu */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl font-bold cursor-pointer">
                        BookStop
                    </Link>
                </div>

                <div className="navbar-end space-x-3">
                    {/* Desktop Navigation */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Search Input */}
                    <div className="hidden md:block">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                    </div>

                    {/* Login Button */}
                    <a
                        className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                        onClick={()=>document.getElementById("my_modal_3").showModal()}
                    >
                        Login
                    </a>
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
