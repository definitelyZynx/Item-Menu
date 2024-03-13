import { pageTitles } from "@/constants/Page";

export const getCurrentPage = (location: any) => {
  const path = location.pathname;

  return pageTitles[path];
};
