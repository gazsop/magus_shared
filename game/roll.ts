import { Adventure } from "../contracts";

export type TRollRange = {
  minTotal: number;
  maxTotal: number;
};

type TRollFormatOptions = {
  diceSeparator?: string;
  includeRollAttempts?: boolean;
  alwaysShowRollAttempts?: boolean;
  rollAttemptSuffix?: string;
  defaultDice?: number;
  fallbackOnFalsyDice?: boolean;
  constantMode?: "positive-only" | "signed" | "raw-positive-prefix";
  constantSpacing?: boolean;
  validateFiniteDice?: boolean;
};

export const getRollRange = (roll?: Adventure.TRollElements | null): TRollRange => {
  const nrOfDices = Math.max(0, Number(roll?.nrOfDices || 0));
  const dice = Math.max(0, Number(roll?.dice || 0));
  const constant = Number(roll?.constant || 0);
  const minTotal = constant + nrOfDices * (nrOfDices > 0 ? 1 : 0);
  const maxTotal = constant + nrOfDices * dice;
  return { minTotal, maxTotal };
};

export const formatRoll = (
  roll?: Adventure.TRollElements | null,
  options: TRollFormatOptions = {}
): string => {
  if (!roll) return "-";
  const {
    diceSeparator = "K",
    includeRollAttempts = false,
    alwaysShowRollAttempts = false,
    rollAttemptSuffix = "",
    defaultDice = 0,
    fallbackOnFalsyDice = false,
    constantMode = "signed",
    constantSpacing = true,
    validateFiniteDice = false,
  } = options;

  const nrOfDices = Number(roll.nrOfDices ?? 0);
  const dice = Number(fallbackOnFalsyDice ? roll.dice || defaultDice : roll.dice ?? defaultDice);
  const constant = Number(roll.constant ?? 0);
  if (validateFiniteDice && (!Number.isFinite(nrOfDices) || !Number.isFinite(dice))) {
    return "-";
  }

  const base = `${Math.max(0, nrOfDices)}${diceSeparator}${Math.max(0, dice)}`;
  const space = constantSpacing ? " " : "";
  let rollText = base;
  if (constantMode === "positive-only") {
    if (constant > 0) rollText = `${base}${space}+${space}${constant}`;
  } else if (constantMode === "raw-positive-prefix") {
    if (constant) rollText = `${base}${space}+${space}${constant}`;
  } else if (Number.isFinite(constant) && constant !== 0) {
    rollText = `${base}${space}${constant > 0 ? "+" : "-"}${space}${Math.abs(constant)}`;
  }

  if (!includeRollAttempts) return rollText;
  const rollAttempts = Math.max(1, Number(roll.nrOfRolls || 1));
  return alwaysShowRollAttempts || rollAttempts > 1
    ? `${rollAttempts}x ${rollText}${rollAttemptSuffix}`
    : rollText;
};
