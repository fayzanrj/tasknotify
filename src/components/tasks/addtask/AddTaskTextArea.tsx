import React from "react";

// TextArea interface
interface TextAreaProps {
  label: string;
  id: string;
  placeholder: string;
  rows: number;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const AddTaskTextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  placeholder,
  rows,
  state,
  setState,
}) => (
  <div className="my-5">
    {/* Label for the textarea */}
    <label htmlFor={id} className="ml-2">
      {label} <span className="text-sm">({state.length}/150)</span>
    </label>
    <br />
    {/* Textarea field */}
    <textarea
      id={id}
      rows={rows}
      value={state}
      maxLength={150}
      onChange={(e): void => setState(e.currentTarget.value)}
      placeholder={placeholder}
      className="w-full mt-1 px-3 py-2 border-2 dark:border-[#1F1F1F] rounded-lg dark:bg-[#1F1F1F] outline-none resize-none SCROLL_BAR"
    />
  </div>
);

export default AddTaskTextArea;
