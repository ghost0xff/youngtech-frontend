"use client";

import { ReactNode } from "react";
import { useSafeSession } from "../hooks";

type Props = {
  loader?: ReactNode;
  onUnAuthenticated?: ReactNode;
  children: ReactNode;
};

export function AuthLoader({ loader, onUnAuthenticated, children }: Props) {
  const { status } = useSafeSession();

  if (status === "loading") {
    return loader;
  }

  if (status === "unauthenticated") {
    return onUnAuthenticated;
  }
  return children;
}
