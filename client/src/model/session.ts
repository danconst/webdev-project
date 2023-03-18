import { reactive } from "vue";

const session = reactive({
    user: null as User | null,

})
export interface User{
    name: string;
    handle: string;
    email: string;
    admin: string;

}

export function useSession(){
    return session;
}

export function login(){
    session.user = {
        name: "John Doe",
    }
}
