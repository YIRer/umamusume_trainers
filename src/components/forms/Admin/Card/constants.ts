export const ranks = [
  {
    value: "S+",
    label: "S 이상",
  },
  {
    value: "A+",
    label: "A+",
  },
  {
    value: "A",
    label: "A",
  },
  {
    value: "B+",
    label: "B+",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C+",
    label: "C+",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "D+",
    label: "D+",
  },
  {
    value: "D",
    label: "D",
  },
  {
    value: "E+",
    label: "E+",
  },
  {
    value: "E",
    label: "E",
  },
  {
    value: "F+",
    label: "F+",
  },
  {
    value: "F",
    label: "F",
  },
  {
    value: "G+",
    label: "G+",
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
    tags: ["공통", "이벤트", "스태미나", "기자인연게이지", "근성"],
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

export const commonMultipleEvent = [
  {
    title: {
      ko: "",
      ja: "無茶は厳禁！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "完治するまでトレーニングは禁止(여름합숙중：とにかく労わる)",
        },
        result:
          "체력 +10 의욕저하 -3 직전 교육에 진행한 스탯 -10 무작위로 2개의 스탯을 -10 랜덤으로 『練習ベタ』 상태 부여",
      },
      {
        description: {
          ko: "",
          ja: "ダメだ、メニューから考え直そう！(여름합숙중：厳しくいく！)",
        },
        result:
          "성공시 체력+10 『練習上手◯』상태흭득  실패시  의욕저하 -3 직전 교육에 진행한 스탯 -10 무작위로 2개의 스탯을 -10 랜덤으로 『練習ベタ』 상태 부여",
      },
    ],
    condition: "훈련 실패율 70%이상 확정",
  },
  {
    title: {
      ko: "",
      ja: "お大事に！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "今日は休んだ方が良さそうだな",
        },
        result:
          "의욕저하 실패한훈련 스탯-5 ~ -10 『練習下手』(훈련실패율 감소)상태랜덤흭득",
      },
      {
        description: {
          ko: "",
          ja: "これからは周りに注意しないとな",
        },
        result:
          "성공시 『練習上手〇』(훈련실패율 감소)상태흭득 실패시 의욕저하 스탯-10 「練習ベタ」(훈련실패율 증가)상태흭득",
      },
    ],
    condition: "훈련 실패시",
  },
  {
    title: {
      ko: "",
      ja: "レース勝利！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "やった、やったぞーっ！！",
        },
        result: "체력-15~20 스탯+5~10 스킬PT+30~48 랜덤스킬레벨힌트",
      },
      {
        description: {
          ko: "",
          ja: "更なる高みを目指そう！",
        },
        result: "체력-5~30 스탯+5~11 스킬PT+30~55 랜덤스킬레벨힌트",
      },
    ],
    condition: "일반 레이스 승리",
  },
  {
    title: {
      ko: "",
      ja: "レース入着",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "マックイーンなら上がっていける！",
        },
        result: "체력-10~20 스탯+3~7 스킬PT+30~48",
      },
      {
        description: {
          ko: "",
          ja: "もっと実力をつけよう",
        },
        result: "체력-5~30 스탯+3~8 스킬PT+33~51",
      },
    ],
    condition: "일반 레이스 2~5착일반 레이스 2~5착",
  },
  {
    title: {
      ko: "",
      ja: "レース敗北",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "その悔しさを糧にしよう！",
        },
        result:
          "체력-25 스탯+4~5 스킬PT+11~29 랜덤디버프된스킬흭득(보라색스킬)",
      },
      {
        description: {
          ko: "",
          ja: "だったら逃げ出す？",
        },
        result:
          "체력-15~30 스탯+3~4 스킬PT+11~30 랜덤디버프된스킬흭득(보라색스킬)",
      },
    ],
    condition: "일반 레이스 패배(6위부터)",
  },
  {
    title: {
      ko: "",
      ja: "追加の自主トレ",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "なら、徹底的に追い込もう！",
        },
        result: "체력-5 이전훈련스탯+5 이사장인연게이지+5",
      },
      {
        description: {
          ko: "",
          ja: "効率を考えれば許可できない",
        },
        result: "체력+5",
      },
    ],
    condition: "훈련이후 랜덤발생",
  },
];

export const commonOnceEvents = [
  {
    title: {
      ko: "",
      ja: "新年の抱負",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "しっかり基礎体力を付けよう",
        },
        result: "스태미나+10",
      },
      {
        description: {
          ko: "",
          ja: "まずは昼食を食べに行こう",
        },
        result: "체력+20",
      },
      {
        description: {
          ko: "",
          ja: "コースの研究をしよう",
        },
        result: "스킬pt+20",
      },
    ],
    condition: "클래식급 1월 전반",
  },
  {
    title: {
      ko: "",
      ja: "夏合宿（2年目）にて",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "体の強さから、とか……？",
        },
        result: "파워+10",
      },
      {
        description: {
          ko: "",
          ja: "やっぱり根性じゃないか",
        },
        result: "근성+10",
      },
    ],
    condition: "클래식급 8월 후반",
  },
  {
    title: {
      ko: "",
      ja: "初詣",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "正月だしゆっくりしよう』",
        },
        result: "체력+30",
      },
      {
        description: {
          ko: "",
          ja: "いつも通りのトレーニングだ",
        },
        result: "올스탯+5",
      },
      {
        description: {
          ko: "",
          ja: "福袋を買いに行こう！",
        },
        result: "스킬pt+35",
      },
    ],
    condition: "시니어급 1월 전반",
  },
];

export const bonusTypes = [
  { value: "unique", label: "고유 보너스" },
  { value: "initial", label: "초기 능력" },
  { value: "max", label: "레벨 최대시" },
];

export const supportTypes = [
  { value: "speed", label: "스피드" },
  { value: "stamina", label: "스태미나" },
  { value: "power", label: "파워" },
  { value: "guts", label: "근성" },
  { value: "int", label: "지능" },
  { value: "friend", label: "친구" },
];

export default {
  ranks,
  stars,
  cardTypes,
  commonEvents,
  commonMultipleEvent,
  commonOnceEvents,
  initialStatusData,
  bonusTypes,
  supportTypes,
};
