"use client";

import { Person, personInfo } from "@/lib/actions/person";
import { useSession } from "next-auth/react";
import { AuthLoader } from "./Auth/AuthLoader";

export default async function PersonInfo() {
  const { data: session, status } = useSession();
  return <p>person :v</p>;
}
