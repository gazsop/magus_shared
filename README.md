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
  - fixed `4x2` (`8` slots)
  - represented as `isDefault: true` and `id: "storage_default"`
  - shared constants/helpers live in `shared/game/inventory.ts`
- Bag instances are first-class inventory entries via optional `bag` payload:
  - `bag.state`: `"equipped"` or `"stored"`
  - `bag.size`, `bag.maxSlots`, optional aura payload
- Bag equipment slots are shared constants in `shared/game/inventory.ts`: `bag1`, `bag2`, `bag3`, and `bag4`.
- Equipped bag entries link to non-default `backpacks[]` by `bag.id`; dropping a bag removes the linked storage and contents.
- Item definitions can set `createsInventorySpace` with `storage` settings so each item instance creates a linked non-default storage space.
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

## Character Stat Storage Notes

- Character `primaryStats` persistence is value-focused (`name` + `val`).
- Roll metadata is sourced from class/descent definitions and not required on character rows.
- Class modifiers include both `initialSecondarySkillPoints` (starting pool) and
  `secondarySkillPointsPerLvl` (per-level gain).
- Character class definitions may include `maxCarriedWeapons`; legacy entries without it are treated as `0` until saved.
- Secondary skill entries may include an optional `note` string for admin-authored guidance; display rows sort with Hungarian collation.
- Pure roll range/format helpers live in `shared/game/roll.ts`.

## Runtime State Notes

- Adventure combat runtime state uses `Adventure.TCombatState`.
- Combat start includes per-character initiative rows with `baseInitiative`, a pending/submitted `k10` roll state, and total initiative.
