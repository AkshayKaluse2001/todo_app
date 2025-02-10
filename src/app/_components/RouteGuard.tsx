"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState, useAppSelector } from "../store/index.slice";

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  const publicRoutes = ["/login", "/signup"];
  const currentPath = window.location.pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    // ***** Redirect to login page if user is not logged in and tries to access private routes like dashboard or profile******* //
    if (!user && !isPublicRoute) {
      router.replace("/login");
    }

    // ***** Redirect to home page if user is logged in and tries to access public routes like login or signup******* //
    if (user && isPublicRoute) {
      router.replace("/");
    }
  }, [user, isPublicRoute, router]);

  return <>{children}</>;
};
