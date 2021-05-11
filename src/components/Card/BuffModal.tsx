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
        ko: "",
        ja: "練習上手○",
      },
      result: "훈련실패율 감소",
    },
    {
      name: {
        ko: "",
        ja: "愛嬌○",
      },
      result: "인연게이지 쌓기가 쉬워진다 (+2추가상승)",
    },
    {
      name: {
        ko: "",
        ja: "切れ者",
      },
      result: "스킬 습득 포인트가 10%감소한다",
    },
    {
      name: {
        ko: "",
        ja: "注目株",
      },
      result: "기자와 이사장의 인연게이지를 쌓기가 쉬워진다(+2추가상승)",
    },
    {
      name: {
        ko: "",
        ja: "大輪の輝き",
      },
      result: "훈련실패율 감소 (슈퍼크릭 전용)",
    },
  ],
  debuff: [
    {
      name: {
        ko: "",
        ja: "練習ベタ",
      },
      result: "훈련실패율이 증가한다",
    },
    {
      name: {
        ko: "",
        ja: "片頭痛",
      },
      result: "의욕이 없어진다",
    },
    {
      name: {
        ko: "",
        ja: "肌荒れ",
      },
      result: "랜덤 의욕이 감소",
    },
    {
      name: {
        ko: "",
        ja: "夜ふかし気味",
      },
      result: "랜덤 체력 10감소",
    },
    {
      name: {
        ko: "",
        ja: "太り気味",
      },
      result: "스피드가 상승하지않는다",
    },
    {
      name: {
        ko: "",
        ja: "なまけ癖",
      },
      result: "랜덤하게 훈련을 하지 않는다",
    },
    {
      name: {
        ko: "",
        ja: "小さな ほころび",
      },
      result: "훈련실패율이 증가한다 (슈퍼크릭전용)",
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
        <b className={classes.name}>{data.name.ja}</b>
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
