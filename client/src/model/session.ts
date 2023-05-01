import { reactive } from "vue";
import { useRouter } from "vue-router";
import usersData from "../data/users.json";
import type { Workout } from "./workouts";
import * as myFetch from "./myFetch";
const session = reactive({
  user: null as User | null,
  isLoading: false,
  messages: [] as {
      msg: string,
      type: "success" | "error" | "warning" | "info",
  }[],
  redirectUrl: null as string | null,
});

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  photo?: string;
  dayWorkouts?: number;
  dayDist?: number;
  dayDur?: number;
  dayPace?: number;
  dayCal?: number;
  weekDist?: number;
  weekDur?: number;
  weekPace?: number;
  weekCal?: number;
  allDist?: number;
  allDur?: number;
  allPace?: number;
  allCal?: number;
  recentWorkouts?: Workout[];
}

export function useSession() {
  return session;
}


export function useLogin(id: number) {
  const router = useRouter();
  const user = usersData.users.find((u) => u.id === id);
  if (user) {
    session.user = user;
  } else {
    console.error(`User not found with id ${id}`);
  }
  router.push(session.redirectUrl ?? "/");
  session.redirectUrl = null;
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

export function api(url: string, data?: any, method?: string, headers?: any)  {
  session.isLoading = true;
  return myFetch.api(url, data, method, headers)
      .catch(err => {
          console.error(err);
          session.messages.push({
            msg: err.message  ?? JSON.stringify(err),
              type: "error",
          })
      })
      .finally(() => {
          session.isLoading = false;
      })
}