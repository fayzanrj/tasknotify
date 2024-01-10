import React from "react";

// Task Input interface
interface AddTaskTextInputProps {
  label: string;
  id: "taskTitle" | "taskTags" | "url";
  placeholder: string;
  state: string;
  type: "text" | "url";
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const AddTaskTextInput: React.FC<AddTaskTextInputProps> = ({
  label,
  id,
  placeholder,
  state,
  setState,
  type,
}) => (
  <>
    {/* Label for the input */}
    <label htmlFor={id} className="ml-2">
      {label}{" "}
      {type !== "url" && <span className="text-sm">({state.length}/20)</span>}
    </label>
    <br />
    {/* Input field */}
    <input
      id={id}
      type={type}
      value={state}
      maxLength={type === "url" ? 200 : 20}
      onChange={(e): void => setState(e.currentTarget.value)}
      placeholder={placeholder}
      className="w-full mt-1 px-3 py-2 border-2 dark:border-[#1F1F1F] rounded-lg dark:bg-[#1F1F1F] outline-none"
    />
  </>
);

export default AddTaskTextInput;
