import type { Password, PasswordDto } from "@/home/domain/Password";
import { tagOptions, templateOptions } from "@/common/domain/PassListItem";
import { useAuthStore } from "@/auth/domain/authStore";
type ID = {
  id: any;
};
export const passwordToDto = (
  input: Password & ID
): Promise<PasswordDto> => {
  const authStore = useAuthStore();
  console.log('passwordToDto', input)
  return {
    id: input.id ? input.id : authStore?.identity.getPrincipal(),
    tagId: input.tag.value,
    passwordStrength: input.passwordStrength,
    link: input.link,
    password: input.password,
    createdAt: input.createdAt,
    usernameEmail: input.usernameEmail,
    notes: input.template.label,
    mediaId: input.template.value,
    label: input.template.label
  };
};

export const passwordFromDto = (input: PasswordDto): Password => {
  console.log('passwordFromDto', input)
  return {
    id: input.id,
    usernameEmail: input.usernameEmail,
    password: input.password,
    link: input.link,
    createdAt: input.createdAt,
    passwordStrength: input.passwordStrength,
    template: templateOptions[input.mediaId || 0],
    notes: input.notes,
    label: input.label,
    tag: tagOptions[input.tagId || 0],
  };
};
