import type { Profile } from "@/common/declarations/icpass_backend/icpass.did";
import type { Profile as User } from "@/auth/domain/profile";
import { passwordFromDto } from "@/home/domain/passwordMapper";

export const userFromDto = (input: Profile): User => {
  return {
    id: input.id || undefined,
    fullName: input.fullName,
    accounts: input.accounts.map(passwordFromDto),
  };
};
