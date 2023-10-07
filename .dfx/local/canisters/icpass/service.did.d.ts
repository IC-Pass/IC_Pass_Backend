import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  'id' : UserId,
  'tagId' : number,
  'link' : string,
  'password' : string,
  'usernameEmail' : string,
  'notes' : string,
  'mediaId' : number,
}
export interface Account__1 {
  'id' : UserId,
  'tagId' : number,
  'link' : string,
  'password' : string,
  'usernameEmail' : string,
  'notes' : string,
  'mediaId' : number,
}
export interface NewProfile { 'fullName' : string }
export interface Profile {
  'id' : UserId,
  'fullName' : string,
  'accounts' : Array<Account>,
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Profile } |
  { 'err' : string };
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'addNewAccount' : ActorMethod<[Account__1], Result>,
  'create' : ActorMethod<[NewProfile], Result>,
  'encrypted_ibe_decryption_key_for_caller' : ActorMethod<
    [Uint8Array | number[]],
    string
  >,
  'get' : ActorMethod<[UserId__1], Result_1>,
  'getOwnId' : ActorMethod<[], UserId__1>,
  'healthcheck' : ActorMethod<[], boolean>,
  'ibe_encryption_key' : ActorMethod<[], string>,
  'update' : ActorMethod<[Profile], Result>,
}
