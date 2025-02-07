// src/Components/Sidebar.js
import React,{useState} from 'react';
import { FaUser, FaBook, FaComments, FaVideo, FaCog, FaSearch } from 'react-icons/fa';

const SideBar = ({ setActiveComponent }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <div className="text-slate-500 w-64 p-5 min-h-[60vh] flex flex-col space-y-4 border-r-2 border-gray-800/50 mt-[10vh]">
      <div className="relative mb-4 ml-2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-2 w-full text-center rounded bg-slate-800/80 text-slate-500 focus:outline-none focus:ring-1 focus:bg-slate-800 focus:ring-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
      <button onClick={() => setActiveComponent('Profile')} className="flex items-center justify-center space-x-3 p-3 rounded hover:text-lg hover:text-indigo-400">
        <FaUser className="text-l" />
        <span>Profile</span>
      </button>
      <button onClick={() => setActiveComponent('Resources')} className="flex items-center justify-center space-x-3 p-3 hover:text-indigo-400 rounded hover:text-lg">
        <FaBook className="text-l" />
        <span>Resources</span>
      </button>
      <button onClick={() => setActiveComponent('ChatRoom')} className="flex items-center justify-center space-x-3 p-3 hover:text-indigo-400 rounded hover:text-lg">
        <FaComments className="text-l" />
        <span>Chat Room</span>
      </button>
      <button onClick={() => setActiveComponent('VideoLectures')} className="flex items-center justify-center space-x-3 p-3 hover:text-indigo-400 rounded hover:text-lg">
        <FaVideo className="text-l" /> 
        <span>Video Lectures</span>
      </button>
      <button onClick={() => setActiveComponent('Settings')} className="flex items-center justify-center space-x-3 p-3 hover:text-indigo-400 rounded hover:text-lg">
        <FaCog className="text-l" />
        <span>Settings</span>
      </button>
    </div>
    </>
  );
};

export default SideBar;
