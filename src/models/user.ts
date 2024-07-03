import { User } from "@prisma/client";

export type registerRequest = {
    name: string;
    password: string;
    is_admin: boolean;
};

export type authResponse = {
    name?: string;
    token: string;
};

export function toAuthResponse(token: string, user?: User): authResponse {
    return !user
        ? {
              token,
          }
        : {
              name: user.name,
              token,
          };
}
