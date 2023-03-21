import { reactive } from "vue";
import usersData from "../data/users.json";
import type { Workout } from "./workouts";

const session = reactive({
  user: null as User | null,
});

export interface User {
  id?: number;
  name: string;
  email?: string;
  photo?: string;
  dWorkouts?: number;
  dDist?: number;
  dDur?: number;
  dPace?: number;
  dCal?: number;
  wDist?: number;
  wDur?: number;
  wPace?: number;
  wCal?: number;
  aDist?: number;
  aDur?: number;
  aPace?: number;
  aCal?: number;
  recentWorkouts?: Workout[];
}

export function useSession() {
  return session;
}

export function login(id: number) {
  const user = usersData.users.find((u) => u.id === id);
  if (user) {
    session.user = user;
  } else {
    console.error(`User not found with id ${id}`);
  }
}

export function userNames(){
  return usersData.users.map(x=> x.name)
};

export function userEmails(){
  return usersData.users.map(x=> x.email)
};

export function userPhotos(){
  return usersData.users.map(x=> x.photo)
};
