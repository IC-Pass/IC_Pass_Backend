import { Principal } from "@dfinity/principal";


import * as vetkd from "ic-vetkd-utils";


export const hex_decode = (hexString: any) => {
  if (!hexString) return;
  return Uint8Array.from(
    hexString.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16))
  );
};
export const hex_encode = (bytes: any) =>
  bytes.reduce(
    (str: string, byte: any) => str + byte.toString(16).padStart(2, "0"),
    ""
  );

export async function ibe_encrypt({
  actor,
  message,
  principal,
}: {
  actor: any;
  message: string;
  principal: any;
}): Promise<any> {
  const pk_bytes_hex = await actor.ibe_encryption_key();

  const message_encoded = new TextEncoder().encode(message);
  const seed = window.crypto.getRandomValues(new Uint8Array(32));

  const ibe_ciphertext = vetkd.IBECiphertext.encrypt(
    hex_decode(pk_bytes_hex),
    principal.toUint8Array(),
    message_encoded,
    seed
  );
  return hex_encode(ibe_ciphertext.serialize());
}

export async function ibe_decrypt({
  actor,
  ibe_ciphertext_hex,
  principal,
}: {
  actor: any;
  ibe_ciphertext_hex: string;
  principal: any;
}) {
  const tsk_seed = window.crypto.getRandomValues(new Uint8Array(32));
  const tsk = new vetkd.TransportSecretKey(tsk_seed);
  const ek_bytes_hex = await actor.encrypted_ibe_decryption_key_for_caller(tsk.public_key());
  const pk_bytes_hex = await actor.ibe_encryption_key();

  const k_bytes = tsk.decrypt(
    hex_decode(ek_bytes_hex),
    hex_decode(pk_bytes_hex),
    principal.toUint8Array()
  );

  const ibe_ciphertext = vetkd.IBECiphertext.deserialize(
    hex_decode(ibe_ciphertext_hex)
  );
  const ibe_plaintext = ibe_ciphertext.decrypt(k_bytes);
  return new TextDecoder().decode(ibe_plaintext);
}
