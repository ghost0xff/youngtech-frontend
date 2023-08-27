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
        <p>Your id is {session?.user.id}</p>
        <p>Your name is {session?.user.name}</p>
        <p>Your email is {session?.user.email}</p>
        <p>Your accessToken is {session?.user.accessToken}</p>
        <p>Your refreshToken is {session?.user.refreshToken}</p>
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
