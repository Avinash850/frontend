import React from "react";

const DashboardAdmin: React.FC = () => {
  const userName = localStorage.getItem("name") || "User";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </header>

      {/* Welcome Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Welcome back, {userName} 👋</h2>
            <p className="text-sm text-gray-500">Have a great day managing your dashboard.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <h3 className="text-gray-500 text-sm font-medium">Users</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-2">1,245</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <h3 className="text-gray-500 text-sm font-medium">Orders</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-2">320</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-2">$12,540</p>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardAdmin;
