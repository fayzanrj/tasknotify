

const TaskItemSkeleton = () => {
  const skeletonCount = 3;
  const skeletons = Array.from({ length: skeletonCount });

  return (
    <div className="w-full px-10 py-10 flex flex-wrap justify-center gap-5 md:gap-5 overflow-hidden duration-75 animate-pulse">
      {skeletons.map((_, index) => (
        <TaskItemSkeletonItem key={index} />
      ))}
    </div>
  );
};

export default TaskItemSkeleton;

const TaskItemSkeletonItem = () => {
  return (
    <div className="block">
      <div className="w-80 h-56 sm:w-72 sm:h-40 rounded-xl bg-gray-200 dark:bg-[#404040] select-none block"></div>
      {/* <div className="w-40 h-5 sm:w-32 ml-2 rounded-full bg-gray-200 mt-2 block"></div> */}
    </div>
  );
};