import { Profile } from "next-auth";
import { Person } from "./person";
import { Role } from "./role";


export interface User {
    id: number,
    email: string,
    roles: Role[],
    person: Person,
    profile: Profile
    

}