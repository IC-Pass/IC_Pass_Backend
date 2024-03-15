import Result "mo:base/Result";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Trie "mo:base/Trie";

import Database "./database";
import Types "./types";
import Utils "utils/Utils";
import Hex "utils/Hex";

actor ICPass {

  var directory : Database.Directory = Database.Directory();

  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;
  type Media = Types.Media;
  type Tag = Types.Tag;
  type Account = Types.Account;

  private stable var _profiles : Trie.Trie<UserId, Profile> = Trie.empty();
  private stable var _mediaList : [Media] = [];
  private stable var _tagList : [Tag] = [];

  // private stable var profileMap : HashMap.HashMap<UserId, Profile> = HashMap.HashMap<UserId, Profile>(1, Principal.equal, Principal.hash);

  type VETKD_SYSTEM_API = actor {
    vetkd_public_key : ({
      canister_id : ?Principal;
      derivation_path : [Blob];
      key_id : { curve : { #bls12_381 }; name : Text };
    }) -> async ({ public_key : Blob });
    vetkd_encrypted_key : ({
      public_key_derivation_path : [Blob];
      derivation_id : Blob;
      key_id : { curve : { #bls12_381 }; name : Text };
      encryption_public_key : Blob;
    }) -> async ({ encrypted_key : Blob });
  };

  let vetkd_system_api : VETKD_SYSTEM_API = actor ("jbm23-syaaa-aaaap-abonq-cai");

  // Healthcheck

  public func healthcheck() : async Bool { true };

  public shared ({ caller }) func ibe_encryption_key() : async Text {
    let { public_key } = await vetkd_system_api.vetkd_public_key({
      canister_id = null;
      derivation_path = Array.make(Text.encodeUtf8("ibe_encryption"));
      key_id = { curve = #bls12_381; name = "test_key_1" };
    });
    Hex.encode(Blob.toArray(public_key));
  };

  public shared ({ caller }) func encrypted_ibe_decryption_key_for_caller(encryption_public_key : Blob) : async Text {
    Debug.print("encrypted_ibe_decryption_key_for_caller: caller: " # debug_show (caller));

    let { encrypted_key } = await vetkd_system_api.vetkd_encrypted_key({
      derivation_id = Principal.toBlob(caller);
      public_key_derivation_path = Array.make(Text.encodeUtf8("ibe_encryption"));
      key_id = { curve = #bls12_381; name = "test_key_1" };
      encryption_public_key;
    });
    Hex.encode(Blob.toArray(encrypted_key));
  };

  // Profiles

  public shared (msg) func create(profile : NewProfile) : async (Result.Result<Text, Text>) {
    if (Text.size(Text.trim(profile.fullName, #char ' ')) == 0) {
      return #err("Full name can't be blank!");
    };
    _profiles := directory.createOne(_profiles, msg.caller, profile);
    return #ok("Profile created!");
  };

  public shared (msg) func update(profile : Profile) : async (Result.Result<Text, Text>) {
    switch (Utils.hasAccess(msg.caller, profile.id)) {
      case (true) {
        _profiles := directory.updateOne(_profiles, profile.id, profile);
        return #ok("Updated successfully!");
      };
      case _ {
        return #err("User do not have access!");
      };
    };
  };

  public shared (msg) func addNewAccount(account : Account) : async (Result.Result<Text, Text>) {
    switch (Utils.hasAccess(msg.caller, account.id)) {
      case (true) {
        _profiles := directory.addNewAccount(_profiles, account);
        if (Trie.size(_profiles) == 0) {
          return #err("User not found")
        };
        return #ok("Account added successfully!");
      };
      case _ {
        return #err("User do not have access!");
      };
    };
  };

  public shared query (msg) func get(userId : UserId) : async (Result.Result<Profile, Text>) {
    switch (Utils.hasAccess(msg.caller, userId)) {
      case (true) {
        let profile = directory.getProfile(_profiles, userId);
        switch (Text.size(profile.fullName) > 0) {
          case (true) {
            return #ok(profile);
          };
          case _ {
            return #err("User not found");
          };
        };
      };
      case _ {
        return #err("User do not have access!");
      };
    };
  };

  // User Auth

  public shared query (msg) func getOwnId() : async UserId { msg.caller };
};
