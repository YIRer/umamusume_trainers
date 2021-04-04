export const ranks = [
  {
    value: "S+",
    label: "S 이상",
  },
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "D",
    label: "D",
  },
  {
    value: "E",
    label: "E",
  },
  {
    value: "F",
    label: "F",
  },
  {
    value: "G",
    label: "G",
  },
];

export const stars = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export const cardTypes = [
  {
    value: "training",
    label: "육성",
  },
  {
    value: "support",
    label: "서포터",
  },
];

export const initialStatusData = {
  rank: "G",
  bonus: "0",
};

export const cardEventTypes = [
  {
    value: "once",
    label: "1회성 이벤트",
  },
  {
    value: "multipleTimes",
    label: "다회성 이벤트",
  },
];

export const commonEvents = [
  {
    title: { ko: "", ja: "あんし〜ん笹針師、参☆上" },
    eventType: "common",
    tags: [
      "공통",
      "이벤트",
      "올스탯",
      "체력",
      "의욕상승",
      "의욕저하",
      "『夜ふかし気味』",
      "『コーナー回復◯』",
      "『直線回復』",
      "『練習ベタ』",
      "『愛嬌◯』",
    ],
    choices: [
      {
        description: {
          ko: "",
          ja: "強いウマ娘になれる秘孔を狙う(20%?)",
        },
        result: `성공시 올스탯+20, 실패시 의욕저하 올스탯-15『夜ふかし気味』상태흭득`,
      },
      {
        description: {
          ko: "",
          ja: "レースで勝てる秘孔を狙う(50%?)",
        },
        result: `성공시 『コーナー回復◯』『直線回復』 스킬 흭득, 실패시 체력-20 의욕저하`,
      },
      {
        description: {
          ko: "",
          ja: "元気で健康になれる秘孔を狙う(70%?)",
        },
        result: `성공시 체력최대치+12 체력+40, 실패시 체력-20 의욕저하 『練習ベタ』 상태흭득`,
      },
      {
        description: {
          ko: "",
          ja: "魅力アップの秘孔を狙う(90%?)",
        },
        result: `성공시 체력+20 의욕상승 『愛嬌◯』 상태흭득, 실패시 체력-20 의욕저하 『練習ベタ』 상태흭득`,
      },
      {
        description: {
          ko: "",
          ja: "不安なのでやめておく",
        },
        result: `체력+10 OR +20`,
      },
    ],
    condition: "",
  },
  {
    title: { ko: "", ja: "協快ッ！密着取材 !" },
    eventType: "common",
    tags: ["공통", "이벤트", "스테미나", "기자인연게이지", "근성"],
    choices: [
      {
        description: {
          ko: "",
          ja: "尊敬すべき理事長です",
        },
        result: `스태미나+10, 기자인연게이지+5`,
      },
      {
        description: {
          ko: "",
          ja: "暴走することが多いような",
        },
        result: `근성+10, 기자인연게이지+5`,
      },
    ],
    condition: "",
  },
  {
    title: { ko: "", ja: "上々の画構えッ！" },
    eventType: "common",
    tags: [
      "공통",
      "이벤트",
      "체력",
      "파워",
      "근성",
      "하야테일문자",
      "신발",
      "스킬힌트",
      "好転一息",
    ],
    choices: [
      {
        description: {
          ko: "",
          ja: "では、新しい練習用具をいただけますか？",
        },
        result: `체력-10, 파워+20, 근성+20, 하야테 일문자 흭득, 신발1종 흭득`,
      },
      {
        description: {
          ko: "",
          ja: "では、にんじんを分けていただけますか？",
        },
        result: `체력+30, 스태미나+20, "好転一息"스킬힌트레벨+1`,
      },
    ],
    condition: "",
  },
];

export default {
  ranks,
  stars,
  cardTypes,
  commonEvents,
  initialStatusData,
};
