import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {fetchByIdUser} from "../redux/slices/user/userAsyncThunk.js"

const Sidemenu = ({ setToggle, setIsHovered, setIsFixed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

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
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="layout-menu"
      className="flex flex-col w-64 h-screen bg-red-400 text-white rounded-tr-2xl mt-[50px]"
    >
      <div className="flex flex-col items-center mt-[-35px] mb-4">
        <Link to='/admin/profile'>
          <img
          src="https://i.pravatar.cc/100?img=1" // Replace with actual user image if dynamic
          alt="Profile"
          className="w-20 h-20 rounded-full shadow-lg mb-2 cursor-pointer"
        />
        </Link>
        <p className="font-semibold text-white text-center">{singleUserData?.name}</p>
        <p className="text-sm text-white/80 text-center">
          {singleUserData.email}
        </p>
      </div>

      <div className="flex-grow overflow-y-auto px-3">
        <ul className="flex flex-col py-2">
          {routes.map((item, i) => {

            return (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 hover:bg-white/20 hover:text-white rounded ${
                      isActive ? "bg-white text-red-500 font-semibold" : ""
                    }`
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setToggle(false);
                    setOpenDropdown(null);
                  }}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}

          <li className="mt-auto px-4 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                localStorage.clear();
                setToggle(false);
                navigate("/login");
              }}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-white/20 rounded text-white cursor-pointer"
            >
             <MdLogout className="me-2" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidemenu;
