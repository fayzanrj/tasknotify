export interface UserProps {
  id: string;
  name: string;
  email: string;
  profilePic: string | null;
  isVerified: boolean | null;
  sendReminders: boolean | null;
}
