import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
  password?: string;
  photo?: string;
  token?: string
}

export function useSession() {
  return session;
}



export async function useLogin(email: string, password: string) {
  const router = useRouter();
  try {
    const response = await api(`users/login`, {
      email,
      password,
    });
    session.user = response?.data?.user;
    session.user!.token = response?.data?.token;  
    router.push(session.redirectUrl ?? "/");
    session.redirectUrl = null;
  } catch (error) {
    console.error(error);
    if (typeof error === "string") {
      session.messages.push({
        msg: error,
        type: "error",
      });
    } else if (error instanceof Error) {
      session.messages.push({
        msg: error.message ?? JSON.stringify(error),
        type: "error",
      });
    }
  }
}

export function api(url: string, data?: any, method?: string, headers?: any) {
  session.isLoading = true;

  if(session.user?.token){
      headers = {
          "Authorization": `Bearer ${session.user.token}`,
          ...headers,
      }
  }

  return myFetch.api(url, data, method, headers)
      .catch(err => {
          console.error({err});
          session.messages.push({
              msg: err.message  ?? JSON.stringify(err),
              type: "error",
          })
      })
      .finally(() => {
          session.isLoading = false;
      })
}
