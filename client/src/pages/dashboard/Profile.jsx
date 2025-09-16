import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchByIdUser} from "../../redux/slices/user/userAsyncThunk.js"

const AccountInfo = () => {
  const navigate= useNavigate()
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

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-red-500 inline-block">
          Account Information
        </h2>
        <p className="text-sm text-black underline hover:text-red-500 cursor-pointer" onClick={()=>navigate('/admin/dashboard')}>
          Go Back
        </p>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="https://i.pravatar.cc/100?img=1"
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold text-black">{singleUserData?.name}</p>
          <p className="text-sm text-gray-600">{singleUserData?.email}</p>
        </div>
      </div>

      {/* Form Box */}
      <div className="border border-gray-300 rounded-2xl p-6 shadow">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>
          <div className="md:col-span-2 md:flex md:space-x-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex space-x-3 mt-4">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm cursor-pointer"
            >
              Update Info
            </button>
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm cursor-pointer"
            >
              <Link to='/admin/change-password'>
              Change Password
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInfo;
