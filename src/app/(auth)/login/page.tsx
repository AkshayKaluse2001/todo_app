"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { RootState, useAppDispatch } from "@/app/store/index.slice";
import {
  clearError,
  login,
  loginWithGoogle,
} from "@/app/store/slices/auth.slice";
import BackdropLoader from "@/app/_components/backdrop/Backdrop";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(loginWithGoogle());
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(clearError());
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && <BackdropLoader />}
      <div className="p-8 bg-white rounded shadow-md w-80">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full px-4 py-2 text-dark border rounded ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          <FcGoogle className="text-2xl inline mr-2" /> Sign in with Google
        </button>
        <p className="mt-4 text-center">
          Don&apos;t have an account?
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
