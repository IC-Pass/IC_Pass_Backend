export type PassListItem = {
  template: {
    value: string;
    label: string;
    imgSrc: string;
  };
  email: string;
  link: string;
  tag: {
    value: string | null;
    label: string;
    icon?: string;
  };
  weakness: "excellent" | "good" | "weak" | "compromised" | "reused";
};
