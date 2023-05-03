import { ref } from 'vue';
import { useSession } from './session';
import { api } from "./session";
import type { DataEnvelope, DataListEnvelope } from "./myFetch";

export interface Meal {
    _id: string;
    user: string;
    date: string;
    calories: number;
    food: string;
  }

  const calories =  ref<Meal[]>();
  const session =  useSession();

  
export async function addMeal(meal: Meal): Promise<DataEnvelope<Meal>> {
  const result = await api('meals', meal);
  return result
}


export function getMeals(): Promise<DataListEnvelope<Meal>> {  
  return api('meals');
}


export function deleteMeal(_id: string){
  return api(`meals/${_id}`, undefined, 'DELETE');
}