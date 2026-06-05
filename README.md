# shared

Shared TypeScript module used by both `magus_client` and `magus_server`.

## Purpose

This folder is the contract layer between frontend and backend:

- shared request/response and domain types
- shared constants
- shared runtime route configuration

## Module Structure

- `contracts/`
  - `types.ts` shared domain/request/response types (re-exported from legacy file)
  - `constants.ts` shared constants/events (re-exported from legacy file)
  - `index.ts` contracts barrel
- `game/`
  - pure shared game helpers for money conversion, roll formatting/ranges,
    and inventory slot/default-storage math
- `runtime/`
  - `config.ts` shared runtime/server-side configuration (re-exported from legacy file)
- `index.ts` browser-safe shared entry (contracts + pure game helpers)
- `server.ts` server-side shared entry (contracts + runtime config)

Legacy compatibility files remain:

- `shared_types.ts`
- `shared_constants.ts`
- `shared_config.ts`

## Runtime Config

`shared_config.ts` resolves client/server host and port settings from the selected runtime mode. App-specific secrets and deployment environment values belong in the client or server project env files, not in `shared`.

## Usage

Client and server import from this folder via path aliases:

- Client: `@shared/contracts` (configured in `magus_client` alias/tsconfig)
- Server (legacy-compatible): `@appTypes/*` (configured in `magus_server/package.json`)

## Change Rules

- Treat edits here as breaking-risk changes.
- If you modify exported names, enums, or interfaces, update both server and client usages in the same change.
- Keep shared contracts backward-compatible unless the task explicitly allows contract breaks.

## Update Contract Notes

- Update route contracts use guarded patch writes through `ServerApi.UpdateGuards`:
  - `expectedHash` (hash of mutable server state)
  - `patch` (add/replace/remove operations)
- Update write endpoints are strict: guarded patch payload is required for update operations.
- Character class and descent datasets use per-entry `hash` guards.
- `ServerApi.EventRoutes.PongBody` supports optional advisory sync snapshots for active adventure, character, and adventure hashes.
- `ServerApi.EventRoutes.PongResponse.sync` reports `ok`, `stale`, `missing`, or `unknown` without replacing guarded write conflict checks.
- Character item action placeholder route contracts exist under `ServerApi.CharacterRoutes`:
  - `DropItemBody`
  - `SellItemBody`
  - `UseItemBody`
  - `EquipItemBody`

## Inventory Contract Notes

- `Character.Item.TInventory.backpacks[]` remains the canonical storage list.
- Each storage entry now supports identity metadata:
  - `id` (stable storage identity)
  - `label`
  - `isDefault`
- Item placement supports explicit storage linkage:
  - `placement.storageId`
  - `placement.slot.placeX/placeY`
  - optional `placement.equippedSlotId`
- When `placement.equippedSlotId` is present, `placement.slot` remains the remembered storage anchor rather than equipment coordinates.
- Character inventory entries may add per-instance auras through:
  - `additionalAuras` (appended to the base item aura list at runtime)
- Default storage behavior:
  - represented as `isDefault: true` and `id: "storage_default"`
  - slot count is the character class `maxCarriedWeapons` value, with a fallback of `2`
  - accepts only one-slot weapons and shields
  - shared constants/helpers live in `shared/game/inventory.ts`
- Bag and satchel instances are first-class inventory entries via optional `bag` payload:
  - `bag.state`: `"equipped"` or `"stored"`
  - `bag.size`, `bag.maxSlots`, optional aura payload
- Bag equipment slots are shared constants in `shared/game/inventory.ts`: `bag` and `satchel`.
- Equipped bag/satchel entries link to non-default `backpacks[]` by `bag.id`; non-empty bag/satchel removal is blocked.
- Bag/satchel item definitions force `createsInventorySpace`, `maxStack = 1`, and `consumable = false`.
- Bag/satchel items can be carried inside active equipped bag/satchel storage. Shared server placement first tries active non-default storage, then auto-equips a bag/satchel into the matching empty equipment slot when storage placement is unavailable.
- Item definitions can carry an optional `priceCopper` base price. Shared money
  UI helpers convert values with `1 gold = 10 silver` and
  `1 silver = 100 copper`.
- Pure money conversion helpers live in `shared/game/money.ts`; UI components
  and server-side insufficient-money validation remain local to their apps.
- Legacy inventory rows without `placement.slot` are assigned deterministic
  fallback slots during normalization.

## Aura Contract Notes

- Character auras use `Character.TAura`.
- `TAura.effect` is an array of spell effects.
- `TAura.modifiers` is an optional array of modifier groups.
- Item auras use `Character.Item.TItemAura` with the same array-based `effect` / `modifiers` pattern.
- Item aura `applyWhen` defaults to `equipped`; `carried` item auras apply from inventory and equipped slots.

## Player Trade Contract Notes

- Player character trades are adventure-scoped and use `ServerApi.CharacterRoutes.PlayerTradeState`.
- A trade participant offer contains inventory/equipment item sources plus `moneyCopper`.
- Both participants must accept the current offers before finalization.
- The backend revalidates item sources and money during finalization and rejects stale offers.

## Character Stat Storage Notes

- Character `primaryStats` persistence is value-focused (`name` + `val`).
- Roll metadata is sourced from class/descent definitions and not required on character rows.
- Class modifiers include both `initialSecondarySkillPoints` (starting pool) and
  `secondarySkillPointsPerLvl` (per-level gain).
- Character class definitions may include `maxCarriedWeapons`; missing entries fall back to `2` for default weapon rack sizing.
- Secondary skill entries may include an optional `note` string for admin-authored guidance; display rows sort with Hungarian collation.
- Pure roll range/format helpers live in `shared/game/roll.ts`.

## Runtime State Notes

- Adventure combat runtime state uses `Adventure.TCombatState`.
- Saved combat definitions use `Combat.TCombat` with friendly/enemy NPC references.
- Combat start includes per-character initiative rows with `baseInitiative`, a pending/submitted `k10` roll state, NPC rows from the selected combat including `Character.TResource`, and total initiative.
