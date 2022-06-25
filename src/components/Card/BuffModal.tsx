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
        ko: "땡떙이 기질",
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
