import { title } from "process";

export default {
  menueItems: [
    {
      title: "Settings",
      icon: "settings",
      id: "1",
      content: ``,
    },
    {
      title: "Feedback",
      icon: "feedback",
      id: "2",
      content: `To provide us feedback, join our discord server:
                 
                  `,
      contentlink: `https://dona.ai/discord.`,
      contentend: `Feedback can be posted under the #feedback channel. We appreciate
                  the help!`,
    },
    {
      title: "About",
      subtitle: "Mission",
      icon: "about",
      id: "3",
      content: `Feedback To provide us feedback, join our discord server:{" "}
                 Our mission with Dona is to solve current problems with to-do list apps by a more humane design approach and a completely natural user experience.`,
    },
    {
      title: "Support",
      icon: "support",
      id: "4",
      content: `Please join our discord server for support.
                `,
      contentlink: `https://dona.ai/discord`,
    },
    {
      title: "Legal",
      icon: "legal",
      id: "5",
      content: ``,
    },
  ],
  legalButtons: [
    {
      title: "Privacy Policy",
      id: "1",
      content:
        "Your privacy is important to us. It is Dona's policy to respect your privacy regarding any information we may collect from you across our website, https://dona.ai, and other sites we own and operate.",
    },
    {
      title: "Terms of Use",
      id: "2",
      content:
        "By accessing the website at https://dona.ai, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
    },
  ],
  settingsButtons: [
    {
      title: "Personal",
      id: "1",
    },
    {
      title: "Password",
      id: "2",
    },
    {
      title: "Appearance",
      id: "3",
    },
    {
      title: "Shortcuts",
      id: "4",
    },
    {
      title: "Misc",
      id: "5",
    },
  ],
};
