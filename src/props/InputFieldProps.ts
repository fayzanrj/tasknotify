export default interface InputFieldPropTypes {
  type: "email" | "password" | "text";
  id: "email" | "password" | "confirmPassword" | "fullName";
  label: "Email" | "Password" | "Confirm Password" | "Full Name";
  placeHolder: string;
  disabled: boolean;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}
