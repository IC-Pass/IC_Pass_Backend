import facebook from "@/assets/images/socialMedia/Facebook.jpg";
import flick from "@/assets/images/socialMedia/Flickr.jpg";
import linkedin from "@/assets/images/socialMedia/Linkedin.jpg";
import slack from "@/assets/images/socialMedia/Slack.jpg";
import twitter from "@/assets/images/socialMedia/Twitter.jpg";
import zoom from "@/assets/images/socialMedia/Zoom.jpg";

export type PassListItem = {
  template: {
    value?: string;
    label: string;
    imgSrc: string;
  };
  email: string;
  link: string;
  tag: {
    value?: string;
    label: string;
    icon?: string;
  };
  weakness: "excellent" | "good" | "weak" | "compromised" | "reused";
};

export const templateOptions = [
  {
    value: 0,
    label: "Empty",
    imgSrc: "",
  },
  {
    value: 1,
    label: "Facebook",
    imgSrc: facebook,
  },
  {
    value: 2,
    label: "Flick",
    imgSrc: flick,
  },
  {
    value: 3,
    label: "Linkedin",
    imgSrc: linkedin,
  },
  {
    value: 4,
    label: "Slack",
    imgSrc: slack,
  },
  {
    value: 5,
    label: "Twitter",
    imgSrc: twitter,
  },
  {
    value: 6,
    label: "Zoom",
    imgSrc: zoom,
  },
];

export const tagOptions = [
  {
    label: "Select Tag",
    value: 0,
  },
  {
    label: "Social Network",
    value: 1,
    icon: "social",
  },
  {
    label: "Banking",
    value: 2,
    icon: "banking",
  },
  {
    label: "E-commerce",
    value: 3,
    icon: "eCommerce",
  },
  {
    label: "Services",
    value: 4,
    icon: "services",
  },
  {
    label: "Education",
    value: 5,
    icon: "education",
  },
  {
    label: "Other",
    value: 6,
    icon: "otherPassCategory",
  },
]
