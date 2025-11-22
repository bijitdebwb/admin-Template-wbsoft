import { MdManageAccounts } from "react-icons/md";

const Profile = () => {


    return (
        <div className="flex">
            <div className="flex flex-col w-full lg:w-1/4 gap-4 mt-5 lg:ml-4">
                <div className="w-full overflow-hidden  shadow-md border border-slate-200 bg-white transition-transform duration-300 hover:scale-[1.01]">

                    <div className="flex justify-center items-center mt-4">
                        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden bg-white border border-slate-200">
                            <img
                                className="w-full h-full object-cover"
                                src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80"
                                alt="User profile"
                            />
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <h1 className="font-semibold text-slate-900">
                            Md Minhajul Islam
                        </h1>
                    </div>
                    <div className="flex justify-center mt-2 mb-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                            Developer
                        </span>
                    </div>

                    <div className="flex justify-between  gap-3 px-4 mb-4">
                        <div className="flex-1 text-left py-3">
                            <h6 className="text-lg font-bold">1200tk</h6>
                            <p className="text-xs mt-1">
                                Installation Charge
                            </p>
                        </div>
                        <div className="flex-1 text-left py-3">
                            <h6 className="text-lg font-bold">2150tk</h6>
                            <p className="text-xs mt-1">
                                Monthly Charge
                            </p>
                        </div>
                    </div>

                    <div className="px-4 border-b border-gray-300 pt-3">
                        <h1 className="font-bold text-slate-900  text-base">
                            Details
                        </h1>
                    </div>

                    <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-slate-800 ">
                        <div className="flex gap-4">
                            <div className="flex w-2/5 gap-2">
                                <div className="flex-1 font-semibold space-y-1">
                                    <p>Email</p>
                                    <p>Phone</p>
                                    <p>Telephone</p>
                                    <p>Address</p>
                                    <p>District</p>
                                    <p>Interest</p>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {Array(6)
                                        .fill(":")
                                        .map((colon, idx) => (
                                            <p key={idx}>{colon}</p>
                                        ))}
                                </div>
                            </div>
                            <div className="flex-1 w-3/5 space-y-1">
                                <p>minhaj@gamil.com</p>
                                <p>01309085965</p>
                                <p>01734694872</p>
                                <p>Mohakhali DOSH, Dhaka</p>
                                <p>Dhaka</p>
                                <p>78</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Edit</button>
                         <button>Edit</button>
                    </div>
                </div>
               
            </div>

            <div className="flex flex-col w-full lg:w-3/4 gap-4 mt-5 mr-5 lg:ml-4">
                <div className="flex items-center gap-6">
                    <button className="flex  gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2"><MdManageAccounts size={22}/> <span>Account</span></button>
                    <button className="flex  gap-1 bg-warning text-warning-content hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2"><MdManageAccounts size={22}/> <span>Security</span></button>
                    <button className="flex  gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2"><MdManageAccounts size={22}/> <span>Billing & Plan</span></button>
                    <button className="flex  gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2"><MdManageAccounts size={22}/> <span>Notification</span></button>
                    <button className="flex  gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2"><MdManageAccounts size={22}/> <span>Connections</span></button>
                    
                </div>

                <div className="px-5 py-4 rounded bg-white shadow">
                    <h5 class="w-full bg-white mb-4 font-bold">Change Password</h5>
                    <form
                        id="formChangePassword"
                        method="GET"
                        className="space-y-6"
                        noValidate
                    >
                        {/* Alert */}
                        <div className="relative rounded-md border-l-4 border-yellow-500 bg-yellow-50 px-4 py-3">
                            <h5 className="mb-1 text-xl font-semibold text-[#FF9F43]">
                                Ensure that these requirements are met
                            </h5>
                            <span className="text-md text-[#FF9F43]">
                                Minimum 8 characters long, uppercase &amp; symbol
                            </span>
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-[#FF9F43] text-2xl leading-none"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        {/* Fields */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* New Password */}
                            <div className="space-y-1">
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                    htmlFor="newPassword"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="············"
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                        <i className="ti tabler-eye-off text-base" />
                                    </span>
                                </div>
                                {/* Error message placeholder */}
                                <p className="mt-1 text-xs text-red-500 hidden">
                                    Error message goes here
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="············"
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                        <i className="ti tabler-eye-off text-base" />
                                    </span>
                                </div>
                                {/* Error message placeholder */}
                                <p className="mt-1 text-xs text-red-500 hidden">
                                    Error message goes here
                                </p>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;