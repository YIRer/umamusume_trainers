import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import { ranks } from "./constants";
import { CardStatusProps } from "./types";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
}));

const CardStatus = ({ data, onChange }: CardStatusProps) => {
  const classes = useStyles();
  return (
    <FormControl>
      <h4>경기장 적성</h4>
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.turf?.rank || "G"}
        id="turf-rank"
        name="turf-rank"
        label="잔디(터프) 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="turf-bonus"
        name="turf-bonus"
        label="잔디(터프) 적성 보너스"
        value={data?.turf?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.duct?.rank || "G"}
        id="duct-rank"
        name="duct-rank"
        label="더트 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="duct-bonus"
        name="duck-bonus"
        label="더트 적성 보너스"
        value={data.duct?.bonus || "0"}
        onChange={onChange}
      />

      <h4>거리 적성</h4>
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.short?.rank || "G"}
        id="short-rank"
        name="short-rank"
        label="단거리 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="short-bonus"
        name="short-bonus"
        label="단거리 적성 보너스"
        value={data.short?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.mile?.rank || "G"}
        id="mile-rank"
        name="mile-rank"
        label="마일 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="mile-bonus"
        name="mile-bonus"
        label="마일 적성 보너스"
        value={data.mile?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.medium?.rank || "G"}
        id="medium-rank"
        name="medium-rank"
        label="중거리 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="medium-bonus"
        name="medium-bonus"
        label="중거리 적성 보너스"
        value={data.medium?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.long?.rank || "G"}
        id="long-rank"
        name="long-rank"
        label="장거리 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="long-bonus"
        name="long-bonus"
        label="장거리 적성 보너스"
        value={data.long?.bonus || "0"}
        onChange={onChange}
      />

      <h4>작전 적성</h4>
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.escape?.rank || "G"}
        id="escape-rank"
        name="escape-rank"
        label="도주 작전 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="escape-bonus"
        name="escape-bonus"
        label="도주 작전 적성 보너스"
        value={data.escape?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.leading?.rank || "G"}
        id="leading-rank"
        name="leading-rank"
        label="선행 작전 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="leading-bonus"
        name="leading-bonus"
        label="선행 작전 적성 보너스"
        value={data.leading?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.between?.rank || "G"}
        id="between-rank"
        name="between-rank"
        label="선입 작전 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="between-bonus"
        name="between-bonus"
        label="선입 작전 적성 보너스"
        value={data.between?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.pushing?.rank || "G"}
        id="pushing-rank"
        name="pushing-rank"
        label="추입 작전 적성"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="pushing-bonus"
        name="pushing-bonus"
        label="추입 작전 적성 보너스"
        value={data.pushing?.bonus || "0"}
        onChange={onChange}
      />

      <h4>스탯</h4>
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.speed?.rank || "G"}
        id="speed-rank"
        name="speed-rank"
        label="스피드 스탯"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="speed-bonus"
        name="speed-bonus"
        label="스피드 스탯 보너스"
        value={data.speed?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.stamina?.rank || "G"}
        id="stamina-rank"
        name="stamina-rank"
        label="스태미나 스탯"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="stamina-bonus"
        name="stamina-bonus"
        label="스태미나 스탯 보너스"
        value={data.stamina?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.power?.rank || "G"}
        id="power-rank"
        name="power-rank"
        label="파워 스탯"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="power-bonus"
        name="power-bonus"
        label="파워 스탯 보너스"
        value={data.power?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.guts?.rank || "G"}
        id="guts-rank"
        name="guts-rank"
        label="근성 스탯"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="guts-bonus"
        name="guts-bonus"
        label="근성 스탯 보너스"
        value={data.guts?.bonus || "0"}
        onChange={onChange}
      />
      <TextField
        className={clsx(classes.root)}
        required
        select
        value={data.intelligence?.rank || "G"}
        id="intelligence-rank"
        name="intelligence-rank"
        label="지능 스탯"
        onChange={onChange}
      >
        {ranks.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={clsx(classes.root)}
        required
        id="intelligence-bonus"
        name="intelligence-bonus"
        label="지능 스탯 보너스"
        value={data.intelligence?.bonus || "0"}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default CardStatus;
