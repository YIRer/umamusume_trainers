import React, { useReducer, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import _ from "lodash";

import EventInputForm from "./EventInputForm";
import EventItems from "./EventItems";
import { CardEventFormProps, CardEventTypeWithTempID } from "./types";

const useStyles = makeStyles((_theme) => ({
  button: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "100%",
  },
}));

const CardEventForm = ({
  onChangeEvents,
  initialData,
  isTrainingType,
}: CardEventFormProps) => {
  const classes = useStyles();
  const [openedEventInputForm, setEventInputForm] = useState(false);

  const [eventObject, setEventObjectInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      common: [],
      once: [],
      multipleTimes: [],
    }
  );

  const setInitialData = () => {
    const { common, once, multipleTimes } = initialData;
    setEventObjectInput({ common, once, multipleTimes });
  };

  useEffect(() => {
    if (initialData) {
      setInitialData();
    }
  }, [initialData]);

  const showEventInputForm = () => {
    setEventInputForm(true);
  };

  const hideEventInputForm = () => {
    setEventInputForm(false);
  };

  const handleConfirm = (eventData: CardEventTypeWithTempID) => {
    const updatedData = eventObject[eventData.eventType].push(eventData);

    setEventObjectInput(updatedData);
    onChangeEvents(eventObject);
    hideEventInputForm();
  };

  const handleDelete = (eventData: CardEventTypeWithTempID) => {
    const updatedData = [...eventObject[eventData.eventType]].filter(
      (ele) => ele.__tempID !== eventData.__tempID
    );

    const updatedEventsObj = {
      ...eventObject,
      [eventData.eventType]: updatedData,
    };

    setEventObjectInput({ [eventData.eventType]: updatedData });

    onChangeEvents(updatedEventsObj);
  };

  const handleEditEvent = (
    eventData: CardEventTypeWithTempID,
    isChangedEventType: boolean,
    changedEventType?: string
  ) => {
    if (isChangedEventType) {
      const removeTarget = changedEventType;

      const removedData = [...eventObject[removeTarget]].filter(
        (ele) => ele.__tempID !== eventData.__tempID
      );

      eventData.__tempID = _.uniqueId(eventData.eventType);

      const updatedData = [...eventObject[eventData.eventType], eventData];

      const updatedEventsObj = {
        ...eventObject,
        [removeTarget]: removedData,
        [eventData.eventType]: updatedData,
      };

      setEventObjectInput(updatedEventsObj);

      onChangeEvents(updatedEventsObj);
    } else {
      const updatedData = [...eventObject[eventData.eventType]].map((d) => {
        if (d.__tempID === eventData.__tempID) {
          return eventData;
        } else {
          return d;
        }
      });

      setEventObjectInput({ [eventData.eventType]: updatedData });
      onChangeEvents({ ...eventObject, [eventData.eventType]: updatedData });
    }
  };

  return (
    <div>
      <div>
        {isTrainingType && (
          <div>
            <h4>공통 이벤트</h4>
            <div>
              {eventObject.common.length > 0
                ? eventObject.common.map((d) => {
                    if (!d.__tempID) {
                      d = { ...d, __tempID: _.uniqueId(d.eventType) };
                    }

                    return (
                      <EventItems
                        key={`event-common-${d.__tempID}`}
                        eventData={d}
                        onDelete={handleDelete}
                        onEdit={handleEditEvent}
                      />
                    );
                  })
                : "없음"}
            </div>
          </div>
        )}
        <div>
          <h4>일회성 이벤트</h4>
          <div>
            {eventObject.once.length > 0
              ? eventObject.once.map((d) => {
                  if (!d.__tempID) {
                    d = { ...d, __tempID: _.uniqueId(d.eventType) };
                  }

                  return (
                    <EventItems
                      key={`event-${d.__tempID}`}
                      eventData={d}
                      onDelete={handleDelete}
                      onEdit={handleEditEvent}
                    />
                  );
                })
              : "없음"}
          </div>
        </div>
        <div>
          <h4>다회성 이벤트</h4>
          <div>
            {eventObject.multipleTimes.length > 0
              ? eventObject.multipleTimes.map((d) => {
                  if (!d.__tempID) {
                    d = { ...d, __tempID: _.uniqueId(d.eventType) };
                  }
                  return (
                    <EventItems
                      key={`event-${d.__tempID}`}
                      eventData={d}
                      onDelete={handleDelete}
                      onEdit={handleEditEvent}
                    />
                  );
                })
              : "없음"}
          </div>
        </div>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={
            openedEventInputForm ? hideEventInputForm : showEventInputForm
          }
        >
          {openedEventInputForm ? "입력 폼 닫기" : "이벤트 추가"}
        </Button>
      </div>
      {openedEventInputForm && (
        <EventInputForm
          closeForm={hideEventInputForm}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default CardEventForm;
