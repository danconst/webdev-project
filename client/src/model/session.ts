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

export const usersData = {
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
    },
    {
      "id": 2,
      "name": "Fish",
      "email": "fish@email.com",
      "photo": "none",
      "dWorkouts": 10,
      "dDist": 1110,
      "dDur": 111111110,
      "dPace": 11111111110,
      "dCal": 1000000000,
      "wDist": 200000,
      "wDur": 20000000000,
      "wPace": 20000000000,
      "wCal": 500000000000000,
      "aDist": 2500000,
      "aDur": 2500000,
      "aPace": 25000000,
      "aCal": 6000,
    },
    {
      "id": 3,
      "name": "Apple",
      "email": "apple@email.com",
      "photo": "none",
      "dWorkouts": 100,
      "dDist": 1000,
      "dDur": 1000,
      "dPace": 1000,
      "dCal": 1000,
      "wDist": 4000,
      "wDur": 400000,
      "wPace": 200000,
      "wCal": 50000000,
      "aDist": 25000000,
      "aDur": 250000000,
      "aPace": 2000005,
      "aCal": 6,
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

export function userNames(){
  var names: string[] = new Array() 
  for(let i=0; i<usersData.users.length; i++){
    names.push(usersData.users[i].name);
  }
  return names;
};