import { Profile, Session } from "next-auth";
import { Person } from "./person";
import { Role } from "./role";
import { getSafeServerSession } from "../auth/security";
import { HttpClient } from "./http";
import fromApi from "./utils";
import { Student, Teacher } from "./school";


export interface User {
    id: number,
    email: string,
    roles: Role[],
    person: Person,
    profile: Profile
}

export interface UserInfo {
    sub: number,
    email: string,
    email_verified: boolean,
    given_name: string,
    family_name: string,
    updated_at: string,
    roles: Role[],

    // domain specific stuff
    is_school_member: boolean,
    school_member_type: string,
    school_id: number
    
}


export async function userInfo(): Promise<UserInfo | null>{
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    const http = new HttpClient();
    return http.get<UserInfo>(fromApi("/userinfo") , 
    { 
        // cache: "no-store",
        method: "GET",
        headers: {
           "Authorization": `Bearer ${accessToken}`
        },
        next: { revalidate: 120}
    });
  }
  return null;
}
