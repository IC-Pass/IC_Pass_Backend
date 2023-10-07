import Array "mo:base/Array";
import Option "mo:base/Option";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";

import Types "../types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;

  public func keyPrincipal(x : UserId) : Trie.Key<UserId> {
    return { hash = Principal.hash(x); key = x };
  };

  // Authorization

  let adminIds : [Text] = ["izj36-fvhyx-utrrj-d4m6y-3257w-v7dej-lraja-w4wpb-rmg6s-7w4dv-dae"];

  public func isAdmin(userId : Text) : Bool {
    func identity(x : Text) : Bool { x == userId };
    Option.isSome(Array.find<Text>(adminIds, identity));
  };

  public func hasAccess(userId : UserId, profileId : UserId) : Bool {
    userId == profileId or isAdmin(Principal.toText(userId));
  };
};
