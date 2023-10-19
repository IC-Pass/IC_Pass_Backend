export const idlFactory = ({ IDL }) => {
  const NewProfile = IDL.Record({
    "show_wallet_number" : IDL.Bool,
    "fullname" : IDL.Text,
    "system_notification" : IDL.Bool,
    "email_notification" : IDL.Bool,
  });
  const UserId__1 = IDL.Principal;
  const UserId = IDL.Principal;
  const newPassword = IDL.Record({
    "id": IDL.Principal,
    "tagId": IDL.Nat8,
    "link": IDL.Text,
    "password": IDL.Text,
    "usernameEmail": IDL.Text,
    "notes": IDL.Text,
    "mediaId": IDL.Nat8
  });
  const Profile = IDL.Variant({
    "ok": IDL.Record({
      "id" : UserId,
      "fullname" : IDL.Text,
      "accounts": IDL.Vec(
        IDL.Record({
          "id": IDL.Principal,
          "tagId": IDL.Nat8,
          "link": IDL.Text,
          "password": IDL.Text,
          "usernameEmail": IDL.Text,
          "notes": IDL.Text,
          "mediaId": IDL.Nat8
        }),
      ),
    }),
    "error": IDL.Text
  });

  return IDL.Service({
    "addNewAccount": IDL.Func([newPassword], [], ["call"]),
    "create" : IDL.Func([NewProfile], [], ["call"]),
    "get" : IDL.Func([UserId__1], [Profile], ["query"]),
    "getOwnId" : IDL.Func([], [UserId__1], ["query"]),
    "healthcheck" : IDL.Func([], [IDL.Bool], ["call"]),
    "search" : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ["query"]),
    "update" : IDL.Func([Profile], [], ["call"]),
    "encrypted_ibe_decryption_key_for_caller": IDL.Func([IDL.Vec.nat8], [], ["call"]),
    "ibe_encryption_key": IDL.Func([],[],["call"]),
  });
};
export const init = ({ IDL }) => [];
