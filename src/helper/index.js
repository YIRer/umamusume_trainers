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
