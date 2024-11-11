/*********************************************
 ************** APPLICATION TYPES**************
 *********************************************/

export namespace Application {
  export type Optional<T, K extends keyof T = keyof T> = Pick<Partial<T>, K> &
    Omit<T, K>;

  export type EnumerateEnum<T> = { [K in keyof T]: T[K] };

  export interface IRegexErrorArray {
    value: boolean;
    msg: string;
  }

  export const PLACEHOLDER = {
    NUMBER: -1,
    STRING: "STRING_Application.PLACEHOLDER",
  };

  export enum ERROR {
    NO_ACTION = "Nincs action",
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
    CLIENT_JOIN_ROOM = "Csatlakozás szobához",
    CLIENT_SEND_ROOM_MESSAGE = "Üzenet küldése szobába",
  }

  export enum REQUEST {
    LOGIN = "login",
    LOGOUT = "logout",
    SYNC_VARS = "sync_vars",
  }

  export type TRequest<T> = (
    inputData: Application.IRequestData<T>,
    callback?: Function | void
  ) => Promise<void | any>;

  export interface IResponseDataParams<T> {
    data: T;
    requestTimestamp: number | null;
  }

  export interface IResponseDataSuccess<T> extends IResponseDataParams<T> {
    responseTimestamp: number;
  }

  export interface IResponseDataError<T> extends IResponseDataParams<T> {
    error: true;
    responseTimestamp?: number;
  }

  export interface IServerSentEvent<T> {
    data: T;
    event: string;
    responseTimestamp: number;
  }

  export type IRequestType =
    | Application.REQUEST
    | Application.ERROR
    | User.ERROR
    | User.REQUEST
    | Application.EVENTS
    | Adventure.REQUEST
    | Character.REQUEST;

  export interface IRequestData<T> {
    data: T;
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

  interface IAdventure {
    id: string;
    json: {
      name: string;
    };
  }

  export interface IAdventureServer extends IAdventure {
    ver: number;
    json: {
      name: string;
      notes: INote[];
      createdAt: string;
      updatedAt: string | null;
    };
  }

  export interface IAdventureClient extends IAdventure {}

  export interface INote {
    id: string;
    createdAt: string;
    updatedAt: string | null;
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
    nrOfRolls: number;
  };

  export type TRoll = (val?: TRollElements) => TRollElements;

  export type TDiceValues = 4 | 6 | 10 | 12 | 20;
}

/*********************************************
 *************** CHARACTER TYPES***************
 *********************************************/

export namespace Character {
  export enum DESCENTS {
    ELF = "Elf",
    HALF_ELF = "Fél-elf",
    HUMAN = "Ember",
    DWARF = "Törp",
    ORC = "Udvari Ork",
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
    PER = "Észlelés", // PER from "perception"
  }
  /**
   *
   */
  export enum SECONDARY_STATS {
    HID = "Álcázás/álruhaviselés", // HID from "hiding"
    ALC = "Alkímia", // ALC from "alchemy"
    ANI = "Állatismeret", // ANI from "animal knowledge"
    UNF = "Belharc", // UNF from "unarmed fighting"
    WRE = "Birkózás", // WRE from "wrestling"
    AIM = "Célzás", // AIM from "aiming"
    TSD = "Csapda és titkosajtó keresés", // TSD from "trap search"
    TSP = "Csapdaállítás", // TSP from "trap placement"
    KNT = "Csomózás", // KNT from "knotting"
    DEM = "Demonológia", // DEM from "demonology"
    GEM = "Drágakőmágia", // GEM from "gem magic"
    PHY = "Élettan", // PHY from "physiology"
    HUK = "Emberismeret", // HUK from "human knowledge"
    SNG = "Éneklés/zenélés", // SNG from "singing/music"
    ARC = "Építészet", // ARC from "architecture"
    FOR = "Erdőjárás", // FOR from "forest walking"
    APR = "Értékbecslés", // APR from "appraisal"
    FAL = "Esés", // FALL from "falling"
    ETI = "Etikett", // ETI from "etiquette"
    THW = "Fegyverdobás", // THW from "throwing weapons"
    WPN = "Fegyverhasználat", // WPN from "weapon usage"
    WKN = "Fegyverismeret", // WKN from "weapon knowledge"
    WBK = "Fegyvertörés", // WBK from "weapon breaking"
    ART = "Festészet, rajzolás", // ART from "art"
    GND = "Földharc", // GND from "ground combat"
    RUN = "Futás", // RUN from "running"
    BTL = "Hadrend", // BTL from "battle formation"
    LDR = "Hadvezetés", // LDR from "leadership"
    NAV = "Hajózás", // NAV from "navigation"
    FAK = "Hamisítás", // FORG from "forgery"
    CRD = "Hamiskártyázás", // CRD from "card cheating"
    MIM = "Hangutánzás", // MIM from "mimicry"
    STG = "Harc helyhez kötve", // STG from "stationary combat"
    WRT = "Harci láz", // WRT from "war rage"
    PAR = "Hárítás", // PAR from "parry"
    VNT = "Hasbeszélés", // VNT from "ventriloquism"
    BCK = "Hátbatámadás(orvtámadás)", // BCK from "backstabbing"
    LOC = "Helyismeret", // LOC from "local knowledge"
    HER = "Heraldika", // HER from "heraldry"
    HBL = "Herbalizmus", // HBL from "herbalism"
    TAM = "Idomítás", // TAM from "taming"
    DIV = "Időjóslás", // DIV from "divination"
    TWD = "Ikerharc", // TWD from "twin fighting"
    LIT = "Írás/olvasás", // LIT from "literacy"
    LAW = "Jogismeret", // LAW from "law knowledge"
    DWH = "Kétkezes harc", // DWH from "dual wielding"
    SHN = "Kétkezes harc-shien-shu", // SHN from "shien-shu fighting"
    WAT = "Kieg. támadás kül. fegyverrel", // WAT from "weapon attack training"
    TOR = "Kínokozás", // TOR from "torture"
    DRI = "Kocsihajtás", // DRI from "driving"
    BWL = "Kocsmai verekedés", // BWL from "bar brawl"
    ESK = "Kötelekből szabadulás", // ESK from "escape"
    TNP = "Kötéltánc", // TNP from "tightrope walking"
    LGC = "Lábharc", // LGC from "leg combat"
    DSR = "Lefegyverzés", // DSR from "disarming"
    LND = "Legendaismeret", // LND from "legend knowledge"
    STL = "Lopózás", // STL from "stealth"
    RDE = "Lovaglás", // RDE from "riding"
    RAH = "Lovasíjászat", // RAH from "ranged horse archery"
    MAG = "Mágiahasználat", // MAG from "magic use"
    MGC = "Mágiaismeret", // MGC from "magic knowledge"
    CLB = "Mászás", // CLB from "climbing"
    MEC = "Mechanika", // MEC from "mechanics"
    DEB = "Mellébeszélés", // DEB from "debating"
    PON = "Méregkeverés/semlegesítés", // PON from "poison"
    HVA = "Nehezvértviselet", // HVA from "heavy armor"
    LNG = "Nyelvismeret", // LNG from "language"
    TRK = "Nyomolvasás/eltüntetés", // TRK from "tracking"
    BOX = "Ökölharc", // BOX from "boxing"
    ANC = "Ősi nyelvismeretek", // ANC from "ancient languages"
    SHD = "Pajzshasználat", // SHD from "shield use"
    PSI = "Pszi", // PSI from "psi"
    DST = "Pusztítás", // DST from "destruction"
    HDE = "Rejtőzés", // HDE from "hiding"
    RUM = "Rúnamágia", // RUNA from "rune magic"
    HEA = "Sebgyógyítás", // HEAL from "healing"
    DIS = "Semlegesítés/működtetés", // DIS from "disarm"
    LIP = "Szájról olvasás", // LIP from "lip reading"
    PRO = "Szakma", // PROF from "profession"
    SUC = "Szexuális kultúra", // BTYPE from "sexual culture"
    DAN = "Tánc", // DAN from "dance"
    MAP = "Térképészet", // MAP from "cartography"
    HIS = "Történelemismeret", // HIS from "history"
    ACR = "Ugrás/akrobatika", // ACR from "acrobatics"
    SWM = "Úszás", // SWM from "swimming"
    HNT = "Vadászat/halászat", // HNT from "hunting/fishing"
    BLN = "Vakharc", // BLN from "blind fighting"
    REL = "Vallásismeret", // REL from "religion knowledge"
    PKL = "Zárnyitás", // PKL from "picking locks"
    PCK = "Zsebmetszés", // PCK from "picking pockets"
    JGL = "Zsonglőrködés", // JGL from "juggling"
  }

  export enum SECONDARY_STAT_LEVEL {
    NONE = "Nincs",
    BASIC = "Alap",
    MASTER = "Mester",
  }

  export enum RESOURCE_TYPE {
    MANA = "Mana",
    ENERGY = "Energia",
    RAGE = "Düh",
  }

  export enum HM {
    ATK = "TÉ",
    DEF = "VÉ",
    INI = "KÉ",
    AIM = "CÉ",
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

  export const LEVEL_CAPS = [250, 500, 750, 1000, 1500, 6000, 7000, 8000, 9000];

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

    DESCENT_CREATE = "character_descent_create",
    DESCENT_UPDATE = "character_descent_update",
    DESCENT_GET = "character_descent_get",
    DESCENT_GET_ALL = "character_descent_get_all",
    DESCENT_DELETE = "character_descent_delete",

    CLASS_CREATE = "character_class_create",
    CLASS_UPDATE = "character_class_update",
    CLASS_GET = "character_class_get",
    CLASS_GET_ALL = "character_class_get_all",
    CLASS_DELETE = "character_class_delete",
  }

  export type TCharacter = {
    level: TLevel;
    descent: string;
    class: string;
    rp: TRpElements;
    hm: THm;
    primaryStats: TPrimaryStat[];
    secondaryStats: TSecondaryStat[];
    inventory: Item.TInventory;
    resource: TResource;
  };

  export type TCharacterServer = {
    uid: string;
    advId: string;
    ver: number;
    json: TCharacter;
    createdAt: string;
    updatedAt: string | null;
  };

  export type TDescent = {
    id: string;
    name: Character.DESCENTS;
    modifiers: {
      primaryStats: TPrimaryStat[];
      secondaryStatScalings: TSecondaryStat[];
      hm: THm;
    };
    description: string;
    allowedClasses?: { id: string; permission: boolean }[];
  };

  export type TClass = {
    id: string;
    name: Character.CLASSES;
    mainClass: Character.MAIN_CLASSES;
    modifiers: {
      hp: number;
      hpLvlScaling: Adventure.TRollElements;
      ep: number;
      primaryStats: TPrimaryStat[];
      secondaryStats: TSecondaryStat[];
      secondaryStatScalings: TSecondaryStat[];
      hm: THm;
      hmPlus: TScaling;
      resource: TResource;
    };
    spells: Spell.TSpellElements[];
    //specs: string[];
    specs: {
      name: string;
      description: string;
    }[];
  };

  export type TLevel = {
    current: number;
    currentXp: number;
    nextXp: number;
  };

  // CHARACTER STATS
  export type TPrimaryStat = {
    name: PRIMARY_STATS;
    val?: number;
    roll?: Adventure.TRollElements;
    lvlReq?: number;
  };

  export type TResource = {
    health: {
      currentHp: number;
      maxHp: number;
      currentEp: number;
      maxEp: number;
    };
    abilities: {
      name: RESOURCE_TYPE;
      current: number;
      max: number;
      regenPerRound: number;
      lvlUp: Adventure.TRollElements;
    };
  };

  export type TSecondaryStat = {
    id: string;
    name: SECONDARY_STATS;
    lvlReq: number;
    skillLevel: Character.SECONDARY_STAT_LEVEL;
    skill: number;
  };

  export type TScaling = {
    initial: number;
    perLvl: number;
  };

  export type THm = {
    ATK: number;
    DEF: number;
    INI: number;
    AIM: number;
  };

  export type THmElementsValue = {
    base: number;
    fromGear: number;
  };

  export type TRpElements = {
    name: string;
    age: number;
    skinColor: string;
    hair: {
      description: string;
      color: string;
    };
    eyes: {
      color: string;
      description: string;
    };
    bioType: Character.BTYPE;
    height: number;
    weight: number;
    description: string;
    religion: string;
    bornPlace: string;
    schools: string;
    personality: string;
    knownLanguages: string[];
    professions: string[];
  };

  export enum RP_STATS {
    NAME = "Név",
    CLASSES = "Kaszt",
    DESCENTS = "Faj",
    BTYPE = "Nem",
    PERSONALITY = "Jellem",
    RELIGION = "Vallás",
    BORN_PLACE = "Születési hely",
    RESOURCE_REGEN = "Regen",
    AGE = "Kor",
    SKIN_COLOR = "Bőrszín",
    HAIR_DESCRIPTION = "Haj",
    HAIR_COLOR = "Hajszín",
    EYE_COLOR = "Szemszín",
    EYE_DESCRIPTION = "Szemleírás",
    HEIGHT = "Magasság",
    WEIGHT = "Súly",
    DESCRIPTION = "Leírás",
    SCHOOLS = "Iskolák",
    KNOWN_LANGUAGES = "Ismert nyelvek",
    PROFESSIONS = "Szakmák",
  }

  export enum STATS {
    MAX_HP = "Max FP",
    MAX_EP = "Max EP",
    CURRENT_HP = "FP",
    CURRENT_EP = "EP",
  }

  export enum LEVELS {
    LEVEL = "Szint",
    NEXT_LEVEL = "Köv. szint",
    CURRENT_XP = "Jelenlegi XP",
  }

  export enum BTYPE {
    MALE = "Férfi",
    FEMALE = "Nő",
  }

  export enum PERSONALITIES {
    GRIFFIN = "Griff",
    OWL = "Bagoly",
  }

  export enum RELIGIONS {
    PYARON = "Pyaron",
    THARR = "Tharr",
  }

  // SPELLS

  export namespace Spell {
    export type TSpellType = "damage" | "heal" | "utility";
    export enum SPELL_CLASSES {
      NECROTIC = "Nekrotikus",
      FIRE = "Tűz",
      MENTAL = "Mentális",
      WATER = "Víz",
      EARTH = "Föld",
      WIND = "Szél",
      LIGHT = "Fény",
      DARK = "Sötét",
      LIGHTNESS = "Világosság",
      SHADOW = "Árnyék",
      DEFENSE = "Védelem",
      ATTACK = "Támadás",
      HEAL = "Gyógyítás",
      CURSE = "Átok",
      BLESSING = "Áldás",
      CHAOS = "Káosz",
      ORDER = "Rend",
    }

    export interface Level {
      lvlreq: number;
      description: string;
      resourceCost: number;
    }

    interface ISpell {
      id: string;
      name: string;
      lvlReq: number;
      description: string;
      resourceCost: number;
      spec: string;
      imgSrc?: string;
      passive: boolean;
      type: TSpellType;
      nrOfTurns: number;
      nrOfTurnsToCast: number;
      range: number;
      class: SPELL_CLASSES;
      parentId: string;
    }

    export interface ISpellLevel extends ISpell {
      rank?: number;
    }

    export interface TSpellElements extends ISpell {
      levels: ISpellLevel[];
    }

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
      CHEST = "Páncél",
      GLOVES = "Kesztyű",
      BDESCENTRS = "Karperec",
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
      weight: number;
    };

    export type TItemPosition = {
      placeX: number;
      placeY: number;
    };

    export type TItem = {
      hm: Character.THm;
      name: string;
      description: string;
      size: TItemSize;
      position: TItemPosition;
      img?: string;
      equipable: ITEM_TYPE_EQUIPPABLE | null;
    };

    export type TBackpackSize = Item.TItemSize & { slotAmount: number };

    export type TBackpack = {
      size: TBackpackSize;
      items: Array<{
        amount: number;
        item: Item.TItem;
      }>;
    };
  }
}

/*********************************************
 ***************** USER TYPES******************
 *********************************************/

export namespace User {
  export enum ERROR {
    ALREADY_LOGGED_IN = "already_logged_in",
    JWT_ERROR = "jwt_error",
    JWT_EXPIRED = "jwt_expired",
    JWT_INVALID = "jwt_invalid",
    JWT_NOT_FOUND = "jwt_not_found",
    USER_NOT_FOUND = "user_not_found",
    WRONG_PWD = "Jelszó nem jó",
    WRONG_NAME = "Felhasználónév nem jó",
    WRONG_NAME_OR_PWD = "Felhasználónév vagy jelszó nem jó",
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

  export interface IUserData {
    uid: string;
    name: string;
  }

  export interface IUserDataServer extends User.IUserData {
    json: {
      rank: User.USER_RANK;
      createdAt: string;
      updatedAt: string | null;
    };
  }

  export interface IUserDataServerWithPwd extends User.IUserDataServer {
    pwd: string;
    salt: string;
  }

  export interface IUserDataClient extends User.IUserData {
    rank?: USER_RANK;
    pwd?: string;
  }

  export type TUpdateUser = Application.Optional<
    IUserDataClient,
    keyof IUserDataClient
  >;

  export interface IUserContext {
    user: IUserDataClient;
    setUser: (val: TUpdateUser) => void;
  }
}

export const WSTYPES = {
  ...Application.REQUEST,
  ...Application.ERROR,
  ...Application.EVENTS,
  ...User.REQUEST,
  ...User.ERROR,
  ...Adventure.REQUEST,
  ...Character.REQUEST,
};
