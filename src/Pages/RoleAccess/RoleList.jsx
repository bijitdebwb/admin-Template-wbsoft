import bgPhoto from "../../assets/logo/bg.png";
import { useState, useMemo, useRef, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import RoleAdd from "./RoleAdd";
import RoleUpdate from "./RoleUpdate";

const roleStack = [
    {
        singleRoleData: {
            id: 13,
            name: "user",
            guard_name: "web",
            status: 1,
            created_at: "2025-10-21T07:46:13.000000Z",
            updated_at: "2025-10-22T09:05:13.000000Z",
        },
        rolePermissionData: [
            { id: 1, name: "user-list", guard_name: "web", group_name: "user-access" },
            { id: 2, name: "user-create", guard_name: "web", group_name: "user-access" },
            { id: 3, name: "user-edit", guard_name: "web", group_name: "user-access" },
            { id: 4, name: "user-delete", guard_name: "web", group_name: "user-access" },
            { id: 5, name: "role-list", guard_name: "web", group_name: "role-access" },
            { id: 6, name: "role-create", guard_name: "web", group_name: "role-access" },
            { id: 7, name: "role-edit", guard_name: "web", group_name: "role-access" },
            { id: 8, name: "role-delete", guard_name: "web", group_name: "role-access" },
            { id: 57, name: "project-list", guard_name: "web", group_name: "project-access" },
            { id: 58, name: "project-create", guard_name: "web", group_name: "project-access" },
            { id: 59, name: "project-edit", guard_name: "web", group_name: "project-access" },
            { id: 60, name: "project-delete", guard_name: "web", group_name: "project-access" },
            { id: 61, name: "lead-list", guard_name: "web", group_name: "lead-access" },
            { id: 62, name: "lead-create", guard_name: "web", group_name: "lead-access" },
            { id: 63, name: "lead-edit", guard_name: "web", group_name: "lead-access" },
            { id: 64, name: "lead-delete", guard_name: "web", group_name: "lead-access" },
            { id: 65, name: "lead-group-list", guard_name: "web", group_name: "lead-group" },
            { id: 66, name: "lead-group-create", guard_name: "web", group_name: "lead-group" },
            { id: 67, name: "lead-group-edit", guard_name: "web", group_name: "lead-group" },
            { id: 68, name: "lead-group-delete", guard_name: "web", group_name: "lead-group" },
            { id: 69, name: "lead-group-member-list", guard_name: "web", group_name: "lead-group-member" },
            { id: 70, name: "lead-group-member-create", guard_name: "web", group_name: "lead-group-member" },
            { id: 71, name: "lead-group-member-edit", guard_name: "web", group_name: "lead-group-member" },
            { id: 72, name: "lead-group-member-delete", guard_name: "web", group_name: "lead-group-member" },
            { id: 73, name: "zone-list", guard_name: "web", group_name: "zone-access" },
            { id: 74, name: "zone-create", guard_name: "web", group_name: "zone-access" },
            { id: 75, name: "zone-edit", guard_name: "web", group_name: "zone-access" },
            { id: 76, name: "zone-delete", guard_name: "web", group_name: "zone-access" },
            { id: 78, name: "general-setting-access", guard_name: "web", group_name: "setting-access" },
            { id: 79, name: "logo-setting-access", guard_name: "web", group_name: "setting-access" },
            { id: 80, name: "photo-gallery-access", guard_name: "web", group_name: "setting-access" },
        ],
    },
    {
        singleRoleData: {
            id: 14,
            name: "moderator",
            guard_name: "web",
            status: 1,
            created_at: "2025-10-21T07:47:39.000000Z",
            updated_at: "2025-10-21T07:47:39.000000Z",
        },
        rolePermissionData: [
            { id: 1, name: "user-list", guard_name: "web", group_name: "user-access" },
            { id: 2, name: "user-create", guard_name: "web", group_name: "user-access" },
            { id: 3, name: "user-edit", guard_name: "web", group_name: "user-access" },
            { id: 4, name: "user-delete", guard_name: "web", group_name: "user-access" },
            { id: 5, name: "role-list", guard_name: "web", group_name: "role-access" },
            { id: 6, name: "role-create", guard_name: "web", group_name: "role-access" },
            { id: 7, name: "role-edit", guard_name: "web", group_name: "role-access" },
            { id: 8, name: "role-delete", guard_name: "web", group_name: "role-access" },
            { id: 9, name: "account-list", guard_name: "web", group_name: "account-access" },
            { id: 10, name: "account-create", guard_name: "web", group_name: "account-access" },
            { id: 11, name: "account-edit", guard_name: "web", group_name: "account-access" },
            { id: 12, name: "account-delete", guard_name: "web", group_name: "account-access" },
            { id: 13, name: "account-category-list", guard_name: "web", group_name: "account-category-access" },
            { id: 14, name: "account-category-create", guard_name: "web", group_name: "account-category-access" },
            { id: 15, name: "account-category-edit", guard_name: "web", group_name: "account-category-access" },
            { id: 16, name: "account-category-delete", guard_name: "web", group_name: "account-category-access" },
            { id: 17, name: "payee-list", guard_name: "web", group_name: "payee-access" },
            { id: 18, name: "payee-create", guard_name: "web", group_name: "payee-access" },
            { id: 19, name: "payee-edit", guard_name: "web", group_name: "payee-access" },
            { id: 20, name: "payee-delete", guard_name: "web", group_name: "payee-access" },
            { id: 21, name: "expense-list", guard_name: "web", group_name: "expense-access" },
            { id: 22, name: "expense-create", guard_name: "web", group_name: "expense-access" },
            { id: 23, name: "expense-edit", guard_name: "web", group_name: "expense-access" },
            { id: 24, name: "expense-delete", guard_name: "web", group_name: "expense-access" },
            { id: 25, name: "expense-category-list", guard_name: "web", group_name: "expense-category-access" },
            { id: 26, name: "expense-category-create", guard_name: "web", group_name: "expense-category-access" },
            { id: 27, name: "expense-category-edit", guard_name: "web", group_name: "expense-category-access" },
            { id: 28, name: "expense-category-delete", guard_name: "web", group_name: "expense-category-access" },
            { id: 29, name: "expense-receipt-list", guard_name: "web", group_name: "expense-receipt-access" },
            { id: 30, name: "expense-receipt-create", guard_name: "web", group_name: "expense-receipt-access" },
            { id: 31, name: "expense-receipt-edit", guard_name: "web", group_name: "expense-receipt-access" },
            { id: 32, name: "expense-receipt-delete", guard_name: "web", group_name: "expense-receipt-access" },
            { id: 33, name: "receiver-list", guard_name: "web", group_name: "receiver-access" },
            { id: 34, name: "receiver-create", guard_name: "web", group_name: "receiver-access" },
            { id: 35, name: "receiver-edit", guard_name: "web", group_name: "receiver-access" },
            { id: 36, name: "receiver-delete", guard_name: "web", group_name: "receiver-access" },
            { id: 37, name: "income-list", guard_name: "web", group_name: "income-access" },
            { id: 38, name: "income-create", guard_name: "web", group_name: "income-access" },
            { id: 39, name: "income-edit", guard_name: "web", group_name: "income-access" },
            { id: 40, name: "income-delete", guard_name: "web", group_name: "income-access" },
            { id: 41, name: "income-category-list", guard_name: "web", group_name: "income-category-access" },
            { id: 42, name: "income-category-create", guard_name: "web", group_name: "income-category-access" },
            { id: 43, name: "income-category-edit", guard_name: "web", group_name: "income-category-access" },
            { id: 44, name: "income-category-delete", guard_name: "web", group_name: "income-category-access" },
            { id: 45, name: "income-receipt-list", guard_name: "web", group_name: "income-receipt-access" },
            { id: 46, name: "income-receipt-create", guard_name: "web", group_name: "income-receipt-access" },
            { id: 47, name: "income-receipt-edit", guard_name: "web", group_name: "income-receipt-access" },
            { id: 48, name: "income-receipt-delete", guard_name: "web", group_name: "income-receipt-access" },
            { id: 49, name: "blog-category-list", guard_name: "web", group_name: "blog-category-access" },
            { id: 50, name: "blog-category-create", guard_name: "web", group_name: "blog-category-access" },
            { id: 51, name: "blog-category-edit", guard_name: "web", group_name: "blog-category-access" },
            { id: 52, name: "blog-category-delete", guard_name: "web", group_name: "blog-category-access" },
            { id: 53, name: "blog-list", guard_name: "web", group_name: "blog-access" },
            { id: 54, name: "blog-create", guard_name: "web", group_name: "blog-access" },
            { id: 55, name: "blog-edit", guard_name: "web", group_name: "blog-access" },
            { id: 56, name: "blog-delete", guard_name: "web", group_name: "blog-access" },
            { id: 57, name: "project-list", guard_name: "web", group_name: "project-access" },
            { id: 58, name: "project-create", guard_name: "web", group_name: "project-access" },
            { id: 59, name: "project-edit", guard_name: "web", group_name: "project-access" },
            { id: 60, name: "project-delete", guard_name: "web", group_name: "project-access" },
            { id: 61, name: "lead-list", guard_name: "web", group_name: "lead-access" },
            { id: 62, name: "lead-create", guard_name: "web", group_name: "lead-access" },
            { id: 63, name: "lead-edit", guard_name: "web", group_name: "lead-access" },
            { id: 64, name: "lead-delete", guard_name: "web", group_name: "lead-access" },
            { id: 65, name: "lead-group-list", guard_name: "web", group_name: "lead-group" },
            { id: 66, name: "lead-group-create", guard_name: "web", group_name: "lead-group" },
            { id: 67, name: "lead-group-edit", guard_name: "web", group_name: "lead-group" },
            { id: 68, name: "lead-group-delete", guard_name: "web", group_name: "lead-group" },
            { id: 69, name: "lead-group-member-list", guard_name: "web", group_name: "lead-group-member" },
            { id: 70, name: "lead-group-member-create", guard_name: "web", group_name: "lead-group-member" },
            { id: 71, name: "lead-group-member-edit", guard_name: "web", group_name: "lead-group-member" },
            { id: 72, name: "lead-group-member-delete", guard_name: "web", group_name: "lead-group-member" },
            { id: 73, name: "zone-list", guard_name: "web", group_name: "zone-access" },
            { id: 74, name: "zone-create", guard_name: "web", group_name: "zone-access" },
            { id: 75, name: "zone-edit", guard_name: "web", group_name: "zone-access" },
            { id: 76, name: "zone-delete", guard_name: "web", group_name: "zone-access" },
            { id: 77, name: "user-report-access", guard_name: "web", group_name: "report-access" },
            { id: 78, name: "general-setting-access", guard_name: "web", group_name: "setting-access" },
            { id: 79, name: "logo-setting-access", guard_name: "web", group_name: "setting-access" },
            { id: 80, name: "photo-gallery-access", guard_name: "web", group_name: "setting-access" },
        ],
    },
    {
        singleRoleData: {
            id: 15,
            name: "fbjh",
            guard_name: "web",
            status: 0,
            created_at: "2025-10-22T08:51:19.000000Z",
            updated_at: "2025-10-22T10:26:41.000000Z",
        },
        rolePermissionData: [
            { id: 9, name: "account-list", guard_name: "web", group_name: "account-access" },
            { id: 10, name: "account-create", guard_name: "web", group_name: "account-access" },
            { id: 11, name: "account-edit", guard_name: "web", group_name: "account-access" },
            { id: 12, name: "account-delete", guard_name: "web", group_name: "account-access" },
            { id: 13, name: "account-category-list", guard_name: "web", group_name: "account-category-access" },
            { id: 14, name: "account-category-create", guard_name: "web", group_name: "account-category-access" },
            { id: 15, name: "account-category-edit", guard_name: "web", group_name: "account-category-access" },
            { id: 16, name: "account-category-delete", guard_name: "web", group_name: "account-category-access" },
            { id: 53, name: "blog-list", guard_name: "web", group_name: "blog-access" },
            { id: 55, name: "blog-edit", guard_name: "web", group_name: "blog-access" },
        ],
    },
    {
        singleRoleData: {
            id: 16,
            name: "fb",
            guard_name: "web",
            status: 0,
            created_at: "2025-10-22T09:05:43.000000Z",
            updated_at: "2025-10-22T10:26:22.000000Z",
        },
        rolePermissionData: [
            { id: 9, name: "account-list", guard_name: "web", group_name: "account-access" },
            { id: 10, name: "account-create", guard_name: "web", group_name: "account-access" },
            { id: 11, name: "account-edit", guard_name: "web", group_name: "account-access" },
            { id: 12, name: "account-delete", guard_name: "web", group_name: "account-access" },
            { id: 13, name: "account-category-list", guard_name: "web", group_name: "account-category-access" },
            { id: 14, name: "account-category-create", guard_name: "web", group_name: "account-category-access" },
            { id: 15, name: "account-category-edit", guard_name: "web", group_name: "account-category-access" },
            { id: 16, name: "account-category-delete", guard_name: "web", group_name: "account-category-access" },
            { id: 21, name: "expense-list", guard_name: "web", group_name: "expense-access" },
            { id: 22, name: "expense-create", guard_name: "web", group_name: "expense-access" },
            { id: 24, name: "expense-delete", guard_name: "web", group_name: "expense-access" },
            { id: 53, name: "blog-list", guard_name: "web", group_name: "blog-access" },
            { id: 54, name: "blog-create", guard_name: "web", group_name: "blog-access" },
            { id: 55, name: "blog-edit", guard_name: "web", group_name: "blog-access" },
            { id: 56, name: "blog-delete", guard_name: "web", group_name: "blog-access" },
        ],
    },
];

const RoleLists = () => {
    const [roleData, setRoleData] = useState(roleStack);
    const [isLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [roleInfo, setRoleInfo] = useState(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const filters = ["All Role", "Active Role", "Inactive Role"];
    const [activeFilter, setActiveFilter] = useState(0);
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredRoles = useMemo(() => {
        const safeData = Array.isArray(roleData) ? roleData : [];
        if (activeFilter === 1) return safeData.filter((r) => r.singleRoleData?.status === 1);
        if (activeFilter === 2) return safeData.filter((r) => r.singleRoleData?.status === 0);
        return safeData;
    }, [activeFilter, roleData]);

    // Select a role
    const handleSelectRole = (role) => {
        setOpen(true);
        setOpenAdd(false);
        setOpenUpdate(null);
        setSelectedRole(role.singleRoleData?.id);
        setRoleInfo(role.singleRoleData);
        setRolePermissions((role.rolePermissionData || []).map((p) => ({ ...p, checked: true })));
    };

    const togglePermission = (permName, checked) => {
        setRolePermissions((prev) => prev.map((perm) => (perm.name === permName ? { ...perm, checked } : perm)));
    };

    const toggleGroup = (group, checked) => {
        setRolePermissions((prev) => prev.map((perm) => (perm.group_name === group ? { ...perm, checked } : perm)));
    };
    const handleActive = (id) => {
        setRoleData((prev) =>
            prev.map((r) =>
                r.singleRoleData?.id === id ? { ...r, singleRoleData: { ...r.singleRoleData, status: 1 } } : r
            )
        );
        toast.success("Role activated (local)");
        setOpenDropdown(null);
        if (roleInfo?.id === id) setRoleInfo((ri) => ({ ...ri, status: 1 }));
    };

    const handleInactive = (id) => {
        setRoleData((prev) =>
            prev.map((r) =>
                r.singleRoleData?.id === id ? { ...r, singleRoleData: { ...r.singleRoleData, status: 0 } } : r
            )
        );
        toast.success("Role inactivated (local)");
        setOpenDropdown(null);
        if (roleInfo?.id === id) setRoleInfo((ri) => ({ ...ri, status: 0 }));
    };

    return (
        <div className="flex h-screen w-full">
            {/* Left Sidebar */}
            <div
                className={`w-full sm:w-[50%] lg:w-[30%] bg-white flex-col ${open || openAdd || openUpdate ? "hidden sm:flex" : "flex"
                    }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-accent h-14 justify-between flex items-center">
                    <h2 className="text-xl font-bold text-primary-content">Roles</h2>
                    
                        <div
                            onClick={() => {
                                setOpenAdd(true);
                                setOpen(false);
                                setOpenUpdate(null);
                            }}
                            className="relative p-2 hover:bg-neutral hover:text-primary rounded-full"
                        >
                            <MdAddCircleOutline size={24} className="cursor-pointer" />
                        </div>

                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 border-b border-accent px-3 sm:px-5 py-2 overflow-x-auto scrollbar-hide">
                    {filters.map((f, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveFilter(index)}
                            className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer text-nowrap border-accent transition ${activeFilter === index ? "bg-secondary text-primary-content" : "text-primary-content hover:bg-neutral"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Role List */}
                <div className="flex flex-col gap-2 border-b border-accent px-2 sm:px-4 py-2 pb-14 sm:pb-4 lg:pb-2 h-screen overflow-y-scroll">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent overflow-y-hidden"
                            >
                                <div className="animate-pulse bg-gray-200 rounded-full h-14 w-14"></div>
                                <div className="flex-1">
                                    <Skeleton height={36} width="80%" borderRadius="0.5rem" />
                                </div>
                            </div>
                        ))
                    ) : (
                        Array.isArray(filteredRoles) &&
                        filteredRoles.map((role, index) => (
                            <div key={index} className=" relative group">
                                <button
                                    onClick={() => handleSelectRole(role)}
                                    className={`w-full px-3 py-1.5 rounded-lg text-lg border border-transparent cursor-pointer flex items-center gap-2 ${selectedRole === role?.singleRoleData?.id ? "bg-neutral text-primary-content border !border-accent" : "text-primary-content hover:bg-neutral hover:border hover:border-accent"
                                        }`}
                                >
                                    <span className="border border-accent rounded-full px-4 py-2 bg-secondary relative">
                                        {role?.singleRoleData?.name.charAt(0).toUpperCase()}
                                    </span>
                                    <span>{role?.singleRoleData?.name}</span>
                                    <span className=" absolute top-1/2 -translate-y-1/2 right-4 group-hover:right-8 duration-200 ">
                                        {role?.singleRoleData?.status === 1 ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}
                                    </span>
                                </button>

                                {/* Dropdown Button */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdown(openDropdown === role?.singleRoleData?.id ? null : role?.singleRoleData?.id);
                                    }}
                                    className={`absolute top-1/2 -translate-y-1/2 right-1 transform transition-all duration-300 ease-in-out ${openDropdown === role?.singleRoleData?.id ? "opacity-80 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0"
                                        }`}
                                >
                                    <button className="p-0.5 cursor-pointer dropdown-zone">
                                        <FaChevronDown size={20} />
                                    </button>
                                </div>

                                {/* Dropdown Menu */}
                                {openDropdown === role?.singleRoleData?.id && (
                                    <div ref={dropdownRef} className="absolute top-6 right-4 w-40 sm:w-48 bg-white shadow-lg rounded-2xl border border-accent p-2.5 z-50">
                                        <button
                                            onClick={() => {
                                                if (role?.singleRoleData?.status === 0) {
                                                    handleActive(openDropdown);
                                                } else {
                                                    handleInactive(openDropdown);
                                                }
                                                setOpenDropdown(null);
                                            }}
                                            className="flex items-center gap-2 cursor-pointer px-2.5 py-2 text-sm rounded-lg hover:bg-neutral w-full"
                                        >
                                            {role?.singleRoleData?.status === 0 ? (
                                                <>
                                                    <FaCheckCircle className="text-green-500" />
                                                    Activate
                                                </>
                                            ) : (
                                                <>
                                                    <FaTimesCircle className="text-error" />
                                                    Inactivate
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Side */}
            <div
                className={`flex-1 border-l border-accent bg-cover pb-12 sm:pb-0 w-full sm:w-[50%] md:w-[70%] bg-center ${open || openAdd || openUpdate ? "flex" : "hidden sm:flex"
                    }`}
                style={{
                    backgroundImage: `url(${bgPhoto})`,
                    backgroundSize: "700px",
                }}
            >
                {open && (
                    <div className="w-full overflow-y-scroll">
                        <section className="p-4 bg-white">
                            <div className="flex items-center justify-between bg-secondary mb-4">
                                <div className="flex items-center bg-primary text-white gap-2 py-2 px-3">
                                    <button className="sm:hidden hover:bg-neutral cursor-pointer rounded-full" onClick={() => setOpen(false)}>
                                        <FaArrowLeft size={18} />
                                    </button>
                                    <h1 className="font-semibold">Role Access</h1>
                                </div>
                                
                                    <button
                                        onClick={() => {
                                            setOpenUpdate(roleInfo?.id);
                                            setOpen(false);
                                        }}
                                        className="bg-primary py-2 px-4 cursor-pointer text-white font-semibold"
                                    >
                                        Edit
                                    </button>
                            </div>
                            <input
                                type="text"
                                name="roleName"
                                disabled={true}
                                defaultValue={roleInfo?.name || ""}
                                className="border border-accent rounded-lg h-10 bg-white focus:ring-0 px-4 focus:border focus:border-accent w-full focus:outline-none"
                                placeholder="Type Here"
                            />
                        </section>

                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                            {/* Permission Group Card */}
                            {[...new Set(rolePermissions?.map((item) => item.group_name))].map((group, i) => {
                                const groupPerms = rolePermissions?.filter((perm) => perm.group_name === group);
                                // determine if all group items are checked (for header checkbox)
                                const allChecked = groupPerms.every((p) => p.checked === true);
                                return (
                                    <div key={i} className="bg-white border border-accent rounded-md shadow-sm">
                                        {/* Header */}
                                        <div className="flex justify-between items-center p-3 bg-secondary text-primary-content rounded-t-md">
                                            <h1 className="text-xl font-semibold">{group}</h1>
                                            <input
                                                type="checkbox"
                                                checked={allChecked}
                                                onChange={(e) => toggleGroup(group, e.target.checked)}
                                                className="checkbox"
                                            />
                                        </div>

                                        <div className={`flex-1 grid ${groupPerms.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-3 p-4`}>
                                            {groupPerms.map((perm, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={perm.checked === true}
                                                        onChange={(e) => togglePermission(perm.name, e.target.checked)}
                                                        className="checkbox"
                                                    />
                                                    <span className="text-lg text-primary-content font-medium">{perm.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {openAdd && <RoleAdd setOpenAdd={setOpenAdd} />}
                {openUpdate && <RoleUpdate openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />}
            </div>
        </div>
    );
};

export default RoleLists;
