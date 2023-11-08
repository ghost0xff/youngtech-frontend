'use server'

import { Session } from "next-auth"
import { HttpClient } from "./http"
import { User } from "./user"
import fromApi, { bodyFromParams } from "./utils"
import { getSafeServerSession } from "../auth/security"

enum SchoolErrors {
    NotLoggedIn = "Possibly need to be logged in to access school info or client error",
    FailedRequest = "Couldn't proceed with operation because a client error",
    FailedConnnection = "Couldn't connect to api to fetch/post data",
}

export interface School {
    id: number,
    name: string,
    subjects: SchoolSubject[],
    groups: SchoolGroup[],
    teachers: Teacher[],
    students: Student[]
}

export interface SchoolSubject {
    id: number,
    name: string,
    technicalGroups: SchoolGroup[]
}

export interface SchoolGroup {
    id: number,
    name: string,
    technicalSubject: SchoolSubject
}

export interface Teacher {
    id: number,
    user: User
    school: School
}

export interface Student {
    id: number,
    name: string,
    user: User,
}


export interface SchoolMetadata {
    schoolId: number,
    technicalSubjects: SchoolSubject[],
    academicSubjects: SchoolSubject[],
    groups: SchoolGroup[]
}

export type SchoolRegistration = {
    type: SchoolMemberType, 
    // other
    schoolId: number, comment: string,
    // student
    groupId: number,
    // teacher
    subjectId: number,
}


export type SchoolMemberType = "student" | "teacher" | "other";

export async function schoolMetadata(id: number): Promise<SchoolMetadata | null> {
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    const http = new HttpClient();
    return http.get<SchoolMetadata>(fromApi(`/school/${id}/metadata`) , { 
        cache: "no-store",
        method: "GET",
        headers: {
           "Authorization": `Bearer ${accessToken}`,
        },
    });
  }
  throw new Error(SchoolErrors.NotLoggedIn)
}


export async function registerSchoolMember(registration: SchoolRegistration): Promise<void> {
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
        let params = bodyFromParams([{name:"type", value: registration.type }])

        try {
          const resp = await fetch(fromApi('/school/members'), {
            method: "POST",
            headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: bodyFromParams([
              { name: "type", value: registration.type },
              { name: "schoolId", value: registration.schoolId.toString() },
              { name: "comment", value: registration.comment},
              { name: "groupId", value: registration.groupId.toString() },
              { name: "schoolId", value: registration.schoolId.toString() },
            ])
        })
          if(!resp.status.toString().startsWith("2")) {
            throw Error(SchoolErrors.FailedRequest)
          }
        } catch(err) { throw Error(SchoolErrors.FailedConnnection) }
  }
  throw Error(SchoolErrors.NotLoggedIn)
}
