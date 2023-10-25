import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NewProfile {
  "fullName": string,
}

export interface Password {
  "id": UserId,
  "tagId": string,
  "link": string,
  "password": string,
  "usernameEmail": string,
  "notes": string,
  "mediaId": string,
}
export interface Profile {
  "id": string,
  "fullName": string,
  "accounts": Password[]
}
export type UserId = Principal;
export type UserId__1 = Principal;
export type Result = {
  ok: string;
  err: string;
};
export interface _SERVICE {
  "addNewAccount": ActorMethod<[New_Password], Result>,
  "create": ActorMethod<[NewProfile], undefined>,
  "get": ActorMethod<[UserId__1], Profile>,
  "getOwnId": ActorMethod<[], UserId__1>,
  "healthcheck": ActorMethod<[], boolean>,
  "search": ActorMethod<[string], Array<Profile>>,
  "update": ActorMethod<[Profile], undefined>,
  "encrypted_ibe_decryption_key_for_caller": ActorMethod<[string]>,
  "ibe_encryption_key": ActorMethod<[string]>,
}
