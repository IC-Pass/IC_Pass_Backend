export const idlFactory = ({ IDL }) => {
  const UserId = IDL.Principal;
  const Account__1 = IDL.Record({
    'id' : UserId,
    'tagId' : IDL.Nat8,
    'link' : IDL.Text,
    'password' : IDL.Text,
    'usernameEmail' : IDL.Text,
    'notes' : IDL.Text,
    'mediaId' : IDL.Nat8,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const NewProfile = IDL.Record({ 'fullName' : IDL.Text });
  const UserId__1 = IDL.Principal;
  const Account = IDL.Record({
    'id' : UserId,
    'tagId' : IDL.Nat8,
    'link' : IDL.Text,
    'password' : IDL.Text,
    'usernameEmail' : IDL.Text,
    'notes' : IDL.Text,
    'mediaId' : IDL.Nat8,
  });
  const Profile = IDL.Record({
    'id' : UserId,
    'fullName' : IDL.Text,
    'accounts' : IDL.Vec(Account),
  });
  const Result_1 = IDL.Variant({ 'ok' : Profile, 'err' : IDL.Text });
  return IDL.Service({
    'addNewAccount' : IDL.Func([Account__1], [Result], []),
    'create' : IDL.Func([NewProfile], [Result], []),
    'encrypted_ibe_decryption_key_for_caller' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'get' : IDL.Func([UserId__1], [Result_1], ['query']),
    'getOwnId' : IDL.Func([], [UserId__1], ['query']),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'ibe_encryption_key' : IDL.Func([], [IDL.Text], []),
    'update' : IDL.Func([Profile], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
