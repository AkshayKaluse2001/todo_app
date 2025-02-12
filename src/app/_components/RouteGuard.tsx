"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RootState, useAppSelector } from "../store/index.slice";

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname(); // Next.js hook to get the current route

  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!user && !isPublicRoute) {
      router.replace("/login");
    }

    if (user && isPublicRoute) {
      router.replace("/");
    }
  }, [user, isPublicRoute, router]);

  return <>{children}</>;
};
