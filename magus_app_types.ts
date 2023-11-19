
/*********************************************
 ************** APPLICATION TYPES**************
 *********************************************/

import { Types, Document } from "mongoose";

export namespace Application {
	export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

	export type EnumerateEnum<T> = { [K in keyof T]: T[K] };

	export interface IRegexErrorArray {
		value: boolean;
		msg: string;
	}

	export const PLACEHOLDER = {
		NUMBER: -1,
		STRING: "STRING_Application.PLACEHOLDER",
	}

	export enum ERROR {
		NO_ACTION = "Nincs action",
		WRONG_PWD = "Jelszó nem jó",
		WRONG_NAME = "Felhasználónév nem jó",
		WRONG_NAME_OR_PWD = "Felhasználónév vagy jelszó nem jó",
		WRONG_CONTENT_TYPE = "Content-Type Request header nem jó",
		WRONG_END_POINT = "URL Endpoint nem jó",
		WRONG_METHOD = "Request method nem jó",
		WRONG_CONTENT = "Request body nem jó",
		WRONG_ID = "Request id nem jó",
		REQUEST_EMPTY_BODY = "Request body üres",
		REQUEST_INCORRECTLY_FORMED = "Request body nem jó formátumú",
		USER_CREATION_FAILED = "Felhasználó létrehozása sikertelen",
		ALREADY_LOGGED_IN = "Felhasználó már be van jelentkezve",
		UNKNOWN_REQUEST = "Ismeretlen request",
		DB_ERROR = "Adatbázis hiba",
		GET_ERROR = "GET method hiba",

	}

	export enum EVENTS {
		CONNECTED = "connected",
		CLIENT_JOIN_ROOM= "Csatlakozás szobához",
		CLIENT_SEND_ROOM_MESSAGE= "Üzenet küldése szobába"
	};

	export enum REQUEST {
		LOGIN = "login",
		LOGOUT = "logout",
		SYNC_VARS = "sync_vars",
	}

	export type TRequest<T> = (
		inputData: Application.IRequestData<T>,
		callback?: Function | void
	) => Promise<void | any>;

	export interface IResponseData<T> {
		error?: boolean;
		errorMsg?: string | null;
		data?: T;
		requestId?: string | null;
		requestTimestamp?: number | null;
		responseTimestamp: number;
	}

	export interface IRequestData<T> {
		error?: boolean;
		errorMsg?: string | null;
		type?: Application.REQUEST | Application.ERROR | User.REQUEST | Application.EVENTS | Adventure.REQUEST | Character.REQUEST;
		data?: T;
		requestId: string | null;
		requestTimestamp: number | null;
	}

	export interface IError {
		msg: string;
		url: string;
		lineNo: string;
		columnNo: string;
		error: string;
	}
}

/*********************************************
 **************** ADVANTURE TYPES**************
 *********************************************/

export namespace Adventure {

	export enum REQUEST {
		CREATE = "adventure_create",
		UPDATE = "adventure_update",
		GET = "adventure_get",
		GET_ALL = "adventure_get_all",
		DELETE = "adventure_delete",
		ADD_CHARACTER = "adventure_add_character",
		REMOVE_CHARACTER = "adventure_remove_character",
		ADD_NOTE = "adventure_add_note",
		REMOVE_NOTE = "adventure_remove_note",
		UPDATE_NOTE = "adventure_remove_note",
		GET_STACK = "adventure_get_stack",
		GET_ALL_STACK = "adventure_get_all_stack",
		DELETE_FROM_STACK = "adventure_delete_from_stack",
		PUSH_TO_STACK = "adventure_push_to_stack",
	}
	export enum DICE {
		SIX = 6,
		TEN = 10,
		TWELVE = 12,
		TWENTY = 20,
	}

	export type TCharacterAdventureData = {
		id: number;
		name: string;
		character: Character.TCharacter;
		createdAt: Date;
		updatedAt: Date | null;
	};

	export interface IAdventure {
		_id?: Document['_id'],
		name: string;
		notes: INote[];
		characters: Character.TCharacter[];
		createdAt: Date;
		updatedAt: Date | null;
	}

	export interface INote {
		_id?: Document['_id'];
		createdAt: Date;
		updatedAt: Date | null;
		sendBy: Types.ObjectId;
		text: string;
	}

	export type TDamage = {
		dice: DICE;
		nrOfDice: number;
		constant: number;
		totalLength: 0;
		currLength: 0;
	};

	export type TDamageDot = {
		dice: DICE;
		nrOfDice: number;
		constant: number;
		totalLength: number;
		currLength: number;
	};

	export type TRollElements = {
		dice: DICE;
		nrOfDices: number;
		constant: number;
	};

	export type TRoll = (val?: TRollElements) => TRollElements;

	export type TDiceValues = 4 | 6 | 10 | 12 | 20;
}

/*********************************************
 *************** CHARACTER TYPES***************
 *********************************************/

export namespace Character {

	export enum RACES {
		ELF = "Elf",
		HALF_ELF = "Fél-elf",
		HUMAN = "Ember",
		DWARF = "Törp",
		ORC = "Udvari Ork"
	}

	export enum MAIN_CLASSES {
		WARRIOR = "Harcos",
		BOUNTY_HUNTER = "Szerencsevadász",
		PRIEST = "Pap",
		FIGTHER = "Harcművész",
		MAGE = "Varázshasználó",
		ELEM_MAGE = "Elementális varázshasználó",
	}

	export enum CLASSES {
		WARRIOR = "Harcos",
		GLADIATOR = "Gladiátor",
		BOUNTY_HUNTER = "Fejvadász",
		KNIGHT = "Lovag",
		THIEF = "Tolvaj",
		BARD = "Bárd",
		PRIEST = "Pap",
		PALADIN = "Paplovag",
		MARTIAL_ARTIST = "Harcművész",
		SWORDSMAN = "Kardművész",
		WITCH = "Boszorkány",
		WARLOCK = "Boszorkánymester",
		FIRE_MAGE = "Tűzvarázsló",
		MAGE = "Varázsló",
		DRUID = "Druida",
		SHAMAN = "Sámán",
	}

	export enum PRIMARY_STATS {
		AST = "Asztrál",
		INT = "Intelligencia",
		STR = "Erő",
		DEX = "Ügyesség",
		SPE = "Gyorsaság",
		WIP = "Akaraterő",
		CON = "Állóképesség",
		HEA = "Egészség",
		BEA = "Szépség",
		LUC = "Szerencse",
	}

	export enum SECONDARY_STATS {
		"lovaglás",
		"úszás"
	}

	export enum SECONDARY_STAT_LEVEL {
		BASIC = "Alap",
		MASTER = "Mester",
		PLACEHOLDER = "Application.PLACEHOLDER",
	}

	export enum RESOURCE_TYPE {
		MANA = "Mana",
		ENERGY = "Energia",
		RAGE = "Düh",
	}

	export enum HM {
		ATK = "TÁ",
		DEF = "VÉ",
		INI = "KE",
		AIM = "CÉ"
	}

	export enum SPELL_TYPE {
		HEAL = "Gyógyítás",
		HOT = "Több körös gyógyítás",
		DOT = "Több körös sebzés",
		AURA = "Buff",
	}

	export enum SPELL_COST_TYPE {
		ONCE = "Egyszer",
		DOT = "Több körön keresztül",
		AURA = "Folyamatos",
	}

	export const LEVEL_CAPS = [
		1000,
		2000,
		3000,
		4000,
		5000,
		6000,
		7000,
		8000,
		9000,
	]

	export enum REQUEST {
		CREATE = "character_create",
		UPDATE = "character_update",
		GET = "character_get",
		GET_ALL = "character_get_all",
		DELETE = "character_delete",
		GET_STACK = "character_get_stack",
		GET_ALL_STACK = "character_get_all_stack",
		DELETE_FROM_STACK = "character_delete_from_stack",
		PUSH_TO_STACK = "character_push_to_stack",

		RACE_CREATE = "character_race_create",
		RACE_UPDATE = "character_race_update",
		RACE_GET = "character_race_get",
		RACE_GET_ALL = "character_race_get_all",
		RACE_DELETE = "character_race_delete",

		CLASS_CREATE = "character_class_create",
		CLASS_UPDATE = "character_class_update",
		CLASS_GET = "character_class_get",
		CLASS_GET_ALL = "character_class_get_all",
		CLASS_DELETE = "character_class_delete",
	}

	export type TCharacter = {
		userId: Types.ObjectId;
		level: TLevel;
		race: RACES | Types.ObjectId;
		class: CLASSES | Types.ObjectId;
		rp: TRpElements;
		hm: THm;
		primaryStats: TPrimaryStat[];
		secondaryStats: TSecondaryStat[];
		spells: Spell.TSpellElements[];
		adventure: Types.ObjectId;
		inventory: Item.TInventory;
	};

	export type TLevel = {
		current: number;
		currentXp: number;
		nextXp: number;
	};

	// CHARACTER STATS

	export type TSecondaryStat = {
		name: string;
		level: Character.SECONDARY_STAT_LEVEL;
		skill: number;
	};

	export type THm = {
		ATK: THmElementsValue;
		DEF: THmElementsValue;
		INI: THmElementsValue;
		AIM: THmElementsValue;
		hmPerLvl: number;
	};

	type THmElementsValue = {
		base: number;
		fromGear: number;
		total: number;
	}

	export type TRpElements = {
		name: string;
		age: number;
		skinColor: string;
		hair: string;
		hairColor: string;
		eye: {
			color?: string;
			description?: string;
		};
		height: number;
		weight: number;
		description: string;
		religion: string;
		bornPlace: string;
		schools: string[];
		personality: string;
		knownLanguages: string[];
		professions: string[];
	};

	// MODELS
	
	export type TPrimaryStat = {
		name: PRIMARY_STATS;
		val: number;
		lvlReq?: number;
	};
	
	export type TRace = {
		name: Character.RACES;
		modifiers: {
			primaryStats: TPrimaryStat[];
			secondaryStatScaling: ISecondaryStatScaling[];
			hm: THm;
		};
		description: string;
	};

	export type TScaling = {
		initial: number;
		perLvl: number;
	}

	export type TClass = {
		name: Character.CLASSES;
		mainClass: Character.MAIN_CLASSES;
		modifiers: {
			hp: number;
			ep: number;
			primaryStats: TPrimaryStat[];
			secondaryStats: TSecondaryStat[];
			secondaryStatScaling: ISecondaryStatScaling[];
			secondaryStatPlus: TScaling;
			hm: THm;
			hmPlus: TScaling;
		};
	};

	export interface ISecondaryStatScaling {
		lvlReq: number;
		lvl: SECONDARY_STAT_LEVEL;
		val?: number;
		to?: {
			lvl: SECONDARY_STAT_LEVEL;
			newVal: number;
		}
	}

	// SPELLS

	export namespace Spell {
		export type TSpellElements = {
			id: string;
			name: string;
			description: string;
			levels: {
				resourceData: {
					effect: Character.SPELL_COST_TYPE;
					type: Character.RESOURCE_TYPE;
					costAmount: number;
				};
				effect: {
					type: Character.SPELL_TYPE;
					length: number;
					damage: Adventure.TRollElements;
					range: number;
				};
			}[];
			spec: string;
		};

		type TSpell = (val?: TSpellElements) => TSpellElements;

		export type TSpellCost = {
			effect: Character.SPELL_COST_TYPE;
			type: Character.RESOURCE_TYPE;
		};

		export type TSpellEffect = {
			type: Character.SPELL_TYPE;
			length: number;
		};
	}
	// ITEMS

	export namespace Item {
		export enum MONEY {
			GOLD = "Gold",
			SILVER = "Silver",
			COPPER = "Copper",
		}

		export enum ITEM_TYPE_EQUIPPABLE {
			HEAD = "Fejes",
			NECK = "Nyaklánc",
			SHOULDER = "Vállas",
			BACK = "Köpeny",
			CHEST = "Pámcél",
			GLOVES = "Kesztyű",
			BRACERS = "Karperec",
			LEGS = "Nadrág",
			BOOTS = "Csizma",
			ACCESSORY = "Kiegészítő",
			WEP2H = "Kétkezes fegyver",
			WEP1H = "Egykezes fegyver",
		}

		export type TInventory = {
			backpacks: TBackpack[];
			money: TMoney;
		};

		export type TMoney = [
			{
				name: MONEY.GOLD;
				amount: number;
			},
			{
				name: MONEY.SILVER;
				amount: number;
			},
			{
				name: MONEY.COPPER;
				amount: number;
			}
		];

		export type TItemSize = {
			sizeX: number;
			sizeY: number;
			placeX: number;
			placeY: number;
			weight: number;
		};

		export type TItem = {
			hm: Character.THm;
			name: string;
			description: string;
			size: TItemSize;
		};

		export type TBackpack = {
			size: Item.TItemSize;
			items: Array<Item.TItem>;
		};
	}
}

/*********************************************
 ***************** USER TYPES******************
 *********************************************/

export namespace User {

	export enum ERROR {
		ALREADY_LOGGED_IN = "already_logged_in",
	}

	export enum REQUEST {
		CREATE = "user_create",
		UPDATE = "user_update",
		GET = "user_get",
		GET_ALL = "user_get_all",
		DELETE = "user_delete",
		GET_STACK = "user_get_stack",
		GET_ALL_STACK = "user_get_all_stack",
		DELETE_FROM_STACK = "user_delete_from_stack",
		PUSH_TO_STACK = "user_push_to_stack",
	}

	export enum USER_RANK {
		ADMIN = "ADMIN",
		UNAUTH = "UNAUTH",
		USER = "USER",
	}

	export interface IUserDataClient {
		id: string;
		uid: string;
		name: string;
		rank: USER_RANK;
		keepLoggedIn: boolean;
		login: string[];
		createdAt: Date;
		updatedAt: Date | null;
		socketId?: string;
	}

	export type TUpdateUser = Application.Optional<IUserDataClient, keyof IUserDataClient>;

	export interface IUserContext {
		user: IUserDataClient;
		setUser: (val: TUpdateUser) => void;
	}
}