import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";

import Types "./types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;
  type Media = Types.Media;
  type Tag = Types.Tag;
  type Account = Types.Account;

  public class Directory() {
    // The "database" is just a local hash map
    let hashMap = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);

    public func createOne(userId : UserId, profile : NewProfile) {
      hashMap.put(userId, makeProfile(userId, profile));
    };

    public func updateOne(userId : UserId, profile : Profile) {
      hashMap.put(userId, profile);
    };

    public func addNewAccount(account: Account) {
      var bufferAccounts : Buffer.Buffer<Account> = Buffer.Buffer<Account>(0);
      switch(findOne(account.id)) {
        case (?profile) {
          for (existingAccount in profile.accounts.vals()) {
            bufferAccounts.add(existingAccount);
          };
          bufferAccounts.add(account);
          var profileObj : Profile = {
            id = profile.id;
            fullName = profile.fullName;
            accounts = Buffer.toArray(bufferAccounts);
          };
          hashMap.put(profile.id, profileObj);
        };
        case _ {};
      };
    };

    public func findOne(userId : UserId) : ?Profile {
      hashMap.get(userId);
    };

    // Helpers

    func makeProfile(userId : UserId, profile : NewProfile) : Profile {
      {
        id = userId;
        fullName = Text.trim(profile.fullName, #char ' ');
        accounts = [];
      };
    };
  };

  func isEq(x : UserId, y : UserId) : Bool { x == y };
};
