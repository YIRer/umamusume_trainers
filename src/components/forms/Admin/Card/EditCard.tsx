import React, { useReducer, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";

import Loader from "components/Common/Loader";

import clsx from "clsx";

import { GET_UMAMUSUME } from "queries/umamusume";
import { GET_CARD, EDIT_CARD } from "queries/cards";
import {
  stars,
  cardTypes,
  initialStatusData,
  supportTypes,
  commonEvents,
  commonOnceEvents,
  commonMultipleEvent,
} from "./constants";

import SearchUmamusume from "../Umamusume/SearchUmamusume";
import SearchSkills from "../Skills/SearchSkills";
import CardStatus from "./CardStatus";
import CardEventForm from "./CardEventForm/Form";
import CardBonusForm from "./CardBonusForm/Form";
import SkillIcons from "./SkillIcons";
import CardObjectForm from "./CardObjectForm/Form";

import OriginalEffectForm from "./CardBonusTableForm/OriginalEffectForm";
import BonusTableForm from "./CardBonusTableForm/BonusTableForm";
import HiddenTitleForm from "./HiddenTitle/HiddenTitleForm";

import { prefixImgSrc } from "helper";

import _ from "lodash";
import { CardType } from "types/Card/card";

import {
  CardStatusData,
  CardTargetType,
  TrainingObjectsType,
  FormDataType,
  SelectedSkillTypes,
} from "./types";

import { UmamusumeType } from "types/Umamusume/umamusume";

import { CardEventObjectType } from "types/Card/event";
import {
  CardBonusObjectType,
  CardBonusEffectTableRowType,
  CardOriginalEffectType,
} from "types/Card/bonus";
import { SkillType, RelatedSkillsType } from "types/Skill/skill";

import { HiddenTitle } from "types/Card/card";

const getImageName = (imageSrc: string) => {
  try {
    return imageSrc.split("/").pop().split(".")[0];
  } catch (_err) {
    return "";
  }
};

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
  button: {
    marginBottom: "16px",
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
  skillWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  skillButton: {
    width: "calc(33% - 8px)",
    marginBottom: "16px",
  },
}));

const EditCard = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<{ card: CardType }>(GET_CARD, {
    variables: { id },
  });

  const [isTrainingType, setTrainingType] = useState(false);
  const [targetInfo, setTarget] = useState<CardTargetType>(null);
  const [modalOpened, setModalState] = useState(false);
  const [skillSearchModalOpened, setSkillSearchModalState] = useState(false);
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

  const [trainingObjects, setCardObjectsInput] = useState<TrainingObjectsType>(
    []
  );

  const [getTargetInfo, { data: targetData }] = useLazyQuery<{
    umamusume: UmamusumeType;
  }>(GET_UMAMUSUME);

  const [editCard, _mutationData] = useMutation(EDIT_CARD);

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
      playable: false,
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

  const setInitData = () => {
    if (data && data.card) {
      const {
        name,
        status,
        imageSrc,
        events,
        skills,
        bonus,
        playable,
        uniqueSkillsIds,
        trainingSkillsIds,
        hasSkillsIds,
        baseSkillsIds,
        awakeningSkillsIds,
        specialSkillsIds,
        trainingObjects,
        supportType,
        originalEffect,
        hiddenTitle,
        bonusEffectTable,
        ...others
      } = card;

      const imageName = getImageName(imageSrc);
      const spType = playable ? "" : supportType ? supportType : "speed";
      setFormInput({
        ko: name.ko,
        ja: name.ja,
        imageSrc,
        imageName,
        events: addEventTempIDs(events),
        bonus: addBonusTempIDs(bonus),
        supportType: spType,
        playable,
        originalEffect: originalEffect,
        hiddenTitle: hiddenTitle,
        bonusEffectTable: bonusEffectTable,
        ...others,
      });
      setCardObjectsInput(trainingObjects);
      setTrainingType(playable);
      setStatusInput({
        ...status.ground,
        ...status.distance,
        ...status.strategy,
        ...status.status,
      });

      const uniqueSkills = [];
      const traniningSkills = [];
      const hasSkills = [];
      const baseSkills = [];
      const awakeningSkills = [];
      const specialSkills = [];

      uniqueSkillsIds?.forEach((sid) => {
        const findSkill = skills.find(({ id }) => id === sid);
        if (findSkill) {
          uniqueSkills.push(findSkill);
        }
      });

      trainingSkillsIds?.forEach((sid) => {
        const findSkill = skills.find(({ id }) => id === sid);
        if (findSkill) {
          traniningSkills.push(findSkill);
        }
      });

      hasSkillsIds?.forEach((sid) => {
        const findSkill = skills.find(({ id }) => id === sid);
        if (findSkill) {
          hasSkills.push(findSkill);
        }
      });

      baseSkillsIds?.forEach((sid) => {
        const findSkill = skills.find(({ id }) => id === sid);
        if (findSkill) {
          baseSkills.push(findSkill);
        }
      });

      awakeningSkillsIds?.forEach((sid) => {
        const findSkill = skills.find(({ id }) => id === sid);
        if (findSkill) {
          awakeningSkills.push(findSkill);
        }
      });

      specialSkillsIds?.forEach((sid) => {
        const findSkill = skills.find(({ id }) => id === sid);
        if (findSkill) {
          specialSkills.push(findSkill);
        }
      });

      setRelatedSkills({
        unique: uniqueSkills,
        training: traniningSkills,
        has: hasSkills,
        base: baseSkills,
        awakening: awakeningSkills,
        special: specialSkills,
      });
      if (targetData) {
        setTarget(targetData.umamusume || null);
      }
    }
  };

  useEffect(() => {
    setInitData();
    if (data?.card.targetID && !targetData) {
      getTargetInfo({ variables: { id: data.card.targetID } });
    }
  }, [data, targetData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "type") {
      if (value === "training") {
        setTrainingType(true);
      } else {
        setTrainingType(false);
      }
    }
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

  const handleChangeEvents = (eventData: CardEventObjectType) => {
    setFormInput({ events: eventData });
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
      supportType,
      playable,
      ...formDatas
    } = formData;

    const imageSrc =
      targetInfo && imageName
        ? `/image/${targetInfo.name.default}/cards/${type}/${imageName}.png`
        : !targetInfo && imageName
        ? `/image/ETC/cards/${type}/${imageName}.png`
        : "/image/temp.png";

    const input = {
      ...formDatas,
      name: { ko, ja },
      type,
      imageSrc,
      targetID: targetInfo?.id,
      events: removeEventTempIDs(events),
      bonus: removeBonusTempIDs(bonus),
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
      trainingObjects,
      supportType: playable ? "" : supportType,
      playable,
    };

    editCard({
      variables: {
        id,
        input,
      },

      refetchQueries: [
        {
          query: GET_CARD,
          variables: { id: id },
        },
      ],
      awaitRefetchQueries: true,
    }).then(() => {
      router.push(`/cards/${id}`);
    });
  };

  const addEventTempIDs = (events: CardEventObjectType) => {
    const commonEventList = events.common ?? [...commonEvents];
    const commonOnceEventList =
      events.once.length > 0
        ? events.once
        : [];
    const commonMulitpleEventList =
      events.multipleTimes.length > 0
        ? events.multipleTimes
        : [];

    const common = commonEventList.map((d) => ({
      ...d,
      __tempID: _.uniqueId("common-event"),
    }));
    const once = commonOnceEventList.map((d) => ({
      ...d,
      __tempID: _.uniqueId("once-event"),
    }));
    const multipleTimes = commonMulitpleEventList.map((d) => ({
      ...d,
      __tempID: _.uniqueId("mulitple-event"),
    }));

    return {
      common,
      once,
      multipleTimes,
    };
  };

  const removeBonusTempIDs = (bonus: CardBonusObjectType) => {
    const unique = bonus.unique.map((d) => _.omit(d, ["__tempID"]));
    const support = bonus.support.map((d) => _.omit(d, ["__tempID"]));

    return {
      unique,
      support,
    };
  };

  const addBonusTempIDs = (bonus: CardBonusObjectType) => {
    const unique = bonus.unique.map((d) => ({
      ...d,
      __tempID: _.uniqueId("unique"),
    }));
    const support = bonus.support.map((d) => ({
      ...d,
      __tempID: _.uniqueId("support"),
    }));

    return {
      unique,
      support,
    };
  };

  const removeEventTempIDs = (events: CardEventObjectType) => {
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

  const onClikcAddCommonEvent = () => {
    const events = commonEvents.map((d) => ({
      ...d,
      __tempID: _.uniqueId("common-event"),
    }));

    setFormInput({
      events: {
        ...formData.events,
        common: [...formData.events.common, ...events],
      },
    });
  };

  const onClikcAddCommonOnceEvent = () => {
    const events = commonOnceEvents.map((d) => ({
      ...d,
      __tempID: _.uniqueId("common-event"),
    }));

    setFormInput({
      events: {
        ...formData.events,
        once: [...formData.events.once, ...events],
      },
    });
  };

  const onClikcAddCommonMultipleEvent = () => {
    const events = commonMultipleEvent.map((d) => ({
      ...d,
      __tempID: _.uniqueId("common-event"),
    }));

    setFormInput({
      events: {
        ...formData.events,
        multipleTimes: [...formData.events.multipleTimes, ...events],
      },
    });
  };

  const clearSkills = () => {
    setRelatedSkills({
      ...relatedSkills,
      training: [],
      has: [],
      base: [],
      awakening: [],
    });
  };

  if (loading) return <Loader />;

  const { card } = data;
  if (error || !card) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ja"
          name="ja"
          label="카드이름 (일본어)"
          defaultValue={card.name.ja}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="name-ko"
          name="ko"
          label="카드이름 (한국어)"
          defaultValue={card.name.ko}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="imageName"
          name="imageName"
          label="이미지 파일 이름"
          defaultValue={getImageName(card.imageSrc)}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          id="star"
          name="star"
          value={formData.star}
          label="등급"
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
          label="카드 종류"
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
          label="한정 여부"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.playable}
              onChange={handleChangeCheckbox}
              name="playable"
            />
          }
          label="육성 가능"
        />

        {!isTrainingType && (
          <TextField
            className={clsx(classes.root)}
            required
            select
            value={formData.supportType || "speed"}
            id="supportType"
            name="supportType"
            label="카드 적성"
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
            <CardBonusForm
              initialData={formData.bonus}
              onChangeBonus={handleUpdateBonus}
            />
            <OriginalEffectForm
              updateOriginalEffect={handleUpdateOriginalEffect}
              initialData={formData.originalEffect}
            />
            <BonusTableForm
              updateTableRow={handleUpdateBonusTable}
              initialData={formData.bonusEffectTable}
            />
          </>
        )}

        {isTrainingType && (
          <CardObjectForm
            list={trainingObjects}
            updateList={setCardObjectsInput}
          />
        )}

        {isTrainingType && (
          <HiddenTitleForm
            updateHiddnTitle={handleUpdateHiddenTitle}
            initialData={formData.hiddenTitle}
          />
        )}

        <Button onClick={onClikcAddCommonEvent}>공통 이벤트 추가</Button>
        <Button onClick={onClikcAddCommonOnceEvent}>일회성 이벤트 추가</Button>
        <Button onClick={onClikcAddCommonMultipleEvent}>
          연속 이벤트 추가
        </Button>

        <CardEventForm
          onChangeEvents={handleChangeEvents}
          initialData={formData.events}
          isTrainingType={isTrainingType}
        />

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
          관련된 우마무스메 선택
        </Button>

        {modalOpened && (
          <SearchUmamusume
            open
            selectedData={targetInfo}
            onSelect={setTarget}
            onClose={hideSearchModal}
          />
        )}

        <div>
          <Button onClick={clearSkills}>스킬 초기화(고유 스킬 제외)</Button>
        </div>

        {relatedSkills.unique.length > 0 && (
          <div>
            <b>고유 스킬</b>
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
            <b>육성 스킬</b>
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
            <b>소지 스킬</b>
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
            <b>초기 스킬</b>
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
            <b>각성 스킬</b>
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

        {relatedSkills.special.length > 0 && (
          <div>
            <b>스폐셜 스킬</b>
            {relatedSkills.special.map((skillData, index) => (
              <SkillIcons
                name={skillData.name}
                imageSrc={skillData.imageSrc}
                effect={skillData.effect}
                key={`special_skill_${index}`}
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
            고유 스킬 선택
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
            {isTrainingType ? "초기" : "육성"} 스킬 선택
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
            {isTrainingType ? "각성" : "소지"} 스킬 선택
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={showSpecialSkillSearchModal}
            className={classes.skillButton}
          >
            스페셜 스킬 선택
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
          제출
        </Button>
      </FormControl>
    </form>
  );
};

export default EditCard;
