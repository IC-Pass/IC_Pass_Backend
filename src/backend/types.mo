import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";

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
    passwordStrength: Nat8;
    link: Text;
    tagId: Nat8;
    notes: Text;
    createdAt: Text;
  };
};
