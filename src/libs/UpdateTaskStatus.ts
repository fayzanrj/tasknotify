import prisma from '@/app/db'

export const updateTaskStatus = async (
    date: string,
    taskStatus: string,
    taskId: string
  ) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    if (currentDate > new Date(date) && taskStatus === "Pending") {
      const updatedStatus = "Overdue";
      try {
        const task = await prisma.task.update({
          where: { id: taskId },
          data: {
            status: updatedStatus,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  