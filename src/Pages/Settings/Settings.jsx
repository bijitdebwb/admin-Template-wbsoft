import { FaSearch, FaUserShield, FaLock, FaComments, FaBell, FaKeyboard, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { url } from "../../../connection";
import { toast } from "react-toastify";
import { Link } from "react-router";
import bgPhoto from "../../assets/logo/bg.png"
import defaultPhoto from "../../assets/logo/defaultPhoto.png"
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const Settings = () => {
    const axiosSecure = UseAxiosSecure();
    const { user, isLoading } = UseAuth();



    const settingsOptions = [
        { icon: <FaUserShield size={20} />, link: "/profile", label: "Account", desc: "Security notifications, account info" },
        { icon: <FaLock size={20} />, link: "#", label: "Privacy", desc: "Blocked contacts, disappearing messages" },
        { icon: <FaComments size={20} />, link: "#", label: "Chats", desc: "Theme, wallpaper, chat settings" },
        { icon: <FaBell size={20} />, link: "#", label: "Notifications", desc: "Message notifications" },
        { icon: <FaKeyboard size={20} />, link: "#", label: "Keyboard shortcuts", desc: "Quick actions" },
        { icon: <FaQuestionCircle size={20} />, link: "#", label: "Help", desc: "Help center, contact us, privacy policy" },
    ];

    const handleLogout = async () => {
        try {
            const res = await axiosSecure.get("/api/logout");
            if (res?.data?.success === true) {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                toast.success(res?.data?.message);
                window.location.href = "/login";
            }
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Logout failed. Please try again.";
            toast.error(message);
        };
    };
    if (isLoading) {
        isLoading
    }


    return (
        <div className="flex w-full">
            {/* Sidebar */}
            <div className="w-full sm:w-[50%] lg:w-[30%] h-screen overflow-y-scroll bg-white flex flex-col pb-8 sm:pb-0 ">
                <h2 className="text-xl font-bold p-4 text-primary-content">Settings</h2>

                {/* Search */}
                <div className="flex items-center h-10 gap-2 bg-gray-100 mx-5 px-3 py-2 rounded-3xl border border-transparent focus-within:border-primary">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search settings"
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                </div>

                <div className="p-4 ">
                    {/* Profile */}
                    <Link to="/profile" className="flex items-center gap-3 p-2 mb-2 border-b border-accent">
                        <img
                            src={user?.image ? `${url}/storage/uploads/user_img/${user?.image}` : defaultPhoto}
                            alt={user?.name}
                            className="rounded-full w-12 h-12"
                        />
                        <div>
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-500">Hey there! I am using WhatsApp.</p>
                        </div>
                    </Link>

                    {/* Settings Options */}
                    <div className="flex-1 overflow-y-auto">
                        {settingsOptions.map((item, index) => (
                            <Link to={item.link}
                                key={index}
                                className="flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-neutral cursor-pointer"
                            >
                                <div className="text-xl text-gray-600 p-2">{item.icon}</div>
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </Link>
                        ))}

                        {/* Logout */}
                        <div onClick={() => handleLogout()} className="flex items-center gap-3 rounded-lg px-5 py-4  text-red-600 hover:bg-red-50 cursor-pointer">
                            <div className="p-2"><FaSignOutAlt size={20} /></div>
                            <span className="font-medium">Log out</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Chat Area */}
            <div
                className="w-full sm:w-[50%] md:w-[70%] hidden sm:flex flex-1 border-l border-accent bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bgPhoto})`, backgroundSize: "700px",
                }}
            >
                <h2 className="text-2xl font-bold p-4 flex justify-center items-center h-full">Settings Content</h2>
            </div>
        </div>
    );
};

export default Settings;
