import { Character } from "../contracts";

export const DEFAULT_STORAGE_ID = "storage_default";
export const DEFAULT_STORAGE_MIN_SLOT_AMOUNT = 2;
export const DEFAULT_STORAGE_MAX_COLUMNS = 4;
export const DEFAULT_STORAGE_FALLBACK_SLOT_AMOUNT = 2;

export const BAG_EQUIPMENT_SLOT_IDS = ["bag", "satchel"] as const;

export const isWeaponOrShield = (item: Character.Item.TItem) =>
  item.equipable === Character.Item.ITEM_TYPE_EQUIPPABLE.WEP1H ||
  item.equipable === Character.Item.ITEM_TYPE_EQUIPPABLE.WEP2H ||
  item.equipable === Character.Item.ITEM_TYPE_EQUIPPABLE.SHIELD;

export const isBagOrSatchel = (item: Character.Item.TItem) =>
  item.equipable === Character.Item.ITEM_TYPE_EQUIPPABLE.BAG ||
  item.equipable === Character.Item.ITEM_TYPE_EQUIPPABLE.SATCHEL;

export const getDefaultStorageSlotAmount = (capacity?: number) =>
  Math.max(
    DEFAULT_STORAGE_MIN_SLOT_AMOUNT,
    Math.floor(Number(capacity || DEFAULT_STORAGE_FALLBACK_SLOT_AMOUNT))
  );

export const getDefaultStorageColumns = (capacity?: number) =>
  Math.max(1, Math.min(DEFAULT_STORAGE_MAX_COLUMNS, getDefaultStorageSlotAmount(capacity)));

export const getDefaultStorageRows = (capacity?: number) =>
  Math.max(1, Math.ceil(getDefaultStorageSlotAmount(capacity) / getDefaultStorageColumns(capacity)));

export const getDefaultStorageSize = (capacity?: number) => ({
  x: getDefaultStorageColumns(capacity),
  y: getDefaultStorageRows(capacity),
  slotAmount: getDefaultStorageSlotAmount(capacity),
});

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

export const getItemGridSize = (item: Character.Item.TItem, storageId?: string) => ({
  x: storageId === DEFAULT_STORAGE_ID && isWeaponOrShield(item)
    ? 1
    : Math.max(1, Math.floor(Number(item.size?.sizeX || 1))),
  y: storageId === DEFAULT_STORAGE_ID && isWeaponOrShield(item)
    ? 1
    : Math.max(1, Math.floor(Number(item.size?.sizeY || 1))),
});

export const createDefaultBackpack = (capacity?: number): Character.Item.TBackpack => {
  const size = getDefaultStorageSize(capacity);
  return {
  id: DEFAULT_STORAGE_ID,
  label: "Default",
  isDefault: true,
  type: "basic",
  size: {
    sizeX: size.x,
    sizeY: size.y,
    weight: 0,
    slotAmount: size.slotAmount,
  },
  items: [],
  };
};
