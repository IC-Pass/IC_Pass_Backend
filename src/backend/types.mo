import Principal "mo:base/Principal";

module {
  public type UserId = Principal;

  public type NewProfile = {
    fullName : Text;
  };

  public type Profile = {
    id : UserId;
    fullName : Text;
    accounts: [Account];
  };

  //todo hash password

  public type Media = {
    id: Nat8;
    name: Text;
  };

  public type Tag = {
    id: Nat8;
    name: Text;
  };

  public type Account = {
    id: UserId;
    mediaId: Nat8;
    usernameEmail: Text;
    password: Text;
    link: Text;
    tagId: Nat8;
    notes: Text;
    createdAt: Text;
  };
};
