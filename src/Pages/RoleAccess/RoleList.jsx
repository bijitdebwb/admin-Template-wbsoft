import bgPhoto from "../../assets/logo/bg.png";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdAddCircleOutline } from "react-icons/md";
import { useState, useMemo, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import RoleAdd from "./RoleAdd";
import RoleUpdate from "./RoleUpdate";
import UseAuth from "../../Hooks/UseAuth";

const RoleLists = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const { hasAccess } = UseAuth();
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fetch role data
    const { data: roleData = [], isLoading } = useQuery({
        queryKey: ["all_role_list"],
        queryFn: async () => {
            const res = await axiosSecure("/api/roles");
            return res?.data?.roleData;
        },
    });

    // Filter roles based on activeFilter
    const filteredRoles = useMemo(() => {
        const safeData = Array.isArray(roleData) ? roleData : [];
        if (activeFilter === 1)
            return safeData.filter((r) => r.singleRoleData?.status === 1);
        if (activeFilter === 2)
            return safeData.filter((r) => r.singleRoleData?.status === 0);
        return safeData;
    }, [activeFilter, roleData]);

    // Select a role
    const handleSelectRole = (role) => {
        setOpen(true);
        setOpenAdd(false);
        setOpenUpdate(null);
        setSelectedRole(role.singleRoleData?.id);
        setRoleInfo(role.singleRoleData);
        setRolePermissions(role.rolePermissionData || []);
    };

    // Toggle single permission
    const togglePermission = (permName, checked) => {
        setRolePermissions((prev) =>
            prev.map((perm) =>
                perm.name === permName ? { ...perm, checked } : perm
            )
        );
    };

    // Toggle all permissions in a group
    const toggleGroup = (group, checked) => {
        setRolePermissions((prev) =>
            prev.map((perm) =>
                perm.group_name === group ? { ...perm, checked } : perm
            )
        );
    };

    // handleActive zone
    const handleActive = async (id) => {
        try {
            const res = await axiosSecure.get(`/api/roles-active/${id}`);
            if (res?.data?.status_code === 201) {
                toast.success(res?.data?.message);
                queryClient.invalidateQueries(["all_role_list"]);
            }
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || "Failed to change status";
            toast.error(message);
        };
    }

    // handleInactive zone
    const handleInactive = async (id) => {
        try {
            const res = await axiosSecure.get(`/api/roles-inactive/${id}`);
            if (res?.data?.status_code === 201) {
                toast.success(res?.data?.message);
                queryClient.invalidateQueries(["all_role_list"]);
            }
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || "Failed to change status";
            toast.error(message);
        };
    }

    return (
        <div className="flex h-screen w-full">
            {/* Left Sidebar */}
            <div className={`w-full sm:w-[50%] lg:w-[30%] bg-white flex-col ${open || openAdd || openUpdate ? "hidden sm:flex" : "flex"
                }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-accent h-14 justify-between flex items-center">
                    <h2 className="text-xl font-bold text-primary-content">Roles</h2>
                    {hasAccess?.some((item) => item?.name === "role-create") && <div onClick={() => { setOpenAdd(true); setOpen(false); setOpenUpdate(null); }} className="relative p-2 hover:bg-neutral hover:text-primary rounded-full">
                        <MdAddCircleOutline
                            size={24}
                            className="cursor-pointer"
                        />
                    </div>}
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 border-b border-accent px-3 sm:px-5 py-2 overflow-x-auto scrollbar-hide">
                    {filters.map((f, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveFilter(index)}
                            className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer text-nowrap border-accent transition ${activeFilter === index
                                ? "bg-secondary text-primary-content"
                                : "text-primary-content hover:bg-neutral"
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
                        Array.isArray(filteredRoles) && filteredRoles?.map((role, index) => (
                            <div key={index} className=" relative group">
                                <button
                                    onClick={() => handleSelectRole(role)}
                                    className={`w-full px-3 py-1.5 rounded-lg text-lg border border-transparent cursor-pointer flex items-center gap-2 ${selectedRole === role?.singleRoleData?.id
                                        ? "bg-neutral text-primary-content border !border-accent"
                                        : "text-primary-content hover:bg-neutral hover:border hover:border-accent"
                                        }`}
                                >
                                    <span className="border border-accent rounded-full px-4 py-2 bg-secondary relative">
                                        {role?.singleRoleData?.name.charAt(0).toUpperCase()}
                                    </span>
                                    <span>{role?.singleRoleData?.name}</span>
                                    <span className=" absolute top-1/2 -translate-y-1/2 right-4 group-hover:right-8 duration-200 ">{role?.singleRoleData?.status === 1 ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}</span>
                                </button>

                                {/* Dropdown Button */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdown(openDropdown === role?.singleRoleData?.id ? null : role?.singleRoleData?.id);
                                    }}
                                    className={`absolute top-1/2 -translate-y-1/2 right-1 transform transition-all duration-300 ease-in-out ${openDropdown === role?.singleRoleData?.id ? "opacity-80 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0"}`}>
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
                        )))}
                </div>
            </div>

            {/* Right Side */}
            <div className={`flex-1 border-l border-accent bg-cover pb-12 sm:pb-0 w-full sm:w-[50%] md:w-[70%] bg-center ${open || openAdd || openUpdate ? "flex" : "hidden sm:flex"
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
                                    <button
                                        className="sm:hidden hover:bg-neutral cursor-pointer rounded-full"
                                        onClick={() => setOpen(false)}
                                    >
                                        <FaArrowLeft size={18} />
                                    </button>
                                    <h1 className="font-semibold">
                                        Role Access
                                    </h1>
                                </div>
                                {hasAccess?.some((item) => item?.name === "role-edit") &&
                                    <button
                                        onClick={() => { setOpenUpdate(roleInfo?.id); setOpen(false) }}
                                        className="bg-primary py-2 px-4 cursor-pointer text-white font-semibold">
                                        Edit
                                    </button>}
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
                            {[...new Set(rolePermissions?.map((item) => item.group_name))].map(
                                (group, i) => {
                                    const groupPerms = rolePermissions?.filter(
                                        (perm) => perm.group_name === group
                                    );
                                    return (
                                        <div
                                            key={i}
                                            className="bg-white border border-accent rounded-md shadow-sm"
                                        >
                                            {/* Header */}
                                            <div className="flex justify-between items-center p-3 bg-secondary text-primary-content rounded-t-md">
                                                <h1 className="text-xl font-semibold">{group}</h1>
                                                <input
                                                    type="checkbox"
                                                    checked={true}
                                                    onChange={(e) =>
                                                        toggleGroup(group, e.target.checked)
                                                    }
                                                    className="checkbox"
                                                />
                                            </div>

                                            <div
                                                className={`flex-1 grid ${groupPerms.length === 1
                                                    ? "grid-cols-1"
                                                    : "grid-cols-2"
                                                    } gap-3 p-4`}
                                            >
                                                {groupPerms.map((perm, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={true}
                                                            onChange={(e) =>
                                                                togglePermission(
                                                                    perm.name,
                                                                    e.target.checked
                                                                )
                                                            }
                                                            className="checkbox"
                                                        />
                                                        <span className="text-lg text-primary-content font-medium">
                                                            {perm.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                )}

                {openAdd && <RoleAdd setOpenAdd={setOpenAdd} />}
                {openUpdate && <RoleUpdate openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />}

            </div>
        </div >
    );
};

export default RoleLists;
