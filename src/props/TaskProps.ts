export interface TaskProps {
  id?: string;
  taskTitle: string;
  taskDesc: string;
  tags: string[];
  date: string;
  startsAt: Date;
  reminderAt: Date;
  status: "Pending" | "Completed" | "Overdue";
  link?: string;
}
