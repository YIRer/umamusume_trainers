import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import { CardType } from "types/Card/card";

const useStyles = makeStyles((_theme) => ({
  section: {
    margin: "10px auto",
    overflowX: "auto",
    maxWidth: "600px",
  },
  tableRoot: {
    backgroundColor: "#333333",
  },
  tableRow: {
    color: "#fff",
  },
  bonus: {
    color: "#0569ed",
  },
}));

const StatusTable = ({ data }: { data: CardType }) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              더트
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              잔디(터프)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.status.ground.duct.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.ground.duct.bonus) > 0,
                })}
              >
                +({data.status.ground.duct.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.ground.turf.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.ground.turf.bonus) > 0,
                })}
              >
                +({data.status.ground.turf.bonus}%)
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              단거리
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              마일
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              중거리
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              장거리
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.status.distance.short.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.distance.short.bonus) > 0,
                })}
              >
                +({data.status.distance.short.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.distance.mile.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.distance.mile.bonus) > 0,
                })}
              >
                +({data.status.distance.mile.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.distance.medium.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]:
                    Number(data.status.distance.medium.bonus) > 0,
                })}
              >
                +({data.status.distance.medium.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.distance.long.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.distance.long.bonus) > 0,
                })}
              >
                +({data.status.distance.long.bonus}%)
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              도주
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              선행
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              선입
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              추입
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.status.strategy.escape.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]:
                    Number(data.status.strategy.escape.bonus) > 0,
                })}
              >
                +({data.status.strategy.escape.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.strategy.leading.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]:
                    Number(data.status.strategy.leading.bonus) > 0,
                })}
              >
                +({data.status.strategy.leading.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.strategy.between.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]:
                    Number(data.status.strategy.between.bonus) > 0,
                })}
              >
                +({data.status.strategy.between.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.strategy.pushing.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]:
                    Number(data.status.strategy.pushing.bonus) > 0,
                })}
              >
                +({data.status.strategy.pushing.bonus}%)
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              스피드
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              스태미나
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              파워
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              근성
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              지능
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.status.status.speed.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.status.speed.bonus) > 0,
                })}
              >
                +({data.status.status.speed.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.status.stamina.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.status.stamina.bonus) > 0,
                })}
              >
                +({data.status.status.stamina.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.status.power.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.status.power.bonus) > 0,
                })}
              >
                +({data.status.status.power.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.status.guts.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]: Number(data.status.status.guts.bonus) > 0,
                })}
              >
                +({data.status.status.guts.bonus}%)
              </span>
            </TableCell>
            <TableCell>
              {data.status.status.intelligence.rank}
              <br />
              <span
                className={clsx({
                  [classes.bonus]:
                    Number(data.status.status.intelligence.bonus) > 0,
                })}
              >
                +({data.status.status.intelligence.bonus}%)
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default StatusTable;
