import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* כפתור המבורגר */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-md focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gray-900 text-white p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 z-40`}
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Task Manager</h2>
          <ul className="space-y-6">
            <li className="flex items-center gap-3 hover:text-gray-400">
              <AiOutlineHome className="text-xl" />
              <a href="/" className="block">
                Dashboard
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-gray-400">
              <AiOutlineUnorderedList className="text-xl" />
              <a href="/categories" className="block">
                Categories
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-gray-400">
              <AiOutlineCalendar className="text-xl" />
              <a href="/calendar" className="block">
                Calendar
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-gray-400">
              <AiOutlineSetting className="text-xl" />
              <a href="/settings" className="block">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div>
          <p className="text-sm text-gray-400 text-center">
            © 2025 Task Manager
          </p>
        </div>
      </div>

      {/* רקע חצי שקוף בזמן שה־Sidebar פתוח */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
