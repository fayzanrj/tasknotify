export interface DateTimeInputProps {
  label: string;
  id: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  selectedDate?: string;
  variant?: "EDIT" | "ADD";
  date?: string;
}
