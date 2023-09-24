import Result "mo:base/Result";
import Text "mo:base/Text";

import Database "./database";
import Types "./types";
import Utils "./utils";

actor ICPass {
  var directory : Database.Directory = Database.Directory();

  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;
  type Media = Types.Media;
  type Tag = Types.Tag;
  type Account = Types.Account;

  // Healthcheck

  public func healthcheck() : async Bool { true };

  // Profiles

  public shared (msg) func create(profile : NewProfile) : async (Result.Result<Text, Text>) {
    if (Text.size(Text.trim(profile.fullName, #char ' ')) == 0) {
      return #err("Full name can't be blank!");
    };
    directory.createOne(msg.caller, profile);
    return #ok("Profile created!");
  };

  public shared (msg) func update(profile : Profile) : async (Result.Result<Text, Text>) {
    switch (Utils.hasAccess(msg.caller, profile.id)) {
      case (true) {
        directory.updateOne(profile.id, profile);
        return #ok("Updated successfully!");
      };
      case _ {
        return #err("User do not have access!");
      };
    };
  };

  public shared (msg) func addNewAccount(account: Account) : async (Result.Result<Text, Text>) {
    switch (Utils.hasAccess(msg.caller, account.id)) {
      case (true) {
        directory.addNewAccount(account);
        return #ok("Account added successfully!")
      };
      case _ {
        return #err("User do not have access!");
      };
    };
  };

  public query func get(userId : UserId) : async (Result.Result<Profile, Text>) {
    let profile = Utils.getProfile(directory, userId);
    switch (Text.size(profile.fullName) > 0) {
      case (true) {
        return #ok(profile);
      };
      case _ {
        return #err("User not found");
      };
    };
  };

  // User Auth

  public shared query (msg) func getOwnId() : async UserId { msg.caller };
};
