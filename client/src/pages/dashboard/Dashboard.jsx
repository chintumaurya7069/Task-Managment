import React, { useEffect, useState } from "react";
import RadialBarChart from "../../components/RadialBarChart";
import AddTaskDialog from "../../components/AddTaskDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "../../redux/slices/todo/todoAsyncThunk";
import { fetchByIdUser } from "../../redux/slices/user/userAsyncThunk.js";
import InviteMemberDialog from "../../components/InviteMemberDialog.jsx";

const completedTasks = [
  {
    id: 1,
    title: "Walk the dog",
    description: "Take the dog to the park and bring treats as well.",
    status: "Completed",
    completedAgo: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=64&q=80",
  },
  {
    id: 2,
    title: "Conduct meeting",
    description: "Meet with the client and finalize requirements.",
    status: "Completed",
    completedAgo: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=64&q=80",
  },
];

const Dashboard = () => {
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showInviteMemberDialog, setShowInviteMemberDialog] = useState(false);
  const openDialog = () => setShowAddTaskDialog(true);
  const openInviteDialog = () => setShowInviteMemberDialog(true);
  const closeDialog = () => setShowAddTaskDialog(false);
  const closeInviteDialog = () => setShowInviteMemberDialog(false);

  const handleAddTaskSubmit = (task) => {
    console.log("New Task:", task);
  };
  const handleInviteMember = (task) => {
    console.log("New Task:", task);
  };

  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const { singleUserData, loading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchByIdUser(userId));
    } else {
      console.warn("No user ID found in localStorage");
      navigate("/login");
    }
  }, [dispatch, userId]);

  const { taskData } = useSelector((state) => state.tasks);

  const userById = localStorage.getItem("userId");
  useEffect(() => {
    if (userById) {
      dispatch(fetchTask(userById));
    }
  }, [dispatch, userById]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {singleUserData?.name} 👋
        </h1>
        <div className="flex items-center space-x-3">
          {[1, 2, 3, 4].map((_, i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/40?img=${i + 10}`}
              alt="avatar"
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            />
          ))}
          <button
            className="ml-4 px-3 py-1 border border-pink-400 text-pink-500 rounded-md hover:bg-pink-50 text-sm font-medium cursor-pointer"
            onClick={openInviteDialog}
          >
            + Invite
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: To-Do List */}
        <div className="col-span-7 bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex justify-between items-center text-gray-600 font-semibold">
            <div className="flex items-center space-x-2">
              <i className="ti ti-list-check text-pink-500" />
              <span>To-Do</span>
            </div>
            <button
              className="text-pink-500 text-sm font-medium hover:underline cursor-pointer"
              onClick={openDialog}
            >
              + Add task
            </button>
          </div>

          {taskData?.map((task) => (
            <div
              key={task?._id} // from MongoDB
              className={`flex justify-between border rounded-lg p-4 ${
                task?.priority === "High" ? "border-red-200" : "border-blue-200"
              }`}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-1">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      task?.priority === "High"
                        ? "border-red-500"
                        : "border-blue-500"
                    }`}
                  />
                  <h3 className="font-semibold text-gray-900">{task?.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {task?.description}
                </p>
                <div className="flex flex-wrap space-x-4 text-xs text-gray-400">
                  <div>
                    Priority:{" "}
                    <span
                      className={`${
                        task?.priority === "High"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      {task?.priority}
                    </span>
                  </div>
                  <div>
                    Status: <span className="text-blue-600">{task?.status}</span>
                  </div>
                  <div>Created on: {new Date(task?.dueDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Task Status + Completed Task */}
        <div className="col-span-5 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-pink-500 font-semibold mb-4">Task Status</h3>
            <div className="flex justify-center space-x-6">
              <div className="flex flex-col items-center">
                <RadialBarChart percentage={84} color="#16a34a" />
                <span className="text-xs font-semibold text-green-700 mt-1">
                  Completed
                </span>
              </div>
              <div className="flex flex-col items-center">
                <RadialBarChart percentage={46} color="#2563eb" />
                <span className="text-xs font-semibold text-blue-700 mt-1">
                  In Progress
                </span>
              </div>
              <div className="flex flex-col items-center">
                <RadialBarChart percentage={13} color="#dc2626" />
                <span className="text-xs font-semibold text-red-700 mt-1">
                  Not Started
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-pink-500 font-semibold">Completed Task</h3>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between border border-green-300 rounded-lg p-4"
              >
                <div className="flex-1 pr-4">
                  <h4 className="flex items-center space-x-2 font-semibold text-gray-900">
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    <span>{task.title}</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {task.description}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">
                    Status: {task.status}
                  </p>
                  <p className="text-xs text-gray-400">
                    Completed {task.completedAgo}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddTaskDialog
        visible={showAddTaskDialog}
        onHide={closeDialog}
        onSubmit={handleAddTaskSubmit}
      />
      <InviteMemberDialog
        visible={showInviteMemberDialog}
        onHide={closeInviteDialog}
        onSubmit={handleInviteMember}
      />
    </div>
  );
};

export default Dashboard;
