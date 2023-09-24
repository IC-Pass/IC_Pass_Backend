import Principal "mo:base/Principal";

module {
  public type UserId = Principal;

  public type NewProfile = {
    fullName : Text;
  };

  public type Profile = {
    id : UserId;
    fullName : Text;
  };
};
