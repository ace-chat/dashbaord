import { instance } from "@/plugins";
import type { LoginRequest } from "@/types";

export * from "./common.ts"
export * from "./content.ts"
export * from "./chat.ts"
export * from "./analytics.ts"

export const login = (data: LoginRequest) => {
  return instance({
    url: "/login",
    method: "POST",
    data
  })
}