import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const RoleUpdate = ({ openUpdate, setOpenUpdate }) => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [roleName, setRoleName] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const { data, isLoading } = useQuery({
        queryKey: ["roles-edit"],
        queryFn: async () => {
            const res = await axiosSecure(`/api/roles-edit/${openUpdate}`);
            return res?.data;
        },
    });

    const singleRoleData = data?.singleRoleData;
    const rolePermissions = data?.rolePermissions;
    const permissions = data?.permissions;
    const permissionGroups = data?.permissionGroups;

    //  Toggle single permission
    const togglePermission = (permName, checked) => {
        setSelectedPermissions((prev) =>
            checked ? [...prev, permName] : prev.filter((p) => p !== permName)
        );
    };

    //  Toggle whole group
    const toggleGroup = (groupName, checked) => {
        const groupPerms = permissions
            .filter((perm) => perm.group_name === groupName)
            .map((p) => p.name);

        setSelectedPermissions((prev) => {
            if (checked) {
                // Add all group permissions
                return [...new Set([...prev, ...groupPerms])];
            } else {
                // Remove all group permissions
                return prev.filter((p) => !groupPerms.includes(p));
            }
        });
    };

    // Check if entire group is selected
    const isGroupSelected = (groupName) => {
        const groupPerms = permissions
            .filter((perm) => perm.group_name === groupName)
            .map((p) => p.name);
        return groupPerms.every((perm) => selectedPermissions.includes(perm));
    };

    const isPermissionSelected = (permName) => {
        return selectedPermissions.includes(permName);
    };

    const mutation = useMutation({
        mutationFn: async (payload) => {
            const res = await axiosSecure.put(`/api/roles/${openUpdate}`, payload);
            return res?.data;
        },
        onSuccess: () => {
            toast.success("Role Updated successfully!");
            queryClient.invalidateQueries(["roles-list"]);
            setOpenUpdate(null);
        },
        onError: () => {
            toast.error("Something went wrong!");
        },
    });

    const handleCreateRole = () => {
        if (!roleName.trim()) {
            toast.error("Please enter a role name!");
            return;
        }
        if (selectedPermissions.length === 0) {
            toast.error("Please select at least one permission!");
            return;
        }

        const payload = {
            name: roleName,
            permissions: selectedPermissions,
        };

        mutation.mutate(payload);
    };

    useEffect(() => {
        if (rolePermissions?.length > 0) {
            setSelectedPermissions(rolePermissions.map((p) => p.name));
        }
    }, [rolePermissions]);

    if (isLoading) return <p className="p-4 text-center">Loading...</p>;
    return (
        <div className="w-full overflow-y-scroll">
            {/* Header Section */}
            <section className="p-4 bg-white">
                <div className="flex items-center justify-between bg-secondary mb-4">
                    <div className="flex items-center bg-primary text-white gap-2 py-2 px-3">
                        <button
                            className="sm:hidden hover:bg-neutral cursor-pointer rounded-full"
                            onClick={() => setOpenUpdate(null)}
                        >
                            <FaArrowLeft size={18} />
                        </button>
                        <h1 className="font-semibold">
                            Role Access
                        </h1>
                    </div>

                    <button
                        onClick={handleCreateRole}
                        disabled={mutation.isPending}
                        className="bg-primary py-2 px-4 cursor-pointer text-white font-semibold"
                    >
                        {mutation.isPending ? "Updating..." : "Update"}
                    </button>
                </div>
                <input
                    type="text"
                    name="roleName"
                    defaultValue={singleRoleData?.name}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="border border-accent rounded-lg h-10 bg-white focus:ring-0 px-4 focus:border focus:border-accent w-full focus:outline-none"
                    placeholder="Type Role Name Here"
                />
            </section>

            {/* Permissions Section */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {permissionGroups?.map((roleGroupName, i) => (
                    <div
                        key={i}
                        className="bg-white border border-accent rounded-md shadow-sm"
                    >
                        {/* Group Header */}
                        <div className="flex justify-between items-center p-3 bg-secondary text-primary-content rounded-t-md">
                            <h1 className="text-xl font-semibold">{roleGroupName.name}</h1>
                            <input
                                type="checkbox"
                                checked={isGroupSelected(roleGroupName.name)}
                                onChange={(e) =>
                                    toggleGroup(roleGroupName.name, e.target.checked)
                                }
                                className="checkbox"
                            />
                        </div>

                        {/* Group Permissions */}
                        <div className="flex-1 grid grid-cols-2 gap-3 p-4">
                            {permissions
                                .filter((perm) => perm.group_name === roleGroupName.name)
                                .map((access, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isPermissionSelected(access.name)}
                                            onChange={(e) =>
                                                togglePermission(access.name, e.target.checked)
                                            }
                                            className="checkbox"
                                        />
                                        <span className="text-lg text-primary-content font-medium">
                                            {access?.name}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default RoleUpdate;