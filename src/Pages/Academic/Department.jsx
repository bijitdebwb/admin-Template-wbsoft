import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import Select from "react-select";
import { GoPlusCircle } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { RiResetLeftFill } from "react-icons/ri";

const items = ["Name", "Phone", "Email", "Status", "Actions"];


const Course = () => {
    const tableData = [
        { id: 1, name: "DROBO", phone: "+880111111", email: "drobo@example.com", status: "Active" },
        { id: 2, name: "Bijit", phone: "+880111112", email: "bijit@example.com", status: "Inactive" },
        { id: 3, name: "Minhaj", phone: "+880111113", email: "minhaj@example.com", status: "Inactive" },
        { id: 4, name: "Rahim", phone: "+880111114", email: "rahim@example.com", status: "Active" },
        { id: 5, name: "Karim", phone: "+880111115", email: "karim@example.com", status: "Active" },
        { id: 6, name: "Salman", phone: "+880111116", email: "salman@example.com", status: "Inactive" },
        { id: 7, name: "Hasib", phone: "+880111117", email: "hasib@example.com", status: "Active" },
        { id: 8, name: "Asif", phone: "+880111118", email: "asif@example.com", status: "Inactive" },
        { id: 9, name: "Rafi", phone: "+880111119", email: "rafi@example.com", status: "Active" },
        { id: 10, name: "Noman", phone: "+880111120", email: "noman@example.com", status: "Active" },
        { id: 11, name: "Sabbir", phone: "+880111121", email: "sabbir@example.com", status: "Inactive" },
        { id: 12, name: "Jamal", phone: "+880111122", email: "jamal@example.com", status: "Active" },
        { id: 13, name: "Imran", phone: "+880111123", email: "imran@example.com", status: "Inactive" },
        { id: 14, name: "Rakib", phone: "+880111124", email: "rakib@example.com", status: "Active" },
        { id: 15, name: "Shuvo", phone: "+880111125", email: "shuvo@example.com", status: "Inactive" },
        { id: 16, name: "Tareq", phone: "+880111126", email: "tareq@example.com", status: "Active" },
        { id: 17, name: "Munna", phone: "+880111127", email: "munna@example.com", status: "Active" },
        { id: 18, name: "Rasel", phone: "+880111128", email: "rasel@example.com", status: "Inactive" },
        { id: 19, name: "Farhan", phone: "+880111129", email: "farhan@example.com", status: "Active" },
        { id: 20, name: "Nayeem", phone: "+880111130", email: "nayeem@example.com", status: "Inactive" }
    ];

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [popOpen, setPopOpen] = useState(null);
    const [rows, setRows] = useState(tableData);
    const [currentPage, setCurrentPage] = useState(1);
    const [openPageSize, setOpenPageSize] = useState(false);
    const [pageSizeValue, setPageSizeValue] = useState("10");
    const pageSize = parseInt(pageSizeValue, 10) || 10;
    const pageSizeOptions = ["10", "20", "50", "100"];
    const [searchTerm, setSearchTerm] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [updateName, setUpdateName] = useState("");
    const [updatePhone, setUpdatePhone] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [addName, setAddName] = useState("");
    const [addPhone, setAddPhone] = useState("");
    const [addEmail, setAddEmail] = useState("");
    const [gProject, setGProject] = useState(null);
    const [checkedItems, setCheckedItems] = useState(items.map(() => true));
    const menuRef = useRef(null);

    const col = {
        name: checkedItems[0],
        phone: checkedItems[1],
        email: checkedItems[2],
        status: checkedItems[3],
        actions: checkedItems[4],
    };


    useEffect(() => {
        setRows(
            tableData.map((row) => ({
                status: "Active",
                ...row,
            }))
        );
    }, [tableData]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setPopOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const toggleChecked = (index) => {
        setCheckedItems((prev) => prev.map((val, i) => (i === index ? !val : val)));
    };

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            height: "40px",
            borderColor: state.isFocused ? "#1DAA61" : base.borderColor,
            boxShadow: state.isFocused ? "0 0 0 1px #1DAA61" : "none",
            "&:hover": {
                borderColor: state.isFocused ? "#1DAA61" : base.borderColor,
            },
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: "200px",
            overflowY: "auto",
        }),
    };

    const project = [
        {
            id: 1,
            project_name: "Corporate Website Redesign",
        },
        {
            id: 2,
            project_name: "Mobile Banking Application",
        },
        {
            id: 3,
            project_name: "E-Commerce Platform Development",
        },
        {
            id: 4,
            project_name: "SEO & Digital Marketing Revamp",
        },
        {
            id: 5,
            project_name: "Cybersecurity Audit Portal",
        },
    ];

    const projects = project?.map((c) => ({
        value: c?.id,
        label: c?.project_name,
    })) || [];

    const filteredRows = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return rows;

        return rows.filter((row) =>
            ["name", "phone", "email"].some((field) =>
                String(row[field] || "")
                    .toLowerCase()
                    .includes(term)
            )
        );
    }, [rows, searchTerm]);

    // search submit (we already filter live on searchTerm, this just prevents reload)
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        setSearchTerm(e.target.search.value);
    };

    // handle page size select
    const handleSelectPageSize = (v) => {
        setPageSizeValue(v);
        setOpenPageSize(false);
        setCurrentPage(1);
    };

    // pagination calculations
    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const currentPageSafe = Math.min(currentPage, totalPages);
    const startIndex = (currentPageSafe - 1) * pageSize;
    const currentRows = filteredRows.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // ACTION HANDLER (3 dots menu)
    const handleActionClick = (action, row) => {

        if (action === "delete2") {
            const ok = window.confirm("Are you sure you want to delete this record?");
            if (ok) {
                setRows((prev) => prev.filter((r) => r.id !== row.id));
            }
            setPopOpen(null);
            return;
        }

        if (action === "active2" || action === "inactive2") {
            setRows((prev) =>
                prev.map((r) =>
                    r.id === row.id
                        ? {
                            ...r,
                            status: r.status === "Active" ? "Inactive" : "Active",
                        }
                        : r
                )
            );
            setPopOpen(null);
        }
    };

    // UPDATE SUBMIT
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!editingRow) return;

        setRows((prev) =>
            prev.map((row) =>
                row.id === editingRow.id
                    ? {
                        ...row,
                        name: updateName,
                        phone: updatePhone,
                        email: updateEmail,
                    }
                    : row
            )
        );

        setOpenUpdate(false);
        setEditingRow(null);
    };

    // ADD SUBMIT
    const handleAddSubmit = (e) => {
        e.preventDefault();

        const newRow = {
            id: Date.now(), // simple unique id for demo
            name: addName,
            phone: addPhone,
            email: addEmail,
            projectId: gProject,
            status: "Active",
        };

        setRows((prev) => [newRow, ...prev]);
        setAddName("");
        setAddPhone("");
        setAddEmail("");
        setGProject(null);
        setOpenAdd(false);
        setCurrentPage(1);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setOpenFilter(false);
    };

    const handleFilterCancel = () => {
        setCheckedItems(items.map(() => true));
        setOpenFilter(true);
    };

    return (
        <div className={`relative w-full overflow-x-hidden`}>
            <div className={`p-5 ${popOpen && "pb-16"}`}>
                <div className={`w-full px-5 relative bg-base-200 `}>
                    <div className="py-3 text-primary-content flex items-center justify-between gap-5">
                        <h1 className="font-semibold text-3xl">Table</h1>

                        <div className="flex items-center gap-2">
                            {/* SEARCH */}
                            <form onSubmit={handleSearchSubmit} className="flex items-center">
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="Search Here"
                                    className="border-2 border-primary h-10 px-2 focus:outline-none rounded-s text-primary-content"
                                />
                                <button
                                    type="submit"
                                    className="flex items-center gap-1 font-bold text-white bg-primary hover:bg-primary-hover px-3 py-2 text-base rounded-e cursor-pointer "
                                >
                                    Search
                                </button>
                            </form>

                            {/* PAGE SIZE DROPDOWN */}
                            <div className="relative w-16">
                                <button
                                    onClick={() => setOpenPageSize(!openPageSize)}
                                    className="w-full py-1.5 border-2 border-primary bg-white rounded flex items-center justify-center gap-2"
                                >
                                    {pageSizeValue}{" "}
                                    <IoIosArrowDown
                                        className={`transition-transform duration-300 ${openPageSize && "-rotate-180"
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`absolute z-20 w-full mt-1 bg-white border-2 border-primary rounded shadow overflow-hidden transition-all duration-200 origin-top ${openPageSize ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                                        }`}
                                >
                                    {pageSizeOptions?.map((opt) => (
                                        <div
                                            key={opt}
                                            onClick={() => handleSelectPageSize(opt)}
                                            className=" text-center py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FILTER BUTTON */}
                            <button
                                onClick={() => setOpenFilter(true)}
                                className="flex items-center gap-1 font-bold text-primary bg-primary-light hover:bg-primary-light-hover px-3 py-2 text-base rounded cursor-pointer "
                            >
                                <FiFilter />
                                Filter
                            </button>

                            {/* ADD BUTTON */}
                            <button
                                onClick={() => setOpenAdd(true)}
                                className="flex items-center gap-1 font-bold text-white bg-primary hover:bg-primary-hover px-3 py-2 text-base rounded cursor-pointer "
                            >
                                <GoPlusCircle />
                                Add Table
                            </button>
                        </div>
                    </div>

                    {/* TABLE */}
                    <table className="border-separate border-spacing-0 rounded-md w-full min-w-max">
                        <thead className="h-10">
                            <tr className="uppercase text-center bg-accent text-primary-content font-medium text-base">
                                {col.name && (<th className="border border-accent px-4 py-2 whitespace-nowrap">Name</th>)}
                                {col.phone && (
                                    <th className="border border-accent px-4 py-2 whitespace-nowrap">Phone</th>
                                )}
                                {col.email && (
                                    <th className="border border-accent px-4 py-2 whitespace-nowrap">Email</th>
                                )}
                                {col.status && (
                                    <th className="border border-accent px-4 py-2 whitespace-nowrap">Status</th>
                                )}
                                {col.actions && (
                                    <th className="border border-accent px-4 py-2 whitespace-nowrap">Actions</th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="text-center text-primary-content relative text-sm">
                            {currentRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="border border-accent py-4 px-4 whitespace-nowrap text-center"
                                    >
                                        {searchTerm
                                            ? `No data found for "${searchTerm}".`
                                            : "No data available."}
                                    </td>
                                </tr>
                            ) : (
                                currentRows.map((row) => {
                                    const status = row?.status || "Active";
                                    const statusAction = status === "Active" ? "Inactive" : "Active";

                                    return (
                                        <tr key={row?.id}>
                                            {col.name && (
                                                <td className="border border-accent py-2 px-4 whitespace-nowrap">{row.name}</td>
                                            )}
                                            {col.phone && (
                                                <td className="border border-accent py-2 px-4 whitespace-nowrap">{row.phone}</td>
                                            )}
                                            {col.email && (
                                                <td className="border border-accent py-2 px-4 whitespace-nowrap">{row.email}</td>
                                            )}
                                            {col.status && (
                                                <td className="border border-accent py-2 px-4 whitespace-nowrap">{row.status}</td>
                                            )}
                                            {col.actions && (
                                                <td className="border border-accent relative whitespace-nowrap" ref={menuRef}>
                                                    <button
                                                        onClick={() =>
                                                            setPopOpen(popOpen === row?.id ? null : row?.id)
                                                        }
                                                        className="border-none py-0 px-2"
                                                        type="button"
                                                    >
                                                        <BsThreeDotsVertical className="text-xl cursor-pointer font-bold" />
                                                    </button>

                                                    {popOpen === row?.id && (
                                                        <div className="absolute left-1 top-6 min-w-40 bg-white shadow-lg rounded border border-accent p-2 z-50">
                                                            <button onClick={() => handleActionClick(inactive2, row?.id)} className="flex items-center gap-2 p-2 text-sm rounded cursor-pointer hover:bg-neutral w-full"> Active</button>
                                                            <button className="flex items-center gap-2 p-2 text-sm rounded cursor-pointer hover:bg-neutral w-full"> Update</button>
                                                            <button onClick={() => handleActionClick(delete2, row?.id)} className="flex items-center gap-2 p-2 text-sm rounded cursor-pointer hover:bg-neutral w-full"> Delete</button>
                                                        </div>
                                                    )}
                                                </td>)}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    {/* PAGINATION */}
                    <div className="py-3 flex items-center justify-between">
                        <div>
                            Showing <span>1</span> to <span>{tableData?.length <= pageSizeValue ? tableData?.length : pageSizeValue}</span> of <span>{tableData?.length}</span> entries
                        </div>
                        <div className="flex justify-center items-center gap-2  flex-wrap">
                            <button
                                onClick={() => handlePageChange(currentPageSafe - 1)}
                                disabled={currentPageSafe === 1}
                                className="px-3 py-1 border border-accent bg-base-200 cursor-pointer hover:bg-primary hover:text-neutral-content rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }).map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 border bg-base-200 hover:bg-secondary cursor-pointer border-accent ${page === currentPageSafe ? "bg-primary text-neutral-content" : ""
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => handlePageChange(currentPageSafe + 1)}
                                disabled={currentPageSafe === totalPages}
                                className="px-3 py-1 border border-accent bg-base-200 hover:bg-primary hover:text-neutral-content cursor-pointer disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD SIDE PANEL */}
            <div
                className={`${openAdd
                    ? "fixed top-0 right-0 max-w-xl w-full bg-base-200 h-screen overflow-y-scroll p-5 z-40"
                    : "hidden"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-base sm:text-lg font-semibold">Create Table</h1>
                    <button
                        type="button"
                        onClick={() => setOpenAdd(false)}
                        className="text-sm text-primary-content cursor-pointer hover:text-error"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                <form className="mt-4 space-y-4" onSubmit={handleAddSubmit}>
                    <div>
                        <label className="pb-1 font-semibold">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="add-name"
                            name="name"
                            placeholder="Name"
                            className="w-full max-h-10 border border-accent px-3 py-2 rounded outline-none focus:ring-2 focus:ring-primary"
                            value={addName}
                            onChange={(e) => setAddName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="pb-1 font-semibold">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="add-phone"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full max-h-10 border border-accent px-3 py-2 rounded outline-none focus:ring-2 focus:ring-primary"
                            value={addPhone}
                            onChange={(e) => setAddPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="pb-1 font-semibold">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="add-email"
                            name="email"
                            placeholder="Email"
                            className="w-full max-h-10 border border-accent px-3 py-2 rounded outline-none focus:ring-2 focus:ring-primary"
                            value={addEmail}
                            onChange={(e) => setAddEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="pb-1 font-semibold">
                            Project <span className="text-red-500">*</span>
                        </label>
                        <Select
                            options={projects}
                            value={projects.find((option) => option.value === gProject) || null}
                            onChange={(option) => setGProject(option.value)}
                            placeholder="Select A Project"
                            className="w-full"
                            styles={selectStyles}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        <button
                            type="button"
                            className="bg-secondary text-primary-content py-2 px-4 cursor-pointer rounded-md hover:bg-error-content hover:text-secondary-content transition"
                            onClick={() => setOpenAdd(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 cursor-pointer rounded-md hover:bg-info transition"
                        >
                            Add Table
                        </button>
                    </div>
                </form>
            </div>

            {/* FILTER SIDE PANEL */}
            <div
                className={`${openFilter
                    ? "fixed top-0 right-0 max-w-xl w-full bg-base-200 h-screen overflow-y-scroll z-40"
                    : "hidden"
                    }`}
            >
                <div className="flex items-center justify-between border-b-2 border-accent  px-5 py-3">
                    <h1 className="text-base sm:text-lg font-semibold">Filter Table</h1>
                    <div className="flex items-center gap-5">
                        <button
                            type="button"
                            onClick={handleFilterCancel}
                            className="text-sm text-primary-content cursor-pointer hover:text-error"
                        >
                            <RiResetLeftFill size={24} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenFilter(false)}
                            className="text-sm text-primary-content cursor-pointer hover:text-error"
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>
                </div>

                <form className="mt-4  px-5 space-y-2" onSubmit={handleFilterSubmit}>
                    {items.map((label, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => toggleChecked(index)}
                            className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-accent/60 transition-colors duration-150 text-left cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={checkedItems[index]}
                                onChange={() => toggleChecked(index)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span>{label}</span>
                        </button>
                    ))}

                    <div className="flex items-center justify-end gap-5">
                        <button
                            type="button"
                            className="bg-secondary text-primary-content py-2 px-4 cursor-pointer rounded-md hover:bg-error-content hover:text-secondary-content transition"
                            onClick={() => setOpenFilter(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 cursor-pointer rounded-md hover:bg-info transition"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Course;
