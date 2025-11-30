// src/layout/HeaderAdmin.tsx

import React from 'react';

const HeaderAdmin = () => {
  return (
    <div className="text-white py-4 px-8 header" style={{ backgroundColor: 'rgb(31 41 55)', borderBottom:'1px solid white' }}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Portal</h2>
        <button className="bg-blue-800 px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default HeaderAdmin;

