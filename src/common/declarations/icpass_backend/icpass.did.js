export const idlFactory = ({ IDL }) => {
  const NewProfile = IDL.Record({
    "fullName" : IDL.Text,
  });
  const UserId__1 = IDL.Principal;
  const UserId = IDL.Principal;
  const Result = IDL.Variant({
    err: IDL.Text,
    ok: IDL.Text,
  });
  const Account = IDL.Record({
    "id" : IDL.Principal,
    "tagId" : IDL.Nat8,
    "link" : IDL.Text,
    "password" : IDL.Text,
    "usernameEmail" : IDL.Text,
    "notes" : IDL.Text,
    "mediaId" : IDL.Nat8
  });
  const Profile = IDL.Record({
    "id" : UserId,
    "fullName" : IDL.Text,
    "accounts": IDL.Vec(Account),
  });

  const Result_1 = IDL.Variant({ "ok" : Profile, "err" : IDL.Text });

  return IDL.Service({
    "addNewAccount": IDL.Func([Account], [Result], ["call"]),
    "create" : IDL.Func([NewProfile], [], ["call"]),
    "get" : IDL.Func([UserId__1], [Result_1], ["query"]),
    "getOwnId" : IDL.Func([], [UserId__1], ["query"]),
    "healthcheck" : IDL.Func([], [IDL.Bool], ["call"]),
    "search" : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ["query"]),
    "update" : IDL.Func([Profile], [], ["call"]),
    // "encrypted_ibe_decryption_key_for_caller": IDL.Func([IDL.Vec.nat8], [], ["call"]),
    "ibe_encryption_key": IDL.Func([],[],["call"]),
  });
};
export const init = ({ IDL }) => [];
