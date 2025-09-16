import axios from "axios";
import { Form, Formik } from "formik";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { insertTask } from "../redux/slices/todo/todoAsyncThunk";

const AddTaskDialog = ({ visible, onHide }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  // ✅ Validation schema (aligned with backend)
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.date().required("Deadline is required"),
    priority: Yup.string().required("Priority is required"),
    description: Yup.string().nullable(),
    image: Yup.mixed().nullable(),
  });

  // ✅ Submit handler
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("dueDate", values.dueDate);
    formData.append("priority", values.priority);
    formData.append("description", values.description || "");
    formData.append("assignedToId", userId); // ✅ Prisma expects assignedToId

    if (values.image) formData.append("image", values.image);

    try {
      await dispatch(insertTask(formData)).unwrap();
      toast.success("Task added successfully!");
      onHide();
    } catch (error) {
      console.error("Insert Task error:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Dialog
      header={
        <div className="flex justify-between items-center text-lg font-semibold px-6 pt-6 mb-5">
          Add New Task
          <button
            onClick={onHide}
            className="text-blue-600 underline text-sm cursor-pointer"
          >
            Go Back
          </button>
        </div>
      }
      visible={visible}
      style={{ width: "600px" }}
      modal
      className="p-fluid bg-white rounded-sm py-5"
      onHide={onHide}
      maskClassName="bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <Formik
        initialValues={{
          title: "",
          dueDate: "",
          priority: "",
          description: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, handleChange }) => {
          const debounceRef = useRef(null);

          // ✅ Auto-generate description (kept from your code)
          useEffect(() => {
            if (!values.title || values.description) return;

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(async () => {
              try {
                const res = await axios.post(
                  "http://localhost:3001/api/generate-description",
                  { title: values.title }
                );
                if (res.data.description) {
                  setFieldValue("description", res.data.description);
                }
              } catch (err) {
                console.error("Auto-gen description error:", err.message);
              }
            }, 800);
          }, [values.title, values.description, setFieldValue]);

          return (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 pb-4 mb-4 border border-gray-300 p-3">
                {/* Title */}
                <div className="flex flex-col col-span-2">
                  <label htmlFor="title" className="mb-1 font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter task title"
                    onChange={handleChange}
                    value={values.title}
                  />
                  {touched.title && errors.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex flex-col">
                  <label htmlFor="dueDate" className="mb-1 font-medium">
                    Deadline
                  </label>
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={values.dueDate}
                    onChange={handleChange}
                  />
                  {touched.dueDate && errors.dueDate && (
                    <div className="text-red-500 text-sm">{errors.dueDate}</div>
                  )}
                </div>

                {/* Priority */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Priority</label>
                  <div className="flex gap-4 items-center">
                    {["HIGH", "MEDIUM", "LOW"].map((level) => (
                      <label
                        key={level}
                        className="inline-flex items-center gap-1"
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          className="accent-orange-500 cursor-pointer"
                          onChange={handleChange}
                        />
                        <span
                          className={
                            level === "HIGH"
                              ? "text-red-600 cursor-pointer"
                              : level === "MEDIUM"
                              ? "text-blue-600 cursor-pointer"
                              : "text-green-600 cursor-pointer"
                          }
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                  {touched.priority && errors.priority && (
                    <div className="text-red-500 text-sm">{errors.priority}</div>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col col-span-1">
                  <label htmlFor="description" className="mb-1 font-medium">
                    Task Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Start writing here..."
                    value={values.description}
                    onChange={handleChange}
                  />
                  {touched.description && errors.description && (
                    <div className="text-red-500 text-sm">
                      {errors.description}
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="flex flex-col col-span-1">
                  <label htmlFor="image" className="mb-1 font-medium">
                    Upload Image
                  </label>
                  <div
                    className="border border-dashed border-gray-400 rounded-md flex flex-col justify-center items-center h-32 cursor-pointer relative overflow-hidden"
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                  >
                    {values.image ? (
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-gray-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span className="text-sm text-gray-500">
                          Click or drag to upload
                        </span>
                      </>
                    )}
                    <input
                      id="imageInput"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFieldValue("image", e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-orange-500 text-white border-none py-2 rounded-md hover:bg-orange-600 w-[100px] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddTaskDialog;
