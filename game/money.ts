import { Character } from "../contracts";

export type TMoneyBreakdown = {
  gold: number;
  silver: number;
  copper: number;
};

export const COPPER_PER_SILVER = 100;
export const SILVER_PER_GOLD = 10;
export const COPPER_PER_GOLD = COPPER_PER_SILVER * SILVER_PER_GOLD;

export const normalizeMoneyUnit = (value: unknown): number => {
  const num = Math.floor(Number(value || 0));
  return Number.isFinite(num) ? Math.max(0, num) : 0;
};

export const normalizeCopper = (value: unknown): number => normalizeMoneyUnit(value);

export const moneyBreakdownToCopper = (money: TMoneyBreakdown): number =>
  normalizeMoneyUnit(money.gold) * COPPER_PER_GOLD +
  normalizeMoneyUnit(money.silver) * COPPER_PER_SILVER +
  normalizeMoneyUnit(money.copper);

export const copperToMoneyBreakdown = (copper: unknown): TMoneyBreakdown => {
  let remaining = normalizeCopper(copper);
  const gold = Math.floor(remaining / COPPER_PER_GOLD);
  remaining -= gold * COPPER_PER_GOLD;
  const silver = Math.floor(remaining / COPPER_PER_SILVER);
  remaining -= silver * COPPER_PER_SILVER;
  return { gold, silver, copper: remaining };
};

export const createEmptyInventoryMoney = (): Character.Item.TMoney => [
  { name: Character.Item.MONEY.GOLD, amount: 0 },
  { name: Character.Item.MONEY.SILVER, amount: 0 },
  { name: Character.Item.MONEY.COPPER, amount: 0 },
];

export const inventoryMoneyToCopper = (
  money?: Character.Item.TMoney | null
): number =>
  moneyBreakdownToCopper({
    gold: Number(money?.[0]?.amount || 0),
    silver: Number(money?.[1]?.amount || 0),
    copper: Number(money?.[2]?.amount || 0),
  });

export const copperToInventoryMoney = (copper: unknown): Character.Item.TMoney => {
  const value = copperToMoneyBreakdown(copper);
  return [
    { name: Character.Item.MONEY.GOLD, amount: value.gold },
    { name: Character.Item.MONEY.SILVER, amount: value.silver },
    { name: Character.Item.MONEY.COPPER, amount: value.copper },
  ];
};

export const addCopperToInventoryMoney = (
  money: Character.Item.TMoney,
  deltaCopper: unknown
): Character.Item.TMoney =>
  copperToInventoryMoney(inventoryMoneyToCopper(money) + normalizeCopper(deltaCopper));

