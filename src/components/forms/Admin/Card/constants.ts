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
    value: "common",
    label: "공용 이벤트",
  },
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
    title: {
      ko: "안심~ 세침사 등☆장",
      ja: "あんし〜ん笹針師、参☆上",
    },
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
          ko: "강한 우마무스메가 되는 혈을 찌른다",
          ja: "強いウマ娘になれる秘孔を狙う",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result: "랜덤 스탯 3개+20",
          },
          {
            condition: "실패",
            result: "의욕저하 올 스탯-15 『夜ふかし気味』상태흭득",
          },
        ],
      },
      {
        description: {
          ko: "레이스에서 이기는 혈을 찌른다",
          ja: "レースで勝てる秘孔を狙う",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result: '"コーナー回復◯"(코너 회복◯), "直線回復"(직선 회복) 획득',
          },
          {
            condition: "실패",
            result: "체력-20 의욕저하",
          },
        ],
      },
      {
        description: {
          ko: "힘이 넘치고 건강해지는 혈을 찌른다",
          ja: "元気で健康になれる秘孔を狙う",
        },
        result:
          "성공시 체력최대치+12 체력+40, 실패시 체력-20 의욕저하 『練習ベタ』 상태흭득",
        results: [
          {
            condition: "성공",
            result: "체력의 최대치+12 체력+40 배드 컨디션이 낫는다",
          },
          {
            condition: "실패",
            result: "체력-20 의욕저하  『練習ベタ』 상태흭득",
          },
        ],
      },
      {
        description: {
          ko: "매력이 커지는 혈을 찌른다",
          ja: "魅力アップの秘孔を狙う",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result: '체력+20 의욕상승 "愛嬌◯"(애교) 상태가 된다',
          },
          {
            condition: "실패",
            result: "체력-10 의욕저하",
          },
        ],
      },
      {
        description: {
          ko: "불안하니까 포기한다",
          ja: "不安なのでやめておく",
        },
        result: "체력+10",
        results: [],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "유쾌! 밀착취재!",
      ja: "協快ッ！密着取材 !",
    },
    eventType: "common",
    tags: ["공통", "이벤트", "스태미나", "기자인연게이지", "근성"],
    choices: [
      {
        description: {
          ko: "존경스러운 이사장님입니다.",
          ja: "尊敬すべき理事長です",
        },
        result: "스태미나+10, 기자인연게이지+5",
        results: [],
      },
      {
        description: {
          ko: "자주 폭주하시는 듯한...",
          ja: "暴走することが多いような",
        },
        result: "근성+10, 기자인연게이지+5",
        results: [],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "좋은 표정이로다!",
      ja: "上々の画構えッ！",
    },
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
          ko: "그럼 새 훈련 도구를 부탁해도 될까요?",
          ja: "では、新しい練習用具をいただけますか？",
        },
        result:
          '체력-10, 파워+20, 근성+20, "ハヤテ一文字"(하야테 일문자) 힌트 Lv+1',
        results: [],
      },
      {
        description: {
          ko: "그럼 당근을 나눠주실 수 있나요?",
          ja: "では、にんじんを分けていただけますか？",
        },
        result: '체력+30, 스태미나+20, "好転一息"(호전일식) 힌트 Lv+1',
        results: [],
      },
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "의욕저하",
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "경품 추첨 찬스!",
      ja: "福引チャンス！",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "특별상(온천여행권)",
          ja: "特賞(温泉旅行券)",
        },
        result: "체력+30 의욕 2단계 상승 랜덤 스탯 3개+10",
        results: [],
      },
      {
        description: {
          ko: "1등(당근 햄버그)",
          ja: "1等(당근 햄버그)",
        },
        result: "체력+30 의욕 2단계 상승 랜덤 스탯 3개+10",
        results: [],
      },
      {
        description: {
          ko: "2등(당근 한 무더기)",
          ja: "2等(당근 한 무더기)",
        },
        result: "체력+20 의욕상승 랜덤 스탯 3개+5",
        results: [],
      },
      {
        description: {
          ko: "3등(당근 1개)",
          ja: "3等(당근 1개)",
        },
        result: "체력+20",
        results: [],
      },
      {
        description: {
          ko: "꽝(티슈)",
          ja: "はずれ(꽝)",
        },
        result: "의욕저하",
        results: [],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "밸런타인",
      ja: "バレンタイン",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "팬 수 부족",
            result: "스킬 Pt+20",
          },
          {
            condition: "팬 수 6만이상 (일부 4만)",
            result: "우마무스메 육성 스킬 Lv+1",
          },
        ],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "팬 감사제",
      ja: "ファン感謝祭",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "팬 수 부족",
            result: "스킬 Pt+20",
          },
          {
            condition: "팬 수 12만 이상 (일부 8만)",
            result: "우마무스메 육성 스킬 Lv+1",
          },
        ],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "다음번엔 지지 않아!",
      ja: "今度こそ負けない！",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "상단 선택지",
        },
        result: "의욕상승 스킬Pt+10",
      },
      {
        description: {
          ko: "",
          ja: "하단 선택지",
        },
        result: '스킬Pt+10 "伏兵◯"(복병◯) 힌트 Lv+1 랜덤으로 디버프 획득',
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "월간 트윙클 증간호",
      ja: "月刊トゥインクル増刊号",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "없음",
            result: "스킬Pt+5",
          },
          {
            condition: "없음",
            result: "랜덤 스탯 3개+3 스킬Pt+10",
          },
          {
            condition: "없음",
            result: "랜덤 스탯 3개+5 스킬Pt+20",
          },
        ],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "오토나시 기자의 철저한 취재",
      ja: "乙名史記者の徹底取材",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "현재 상황을 진지하게 받아들이겠습니다.",
          ja: "現状を真摯に受け止めます",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              "체력-15 의욕상승 랜덤 스탯+0~4 스킬Pt+10~25 기자 인연게이지15 *출주 레이스에 따라 변동",
          },
          {
            condition: "실패",
            result:
              '체력-25 의욕저하 랜덤 스탯+0~4 스킬Pt+10~25 기자 인연게이지-10 "小心者"(소심자) 스킬 랜덤 획득  *출주 레이스에 따라 변동',
          },
        ],
      },
      {
        description: {
          ko: "이대로 밀고 나가겠습니다!!",
          ja: "このまま突き進みます！！",
        },
        result:
          "체력 -15~30 랜덤 스탯+0~4 스킬Pt+10~25 기자 인연게이지+10 *출주 레이스에 따라 변동",
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "트레이너 수준의 지식",
      ja: "トレーナー並の知識",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "파워가 과제입니다만...",
          ja: "力強さが課題なんですが……",
        },
        result: "파워+10 오토나시 기자의 인연게이지+5",
      },
      {
        description: {
          ko: "스피드가 과제입니다만...",
          ja: "スピードが課題なんですが……",
        },
        result: "스피드+10 오토나시 기자의 인연게이지+5",
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "",
      ja: "ついに集まったチームメンバー！",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "タイキの＜HOP CHEERS＞",
        },
        result:
          "팀 <HOP CHEERS>가 된다 *타이키 셔틀을 링크 편성해야할 필요가 있다",
      },
      {
        description: {
          ko: "",
          ja: "フクキタルの＜ハレノヒ・ランナーズ＞",
        },
        result:
          "팀 <ハレノヒ・ランナーズ>가 된다 *마치가네 후쿠키타루와 링크 편성해야할 필요가 있다",
      },
      {
        description: {
          ko: "",
          ja: "ウララの＜にんじんぷりん＞",
        },
        result:
          "팀 <にんじんぷりん>이 된다 *하루 우라라와 링크 편성해야할 필요가 있다",
      },
      {
        description: {
          ko: "",
          ja: "ライスの＜ブルームス＞",
        },
        result:
          "팀 <ブルームス>가 된다 *라이스 샤워와 링크 편성해야할 필요가 있다",
      },
      {
        description: {
          ko: "",
          ja: "チーム＜キャロッツ＞",
        },
        result: "팀 <キャロッツ>이 된다",
      },
    ],
    condition: "아오하루",
  },
  {
    title: {
      ko: "",
      ja: "秋川理事長のご褒美！",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "タイキの＜HOP CHEERS＞",
        },
        result:
          '랜덤 스탯 3개+10 스킬Pt+50 "マイルの支配者"(마일의 지배자) 힌트 Lv+1',
      },
      {
        description: {
          ko: "",
          ja: "フクキタルの＜ハレノヒ・ランナーズ＞",
        },
        result: '랜덤 스탯 3개+10 스킬Pt+50 "千里眼"(천리안) 힌트 Lv+1',
      },
      {
        description: {
          ko: "",
          ja: "ウララの＜にんじんぷりん＞",
        },
        result:
          '랜덤 스탯 3개+10 스킬Pt+50 "不屈の心"(꺾이지 않는 마음) 힌트 Lv+1',
      },
      {
        description: {
          ko: "",
          ja: "ライスの＜ブルームス＞",
        },
        result: '랜덤 스탯 3개+10 스킬Pt+50 "クールダウン"(쿨다운) 힌트 Lv+1',
      },
      {
        description: {
          ko: "",
          ja: "チーム＜キャロッツ＞",
        },
        result:
          '랜덤 스탯 3개+10 스킬Pt+50 "ノンストップガール"(논스톱 걸) 힌트 Lv+1',
      },
    ],
    condition: "아오하루",
  },
  {
    title: {
      ko: "",
      ja: "チーム総合力アップ・最高の差し入れ",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "시나리오 링크 발생 있음(시나리오 링크 말딸 육성)",
            result:
              '팀 종합력 상승, 랜덤 스탯 3개+6 "アガッてきた！"(텐션 올라온다!) 힌트 Lv+3',
          },
          {
            condition: "시나리오 링크 말딸 육성 X",
            result:
              '팀 종합력 상승, 랜덤 스탯 3개+5 "アガッてきた！"(텐션 올라온다!) 힌트 Lv+1',
          },
        ],
      },
    ],
    condition: "아오하루",
  },
  {
    title: {
      ko: "",
      ja: "チーム＜ファースト＞の宣戦布告",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "스피드 팀의 스탯이 가장 높은 경우",
        },
        result: "",
        results: [
          {
            condition: "아오하루 폭발 발생 수 0~3회",
            result: "스킬Pt +10~15",
          },
          {
            condition: "아오하루 폭발 발생 수 4~9회",
            result:
              '스킬Pt +15 "アオハル点火・速"(아오하루 점화・속도) 힌트 Lv+1~3',
          },
          {
            condition: "아오하루 폭발 발생 수 10회 이상",
            result:
              '스킬Pt +20 "アオハル点火・速"(아오하루 점화・속도) 힌트 Lv+1~3',
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "스태미나 팀의 스탯이 가장 높은 경우",
        },
        result: "",
        results: [
          {
            condition: "아오하루 폭발 발생 수 0~3회",
            result: "스킬Pt +10~15",
          },
          {
            condition: "아오하루 폭발 발생 수 4~9회",
            result:
              '스킬Pt +15 "アオハル点火・体"(아오하루 점화・체력) 힌트 Lv+1~3',
          },
          {
            condition: "아오하루 폭발 발생 수 10회 이상",
            result:
              '스킬Pt +20 "アオハル点火・体"(아오하루 점화・체력) 힌트 Lv+1~3',
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "파워 팀의 스탯이 가장 높은 경우",
        },
        result: "",
        results: [
          {
            condition: "아오하루 폭발 발생 수 0~3회",
            result: "스킬Pt +10~15",
          },
          {
            condition: "아오하루 폭발 발생 수 4~9회",
            result:
              '스킬Pt +15 "アオハル点火・力"(아오하루 점화・힘) 힌트 Lv+1~3',
          },
          {
            condition: "아오하루 폭발 발생 수 10회 이상",
            result:
              '스킬Pt +20 "アオハル点火・力"(아오하루 점화・힘) 힌트 Lv+1~3',
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "근성 팀의 스탯이 가장 높은 경우",
        },
        result: "",
        results: [
          {
            condition: "아오하루 폭발 발생 수 0~3회",
            result: "스킬Pt +10~15",
          },
          {
            condition: "아오하루 폭발 발생 수 4~9회",
            result:
              '스킬Pt +15 "アオハル点火・根"(아오하루 점화・근성) 힌트 Lv+1~3',
          },
          {
            condition: "아오하루 폭발 발생 수 10회 이상",
            result:
              '스킬Pt +20 "アオハル点火・根"(아오하루 점화・근성) 힌트 Lv+1~3',
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "지능 팀의 스탯이 가장 높은 경우",
        },
        result: "",
        results: [
          {
            condition: "아오하루 폭발 발생 수 0~3회",
            result: "스킬Pt +10~15",
          },
          {
            condition: "아오하루 폭발 발생 수 4~9회",
            result:
              '스킬Pt +15 "アオハル点火・賢"(아오하루 점화・지능) 힌트 Lv+1~3',
          },
          {
            condition: "아오하루 폭발 발생 수 10회 이상",
            result:
              '스킬Pt +20 "アオハル点火・賢"(아오하루 점화・지능) 힌트 Lv+1~3',
          },
        ],
      },
    ],
    condition: "아오하루",
  },
  {
    title: {
      ko: "",
      ja: "ハッピーミークと勝負！",
    },
    eventType: "common",
    tags: ["URA 시나리오", "해피미크"],
    choices: [
      {
        description: {
          ko: "",
          ja: "スピードで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '스피드 상한+4(최대치인경우 +0) 스피드+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・速"(레이스의 진수・속도) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "스피드+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "スタミナで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '스태미나 상한+4(최대치인경우 +0) 스태미나+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・体"(레이스의 진수・몸) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "스태미나+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "パワーで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '파워 상한+4(최대치인경우 +0) 파워+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・力"(레이스의 진수・힘) 힌트 Lv+1 대결 Lv 상승',
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "根性で勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '근성 상한+4(최대치인경우 +0) 근성+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・根"(레이스의 진수・끈기) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "근성+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "賢さで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '지능 상한+4(최대치인경우 +0) 지능+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・賢"(레이스의 진수・현명) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "지능+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "体力の勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공(현재 체력, 의욕상태)",
            result:
              '*부정확한 정보입니다. 체력의 최대치+4(최대치인경우 +0) 체력+10~25 회복(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・心"(레이스의 진수・마음) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result:
              "*부정확한 정보입니다. 체력+5~15회복(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
    ],
    condition: "URA 시나리오에서 해피 미크와 함께 트레이닝",
  },
  {
    title: {
      ko: "URA파이널스 결승 후에",
      ja: "URAファイナルズ決勝の後に",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "우승",
            result: "올 스탯+10 스킬 Pt+80",
          },
          {
            condition: "해피미크와의 대결 Lv이 최대치에서 우승",
            result: '"限界の先へ"(한계 너머로) 힌트 Lv+1 올 스탯+10 스킬 Pt+80',
          },
        ],
      },
    ],
    condition: "URA파이널스 결승 우승",
  },
];

export const commonMultipleEvent = [
  {
    title: {
      ko: "무리는 금물!",
      ja: "無茶は厳禁！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "今は休んだほうがいい",
        },
        result:
          "체력 +10 의욕저하 -3 직전 교육에 진행한 스탯 -10 무작위로 2개의 스탯을 -10 랜덤으로 『練習ベタ』 상태 부여",
        results: [],
      },
      {
        description: {
          ko: "",
          ja: "わかった、できる範囲で頑張ろう",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result: "체력+10 『練習上手◯ 훈련능속◯』상태흭득",
          },
          {
            condition: "실패",
            result:
              "의욕저하, 직전 교육에 진행한 스탯-10, 랜덤 스탯 2개-10 랜덤으로 『練習ベタ』가 된다",
          },
        ],
      },
    ],
    condition: "훈련 실패율 70%이상 확정",
  },
  {
    title: {
      ko: "몸조심!",
      ja: "お大事に！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "心配だから、ちゃんと休もう",
        },
        result:
          "의욕저하 실패한훈련 스탯-5 ~ -10 『練習下手』(훈련실패율 감소)상태랜덤흭득",
        results: [],
      },
      {
        description: {
          ko: "",
          ja: "無理のない範囲でやろう",
        },
        result: "",
        results: [
          {
            condition: "성공시",
            result: "『練習上手〇 훈련능숙〇』(훈련실패율 감소)상태흭득",
          },
          {
            condition: "실패시",
            result:
              "의욕저하 직전 훈련 스탯-10 「練習ベタ」(훈련실패율 증가)상태흭득",
          },
        ],
      },
    ],
    condition: "훈련 실패시",
  },
  {
    title: {
      ko: "레이스 우승!",
      ja: "レース勝利！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "素晴らしい走りだった",
        },
        result: "",
        results: [
          {
            condition: "G1",
            result: "랜덤 스탯 한개 +10 스킬 Pt+45",
          },
          {
            condition: "G2~G3",
            result: "랜덤 스탯 한개 +8 스킬 Pt+35",
          },
          {
            condition: "op",
            result: "랜덤 스탯 한개 +5 스킬 Pt+30",
          },
          {
            condition: "공통",
            result:
              "체력-15 랜덤으로 출주한 마장, 레이스장과 관련된 스킬힌트 획득",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "次のレースも勝とう",
        },
        result: "",
        results: [
          {
            condition: "G1",
            result: "랜덤 스탯 한개 +10 스킬 Pt+45",
          },
          {
            condition: "G2~G3",
            result: "랜덤 스탯 한개 +8 스킬 Pt+35",
          },
          {
            condition: "op",
            result: "랜덤 스탯 한개 +5 스킬 Pt+30",
          },
          {
            condition: "공통",
            result:
              "체력-5~30 랜덤으로 출주한 마장, 레이스장과 관련된 스킬힌트 획득",
          },
        ],
      },
    ],
    condition: "일반 레이스 승리(1착)",
  },
  {
    title: {
      ko: "레이스 입상",
      ja: "レース入着",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "悪くない走りはできてたよ",
        },
        result: "",
        results: [
          {
            condition: "G1",
            result: "올 스탯중 랜덤 한 개 +5~8 스킬 Pt+40~45",
          },
          {
            condition: "G2~G3",
            result: "올 스탯중 랜덤 한 개 +4~6 스킬 Pt+30~45",
          },
          {
            condition: "op",
            result: "올 스탯중 랜덤 한 개 +2~4 스킬 Pt+20~45",
          },
          {
            condition: "공통",
            result:
              "체력 -20 랜덤으로 출주한 마장, 레이스장과 관련된 스킬힌트 획득",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "次は必ず勝とう！",
        },
        result: "",
        results: [
          {
            condition: "G1",
            result: "올 스탯중 랜덤 한 개 +5~8 스킬 Pt+40~45",
          },
          {
            condition: "G2~G3",
            result: "올 스탯중 랜덤 한 개 +4~6 스킬 Pt+30~45",
          },
          {
            condition: "op",
            result: "올 스탯중 랜덤 한 개 +2~4 스킬 Pt+20~45",
          },
          {
            condition: "공통",
            result:
              "체력 -10~30 랜덤으로 출주한 마장, 레이스장과 관련된 스킬힌트 획득",
          },
        ],
      },
    ],
    condition: "일반 레이스 2~5착",
  },
  {
    title: {
      ko: "레이스 패배",
      ja: "レース敗北",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "君は絶対に強くなれる",
        },
        result: "",
        results: [
          {
            condition: "G1",
            result: "올 스탯중 랜덤 한 개 +4 스킬 Pt+25",
          },
          {
            condition: "G2~G3",
            result: "올 스탯중 랜덤 한 개 +3 스킬 Pt+20",
          },
          {
            condition: "op",
            result: "스킬 Pt+10",
          },
          {
            condition: "공통",
            result:
              "체력-25 랜덤으로 출주한 마장, 레이스장과 관련된 스킬힌트 획득",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "次は勝とう",
        },
        result: "",
        results: [
          {
            condition: "G1",
            result: "올 스탯중 랜덤 한 개 +4 스킬 Pt+25",
          },
          {
            condition: "G2~G3",
            result: "올 스탯중 랜덤 한 개 +3 스킬 Pt+20",
          },
          {
            condition: "op",
            result: "스킬 Pt+10",
          },
          {
            condition: "공통",
            result:
              "체력-15~35 랜덤으로 출주한 마장, 레이스장과 관련된 스킬힌트 획득",
          },
        ],
      },
    ],
    condition: "일반 레이스 패배(6위부터)",
  },
  {
    title: {
      ko: "추가 자율 트레이닝",
      ja: "追加の自主トレ",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "頑張ってきて！",
        },
        result: "체력-5 이전훈련스탯+5 시나리오 NPC 인연게이지+5",
        results: [
          {
            condition: "URA",
            result: "아키카와 야요이",
          },
          {
            condition: "아오하루",
            result: "카시모토 리코",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "オーバーワークになるから自転車で",
        },
        result: "체력+5",
        results: [],
      },
    ],
    condition: "훈련이후 랜덤발생",
  },
  {
    title: {
      ko: "",
      ja: "たい焼きパーティー！",
    },
    eventType: "multipleTimes",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "カロリーは大丈夫……？",
        },
        result: "체력+10 스킬Pt+5",
        results: [],
      },
      {
        description: {
          ko: "",
          ja: "頑張った分、たくさん食べて",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result: "체력+30 스킬Pt+10",
          },
          {
            condition: "실패",
            result:
              "체력+30 스킬 Pt+10 스피드-5 파워+5 「太り気味 살찜 주의」 상태가 됨",
          },
        ],
      },
    ],
    condition: "",
  },
  {
    title: {
      ko: "",
      ja: "ハッピーミークと勝負！",
    },
    eventType: "common",
    tags: ["URA 시나리오", "해피미크"],
    choices: [
      {
        description: {
          ko: "",
          ja: "スピードで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '스피드 상한+4(최대치인경우 +0) 스피드+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・速"(레이스의 진수・속도) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "스피드+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "スタミナで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '스태미나 상한+4(최대치인경우 +0) 스태미나+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・体"(레이스의 진수・몸) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "스태미나+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "パワーで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '파워 상한+4(최대치인경우 +0) 파워+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・力"(레이스의 진수・힘) 힌트 Lv+1 대결 Lv 상승',
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "根性で勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '근성 상한+4(최대치인경우 +0) 근성+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・根"(레이스의 진수・끈기) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "근성+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "賢さで勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공",
            result:
              '지능 상한+4(최대치인경우 +0) 지능+10~25(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・賢"(레이스의 진수・현명) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result: "지능+5~15(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
      {
        description: {
          ko: "",
          ja: "体力の勝負！",
        },
        result: "",
        results: [
          {
            condition: "성공(현재 체력, 의욕상태)",
            result:
              '*부정확한 정보입니다. 체력의 최대치+4(최대치인경우 +0) 체력+10~25 회복(대결 Lv 따라 변경) 스킬 Pt+30 "レースの真髄・心"(레이스의 진수・마음) 힌트 Lv+1 대결 Lv 상승',
          },
          {
            condition: "실패",
            result:
              "*부정확한 정보입니다. 체력+5~15회복(대결 Lv 따라 변경) 스킬 Pt+15",
          },
        ],
      },
    ],
    condition: "URA 시나리오에서 해피 미크와 함께 트레이닝",
  },
  {
    title: {
      ko: "URA파이널스 결승 후에",
      ja: "URAファイナルズ決勝の後に",
    },
    eventType: "common",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "우승",
            result: "올 스탯+10 스킬 Pt+80",
          },
          {
            condition: "해피미크와의 대결 Lv이 최대치에서 우승",
            result: '"限界の先へ"(한계 너머로) 힌트 Lv+1 올 스탯+10 스킬 Pt+80',
          },
        ],
      },
    ],
    condition: "URA파이널스 결승 우승",
  },
];

export const commonOnceEvents = [
  {
    title: {
      ko: "신년 포부",
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
      ko: "여름 합숙(2년차)에서",
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
      ko: "새해 첫 참배",
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
  {
    title: {
      ko: "데뷔전 후에",
      ja: "デビュー戦の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+30 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+30 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "데뷔전 출주",
  },
  {
    title: {
      ko: "",
      ja: "朝日杯FSの後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+35~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "아사히배 FS 출주",
  },
  {
    title: {
      ko: "",
      ja: "皐月賞の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "사츠키상 출주",
  },
  {
    title: {
      ko: "",
      ja: "日本ダービーの後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "일본 더비 출주",
  },
  {
    title: {
      ko: "",
      ja: "菊花賞の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "킷카상 출주",
  },
  {
    title: {
      ko: "",
      ja: "有馬記念(クラシック)の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "아리마 기념 클래식급 출주",
  },
  {
    title: {
      ko: "",
      ja: "大阪杯の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위",
            result: "랜덤 스탯 3개+1 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "오사카배 출주",
  },
  {
    title: {
      ko: "",
      ja: "天皇賞(春)の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개 +10 스킬Pt+45",
          },
          {
            condition: "2~5위",
            result: "랜덤 스탯 2개 +5~8 스킬Pt+35~45",
          },
          {
            condition: "6위 이하",
            result: "랜덤 스탯 1개 +4 스킬Pt+25",
          },
        ],
      },
    ],
    condition: "천황상(봄) 출주",
  },
  {
    title: {
      ko: "",
      ja: "宝塚記念の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "타카라즈카 기념 출주",
  },
  {
    title: {
      ko: "",
      ja: "ジャパンCの後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "재팬컵 출주",
  },
  {
    title: {
      ko: "",
      ja: "有馬記念(シニア)の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "없음",
        },
        result: "",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "아리마 기념(시니어 급) 출주",
  },
  {
    title: {
      ko: "",
      ja: "天皇賞(秋)の後に",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "",
        },
        result: "없음",
        results: [
          {
            condition: "1위",
            result: "랜덤 스탯 3개+3 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "2위",
            result: "랜덤 스탯 3개+2 스킬 Pt+45 시나리오 NPC 인연게이지+4",
          },
          {
            condition: "3위 이하",
            result: "랜덤 스탯 3개+1 스킬 Pt+30~45 시나리오 NPC 인연게이지+4",
          },
        ],
      },
    ],
    condition: "천황상(가을) 출주",
  },
  {
    title: {
      ko: "댄스 레슨",
      ja: "ダンスレッスン",
    },
    eventType: "once",
    tags: [""],
    choices: [
      {
        description: {
          ko: "",
          ja: "かけ声の活かし方を知りたいよな",
        },
        result: "근성+10",
      },
      {
        description: {
          ko: "",
          ja: "クールになるには、とか？",
        },
        result: "지능+10",
      },
    ],
    condition: "",
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
  { value: "group", label: "그룹" },
];

export const bonusOptions = [
  "우정 보너스",
  "의욕에 의한 효과",
  "초기 인연 게이지",
  "레이스 보너스",
  "팬 보너스",
  "득의율",
  "스킬 Pt 보너스",
  "힌트 Lv",
  "힌트 발생률",
  "트레이닝 효과",
  "초기 스피드",
  "초기 스태미나",
  "초기 파워",
  "초기 근성",
  "초기 지능",
  "스피드 보너스",
  "스태미나 보너스",
  "파워 보너스",
  "근성 보너스",
  "지능 보너스",
  "체력의 최대치",
  "지능 우정 트레이닝 회복량",
  "이벤트 회복량",
  "이벤트 효과",
  "실패율 DOWN",
  "체력 소모량 DOWN",
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
  bonusOptions,
};
