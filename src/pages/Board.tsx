import { useParams } from "react-router-dom";
import { useGetTasksByBoardQuery } from "@/features/tasks/taskApiSlice";
import { useGetBoardQuery } from "@/features/boards/boardApiSlice";
import getTimeAgo from "@/lib/getTimeAgo";

const Board = () => {
  const { id } = useParams();
  const { data } = useGetTasksByBoardQuery(id);
  const { data: board } = useGetBoardQuery(id);
  return (
    <div className="p-5">
      <p className="text-xs text-[#8A93A8]">
        {data?.taskCount} tasks . Last Updated {getTimeAgo(board.updatedAt)}
      </p>
    </div>
  );
};

export default Board;
