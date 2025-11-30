import { useEffect, useMemo, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import SelectSearch from "../../componentes/SelectSearch";
import BookDefaultPhoto from "../../assets/logo/BookDefaultPhoto.jpg";
import uploadimage from "../../assets/logo/uploadimage.jpg";

/**
 * Subject (static local data version)
 * - All API calls removed; uses provided staticPayload below.
 * - Create / Update / Delete / Active/Inactive operate on local state only.
 */

/* -------------------- static JSON payload (trimmed/sample) -------------------- */
const staticPayload = {
    message: "Slider fetched successfully.",
    status_code: 200,
    subjectData: [
        {
            id: 98,
            user_id: 1,
            classname_id: 73,
            department_id: 29,
            subject_name: "Banglasadfe3",
            subject_image: "1764416166_692adaa6d6ea3.jpg",
            status: 0,
            created_at: "29-11-2025 17:36:06",
            updated_at: "29-11-2025 17:36:38",
            class_data: {
                id: 73,
                user_id: 1,
                name: "Class 12",
                status: 1,
                created_at: "29-11-2025 16:16:40",
                updated_at: "29-11-2025 16:16:40",
            },
            department_data: {
                id: 29,
                user_id: 1,
                classname_id: 73,
                department_name: "Humanities",
                status: 1,
                created_at: "29-11-2025 16:22:16",
                updated_at: "29-11-2025 16:22:16",
            },
        },
        {
            id: 89,
            user_id: 1,
            classname_id: 73,
            department_id: 29,
            subject_name: "Math",
            subject_image: "1764414829_692ad56dea8c0.jpg",
            status: 0,
            created_at: "29-11-2025 16:53:23",
            updated_at: "29-11-2025 17:35:20",
            class_data: {
                id: 73,
                user_id: 1,
                name: "Class 12",
                status: 1,
                created_at: "29-11-2025 16:16:40",
                updated_at: "29-11-2025 16:16:40",
            },
            department_data: {
                id: 29,
                user_id: 1,
                classname_id: 73,
                department_name: "Humanities",
                status: 1,
                created_at: "29-11-2025 16:22:16",
                updated_at: "29-11-2025 16:22:16",
            },
        },

        // ... you can paste additional items from your JSON here if you want
    ],
    allSubjectCount: 63,
    classData: [
        { id: 62, user_id: 1, name: "Class 1", status: 1 },
        { id: 71, user_id: 1, name: "Class 10", status: 1 },
        { id: 72, user_id: 1, name: "Class 11", status: 1 },
        { id: 73, user_id: 1, name: "Class 12", status: 1 },
        { id: 63, user_id: 1, name: "Class 2", status: 1 },
        { id: 64, user_id: 1, name: "Class 3", status: 1 },
        { id: 65, user_id: 1, name: "Class 4", status: 1 },
        { id: 66, user_id: 1, name: "Class 5", status: 1 },
        { id: 67, user_id: 1, name: "Class 6", status: 1 },
        { id: 68, user_id: 1, name: "Class 7", status: 1 },
        { id: 69, user_id: 1, name: "Class 8", status: 1 },
        { id: 70, user_id: 1, name: "Class 9", status: 1 },
    ],
    departmentData: [null],
};

/* -------------------- Utility to build departments per class -------------------- */
const buildDepartmentsByClass = (subjectData = []) => {
    const map = {};
    subjectData.forEach((s) => {
        const clsId = s?.classname_id;
        const dept = s?.department_data;
        if (!clsId || !dept) return;
        map[clsId] = map[clsId] || {};
        map[clsId][dept.id] = { value: dept.id, label: dept.department_name };
    });
    // convert to arrays
    Object.keys(map).forEach((k) => {
        map[k] = Object.values(map[k]);
    });
    return map;
};

/* -------------------- Component -------------------- */
const Subject = () => {
    const items = ["Name", "Class", "Department", "Subject", "Status", "Actions"];

    // UI state
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [popOpen, setPopOpen] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openPageSize, setOpenPageSize] = useState(false);
    const [pageSizeValue, setPageSizeValue] = useState("27");
    const pageSize = parseInt(pageSizeValue, 10) || 27;
    const pageSizeOptions = ["27", "50", "75", "100"];
    const [searchTerm, setSearchTerm] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [updateName, setUpdateName] = useState("");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(true);
    const menuRef = useRef(null);
    const actionButtonRefs = useRef({});
    const [classValue, setClassValue] = useState(null);
    const [departmentValue, setDepartmentValue] = useState(null);
    const [subjectValue, setSubjectValue] = useState(null);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // local "backend" data sources (static)
    const classData = staticPayload.classData || [];
    const initialSubjects = staticPayload.subjectData || [];

    // departments derived from subjects
    const departmentsByClass = useMemo(() => buildDepartmentsByClass(initialSubjects), [initialSubjects]);

    // prepare classes for SelectSearch
    const classes = useMemo(
        () => classData.map((c) => ({ value: c.id, label: c.name })),
        [classData]
    );

    // departments for currently selected class (derived)
    const departments = useMemo(() => {
        if (!classValue) return [];
        return departmentsByClass[classValue] || [];
    }, [classValue, departmentsByClass]);

    // Close popover on outside click, escape, or scroll
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setPopOpen(null);
            }
        };
        const handleEscape = (e) => {
            if (e.key === "Escape") setPopOpen(null);
        };
        const handleScroll = () => setPopOpen(null);

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, []);

    // load static data once on mount
    useEffect(() => {
        setRows(initialSubjects);
    }, [initialSubjects]);

    const filteredRows = useMemo(() => {
        const raw = (searchTerm || "").trim().toLowerCase();
        if (!raw) return rows || [];

        const tokens = raw.split(/\s+/).filter(Boolean);
        if (tokens.length === 0) return rows || [];

        return (rows || []).filter((row) => {
            const subject = String(row?.subject_name ?? "").toLowerCase();
            const department = String(row?.department_data?.department_name ?? "").toLowerCase();
            const classname = String(row?.class_data?.name ?? "").toLowerCase();
            const combined = [subject, department, classname].join(" ");
            return tokens.every((t) => combined.includes(t));
        });
    }, [rows, searchTerm]);

    // prevent form reload
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch((s) => !s);
        if (search) {
            setSearchTerm(e.target.search.value);
        } else {
            setSearchTerm("");
            e.target.reset();
        }
    };

    const handleSelectPageSize = (v) => {
        setPageSizeValue(v);
        setOpenPageSize(false);
        setCurrentPage(1);
    };

    // pagination helpers
    const totalPages = Math.max(1, Math.ceil(filteredRows?.length / pageSize));
    const currentPageSafe = Math.min(currentPage, totalPages);
    const startIndex = (currentPageSafe - 1) * pageSize;
    const currentRows = filteredRows?.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setPopOpen(null);
        }
    };

    // Position and toggle popover for given row id
    const handleThreeDotsClick = (rowId, e) => {
        e.stopPropagation();
        const buttonElement = actionButtonRefs.current[rowId];
        if (buttonElement) {
            const rect = buttonElement.getBoundingClientRect();
            let top = rect.bottom;
            let left = rect.left - 145;
            const viewportHeight = window.innerHeight;
            const popoverApproxHeight = viewportHeight / 4;
            if (top + popoverApproxHeight > viewportHeight) {
                top = rect.top - 120;
            }
            const popoverApproxWidth = 180;
            if (left + popoverApproxWidth > window.innerWidth) {
                left = window.innerWidth - popoverApproxWidth - 75;
            }
            setPopoverPosition({ top, left });
        }
        setPopOpen((prev) => (prev === rowId ? null : rowId));
    };

    const reset = () => {
        setClassValue(null);
        setDepartmentValue(null);
        setSubjectValue(null);
        setImage(null);
        setUpdateName("");
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    /* -------------------- Local (in-memory) CRUD behaviors -------------------- */

    // Create subject (local)
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!classValue || !departmentValue || !subjectValue) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        // Build new subject object (minimal fields required by UI)
        const newId = Date.now(); // simple unique id
        const cls = classData.find((c) => c.id === classValue) || { id: classValue, name: "Unknown" };
        const deptObj = (departments || []).find((d) => d.value === departmentValue) || {
            value: departmentValue,
            label: "Unknown",
        };

        const newSubject = {
            id: newId,
            user_id: 1,
            classname_id: cls.id,
            department_id: deptObj.value,
            subject_name: subjectValue,
            subject_image: image ? image.name || null : null,
            status: 1,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString(),
            class_data: { id: cls.id, name: cls.name },
            department_data: { id: deptObj.value, department_name: deptObj.label },
        };

        setRows((r) => [newSubject, ...(r || [])]);
        toast.success("Subject created (local).");
        reset();
        setLoading(false);
        setOpenAdd(false);
    };

    // Actions from popover (id-based)
    const handleActionClick = (action, rowId) => {
        const row = rows.find((r) => r.id === rowId);
        if (!row) return;

        if (action === "update") {
            setEditingRow(row);
            setUpdateName(row?.subject_name ?? "");
            setClassValue(row?.class_data?.id ?? null);
            setDepartmentValue(row?.department_data?.id ?? null);

            setOpenUpdate(true);
            setPopOpen(null);
            return;
        }
        setPopOpen(null);
    };

    // update subject (local)
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!editingRow) {
            toast.error("No subject selected to update.");
            setLoading(false);
            return;
        }

        if (!updateName || !classValue || !departmentValue) {
            toast.error("Please fill all required fields for update.");
            setLoading(false);
            return;
        }

        setRows((prev) =>
            prev.map((r) =>
                r.id === editingRow.id
                    ? {
                        ...r,
                        subject_name: updateName,
                        classname_id: classValue,
                        department_id: departmentValue,
                        subject_image: image ? image.name || r.subject_image : r.subject_image,
                        updated_at: new Date().toLocaleString(),
                        class_data: {
                            id: classValue,
                            name: (classData.find((c) => c.id === classValue) || {}).name || r.class_data?.name,
                        },
                        department_data: {
                            id: departmentValue,
                            department_name:
                                (departmentsByClass[classValue] || []).find((d) => d.value === departmentValue)?.label ||
                                r.department_data?.department_name,
                        },
                    }
                    : r
            )
        );

        toast.success("Subject updated (local).");
        reset();
        setEditingRow(null);
        setUpdateName("");
        setClassValue(null);
        setDepartmentValue(null);
        setSubjectValue(null);
        setLoading(false);
        setOpenUpdate(false);
    };

    // Toggle status locally
    const handleStatusChange = (id) => {
        setLoading(true);
        setRows((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: r.status === 1 ? 0 : 1, updated_at: new Date().toLocaleString() } : r))
        );
        setPopOpen(null);
        toast.success("Status toggled (local).");
        setLoading(false);
    };

    // Delete subject locally
    const handleDelete = (id) => {
        setLoading(true);
        setRows((prev) => prev.filter((r) => r.id !== id));
        setPopOpen(null);
        toast.success("Subject deleted (local).");
        setLoading(false);
    };

    // If you want to keep Loader usage for async UX, we can show it when loading true.
    if (false) {
        return <Loader />;
    }

    /* -------------------- Render -------------------- */
    return (
        <div className="relative w-full">
            <div className={`p-5 ${popOpen ? "pb-16" : ""}`}>
                <div className="w-full px-5 relative bg-base-200">
                    <div className="w-full py-3 text-primary-content flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-5">
                        <h1 className="font-semibold text-3xl">Subject</h1>

                        <div className="flex flex-col lg:flex-row items-center justify-end gap-2">
                            {/* SEARCH */}
                            <form onSubmit={handleSearchSubmit} className="flex items-center">
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="Search Here"
                                    disabled={!search}
                                    className={`border-2 border-primary w-full h-10 px-2 focus:outline-none rounded-s text-primary-content ${!search ? "bg-gray-200 cursor-not-allowed opacity-70" : ""
                                        }`}
                                />
                                <button
                                    type="submit"
                                    className="flex items-center gap-1 font-bold text-white bg-primary hover:bg-primary-hover px-3 py-2 text-base rounded-e cursor-pointer "
                                >
                                    {search ? "Search" : "Reset"}
                                </button>
                            </form>

                            <div className="flex items-center justify-end gap-2">
                                {/* PAGE SIZE */}
                                <div className="relative w-16">
                                    <button
                                        onClick={() => setOpenPageSize(!openPageSize)}
                                        className="w-full py-1.5 border-2 border-primary bg-white rounded cursor-pointer flex items-center justify-center gap-2"
                                        type="button"
                                    >
                                        {pageSizeValue} <IoIosArrowDown className={`transition-transform duration-300 ${openPageSize ? "-rotate-180" : ""}`} />
                                    </button>

                                    <div
                                        className={`absolute z-20 w-full mt-1 bg-white border-2 border-primary rounded shadow overflow-hidden transition-all duration-200 origin-top ${openPageSize ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                                            }`}
                                    >
                                        {pageSizeOptions.map((opt) => (
                                            <div key={opt} onClick={() => handleSelectPageSize(opt)} className="text-center py-2 hover:bg-gray-100 cursor-pointer">
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FILTER */}
                                <button onClick={() => setOpenFilter(true)} className="flex items-center gap-1 font-bold text-primary bg-primary-light hover:bg-primary-light-hover px-3 py-2 text-base rounded cursor-pointer">
                                    <FiFilter />
                                    Filter
                                </button>

                                {/* ADD */}
                                <button onClick={() => setOpenAdd(true)} className="flex items-center gap-1 font-bold text-white bg-primary hover:bg-primary-hover px-3 py-2 text-base rounded cursor-pointer whitespace-nowrap">
                                    <GoPlusCircle />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* card grid */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-5">
                        {currentRows?.length === 0 ? (
                            <div className="col-span-full border border-accent py-4 px-4 whitespace-nowrap text-center">
                                {searchTerm ? `No data found for "${searchTerm}".` : "No data available."}
                            </div>
                        ) : (
                            currentRows?.map((row) => (
                                <div key={row?.id} className="w-full border border-accent bg-base-200 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 ">
                                    <img
                                        src={row?.subject_image ? `https://admin.proshnobank.com/storage/uploads/subjectFile/${row?.subject_image}` : BookDefaultPhoto}
                                        alt=""
                                        className="w-full h-52 object-cover"
                                    />
                                    <div className="p-2 flex flex-col gap-1 relative">
                                        <h1 className="font-semibold text-lg text-primary truncate pr-3 ">{row?.subject_name}</h1>
                                        <p className="text-base text-primary-content truncate ">{row?.class_data?.name} ({row?.department_data?.department_name})</p>
                                        <button
                                            ref={(el) => (actionButtonRefs.current[row?.id] = el)}
                                            onClick={(e) => handleThreeDotsClick(row?.id, e)}
                                            className="border-none py-0 px-2 absolute top-3 right-1 cursor-pointer"
                                            type="button"
                                            aria-label={`Actions for ${row?.name}`}
                                        >
                                            <BsThreeDotsVertical className="text-xl cursor-pointer font-bold" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* popover */}
                    {popOpen && (
                        <div
                            ref={menuRef}
                            className="fixed min-w-40 bg-white font-bold shadow-lg rounded border border-accent p-2 z-50"
                            style={{
                                top: `${popoverPosition.top}px`,
                                left: `${popoverPosition.left}px`,
                            }}
                            role="menu"
                            aria-orientation="vertical"
                        >
                            <button
                                onClick={() => handleStatusChange(popOpen)}
                                className="flex items-center gap-2 p-2 text-sm rounded cursor-pointer hover:bg-neutral w-full text-left"
                                role="menuitem"
                                disabled={loading}
                            >
                                <MdBlock size={20} />
                                Active/Inactive
                            </button>

                            <button
                                onClick={() => handleActionClick("update", popOpen)}
                                className="flex items-center gap-2 p-2 text-sm rounded cursor-pointer hover:bg-neutral w-full text-left"
                                role="menuitem"
                            >
                                <GrDocumentUpdate size={18} /> Update
                            </button>

                            <button
                                onClick={() => handleDelete(popOpen)}
                                className="flex items-center gap-2 p-2 text-sm rounded cursor-pointer hover:bg-neutral w-full text-left"
                                role="menuitem"
                                disabled={loading}
                            >
                                <MdDeleteOutline size={20} /> Delete
                            </button>
                        </div>
                    )}

                    {/* PAGINATION */}
                    <div className="py-3 flex items-center justify-between">
                        <div className="text-sm lg:text-base w-full">
                            Showing <span>{Math.min(rows?.length === 0 ? 0 : startIndex + 1, rows?.length)}</span> to{" "}
                            <span>{Math.min(startIndex + currentRows?.length, rows?.length)}</span> of <span>{rows?.length}</span> entries
                        </div>

                        <div className="w-full flex justify-end items-center gap-2 flex-wrap">
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
                                        className={`px-3 py-1 border bg-base-200 hover:bg-secondary cursor-pointer border-accent ${page === currentPageSafe ? "bg-primary text-neutral-content" : ""}`}
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

            {/* Create Subject side panel */}
            <div className={`${openAdd ? "fixed top-0 right-0 max-w-xl w-full bg-base-200 h-screen overflow-y-scroll p-5 z-50" : "hidden"}`}>
                <div className="flex items-center justify-between border-b-2 border-accent pb-2">
                    <h1 className="text-base sm:text-lg font-semibold">Create Subject</h1>
                    <button type="button" onClick={() => { reset(); setOpenAdd(false); }} className="text-sm text-primary-content cursor-pointer hover:text-error">
                        <IoMdClose size={24} />
                    </button>
                </div>

                <form className="mt-4 space-y-4" onSubmit={handleCreateSubmit}>
                    <div>
                        <label className="pb-1 font-semibold">Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={subjectValue || ""}
                            onChange={(e) => setSubjectValue(e.target.value)}
                            className="w-full max-h-10 border border-accent px-3 py-2 rounded outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <h1 className="font-semibold text-lg text-primary-content">Class <span className="text-error">*</span></h1>
                        <SelectSearch options={classes} selectOption={classValue} setSelectOption={setClassValue} placeholder="Select class" />
                    </div>

                    <div>
                        <h1 className="font-semibold text-lg text-primary-content">Department <span className="text-error">*</span></h1>
                        <SelectSearch options={departments} selectOption={departmentValue} setSelectOption={setDepartmentValue} placeholder="Select Department" />
                    </div>

                    <div>
                        <h1 className="mb-2 font-semibold">Image</h1>
                        <input
                            id="fileInput"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                if (previewUrl) {
                                    URL.revokeObjectURL(previewUrl);
                                    setPreviewUrl(null);
                                }
                                if (file) {
                                    setImage(file);
                                    const url = URL.createObjectURL(file);
                                    setPreviewUrl(url);
                                } else {
                                    setImage(null);
                                    setPreviewUrl(null);
                                }
                            }}
                            className="hidden"
                        />

                        <label htmlFor="fileInput" className="flex flex-col items-center justify-center w-full border border-dashed px-3 py-4 rounded cursor-pointer hover:bg-gray-50">
                            <img src={previewUrl || uploadimage} alt="preview" className="w-40 h-40 object-cover rounded mb-2" />
                        </label>
                    </div>

                    <div className="flex items-center justify-end gap-5">
                        <button type="button" className="bg-secondary text-primary-content py-2 px-4 rounded-md  cursor-pointer " onClick={() => { reset(); setOpenAdd(false); }}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md  cursor-pointer " disabled={loading}>
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>

            {/* UPDATE SIDE PANEL */}
            {openUpdate && editingRow && (
                <div className="fixed top-0 right-0 max-w-xl w-full bg-base-200 h-screen overflow-y-scroll p-5 z-50">
                    <div className="flex items-center justify-between border-b-2 border-accent pb-2">
                        <h1 className="text-base sm:text-lg font-semibold">Update Subject</h1>
                        <button type="button" onClick={() => { reset(); setOpenUpdate(false); setEditingRow(null); }} className="text-sm text-primary-content cursor-pointer hover:text-error">
                            <IoMdClose size={24} />
                        </button>
                    </div>

                    <form className="mt-4 space-y-4" onSubmit={handleUpdateSubmit}>
                        <div>
                            <label className="font-semibold text-lg text-primary-content">Name <span className="text-error">*</span></label>
                            <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="w-full max-h-10 border border-accent px-3 py-2 rounded outline-none focus:ring-2 focus:ring-primary" required />
                        </div>

                        <div>
                            <h1 className="font-semibold text-lg text-primary-content">Class <span className="text-error">*</span></h1>
                            <SelectSearch options={classes} selectOption={classValue} setSelectOption={setClassValue} placeholder="Select class" />
                        </div>

                        <div>
                            <h1 className="font-semibold text-lg text-primary-content">Department <span className="text-error">*</span></h1>
                            <SelectSearch options={departments} selectOption={departmentValue} setSelectOption={setDepartmentValue} placeholder="Select Department" />
                        </div>

                        <div>
                            <h1 className="mb-2 font-semibold">Image</h1>
                            <input id="fileInput2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
                            <label htmlFor="fileInput2" className="flex flex-col items-center justify-center w-full border border-dashed px-3 py-4 rounded cursor-pointer hover:bg-gray-50">
                                <img src={image ? URL.createObjectURL(image) : uploadimage} alt="preview" className="w-40 h-40 object-cover rounded mb-2" />
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-5">
                            <button type="button" className="bg-secondary text-primary-content py-2 px-4 rounded-md cursor-pointer" onClick={() => { reset(); setOpenUpdate(false); setEditingRow(null); }}>
                                Cancel
                            </button>
                            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md cursor-pointer" disabled={loading}>
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Subject;