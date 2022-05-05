import React, { useState, useEffect } from "react";

import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import EventInputForm from "./EventInputForm";
import { EventItemsProps } from "./types";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    padding: "10px",
    border: "1px solid",
    marginBottom: "16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },

  title: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "6px",
    flex: 1,
  },

  detailWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: "1px solid #aaa",
    padding: "16px",
    boxSizing: "border-box",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  condition: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    marginLeft: "6px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
  },
  selection: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    flex: 2,
  },
  result: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    flex: 1,
  },
  tagsWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: "6px",
    marginBottom: "6px",
  },
  extraButtonWraper: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
  extraButton: {
    width: "calc(50% - 10px)",
  },
}));

const EventItems = ({
  eventData,
  onDelete,
  onEdit,
  editable = true,
}: EventItemsProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [itemData, setItemData] = useState(eventData);

  const hanldeExapnd = () => {
    setOpen(!open);
  };

  const hanldeEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (!editable) {
      return;
    }
    onDelete(itemData);
  };

  const handleEdit = (updatedData) => {
    if (!editable) {
      return;
    }
    const eventTypeChanged = updatedData.eventType !== itemData.eventType;
    onEdit(updatedData, eventTypeChanged);
    hanldeEditMode();
  };

  useEffect(() => {
    setItemData(eventData);
  }, [eventData]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header} onClick={hanldeExapnd}>
        <div className={classes.title}>
          <b>{itemData.title.ja}</b>
          <b>{itemData.title.ko}</b>
        </div>
        <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div>
          {editMode ? (
            <EventInputForm
              closeForm={hanldeEditMode}
              onConfirm={handleEdit}
              initialData={itemData}
            />
          ) : (
            <div>
              <div className={classes.condition}>
                <b>조건</b>
                <span>{itemData.condition}</span>
              </div>
              {itemData.choices.map((choice, index) => (
                <div key={`choice-${index}`} className={classes.detailWrapper}>
                  <div className={classes.infoSection}>
                    <div className={classes.selection}>
                      <b>선택지</b>
                      <div>
                        <span>{choice.description.ja}</span>
                      </div>
                      <div>
                        <span>{choice.description.ko}</span>
                      </div>
                    </div>
                    <div className={classes.result}>
                      <b>결과</b>
                      <span>{choice.result}</span>
                    </div>
                    <div className={classes.result}>
                      {choice.results?.map(({ condition, result }, idx) => {
                        return (
                          <div key={`result-${condition}-${result}-${idx}`}>
                            <div>
                              <b>조건: </b>
                              <span>{condition}</span>
                            </div>
                            <div>
                              <b>결과: </b>
                              <span>{result}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div className={classes.tagsWrapper}>
                {itemData.tags.map(
                  (tag, index) =>
                    tag && (
                      <Chip
                        className={classes.tag}
                        key={tag + index}
                        label={tag}
                      />
                    )
                )}
              </div>
            </div>
          )}

          {editable && (
            <div className={classes.extraButtonWraper}>
              <Button
                className={classes.extraButton}
                variant="outlined"
                color="primary"
                onClick={hanldeEditMode}
              >
                {editMode ? "취소" : "수정"}
              </Button>
              <Button
                className={classes.extraButton}
                variant="outlined"
                color="secondary"
                onClick={handleDelete}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default EventItems;
