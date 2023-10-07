import { defineStore } from "pinia";
import { ref } from "vue";
import facebook from "@/assets/images/socialMedia/Facebook.jpg";
import linkedin from "@/assets/images/socialMedia/Linkedin.jpg";
import slack from "@/assets/images/socialMedia/Slack.jpg";
import twitter from "@/assets/images/socialMedia/Twitter.jpg";
import type { PassListItem } from "@/common/domain/PassListItem";

export const useHistoryStore = defineStore("historyStore", () => {
  const historyList = ref<PassListItem[]>([
    {
      template: {
        value: "facebook",
        label: "Facebook",
        imgSrc: facebook,
      },
      email: "personal@email.com",
      link: "facebook.com",
      tag: {
        label: "Social Network",
        value: "socials",
        icon: "social",
      },
      weakness: "excellent",
    },
    {
      template: {
        value: "linkedin",
        label: "Linkedin",
        imgSrc: linkedin,
      },
      email: "personal@email.com",
      link: "linkedin.com",
      tag: {
        label: "Social Network",
        value: "social",
        icon: "social",
      },
      weakness: "excellent",
    },
    {
      template: {
        value: "slack",
        label: "Slack",
        imgSrc: slack,
      },
      email: "personal@email.com",
      link: "slack.com",
      tag: {
        label: "Services",
        value: "services",
        icon: "services",
      },
      weakness: "excellent",
    },
    {
      template: {
        value: "twitter",
        label: "Twitter",
        imgSrc: twitter,
      },
      email: "personal@email.com",
      link: "twitter.com",
      tag: {
        label: "Services",
        value: "services",
        icon: "services",
      },
      weakness: "excellent",
    },
  ]);
  const historyTags = ref([
    {
      value: "your",
      label: "Your",
      count: 3,
    },
    {
      value: "members",
      label: "Members",
      count: 0,
    },
    {
      value: "team",
      label: "Team",
      count: 0,
    },
  ]);

  return {
    historyList,
    historyTags,
  };
});
