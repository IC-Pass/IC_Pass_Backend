export type PasswordDto = {
  id: any;
  mediaId?: number;
  usernameEmail: string;
  password: string;
  passwordStrength: number;
  link: string;
  createdAt: string;
  tagId?: number;
  notes: string;
  label?: string;
};
export type Password = {
  id?: any;
  template: {
    value?: number;
    label: string;
    imgSrc: string;
  };
  usernameEmail: string;
  password: string;
  passwordStrength: number;
  createdAt: string;
  link: string;
  tag: {
    value?: number;
    label: string;
    icon?: string;
  };
  notes: string;
  label?: string;
};

export enum PasswordTagEnum {
  Social = 1,
  Banking,
  ECommerce,
  Services,
  Education,
  OtherPassCategory,
}

export enum PasswordStrength {
  Too_weak = 0,
  Weak = 1,
  Good = 2,
  Excellent = 3,
}

export enum PasswordStrengthColor {
  "red" = 1,
  "yellow" = 2,
  "green" = 3,
}
