

const Deshboard = () => {


    return (
        <div className="p-5 space-y-5">
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="flex flex-col md:flex-row gap-5 w-full ">
                    {/* ---- Left Purple Card ---- */}
                    <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl p-8 relative overflow-hidden">
                        {/* Header */}
                        <h2 className="text-xl font-semibold">Website Analytics</h2>
                        <p className="text-sm opacity-80 mt-1">Total 28.5% Conversion Rate</p>

                        {/* Spending Section */}
                        <div className="mt-8">
                            <p className="text-sm font-medium mb-4">Spending</p>

                            <div className="grid grid-cols-2 gap-4 max-w-sm">
                                {/* Item */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 px-3 py-1 rounded-md font-semibold">12h</div>
                                    <span className="opacity-80 text-sm">Spend</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 px-3 py-1 rounded-md font-semibold">18</div>
                                    <span className="opacity-80 text-sm">Order Size</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 px-3 py-1 rounded-md font-semibold">127</div>
                                    <span className="opacity-80 text-sm">Order</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 px-3 py-1 rounded-md font-semibold">2.3k</div>
                                    <span className="opacity-80 text-sm">Items</span>
                                </div>
                            </div>
                        </div>

                        {/* 3D Sphere Image */}
                        <img
                            src="/mnt/data/47ed2eb0-d4fe-46c2-b9b4-2b316cc53a20.png"
                            className="absolute right-8 bottom-6 w-48 drop-shadow-lg"
                            alt="3D Sphere"
                        />

                        {/* Carousel Dots */}
                        <div className="absolute top-6 right-8 flex gap-2">
                            <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                        </div>
                    </div>

                    {/* ---- Right Card ---- */}
                    <div className="w-80 bg-white rounded-xl shadow ">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">Average Daily Sales</h3>
                            <p className="text-gray-500 text-sm mt-1">Total Sales This Month</p>
                            <p className="text-3xl font-bold mt-4">$28,450</p>
                        </div>

                        {/* Fake Chart Wave */}
                        <div className="mt-6">
                            <svg viewBox="0 0 200 60" className="w-full">
                                <path
                                    d="M0 40 Q 50 10, 100 30 T 200 30"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M0 40 Q 50 10, 100 30 T 200 30 L200 60 L0 60 Z"
                                    fill="url(#gradient)"
                                    opacity="0.2"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="100%" stopColor="white" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="max-w-sm w-full bg-white rounded shadow p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Sales Overview</p>
                            <h2 className="text-3xl font-bold mt-1">$42.5k</h2>
                        </div>
                        <span className="text-green-500 font-semibold text-sm">+18.2%</span>
                    </div>

                    {/* Middle Section */}
                    <div className="flex items-center justify-around mt-6">
                        {/* Order */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                                <div className="p-2 bg-cyan-100 text-cyan-600 rounded-md">
                                    🛒
                                </div>
                                <p className="font-medium text-gray-700">Order</p>
                            </div>
                            <p className="text-2xl font-bold mt-1">62.2%</p>
                            <p className="text-gray-400 text-sm">6,440</p>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-14 bg-gray-200"></div>

                        {/* Visits */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                                    🔗
                                </div>
                                <p className="font-medium text-gray-700">Visits</p>
                            </div>
                            <p className="text-2xl font-bold mt-1">25.5%</p>
                            <p className="text-gray-400 text-sm">12,749</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-6 flex">
                        <div className="bg-cyan-500 h-2 rounded-l-full" style={{ width: "62.2%" }}></div>
                        <div className="bg-purple-500 h-2 rounded-r-full flex-1"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {/* ------------------ LEFT: Earnings Report ------------------ */}
                <div className="bg-white rounded-xl shadow p-8">
                    <h2 className="text-xl font-semibold">Earning Reports</h2>
                    <p className="text-gray-500 text-sm">Weekly Earnings Overview</p>

                    {/* Earnings Value */}
                    <div className="mt-6 flex items-center gap-3">
                        <h1 className="text-4xl font-bold">$468</h1>
                        <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-md">
                            +4.2%
                        </span>
                    </div>

                    <p className="text-gray-400 text-sm mt-2">
                        You informed of this week compared to last week
                    </p>

                    {/* Mini Bar Chart */}
                    <div className="flex items-end gap-6 mt-8 h-32">
                        {[
                            "h-12", "h-16", "h-20", "h-14", "h-28", "h-18", "h-14",
                        ].map((height, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-6 rounded-md bg-indigo-400/40 ${height}`}></div>
                                <span className="text-gray-400 text-xs mt-2">
                                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][i]}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Stats Box */}
                    <div className="bg-gray-50 rounded-xl p-5 mt-8 flex justify-between">
                        {/* Earnings */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-500 text-lg">💲</span>
                                <p className="text-gray-700 font-semibold">Earnings</p>
                            </div>
                            <h3 className="text-xl font-bold">$545.69</h3>
                            <div className="h-1 bg-gray-300 rounded-full w-24">
                                <div className="h-full w-12 bg-purple-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Profit */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-600 text-lg">🔄</span>
                                <p className="text-gray-700 font-semibold">Profit</p>
                            </div>
                            <h3 className="text-xl font-bold">$256.34</h3>
                            <div className="h-1 bg-gray-300 rounded-full w-24">
                                <div className="h-full w-10 bg-cyan-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Expense */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-red-500 text-lg">📉</span>
                                <p className="text-gray-700 font-semibold">Expense</p>
                            </div>
                            <h3 className="text-xl font-bold">$74.19</h3>
                            <div className="h-1 bg-gray-300 rounded-full w-24">
                                <div className="h-full w-10 bg-red-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------------ RIGHT: Support Tracker ------------------ */}
                <div className="bg-white rounded-xl shadow p-8">
                    <h2 className="text-xl font-semibold">Support Tracker</h2>
                    <p className="text-gray-500 text-sm">Last 7 Days</p>

                    <h1 className="text-4xl font-bold mt-6">164</h1>
                    <p className="text-gray-500 text-sm">Total Tickets</p>

                    {/* Ticket Stats */}
                    <div className="mt-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-indigo-500 text-xl">📩</span>
                            <div>
                                <p className="text-gray-700 font-medium">New Tickets</p>
                                <p className="text-gray-500 text-sm">142</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-teal-500 text-xl">📘</span>
                            <div>
                                <p className="text-gray-700 font-medium">Open Tickets</p>
                                <p className="text-gray-500 text-sm">28</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-orange-500 text-xl">⏱</span>
                            <div>
                                <p className="text-gray-700 font-medium">Response Time</p>
                                <p className="text-gray-500 text-sm">1 Day</p>
                            </div>
                        </div>
                    </div>

                    {/* Arc Gauge */}
                    <div className="mt-8 flex justify-center relative">
                        <svg width="220" height="120" viewBox="0 0 220 120">
                            {[...Array(24)].map((_, idx) => {
                                const angle = (idx * 180) / 23;
                                const rotate = angle - 90;
                                return (
                                    <rect
                                        key={idx}
                                        x="108"
                                        y="8"
                                        width="4"
                                        height="22"
                                        rx="2"
                                        fill={idx < 20 ? "#6366F1" : "#C7D2FE"} // purple vs pale
                                        transform={`rotate(${rotate} 110 110)`}
                                    />
                                );
                            })}
                        </svg>

                        <div className="absolute top-1/2 transform -translate-y-1/2 text-center">
                            <p className="text-gray-400 text-sm">Completed Task</p>
                            <h2 className="text-3xl font-bold mt-1">85%</h2>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default Deshboard;