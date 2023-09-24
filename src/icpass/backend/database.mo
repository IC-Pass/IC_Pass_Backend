import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

import Types "./types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;

  public class Directory() {
    // The "database" is just a local hash map
    let hashMap = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);

    public func createOne(userId : UserId, profile : NewProfile) {
      hashMap.put(userId, makeProfile(userId, profile));
    };

    public func updateOne(userId : UserId, profile : Profile) {
      hashMap.put(userId, profile);
    };

    public func findOne(userId : UserId) : ?Profile {
      hashMap.get(userId);
    };

    // Helpers

    func makeProfile(userId : UserId, profile : NewProfile) : Profile {
      {
        id = userId;
        fullName = Text.trim(profile.fullName, #char ' ');
      };
    };
  };

  func isEq(x : UserId, y : UserId) : Bool { x == y };
};
