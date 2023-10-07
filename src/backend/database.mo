import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Trie "mo:base/Trie";

import Types "./types";
import Utils "utils/Utils";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;
  type Media = Types.Media;
  type Tag = Types.Tag;
  type Account = Types.Account;

  public class Directory() {

    public func getProfile(_profiles : Trie.Trie<UserId, Profile>, userId : UserId) : Profile {
      let existing = findOne(_profiles, userId);
      switch (existing) {
        case (?existing) { existing };
        case (null) {
          {
            id = userId;
            fullName = "";
            accounts = [];
          };
        };
      };
    };

    public func createOne(_profiles : Trie.Trie<UserId, Profile>, userId : UserId, profile : NewProfile) : Trie.Trie<UserId, Profile> {
      Trie.put(_profiles, Utils.keyPrincipal(userId), Principal.equal, makeProfile(userId, profile)).0;
    };

    public func updateOne(_profiles : Trie.Trie<UserId, Profile>, userId : UserId, profile : Profile) : Trie.Trie<UserId, Profile> {
      Trie.put(_profiles, Utils.keyPrincipal(userId), Principal.equal, profile).0;
    };

    public func addNewAccount(_profiles : Trie.Trie<UserId, Profile>, account : Account) {
      var profilesObj = _profiles;
      var bufferAccounts : Buffer.Buffer<Account> = Buffer.Buffer<Account>(0);
      switch (findOne(profilesObj, account.id)) {
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
          profilesObj := updateOne(profilesObj, profile.id, profileObj);
        };
        case _ {};
      };
    };

    public func findOne(_profiles : Trie.Trie<UserId, Profile>, userId : UserId) : ?Profile {
      Trie.find(_profiles, Utils.keyPrincipal(userId), Principal.equal);
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
};
