import { getServerSession } from "next-auth";
import { authOptions } from "./options";

export type CurrentRoles = "ROLE_ADMIN" | "ROLE_EMPLOYEE" | "ROLE_CUSTOMER";

export type ProtectedRoute = {
    path: string,
    roles: CurrentRoles[]
}

export interface AccessControl {
    routes: ProtectedRoute[]
}

export async function getSafeServerSession() {
    return await getServerSession(authOptions);
}