import { reactive } from "vue";

const session = reactive({
  user: null as User | null,
});

interface User {
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
}

const usersData = {
  "users": [
    {
      "id": 1,
      "name": "Dan Constance",
      "email": "constand1@newpaltz.edu",
      "photo": "none",
      "dWorkouts": 0,
      "dDist": 0,
      "dDur": 0,
      "dPace": 0,
      "dCal": 0,
      "wDist": 20,
      "wDur": 20,
      "wPace": 20,
      "wCal": 5000,
      "aDist": 25,
      "aDur": 25,
      "aPace": 25,
      "aCal": 6000,
    }
  ]
};

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