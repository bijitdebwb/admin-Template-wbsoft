import { NavLink } from "react-router";
import Logo from "../../assets/logo/wbLogo.png";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { TbCurrencyDollar } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa6";
import {
    IoIosArrowDown,
    IoIosArrowUp,
    IoIosArrowForward,
} from "react-icons/io";
import { useEffect, useRef, useState } from "react";
// import UseAuth from "../../Hooks/UseAuth";

const Navbar = () => {
    // const { user, hasAccess } = UseAuth();
    const dropdownRef = useRef(null);
    const profileImageRef = useRef(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const notificationDropdownRef = useRef(null);
    const notificationIconRef = useRef(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
    };
    const toggleNotificationDropdown = () => {
        setIsNotificationOpen((prev) => !prev);
    };


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileImageRef.current &&
                !profileImageRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close profile dropdown
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileImageRef.current &&
                !profileImageRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }

            // Close notification dropdown
            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target) &&
                notificationIconRef.current &&
                !notificationIconRef.current.contains(event.target)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div className="navbar px-5 bg-base-200 shadow-sm">
            <div className="navbar-start -my-4">
                <NavLink>
                    <img src={Logo} alt="logo" />
                </NavLink>
            </div>

            <ul className="navbar-center hidden lg:flex">
                <li className="group/item relative font-medium text-base text-primary-content">
                    <NavLink to="/" className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary   cursor-pointer">
                        Dashboard
                    </NavLink>
                </li>
                <li className="group/item relative font-medium text-base text-primary-content">
                    <span className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary   cursor-pointer">
                        Task
                        <IoIosArrowDown className="block group-hover/item:hidden transition-transform duration-300" />
                        <IoIosArrowUp className="hidden group-hover/item:block transition-transform duration-300" />
                    </span>

                    <ul className="absolute top-10 left-0 p-2 bg-base-200 rounded-md text-primary-content  shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/item:opacity-100 group-hover/item:scale-y-100 group-hover/item:translate-y-0">
                        <li>
                            <NavLink
                                to="/"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Dashbord
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/card"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Card
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/table"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Table
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/role"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Role
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/subject"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Subject
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="group/item relative font-medium text-base text-primary-content">
                    <span className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary   cursor-pointer">
                        Academic
                        <IoIosArrowDown className="block group-hover/item:hidden transition-transform duration-300" />
                        <IoIosArrowUp className="hidden group-hover/item:block transition-transform duration-300" />
                    </span>

                    <ul className="absolute top-10 left-0 p-2 bg-base-200 rounded-md text-primary-content  shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/item:opacity-100 group-hover/item:scale-y-100 group-hover/item:translate-y-0">
                        <li>
                            <NavLink
                                to="/course"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Course
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/class"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Class
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/department "
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Department
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/subject"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Subject
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/chapter"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Chapter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/topic"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Topic
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li className="group/item relative font-medium text-base text-primary-content">
                    <span className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary   cursor-pointer">
                        Others
                        <IoIosArrowDown className="block group-hover/item:hidden transition-transform duration-300" />
                        <IoIosArrowUp className="hidden group-hover/item:block transition-transform duration-300" />
                    </span>

                    <ul className="absolute top-10 left-0 p-2 bg-base-200 rounded-md text-primary-content  shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/item:opacity-100 group-hover/item:scale-y-100 group-hover/item:translate-y-0">
                        <li>
                            <NavLink
                                to="/tags"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Tags
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/question-year"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Question Year
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/board "
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Board
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/institute"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Institute
                            </NavLink>
                        </li>

                        <li className="block relative group/sub min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"><span className=" flex items-center justify-between">University <IoIosArrowForward /> </span>

                            <ul className="absolute top-0 left-full p-2 bg-base-200 rounded-md text-primary-content text-center shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/sub:opacity-100 group-hover/sub:scale-y-100 group-hover/sub:translate-y-0">
                                <li>
                                    <NavLink
                                        to="/university"
                                        className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                                    >
                                        University
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/unit"
                                        className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                                    >
                                        Unit
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li className="group/item relative font-medium text-base text-primary-content">
                    <span className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary   cursor-pointer">
                        Exam
                        <IoIosArrowDown className="block group-hover/item:hidden transition-transform duration-300" />
                        <IoIosArrowUp className="hidden group-hover/item:block transition-transform duration-300" />
                    </span>

                    <ul className="absolute top-10 left-0 p-2 bg-base-200 rounded-md text-primary-content  shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/item:opacity-100 group-hover/item:scale-y-100 group-hover/item:translate-y-0">
                        <li>
                            <NavLink
                                to="/notes"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/question"
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/creative-question "
                                className="block min-w-40 p-2 rounded-md hover:bg-secondary   transition-colors"
                            >
                                Creative Question
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="navbar-end">
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
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content right-0 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li>
                                    <a>Submenu 1</a>
                                </li>
                                <li>
                                    <a>Submenu 2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>Item 3</a>
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:flex items-center gap-5">

                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="synthwave" />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                </div>

                {/* Notification Icon + Dropdown */}
                <div className="relative px-4">
                    <button
                        type="button"
                        ref={notificationIconRef}
                        onClick={toggleNotificationDropdown}
                        className="relative p-1 rounded-full hover:bg-base-300 transition-colors"
                        aria-label="Notifications"
                        aria-expanded={isNotificationOpen}
                    >
                        <IoMdNotificationsOutline size={32} />

                        {/* Small unread indicator dot (optional) */}
                        <span className="absolute text-error-content -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-error">5</span>
                    </button>

                    {isNotificationOpen && (
                        <div
                            ref={notificationDropdownRef}
                            className="absolute right-0 top-11 mt-3 w-80 bg-secondary-content shadow-lg rounded-md text-sm text-primary-content z-50"
                        >
                            <div className="flex items-center justify-between border-b border-base-300 pr-5">
                                <h1 className="px-4 py-3  font-semibold">Notifications</h1>
                                <div className="flex gap-3">
                                    <h1 className="bg-[#FFF2DB] text-warning text-[12px] px-2 py-1 rounded-sm">8 New</h1>
                                    <IoMailOpenOutline size={24} />
                                </div>
                            </div>

                            <ul className="max-h-80 overflow-y-auto">
                                
                                <li className="flex relative group py-3 border-b border-base-300 hover:bg-base-100 cursor-pointer items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-[14px] font-medium">Send connection request</p>
                                        <p className="text-[10px]">Peter send you connection request</p>
                                        <p className="text-xs opacity-70">4 days ago</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3">
                                        <IoClose size={30}/>
                                    </div>
                                </li>

                                 <li className="flex relative group py-3 border-b border-base-300 hover:bg-base-100 cursor-pointer items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-[14px] font-medium">Send connection request</p>
                                        <p className="text-[10px]">Peter send you connection request</p>
                                        <p className="text-xs opacity-70">4 days ago</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3">
                                        <IoClose size={30}/>
                                    </div>
                                </li>
                                 <li className="flex relative group py-3 border-b border-base-300 hover:bg-base-100 cursor-pointer items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-[14px] font-medium">Send connection request</p>
                                        <p className="text-[10px]">Peter send you connection request</p>
                                        <p className="text-xs opacity-70">4 days ago</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3">
                                        <IoClose size={30}/>
                                    </div>
                                </li>
                            </ul>

                            <div className="w-70 mx-auto border-t border-base-300 px-4 py-2 my-4 text-center text-xs text-warning-content bg-warning rounded-sm cursor-pointer">
                                View all notifications
                            </div>
                        </div>
                    )}
                </div>


                <div
                    ref={profileImageRef}
                    onClick={toggleDropdown}
                    className="w-10 h-10 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-secondary">
                    <img
                        className="w-full h-full object-cover rounded-full transition-colors duration-300 group-hover/item:bg-secondary   cursor-pointer"
                        src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="Profile"
                    />
                </div>

                {/* Dropdown */}
                {isDropdownVisible && (
                    <div
                        ref={dropdownRef}
                        className="absolute right-5 top-14 mt-3 w-64 bg-secondary-content shadow-lg rounded-md text-sm text-primary-content z-50"
                    >
                        <div className="flex items-center gap-3 p-4 border-b border-base-300">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="Profile"
                                />
                            </div>
                            <div>
                                <h1 className="font-semibold">Minhajul Islam</h1>
                                <p className="text-xs opacity-70"></p>
                            </div>
                        </div>

                        {/* Menu items */}
                        <ul className="py-2 text-sm">
                            <li>
                                <NavLink to="/profile" className="flex items-center gap-4 px-4 py-2 hover:bg-base-200">
                                    <FaRegUserCircle size={24} />
                                    <h1 className="text-[14px] font-semibold">My Profile</h1>
                                </NavLink>
                            </li>
                             <li>
                                <NavLink to="/profile" className="flex items-center gap-4 px-4 py-2 hover:bg-base-200">
                                    <MdOutlineSettings size={24} />
                                    <h1 className="text-[14px] font-semibold">Settings</h1>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className="flex items-center gap-4 px-4 py-2 border-b border-base-300 hover:bg-base-200">
                                    <FaFileInvoiceDollar size={24} />
                                    <h1 className="text-[14px] font-semibold">Billing</h1>
                                </NavLink>
                            </li>
                           
                            
                             <li>
                                <NavLink to="/profile" className="flex items-center gap-4 px-4 py-2  hover:bg-base-200">
                                    <TbCurrencyDollar size={24} />
                                    <h1 className="text-[14px] font-semibold">Billing</h1>
                                </NavLink>
                            </li>
                             <li>
                                <NavLink to="/profile" className="flex items-center gap-4 px-4 py-2  hover:bg-base-200">
                                    <FaQuestion size={24} />
                                    <h1 className="text-[14px] font-semibold">FAQ</h1>
                                </NavLink>
                            </li>

                        </ul>

                        {/* Logout */}
                        <div className="p-3">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-error text-error-content text-sm font-medium hover:brightness-95"
                            // onClick={handleLogout}
                            >
                                Logout
                                <IoIosLogOut />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div >
    );
};

export default Navbar;
