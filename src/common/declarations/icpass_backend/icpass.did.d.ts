import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type UserId = Principal;
export type UserId__1 = Principal;

export interface NewProfile {
  "fullName": string,
}

export interface Account {
  "id": UserId,
  "tagId": number,
  "link": string,
  "password": string,
  "passwordStrength": number;
  "usernameEmail": string,
  "createdAt": string,
  "notes": string,
  "mediaId": number,
}
export interface Profile {
  "id": string,
  "fullName": string,
  "accounts": Account[]
}

export type Result = {
  ok: string;
  err: string;
};
export type Result_1 = { "ok" : Profile, "err" : string };

export interface _SERVICE {
  "addNewAccount": ActorMethod<[Account], [Result]>,
  "create": ActorMethod<[NewProfile], undefined>,
  "get": ActorMethod<[UserId__1], [Result_1]>,
  "getOwnId": ActorMethod<[], UserId__1>,
  "healthcheck": ActorMethod<[], boolean>,
  "search": ActorMethod<[string], Array<Profile>>,
  "update": ActorMethod<[Profile], undefined>,
  "encrypted_ibe_decryption_key_for_caller": ActorMethod<[string]>,
  "ibe_encryption_key": ActorMethod<[string]>,
}
