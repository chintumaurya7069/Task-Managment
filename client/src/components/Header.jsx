import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  // const date = new Date();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = date.toLocaleDateString("en-GB");

  return (
    <div className="flex items-center justify-between bg-white px-20 py-4 shadow">
      {/* Logo */}
      <h1 className="text-2xl font-semibold">
        <span className="text-red-400 font-bold">To</span>-Do
      </h1>

      {/* Search */}
      <div className="relative w-1/2 max-w-xl">
        <input
          type="text"
          placeholder="Search your task here..."
          className="w-full py-2 px-4 pr-12 rounded-md bg-gray-100 shadow-sm focus:outline-none"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-red-400 hover:bg-red-500 rounded p-2">
          <FiSearch />
        </button>
      </div>

      {/* Icons and Date */}
      <div className="flex items-center space-x-4">
        <button className="bg-red-400 text-white p-2 rounded hover:bg-red-500">
          <IoMdNotificationsOutline />
        </button>
        <button
          className="bg-red-400 text-white p-2 rounded hover:bg-red-500"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <FaRegCalendarAlt />
        </button>
        {showCalendar && (
          <div className="absolute top-14 right-0 z-50 shadow-lg !rounded-2xl">
            <DatePicker
              selected={date}
              onChange={(newDate) => {
                setDate(newDate);
                setShowCalendar(false);
              }}
              inline
              calendarStartDay={1}
            />
          </div>
        )}

        <div className="text-right">
          <p className="font-semibold text-black">{day}</p>
          <p className="text-sm text-blue-500">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
