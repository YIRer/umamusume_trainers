export const getTypeName = (skilType) => {
  switch (skilType) {
    case "unique":
      return "고유 스킬";
    case "has":
      return "소지 스킬";

    default:
      return "육성 스킬";
  }
};

export const convertLevel = (item) => {
  switch (item.level) {
    case "none":
      return "없음";

    default:
      return `${item.level} ~`;
  }
};
