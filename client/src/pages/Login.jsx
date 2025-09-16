import { Field, Form, Formik } from "formik";
import { FaFacebook, FaGithub, FaLock, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginWithEmail } from "../services/authentication/login";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (values) => {
    try {
      const res = await loginWithEmail(values);

      if (res?.token) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };
  return (
    <div className="min-h-screen bg-[#FF6767] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-[1200px] w-full flex items-center justify-center">
        <div className="w-full ">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched, isSubmitting }) => (
              <Form className="w-full p-6 space-y-4">
                <h2 className="text-3xl font-bold mb-10">Sign In</h2>

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
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <label className="flex items-center text-sm gap-2 mb-5">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="accent-rose-400"
                  />
                  Remember Me
                </label>

                <button
                  type="submit"
                  className="px-7 py-3 bg-rose-400 text-white rounded hover:bg-rose-500 cursor-pointer mb-10"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>

                <div className="flex gap-4 items-center">
                  <p className="text-sm">Or, Login with</p>
                  <button type="button">
                    <FaFacebook />
                  </button>
                  <button type="button">
                    <FcGoogle />
                  </button>
                  <button type="button">
                    <FaGithub />
                  </button>
                </div>

                <p className="text-sm mt-4">
                  Don’t have an account?{" "}
                  <a href="/register" className="text-blue-500 hover:underline">
                    Create One
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>

        <div className="w-full p-10 hidden md:flex items-center justify-center mt-10">
          <img src="/login.png" alt="login" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
