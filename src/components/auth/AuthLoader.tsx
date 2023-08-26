"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export function AuthLoader({
  loader,
  children,
}: {
  loader: ReactNode;
  children: ReactNode;
}) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return loader;
  }

  return children;
}
