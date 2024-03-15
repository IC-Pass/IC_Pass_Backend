import { PasswordStrength, PasswordTagEnum } from "@/home/domain/Password";

export const categoryChips = (accounts) => {
  if (!accounts) return [];

  const categories: any = {
    social: [],
    banking: [],
    eCommerce: [],
    services: [],
    education: [],
    otherPassCategory: [],
  };

  accounts.forEach((item) => {
    switch (item.tag.value) {
      case PasswordTagEnum.Social:
        categories.social.push(item);
        break;
      case PasswordTagEnum.Banking:
        categories.banking.push(item);
        break;
      case PasswordTagEnum.ECommerce:
        categories.banking.push(item);
        break;
      case PasswordTagEnum.Services:
        categories.services.push(item);
        break;
      case PasswordTagEnum.Education:
        categories.education.push(item);
        break;
      default:
        categories.otherPassCategory.push(item);
        break;
    }
  });
  console.log(categories);
  return [
    {
      title: "All",
      value: [
        ...categories.social,
        ...categories.banking,
        ...categories.eCommerce,
        ...categories.services,
        ...categories.education,
        ...categories.otherPassCategory,
      ],
    },
    {
      icon: "social",
      title: "Social network",
      value: categories.social,
    },
    {
      icon: "banking",
      title: "Banking",
      value: categories.banking,
    },
    {
      icon: "eCommerce",
      title: "E-commerce",
      value: categories.eCommerce,
    },
    {
      icon: "services",
      title: "Services",
      value: categories.services,
    },
    {
      icon: "education",
      title: "Education",
      value: categories.education,
    },
    {
      icon: "otherPassCategory",
      title: "Other",
      value: categories.otherPassCategory,
    },
  ];
};

export const weaknessChips = (accounts) => {
  if (!accounts) return;

  const weakness = {
    excellent: [],
    good: [],
    weak: [],
  };

  accounts.forEach((item) => {
    switch (item.passwordStrength) {
      case PasswordStrength.Weak:
        weakness.weak.push(item);
        break;
      case PasswordStrength.Good:
        weakness.good.push(item);
        break;
      case PasswordStrength.Excellent:
        weakness.excellent.push(item);
        break;
    }
  });
  return [
    {
      title: "All",
      value: [...weakness.weak, ...weakness.good, ...weakness.excellent],
    },
    {
      title: "Excellent",
      strength: 3,
      value: weakness.excellent,
    },
    {
      title: "Good",
      strength: 2,
      value: weakness.good,
    },
    {
      title: "Weak",
      strength: 1,
      value: weakness.weak,
    },
  ];
};
