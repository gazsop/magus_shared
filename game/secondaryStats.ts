import { Character } from "../contracts";

const SECONDARY_STAT_MAX = 100;
const HUNGARIAN_COLLATOR = new Intl.Collator("hu-HU", { sensitivity: "base" });

const clampSecondarySkill = (value: unknown): number => {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(SECONDARY_STAT_MAX, Math.max(0, Math.floor(n)));
};

const normalizePointDelta = (value: unknown): number => {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 0;
  return Math.floor(n);
};

export type SecondaryStatProgress = Pick<
  Character.TSecondaryStat,
  "skillLevel" | "skill"
>;

export type SecondaryStatDisplayUpgrade = {
  stat: Character.TSecondaryStat;
  sourceIndex: number;
  lvlReq: number;
};

export type SecondaryStatDisplayRow = {
  name: Character.SECONDARY_STATS;
  current: Character.TSecondaryStat;
  currentSourceIndex: number;
  future: SecondaryStatDisplayUpgrade[];
  levelText: string;
  skillText: string;
  futureLevelText: string;
  futureSkillText: string;
  note: string;
};

const normalizeLevelRequirement = (value: unknown): number => {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
};

const formatSecondaryStatLevel = (value: unknown): string => {
  const text = String(value || "");
  return text || Character.SECONDARY_STAT_LEVEL.NONE;
};

const formatSecondaryStatSkill = (value: unknown): string => {
  const n = Number(value);
  return Number.isFinite(n) ? String(Math.floor(n)) : "0";
};

const formatFutureSecondaryStats = (
  future: SecondaryStatDisplayUpgrade[],
  key: "skillLevel" | "skill"
) =>
  future
    .map((entry) => {
      const value =
        key === "skillLevel"
          ? formatSecondaryStatLevel(entry.stat.skillLevel)
          : formatSecondaryStatSkill(entry.stat.skill);
      return `lvl ${entry.lvlReq}: ${value}`;
    })
    .join(", ");

export const buildSecondaryStatDisplayRows = (
  stats: Character.TSecondaryStat[],
  currentLevel: unknown
): SecondaryStatDisplayRow[] => {
  const level = Math.max(1, Math.floor(Number(currentLevel || 1)));
  const grouped = new Map<
    Character.SECONDARY_STATS,
    Array<{ stat: Character.TSecondaryStat; sourceIndex: number; lvlReq: number }>
  >();

  (stats || []).forEach((stat, sourceIndex) => {
    if (!stat?.name) return;
    const lvlReq = normalizeLevelRequirement(stat.lvlReq);
    const list = grouped.get(stat.name) || [];
    list.push({ stat, sourceIndex, lvlReq });
    grouped.set(stat.name, list);
  });

  return Array.from(grouped.entries())
    .sort(([a], [b]) => HUNGARIAN_COLLATOR.compare(String(a), String(b)))
    .map(([name, entries]) => {
      const sorted = [...entries].sort(
        (a, b) =>
          a.lvlReq - b.lvlReq ||
          String(a.stat.skillLevel).localeCompare(String(b.stat.skillLevel)) ||
          Number(a.stat.skill || 0) - Number(b.stat.skill || 0)
      );
      const currentEntry =
        [...sorted].reverse().find((entry) => entry.lvlReq <= level) || sorted[0];
      const future = sorted.filter((entry) => entry.lvlReq > currentEntry.lvlReq);
      const futureLevelText = formatFutureSecondaryStats(future, "skillLevel");
      const futureSkillText = formatFutureSecondaryStats(future, "skill");
      const baseLevelText = formatSecondaryStatLevel(currentEntry.stat.skillLevel);
      const baseSkillText = formatSecondaryStatSkill(currentEntry.stat.skill);
      const note = String(currentEntry.stat.note || "").trim();

      return {
        name,
        current: currentEntry.stat,
        currentSourceIndex: currentEntry.sourceIndex,
        future,
        levelText: futureLevelText ? `${baseLevelText} (${futureLevelText})` : baseLevelText,
        skillText: futureSkillText ? `${baseSkillText} (${futureSkillText})` : baseSkillText,
        futureLevelText,
        futureSkillText,
        note,
      };
    });
};

export const applySecondaryStatPoints = <T extends SecondaryStatProgress>(
  stat: T,
  points: unknown
): T => {
  let remaining = normalizePointDelta(points);
  let skillLevel = stat.skillLevel || Character.SECONDARY_STAT_LEVEL.NONE;
  let skill = clampSecondarySkill(stat.skill);

  if (remaining === 0) {
    return {
      ...stat,
      skillLevel,
      skill,
    };
  }

  if (skillLevel === Character.SECONDARY_STAT_LEVEL.MASTER) {
    return {
      ...stat,
      skillLevel,
      skill: SECONDARY_STAT_MAX,
    };
  }

  if (skillLevel === Character.SECONDARY_STAT_LEVEL.NONE) {
    const neededForBasic = SECONDARY_STAT_MAX - skill;
    if (remaining < neededForBasic) {
      return {
        ...stat,
        skillLevel,
        skill: skill + remaining,
      };
    }

    remaining -= neededForBasic;
    skillLevel = Character.SECONDARY_STAT_LEVEL.BASIC;
    skill = 0;
  }

  if (skillLevel === Character.SECONDARY_STAT_LEVEL.BASIC) {
    const gained = Math.ceil(remaining / 2);
    if (skill + gained < SECONDARY_STAT_MAX) {
      return {
        ...stat,
        skillLevel,
        skill: skill + gained,
      };
    }

    return {
      ...stat,
      skillLevel: Character.SECONDARY_STAT_LEVEL.MASTER,
      skill: 0,
    };
  }

  return {
    ...stat,
    skillLevel,
    skill,
  };
};
