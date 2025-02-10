"use client";

import { useRouter } from "next/navigation";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../store/index.slice";
import { logout } from "../store/slices/auth.slice";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());
      router.push("/login");
      toast.success("User logged out  Successfully");
    }
  };

  if (!user || !user.email) {
    router.push("/login");
    return null;
  }

  const getUserInitials = (email: string) => {
    const parts = email.split("@")[0];
    return parts.slice(0, 2).toUpperCase();
  };

  return (
    <div className="h-full w-60 text-dark flex flex-col bg-white shadow-lg">
      {/* User Profile Section */}
      <div className="p-4 flex items-center justify-center">
        <div className="w-16 h-16 bg-blue-700 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {getUserInitials(user.email)}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow mt-4">
        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center p-3  text-l text-gray-700 hover:bg-gray-100 hover:text-blue-700 transition-all "
          >
            <span className="pl-2">
              <MdOutlineSpaceDashboard className="inline-block text-xl mr-2" />
            </span>
            Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center p-3  text-l text-gray-700 hover:bg-gray-100 hover:text-blue-700 transition-all "
          >
            <span className="pl-2">
              <AiOutlinePlus className="inline-block text-xl mr-2" />
            </span>
            Add Todo
          </Link>
          <Link
            href="/todos"
            className="flex items-center p-3 text-l text-gray-700 hover:bg-gray-100 hover:text-blue-700 transition-all "
          >
            <span className="pl-2">
              <FcTodoList className="inline-block text-xl mr-2" />
            </span>
            Todos
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div className=" border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start p-3 text-l text-gray-700 hover:bg-red-100 hover:text-red-700 "
        >
          <CiLogout className="inline-block text-xl mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
