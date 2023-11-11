
/*********************************************
 ************** APPLICATION TYPES**************
 *********************************************/

export namespace Application {
	export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

	export interface IRegexErrorArray {
		value: boolean;
		msg: string;
	}

	export const PLACEHOLDER = {
		NUMBER: -1,
		STRING: "STRING_Application.PLACEHOLDER",
	}

	export const enum ERROR {
		WRONG_PWD = "Jelszó nem jó",
		WRONG_NAME = "Felhasználónév nem jó",
		WRONG_CONTENT_TYPE = "Content-Type Request header nem jó",
		WRONG_END_POINT = "URL Endpoint nem jó",
		WRONG_METHOD = "Request method nem jó",
		WRONG_CONTENT = "Request body nem jó",
		WRONG_ID = "Request id nem jó",
		REQUEST_EMPTY_BODY = "Request body üres",
		REQUEST_INCORRECTLY_FORMED = "Request body nem jó formátumú",
		USER_CREATION_FAILED = "Felhasználó létrehozása sikertelen",

	}

	export const enum EVENTS {
		CONNECTED = "connected",
		CLIENT_JOIN_ROOM= "Csatlakozás szobához",
		CLIENT_SEND_ROOM_MESSAGE= "Üzenet küldése szobába",
	};

	export const enum LIST_OF_POST_REQ_TYPES {
		LOGIN = "login",
		ERROR = "error",
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
		type?: Application.LIST_OF_POST_REQ_TYPES | User.LIST_OF_POST_REQ_TYPES | Application.EVENTS
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
	export const enum DICE {
		SIX = 6,
		TEN = 10,
		TWELVE = 12,
		TWENTY = 20,
	}

	export type TCharacterAdventureData = {
		id: number;
		name: string;
		notes: INote[];
		character: Character.TCharacterModel;
		creationDate: string;
		lastUpdate: string;
	};

	export interface IAdventure {
		id: number;
		name: string;
		notes: INote[];
		characters: Character.TCharacterModel[];
		creationDate: string;
		lastUpdate: string;
	}

	export interface INote {
		id: number;
		date: string;
		sendBy: string;
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

	export const enum RACES {
		ELF = "Elf",
		HALF_ELF = "Fél-elf",
		HUMAN = "Ember",
		DWARF = "Törp",
		ORC = "Udvari Ork"
	}

	export const enum MAIN_CLASSES {
		WARRIOR = "Harcos",
		BOUNTY_HUNTER = "Szerencsevadász",
		PRIEST = "Pap",
		FIGTHER = "Harcművész",
		MAGE = "Varázshasználó",
		ELEM_MAGE = "Elementális varázshasználó",
	}

	export const enum CLASSES {
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

	export const enum PRIMARY_STATS {
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

	export const enum SECONDARY_STAT_LEVEL {
		BASIC = "Alap",
		MASTER = "Mester",
		PLACEHOLDER = "Application.PLACEHOLDER",
	}

	export const enum RESOURCE_TYPE {
		MANA = "Mana",
		ENERGY = "Energia",
		RAGE = "Düh",
	}

	export const enum HM {
		ATK = "TÁ",
		DEF = "VÉ",
		INI = "KE",
		AIM = "CÉ"
	}

	export const enum SPELL_TYPE {
		HEAL = "Gyógyítás",
		HOT = "Több körös gyógyítás",
		DOT = "Több körös sebzés",
		AURA = "Buff",
	}

	export const enum SPELL_COST_TYPE {
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

	export type TCharacterModel = {
		id: string;
		ownerId: string;
		level: TLevelElements;
		race: RACES;
		class: CLASSES;
		rp: TRpElements;
		hm: THmElements;
		primaryStats: TPrimaryStat[];
		secondaryStats: TSecondaryStatElements[];
		spells: Spell.TSpellElements[];
	};

	export type TLevelElements = {
		current: number;
		currentXp: number;
		nextXp: number;
	};

	// CHARACTER STATS

	export type TPrimaryStat = {
		name: PRIMARY_STATS;
		val: number;
	};

	export type TSecondaryStatElements = {
		name: string;
		level: Character.SECONDARY_STAT_LEVEL;
		skill: number;
	};

	export type THmElements = {
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
	};

	// MODELS
	
	export type TRaceModel = {
		name: Character.RACES;
		modifiers: {
			primaryStat: {
				lvlReq: number;
				val: TPrimaryStat
			}[];
			secondaryStat: ISecStatScalingModel[];
			hm: THmElements;
		};
		description: string;
	};

	export type TClassModel = {
		name: Character.CLASSES;
		mainClass: Character.MAIN_CLASSES;
		modifiers: {
			primaryStat: {
				name: PRIMARY_STATS;
				val: Adventure.TRollElements;
			}[];
			secondaryStat: ISecondaryStat[];
			secondaryStatScaling: ISecStatScalingModel[];
			hm: THmElements;
			hmPlus: {
				inital: number;
				perLvl: number;
			};
			proffesionPoints: {
				inital: number;
				perLvl: number;
			};
			hp: number;
			ep: number;
		};
	};

	export interface ISecondaryStat {
		name: string;
		level: Character.SECONDARY_STAT_LEVEL;
		skill: number;
	}

	export interface ISecStatScalingModel {
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
		export const enum MONEY {
			GOLD = "Gold",
			SILVER = "Silver",
			COPPER = "Copper",
		}

		export const enum ITEM_TYPE_EQUIPPABLE {
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
			x: number;
			y: number;
			weight: number;
		};

		export type TItem = {
			hm: Character.THmElements;
			name: string;
			description: string;
			size: TItemSize;
		};

		export type TBackpack = {
			size: Item.TItemSize;
			money: Item.TMoney;
			items: Array<Item.TItem>;
		};
	}
}

/*********************************************
 ***************** USER TYPES******************
 *********************************************/

export namespace User {

	export const enum ERROR {
		ALREADY_LOGGED_IN = "already_logged_in",
	}

	export enum LIST_OF_POST_REQ_TYPES {
		USER_DBGET = "user_db_get",
		USER_DBGET_ALL = "user_db_get_all",
		USER_DBDELETE = "user_db_delete",
		USER_CREATE = "user_create",
		USER_UPDATE = "user_update",
		USER_GET = "user_get",
		USER_GET_ALL = "user_get_all",
		USER_DELETE = "user_delete",
		USER_SET_SOCKET_ID = "user_set_socket_id",
		USER_PUSH_TO_STACK = "user_push_to_stack",
		USER_DELETE_FROM_STACK = "user_delete_from_stack",
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
		createdAt: string;
		socketId?: string;
	}

	export type TUpdateUser = Application.Optional<IUserDataClient, keyof IUserDataClient>;

	export interface IUserContext {
		user: IUserDataClient;
		setUser: (val: TUpdateUser) => void;
	}
}