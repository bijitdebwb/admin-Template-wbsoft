import Select from "react-select";

const SelectSearch = ({ options, selectOption, setSelectOption, placeholder }) => {
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
    return (
        <>
            <Select
                options={options}
                value={options.find((option) => option?.value === selectOption) || null}
                onChange={(option) => setSelectOption(option.value)}
                placeholder={placeholder}
                className="w-full cursor-text"
                styles={selectStyles}
            />
        </>
    );
};

{/* <SelectSearch
    options={projects}
    selectOption={gProject}
    setSelectOption={setGProject}
    placeholder="Select Course"
/> */}

export default SelectSearch;