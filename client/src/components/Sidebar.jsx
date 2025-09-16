import React from 'react';

const handleLogout = () => {
  localStorage.removeItem("authToken");
  navigate("/login");
};


const Sidebar = ({ currentFilter, onChange }) => {
    const filters = ['all', 'pending', 'completed'];

    return (
        <>
        <div className="bg-gray-200 p-4 min-w-[150px] space-y-2">
            <h2 className="text-lg font-bold">Filters</h2>
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onChange(filter)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                        currentFilter === filter
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-300'
                    }`}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
        <button onClick={handleLogout}>logout</button>
        </>
    );
};

export default Sidebar;
