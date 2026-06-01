import { Character } from "../contracts";

export const DEFAULT_STORAGE_ID = "storage_default";
export const DEFAULT_STORAGE_SIZE_X = 4;
export const DEFAULT_STORAGE_SIZE_Y = 2;
export const DEFAULT_STORAGE_SLOT_AMOUNT = DEFAULT_STORAGE_SIZE_X * DEFAULT_STORAGE_SIZE_Y;
export const DEFAULT_STORAGE_SIZE = {
  x: DEFAULT_STORAGE_SIZE_X,
  y: DEFAULT_STORAGE_SIZE_Y,
} as const;

export const BAG_EQUIPMENT_SLOT_IDS = ["bag1", "bag2", "bag3", "bag4"] as const;

export const indexToSlot = (
  index: number,
  width: number
): Character.Item.TItemPosition => ({
  placeX: index % width,
  placeY: Math.floor(index / width),
});

export const slotToIndex = (
  slot: Character.Item.TItemPosition,
  width: number
): number =>
  Math.max(0, Math.floor(Number(slot.placeY || 0))) * width +
  Math.max(0, Math.floor(Number(slot.placeX || 0)));

export const getPlacementForStorageIndex = (
  storageId: string,
  index: number,
  width: number
): Character.Item.TItemPlacement => ({
  storageId,
  slot: indexToSlot(index, width),
});

export const getItemGridSize = (item: Character.Item.TItem) => ({
  x: Math.max(1, Math.floor(Number(item.size?.sizeX || 1))),
  y: Math.max(1, Math.floor(Number(item.size?.sizeY || 1))),
});

export const createDefaultBackpack = (): Character.Item.TBackpack => ({
  id: DEFAULT_STORAGE_ID,
  label: "Default",
  isDefault: true,
  type: "basic",
  size: {
    sizeX: DEFAULT_STORAGE_SIZE_X,
    sizeY: DEFAULT_STORAGE_SIZE_Y,
    weight: 0,
    slotAmount: DEFAULT_STORAGE_SLOT_AMOUNT,
  },
  items: [],
});
