import type { Password } from "@/home/domain/Password";

export type Profile = {
  id: string | undefined;
  fullName: string;
  accounts: Password[];
};
