import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserCircle,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SignUpWithEmail } from "../services/authentication/signup";

const Register = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        // username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    };

const validationSchema = Yup.object().shape({

  name: Yup.string()
    .required("Name is required"),

//   username: Yup.string()
//     .required("Username is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

    const handleSubmit = async (values) => {
        try {
            const res = await SignUpWithEmail(values)
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            alert("Registration failed.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#FF6767] flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-[1200px] w-full flex py-5">
                <div className="w-full p-0 hidden md:flex items-center justify-center">
                    <img src="/register.png" alt="signup" className="w-[350px]" />
                </div>
                <div className="w-full">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, values, errors, touched }) => (
                            <Form className="w-full p-6 space-y-4">

                                <div className="flex items-center border p-2 rounded">
                                    <FaUserCircle className="mr-2" />
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        className="w-full outline-none"
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>

                                {/* <div className="flex items-center border p-2 rounded">
                                    <FaUserCircle className="mr-2" />
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Enter username"
                                        className="w-full outline-none"
                                        onChange={handleChange}
                                        value={values.username}
                                    />
                                    {touched.username && errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div> */}

                                <div className="flex items-center border p-2 rounded">
                                    <FaUserCircle className="mr-2" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        className="w-full outline-none"
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>

                                <div className="flex items-center border p-2 rounded">
                                    <FaLock className="mr-2" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        className="w-full outline-none"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    {touched.password && errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center border p-2 rounded">
                                    <FaLock className="mr-2" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Enter confirmPassword"
                                        className="w-full outline-none"
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <div className="invalid-feedback">
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                                </div>

                                <label className="flex items-center text-sm gap-2">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        onChange={handleChange}
                                        className="accent-rose-400"
                                    />
                                    I agree to all terms
                                </label>

                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-rose-400 text-white rounded hover:bg-rose-500"
                                >
                                    Register
                                </button>

                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-blue-500 hover:underline">
                                        Sign In
                                    </a>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;
