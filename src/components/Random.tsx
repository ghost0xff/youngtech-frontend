"use client";

import { useSession } from "next-auth/react";
import { AuthLoader } from "./Auth/AuthLoader";

export default function Random() {
  const { data: session } = useSession();

  return (
    <>
      <AuthLoader
        loader={<p>Loader..</p>}
        onUnAuthenticated={<p>Sorry not authed</p>}
      >
        <p>Your name is {session?.user.user?.name}</p>
        <span>My roles: </span>
        {session?.user.roles.map((role) => (
          <span>{role},</span>
        ))}
        <div>
          {session?.user.roles.includes("ROLE_CUSTOMER") && (
            <p>You are a customer</p>
          )}
          {session?.user.roles.includes("ROLE_USER") && (
            <p>You are also a normal user</p>
          )}
        </div>
      </AuthLoader>
    </>
  );
}
