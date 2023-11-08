import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export const BUFF_LIST = {
  buff: [
    {
      name: {
        ko: "훈련 능숙◎",
        ja: "練習上手○",
      },
      result: "훈련실패율 감소",
    },
    {
      name: {
        ko: "애교○",
        ja: "愛嬌○",
      },
      result: "인연게이지 쌓기가 쉬워진다 (+2추가상승)",
    },
    {
      name: {
        ko: "수완가",
        ja: "切れ者",
      },
      result: "스킬 습득 포인트가 10%감소한다",
    },
    {
      name: {
        ko: "주목 받는 신예",
        ja: "注目株",
      },
      result: "기자와 이사장의 인연게이지를 쌓기가 쉬워진다(+2추가상승)",
    },
    {
      name: {
        ko: "활짝 핀 광채",
        ja: "大輪の輝き",
      },
      result:
        "모든 훈련의 실패율이 감소한다. '練習ベタ' 상태가 되어도 사라지지 않음 (슈퍼 크릭 전용)",
    },
    {
      name: {
        ko: "정열 존: 팀 <시리우스>",
        ja: "情熱ゾーン：チーム＜シリウス>",
      },
      result:
        "팀 시리우스 카드 전용: 정열 존 상태가 된다.(일정 턴 동안 불면증, 게으름 상태 방지,모든 트레이닝이 우정 트레이닝이 된다.)",
    },
    {
      name: {
        ko: "정열 존: 옥좌에 모이는 자들",
        ja: "情熱ゾーン：玉座に集いし者たち",
      },
      result:
        "옥좌에 모이는 자들 카드 전용: 정열 존 상태가 된다.(일정 턴 동안 불면증, 게으름 상태 방지,모든 트레이닝이 우정 트레이닝이 된다.)",
    },
    {
      name: {
        ko: "정열 존: 선조로서 인도하는 자",
        ja: "情熱ゾーン： 祖にして導く者",
      },
      result:
        "선조로서 인도하는 자 카드 전용: 정열 존 상태가 된다.(일정 턴 동안 불면증, 게으름 상태 방지,모든 트레이닝이 우정 트레이닝이 된다.)",
    },
    {
      name: {
        ko: "팬과의 약속・홋카이도",
        ja: "ファンとの約束・北海道",
      },
      result:
        "삿포로, 하코다테 경기장에서 승리시 이벤트 발생. 의욕상승 스피드+10 근성+10 스킬Pt+10、대상 경기장 힌트 Lv+5 (그랜드 라이브, 스마트 팔콘 전용)",
    },
    {
      name: {
        ko: "팬과의 약속・도호쿠",
        ja: "ファンとの約束・北東",
      },
      result:
        "후쿠시마, 니가타 경기장에서 승리시 이벤트 발생. 의욕상승 스피드+10 스태미나+10 스킬Pt+10、대상 경기장 힌트 Lv+5 (그랜드 라이브, 스마트 팔콘 전용)",
    },
    {
      name: {
        ko: "팬과의 약속・고쿠라",
        ja: "ファンとの約束・小倉",
      },
      result:
        "고쿠라 경기장에서 승리시 이벤트 발생. 의욕상승 스태미나+10 근성+10 스킬Pt+10、대상 경기장 힌트 Lv+5 (그랜드 라이브, 스마트 팔콘 전용)",
    },
    {
      name: {
        ko: "팬과의 약속・간사이",
        ja: "ファンとの約束・関西",
      },
      result:
        "교토, 한신 경기장에서 승리시 이벤트 발생. 의욕상승 스태미나+10 지능+10 스킬Pt+10、대상 경기장 힌트 Lv+5 (그랜드 라이브, 스마트 팔콘 전용)",
    },
    {
      name: {
        ko: "팬과의 약속・나카야마",
        ja: "ファンとの約束・中山",
      },
      result:
        "나카야마 경기장에서 승리시 이벤트 발생. 의욕상승 파워+10 근성+10 스킬Pt+10、대상 경기장 힌트 Lv+5 (그랜드 라이브, 스마트 팔콘 전용)",
    },
    {
      name: {
        ko: "행운 체질",
        ja: "幸運体質",
      },
      result:
        "배드 컨디션이 붙는 경우 한번만 막아준다",
    },
    {
      name: {
        ko: "긍정적인 사고",
        ja: "ポジティブ思考",
      },
      result:
        "의욕 DOWN을 한번만 막아준다",
    },
  ],
  debuff: [
    {
      name: {
        ko: "훈련 미숙",
        ja: "練習ベタ",
      },
      result: "훈련실패율이 증가한다",
    },
    {
      name: {
        ko: "편두통",
        ja: "片頭痛",
      },
      result: "의욕이 없어진다",
    },
    {
      name: {
        ko: "피부 트러블",
        ja: "肌荒れ",
      },
      result: "랜덤 의욕이 감소",
    },
    {
      name: {
        ko: "밤샘습관",
        ja: "夜ふかし気味",
      },
      result: "랜덤 체력 10감소",
    },
    {
      name: {
        ko: "살찜주의",
        ja: "太り気味",
      },
      result: "스피드가 상승하지않는다",
    },
    {
      name: {
        ko: "땡땡이 기질",
        ja: "なまけ癖",
      },
      result: "랜덤하게 훈련을 하지 않는다",
    },
    {
      name: {
        ko: "작은 역경",
        ja: "小さな ほころび",
      },
      result:
        "모든 훈련의 실패율이 5% 증가한다. 보건실 등으로 치료 불가능 (슈퍼크릭전용)",
    },
    {
      name: {
        ko: "아직은 준비중",
        ja: "まだまだ準備中",
      },
      result:
        "레이스 출주시마다 체력 -5, 랜덤하게 의욕도 하락 (메이쇼 도토 전용)",
    },
    {
      name: {
        ko: "유리 다리",
        ja: "ガラスの脚",
      },
      result:
        "2연속 출주시 레이스 출주시 체력-10, 연습에 서툼 획득 (메지로 아르당 전용)",
    },
    {
      name: {
        ko: "봄을 기다리는 꽃봉오리",
        ja: "春待つ蕾",
      },
      result:
        "레이스 출주 후 체력-5(클래식 급 11월 목표 달성으로 해제)",
    },
  ],
};

const useStyles = makeStyles((_theme) => ({
  items: { display: "flex", marginBottom: "16px" },
  name: { flex: 1 },
  result: { flex: 2 },
  actionRoot: { justifyContent: "center" },
}));

type BuffModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function BuffModal(props: BuffModalProps) {
  const classes = useStyles();
  const reunderBuffs = (data, index, buffType) => {
    return (
      <div key={`${buffType}-${index}`} className={classes.items}>
        <b className={classes.name}>
          {data.name.ja}
          <br />
          {data.name.ko && `(${data.name.ko})`}
        </b>
        <span className={classes.result}>{data.result}</span>
      </div>
    );
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>버프 및 디버프</DialogTitle>
      <DialogContent>
        <div>
          <h4>버프</h4>
          {BUFF_LIST.buff.map((buff, index) =>
            reunderBuffs(buff, index, "buff")
          )}
        </div>
        <div>
          <h4>디버프</h4>
          {BUFF_LIST.debuff.map((debuff, index) =>
            reunderBuffs(debuff, index, "debuff")
          )}
        </div>
      </DialogContent>
      <DialogActions classes={{ root: classes.actionRoot }}>
        <Button variant="outlined" color="secondary" onClick={props.onClose}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
