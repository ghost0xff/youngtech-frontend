"use client";

import { useSession } from "next-auth/react";
import { useSafeSession } from "./hooks";

export default function ApiComponent() {
  const { data: session } = useSafeSession();

  return (
    <>
      <p>Your data is {session?.user.accessToken}</p>
    </>
  );
}
