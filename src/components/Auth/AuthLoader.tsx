"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  loader: ReactNode;
  onUnAuthenticated: ReactNode;
  children: ReactNode;
};

export function AuthLoader({ loader, onUnAuthenticated, children }: Props) {
  const { status } = useSession();

  if (status === "loading") {
    return loader;
  }

  if (status === "unauthenticated") {
    return onUnAuthenticated;
  }
  return children;
}
