import React, { useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import _ from "lodash";

import { GET_CARDS, ADD_CARD } from "queries/cards";
import {
  stars,
  cardTypes,
  initialStatusData,
  supportTypes,
  commonOnceEvents,
  commonEvents,
} from "./constants";

import SearchUmamusume from "../Umamusume/SearchUmamusume";
import SearchSkills from "../Skills/SearchSkills";
import CardStatus from "./CardStatus";
import CardBonusForm from "./CardBonusForm/Form";
import SkillIcons from "./SkillIcons";
import CardObjectForm from "./CardObjectForm/Form";
import OriginalEffectForm from "./CardBonusTableForm/OriginalEffectForm";
import BonusTableForm from "./CardBonusTableForm/BonusTableForm";
import HiddenTitleForm from "./HiddenTitle/HiddenTitleForm";

import { prefixImgSrc } from "helper";

import {
  CardStatusData,
  CardTargetType,
  TrainingObjectsType,
  FormDataType,
  SelectedSkillTypes,
} from "./types";

import {
  CardBonusObjectType,
  CardBonusEffectTableRowType,
  CardOriginalEffectType,
} from "types/Card/bonus";
import { SkillType, RelatedSkillsType } from "types/Skill/skill";
import { commonMultipleEvent } from "./constants";
import { HiddenTitle } from "types/Card/card";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  card: {
    width: "100px",
    height: "100px",
    border: "5px solid #ebd834",
    boxSizing: "border-box",
    backgroundPosition: "top center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },

  skillCard: {
    width: "100%",
    maxWidth: "250px",
    height: "100px",
    marginBottom: "10px",
    marginRight: "16px",
  },

  skillIcon: {
    width: "80px",
    height: "80px",
    marginRight: "10px",
  },
  skillInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginBottom: "16px",
  },

  skillWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  skillButton: {
    width: "calc(33% - 8px)",
    marginBottom: "16px",
  },
}));

const AddCard = () => {
  const classes = useStyles();
  const router = useRouter();
  const [isTrainingType, setTrainingType] = useState(true);
  const [targetInfo, setTarget] = useState<CardTargetType>(null);
  const [relatedSkills, setRelatedSkills] = useState<RelatedSkillsType>({
    unique: [],
    training: [],
    has: [],
    base: [],
    awakening: [],
    special: [],
  });
  const [selectedSkillType, setSelectedSkillType] =
    useState<SelectedSkillTypes>("");
  const [modalOpened, setModalState] = useState(false);
  const [skillSearchModalOpened, setSkillSearchModalState] = useState(false);

  const [trainingObjects, setCardObjectsInput] = useState<TrainingObjectsType>(
    []
  );
  const [addCard, _mutationData] = useMutation(ADD_CARD);

  const [formData, setFormInput] = useReducer(
    (state: FormDataType, newState: Partial<FormDataType>) => ({
      ...state,
      ...newState,
    }),
    {
      ko: "",
      ja: "",
      star: 1,
      targetID: null,
      imageSrc: "",
      type: "training",
      playable: true,
      supportType: "",
      limited: false,
      events: {
        common: [],
        once: [],
        multipleTimes: [],
      },
      bonus: {
        unique: [],
        support: [],
      },
      originalEffect: {
        level: "",
        effect: "",
      },
      hiddenTitle: [],
      bonusEffectTable: [],
    }
  );

  const [statusData, setStatusInput] = useReducer(
    (state: CardStatusData, newState: Partial<CardStatusData>) => ({
      ...state,
      ...newState,
    }),
    {
      turf: initialStatusData,
      duct: initialStatusData,
      short: initialStatusData,
      mile: initialStatusData,
      medium: initialStatusData,
      long: initialStatusData,
      escape: initialStatusData,
      leading: initialStatusData,
      between: initialStatusData,
      pushing: initialStatusData,
      speed: initialStatusData,
      stamina: initialStatusData,
      power: initialStatusData,
      guts: initialStatusData,
      intelligence: initialStatusData,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.checked;
    if (name === "playable") {
      setTrainingType(value);
    }

    setFormInput({ [name]: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [type, status] = e.target.name.split("-");
    const value = e.target.value.toString();

    const newState = { ...statusData[type], [status]: value };
    setStatusInput({ [type]: newState });
  };

  const handleUpdateBonus = (bonusData: CardBonusObjectType) => {
    setFormInput({ bonus: { ...bonusData } });
  };

  const handleUpdateBonusTable = (bonusData: CardBonusEffectTableRowType[]) => {
    setFormInput({
      bonusEffectTable: bonusData,
    });
  };

  const handleUpdateOriginalEffect = (effect: CardOriginalEffectType) => {
    setFormInput({
      originalEffect: effect,
    });
  };
  const handleUpdateHiddenTitle = (hiddenTitles: HiddenTitle[]) => {
    setFormInput({
      hiddenTitle: hiddenTitles,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const {
      turf,
      duct,
      short,
      mile,
      medium,
      long,
      escape,
      leading,
      between,
      pushing,
      ...others
    } = statusData;

    const {
      ko,
      ja,
      type,
      imageName,
      events,
      bonus,
      playable,
      supportType,
      ...formDatas
    } = formData;

    const imageSrc =
      targetInfo && imageName
        ? `/image/${targetInfo.name.default}/cards/${type}/${imageName}.png`
        : !targetInfo && imageName
        ? `/image/ETC/cards/${type}/${imageName}.png`
        : "/image/temp.png";

    const addedCommonEvents = addCommonEvents(events);
    const addedOnceEvents = addOnceEvents(addedCommonEvents);
    const addedMultipleEvents = addMultipleEvents(addedOnceEvents);

    const spType = playable ? "" : supportType ? supportType : "speed";
    const input = {
      ...formDatas,
      name: {
        ko,
        ja,
      },
      type,
      imageSrc,
      targetID: targetInfo?.id || null,
      uniqueSkillsIds: relatedSkills.unique.map(({ id }) => id),
      trainingSkillsIds: relatedSkills.training.map(({ id }) => id),
      hasSkillsIds: relatedSkills.has.map(({ id }) => id),
      baseSkillsIds: relatedSkills.base.map(({ id }) => id),
      awakeningSkillsIds: relatedSkills.awakening.map(({ id }) => id),
      specialSkillsIds: relatedSkills.special.map(({ id }) => id),
      status: {
        ground: {
          turf,
          duct,
        },
        distance: {
          short,
          mile,
          medium,
          long,
        },
        strategy: {
          escape,
          leading,
          between,
          pushing,
        },
        status: others,
      },
      events: removeEventTempIDs(addedMultipleEvents),
      bonus: removeBonusTempIDs(bonus),
      trainingObjects,
      supportType: spType,
      playable,
    };

    addCard({
      variables: {
        input,
      },
      refetchQueries: [{ query: GET_CARDS }],
      awaitRefetchQueries: true,
    }).then(() => {
      router.push("/cards");
    });
  };

  const removeBonusTempIDs = (bonus) => {
    const unique = bonus.unique.map((d) => _.omit(d, ["__tempID"]));
    const support = bonus.support.map((d) => _.omit(d, ["__tempID"]));

    return {
      unique,
      support,
    };
  };

  const removeEventTempIDs = (events) => {
    const common = events.common.map((d) => _.omit(d, ["__tempID"]));
    const once = events.once.map((d) => _.omit(d, ["__tempID"]));
    const multipleTimes = events.multipleTimes.map((d) =>
      _.omit(d, ["__tempID"])
    );

    return {
      common,
      once,
      multipleTimes,
    };
  };

  const addCommonEvents = (events) => {
    if (formData.type === "training") {
      events.common = [...commonEvents].concat(events.common);
    }

    return events;
  };

  const addOnceEvents = (events) => {
    if (formData.type === "training") {
      events.once = [...commonOnceEvents].concat(events.once);
    }

    return events;
  };

  const addMultipleEvents = (events) => {
    if (formData.type === "training") {
      events.multipleTimes = [...commonMultipleEvent].concat(
        events.multipleTimes
      );
    }

    return events;
  };

  const showSearchModal = () => {
    setModalState(true);
  };
  const hideSearchModal = () => {
    setModalState(false);
  };

  const showSkillSearchModal = () => {
    setSkillSearchModalState(true);
  };
  const hideSkillSearchModal = () => {
    setSkillSearchModalState(false);
  };

  const handleSelect = (targets: SkillType[]) => {
    setRelatedSkills({ ...relatedSkills, [selectedSkillType]: targets });
  };
  const showUniqueSkillSearchModal = () => {
    setSelectedSkillType("unique");
    showSkillSearchModal();
  };
  const showTrainingSkillSearchModal = () => {
    setSelectedSkillType("training");
    showSkillSearchModal();
  };
  const showHasSkillSearchModal = () => {
    setSelectedSkillType("has");
    showSkillSearchModal();
  };

  const showBaseSkillSearchModal = () => {
    setSelectedSkillType("base");
    showSkillSearchModal();
  };

  const showAwakeningSkillSearchModal = () => {
    setSelectedSkillType("awakening");
    showSkillSearchModal();
  };
  const showSpecialSkillSearchModal = () => {
    setSelectedSkillType("special");
    showSkillSearchModal();
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ja"
          name="ja"
          label="???????????? (?????????)"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="name-ko"
          name="ko"
          label="???????????? (?????????)"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="imageName"
          name="imageName"
          label="????????? ?????? ??????"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          id="star"
          name="star"
          value={formData.star}
          label="??????"
          onChange={handleChange}
        >
          {stars.map((option) => (
            <MenuItem key={`star-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={formData.type || "training"}
          id="type"
          name="type"
          label="?????? ??????"
          onChange={handleChange}
        >
          {cardTypes.map((option) => (
            <MenuItem key={`type-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.limited}
              onChange={handleChangeCheckbox}
              name="limited"
            />
          }
          label="?????? ??????"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.playable || isTrainingType}
              onChange={handleChangeCheckbox}
              name="playable"
            />
          }
          label="?????? ??????"
        />

        {!isTrainingType && (
          <TextField
            className={clsx(classes.root)}
            required
            select
            value={formData.supportType || "speed"}
            id="supportType"
            name="supportType"
            label="?????? ??????"
            onChange={handleChange}
          >
            {supportTypes.map((option) => (
              <MenuItem key={`type-${option.value}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {isTrainingType ? (
          <CardStatus data={statusData} onChange={handleStatusChange} />
        ) : (
          <>
            <CardBonusForm onChangeBonus={handleUpdateBonus} />
            <OriginalEffectForm
              updateOriginalEffect={handleUpdateOriginalEffect}
              initialData={formData.originalEffect}
            />
            <BonusTableForm updateTableRow={handleUpdateBonusTable} />
          </>
        )}

        {isTrainingType && (
          <CardObjectForm
            list={trainingObjects}
            updateList={setCardObjectsInput}
          />
        )}

        {isTrainingType && (
          <HiddenTitleForm updateHiddnTitle={handleUpdateHiddenTitle} />
        )}

        {targetInfo && (
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${prefixImgSrc(targetInfo.imageSrc)})`,
            }}
          ></div>
        )}
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={showSearchModal}
          className={classes.button}
        >
          ????????? ??????????????? ??????
        </Button>

        <SearchUmamusume
          open={modalOpened}
          onSelect={setTarget}
          onClose={hideSearchModal}
        />

        {relatedSkills.unique.length > 0 && (
          <div>
            <b>?????? ??????</b>
            {relatedSkills.unique.map((skillData, index) => (
              <SkillIcons
                name={skillData.name}
                imageSrc={skillData.imageSrc}
                effect={skillData.effect}
                key={`skill_${index}`}
              />
            ))}
          </div>
        )}

        {!isTrainingType && relatedSkills.training.length > 0 && (
          <div>
            <b>?????? ??????</b>
            {relatedSkills.training.map((skillData, index) => (
              <SkillIcons
                name={skillData.name}
                imageSrc={skillData.imageSrc}
                effect={skillData.effect}
                key={`skill_${index}`}
              />
            ))}
          </div>
        )}

        {!isTrainingType && relatedSkills.has.length > 0 && (
          <div>
            <b>?????? ??????</b>
            {relatedSkills.has.map((skillData, index) => (
              <SkillIcons
                name={skillData.name}
                imageSrc={skillData.imageSrc}
                effect={skillData.effect}
                key={`skill_${index}`}
              />
            ))}
          </div>
        )}

        {isTrainingType && relatedSkills.base.length > 0 && (
          <div>
            <b>?????? ??????</b>
            {relatedSkills.base.map((skillData, index) => (
              <SkillIcons
                name={skillData.name}
                imageSrc={skillData.imageSrc}
                effect={skillData.effect}
                key={`skill_${index}`}
              />
            ))}
          </div>
        )}

        {isTrainingType && relatedSkills.awakening.length > 0 && (
          <div>
            <b>?????? ??????</b>
            {relatedSkills.awakening.map((skillData, index) => (
              <SkillIcons
                name={skillData.name}
                imageSrc={skillData.imageSrc}
                effect={skillData.effect}
                key={`skill_${index}`}
              />
            ))}
          </div>
        )}

        <div className={classes.skillWrapper}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={showUniqueSkillSearchModal}
            className={classes.skillButton}
          >
            ?????? ?????? ??????
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={
              isTrainingType
                ? showBaseSkillSearchModal
                : showTrainingSkillSearchModal
            }
            className={classes.skillButton}
          >
            {isTrainingType ? "??????" : "??????"} ?????? ??????
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={
              isTrainingType
                ? showAwakeningSkillSearchModal
                : showHasSkillSearchModal
            }
            className={classes.skillButton}
          >
            {isTrainingType ? "??????" : "??????"} ?????? ??????
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={showSpecialSkillSearchModal}
            className={classes.skillButton}
          >
            ????????? ?????? ??????
          </Button>
        </div>
        {skillSearchModalOpened && (
          <SearchSkills
            open
            selectedData={relatedSkills[selectedSkillType]}
            onSelect={handleSelect}
            onClose={hideSkillSearchModal}
          />
        )}

        <Button
          type="submit"
          className={clsx(classes.button)}
          variant="contained"
          color="primary"
        >
          ??????
        </Button>
      </FormControl>
    </form>
  );
};

export default AddCard;
