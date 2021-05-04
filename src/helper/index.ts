import { isDev }from "../constants";
const IMAGE_URL = "https://umamusume-trainers.s3.ap-northeast-2.amazonaws.com";

export const getTypeName = (skilType): string => {
  switch (skilType) {
    case "unique":
      return "고유 스킬";
    case "has":
      return "소지 스킬";

    default:
      return "육성 스킬";
  }
};

export const convertLevel = (item): string => {
  switch (item.level) {
    case "none":
      return "없음";

    default:
      return `${item.level} ~`;
  }
};

export const isMobile = (): boolean => {
  if (!document || !document.body) {
    return false;
  }
  return document.body.clientWidth < 600;
};

export const prefixImgSrc = (url): string => {
  if (isDev) {
    return url;
  } else {
    return IMAGE_URL + url;
  }
};
