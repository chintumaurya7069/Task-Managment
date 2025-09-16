import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchProjects, insertProject } from "../../redux/slices/project/projectAsyncThunk";
import { fetchTask } from "../../redux/slices/todo/todoAsyncThunk";

export default function ProjectPage({ userId }) {
  const dispatch = useDispatch();
  const { projects, mainLoader, loading } = useSelector((state) => state.projects);
  const { taskData, mainLoader: taskLoader } = useSelector((state) => state.tasks);

  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState("list");
  const [showForm, setShowForm] = useState(false);

  // fetch projects on mount
  useEffect(() => {
    if (userId) dispatch(fetchProjects(userId));
  }, [userId, dispatch]);

  // fetch tasks when project changes
  useEffect(() => {
    if (selectedProject?._id) {
      dispatch(fetchTask({ userId, projectId: selectedProject._id }));
    }
  }, [selectedProject, userId, dispatch]);

  const stats = {
    total: taskData?.length || 0,
    completed: taskData?.filter((t) => t.status === "COMPLETED").length || 0,
  };

  if (mainLoader) return <p>Loading projects...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Project Selector */}
      <div className="flex items-center justify-between">
        <select
          value={selectedProject?._id || ""}
          onChange={(e) => {
            const proj = projects.find((p) => p._id === e.target.value);
            setSelectedProject(proj || null);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">-- Select Project --</option>
          {projects?.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Stats */}
        {selectedProject && (
          <div className="text-sm bg-gray-100 px-4 py-2 rounded-lg shadow">
            <p>Total Tasks: {stats.total}</p>
            <p>
              Completed: {stats.completed} (
              {stats.total > 0
                ? Math.round((stats.completed / stats.total) * 100)
                : 0}
              %)
            </p>
          </div>
        )}

        {/* View Toggle */}
        <div className="flex space-x-2">
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg ${
              view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`p-2 rounded-lg ${
              view === "kanban" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Kanban
          </button>
        </div>

        {/* Create Project Button */}
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          {showForm ? "Close" : "Create Project"}
        </button>
      </div>

      {/* Create Project Form */}
      {showForm && (
        <div className="p-4 bg-white shadow rounded-lg max-w-md">
          <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required("Project name is required"),
              description: Yup.string().optional(),
            })}
            onSubmit={async (values, { resetForm }) => {
              await dispatch(insertProject({ ...values, userId }));
              resetForm();
              setShowForm(false);
              dispatch(fetchProjects(userId)); // refresh list
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Project Name"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description (optional)"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isSubmitting || loading ? "Creating..." : "Create"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Task Section */}
      {taskLoader ? (
        <p>Loading tasks...</p>
      ) : view === "list" ? (
        <div className="space-y-2">
          {taskData?.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center p-3 bg-white shadow rounded-lg"
            >
              <span>{task.title}</span>
              <span className="text-sm text-gray-500">{task.assignee}</span>
              <span className="px-2 py-1 text-xs rounded-lg bg-gray-200">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {["TODO", "IN_PROGRESS", "TESTING", "COMPLETED"].map((status) => (
            <div key={status} className="bg-gray-100 p-3 rounded-lg">
              <h3 className="font-semibold mb-2">{status}</h3>
              <div className="space-y-2">
                {taskData
                  ?.filter((t) => t.status === status)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="p-2 bg-white rounded-lg shadow"
                    >
                      {task.title}
                      <p className="text-xs text-gray-500">{task.assignee}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
