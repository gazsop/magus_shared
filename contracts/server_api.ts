import { Character, Combat, Npc, Vendor } from "./types";

export namespace ServerApi {
  export type PatchOp = "add" | "replace" | "remove";
  export type PatchOperation = {
    op: PatchOp;
    path: string;
    value?: unknown;
  };

  export type UpdateGuards = {
    expectedHash: string;
    patch: PatchOperation[];
  };

  export namespace EventRoutes {
    export type SyncEntityStatus = "ok" | "stale" | "missing" | "unknown";

    export type PongSyncSnapshot = {
      advId?: string;
      character?: {
        uid?: string;
        hash?: string;
      };
      adventure?: {
        hash?: string;
      };
    };

    export type PongBody = {
      scope?: "global" | "adventure";
      sync?: PongSyncSnapshot;
    };

    export type PongSyncStatus = {
      advId: string;
      character?: {
        status: SyncEntityStatus;
        uid?: string;
        latestHash?: string;
      };
      adventure?: {
        status: SyncEntityStatus;
        latestHash?: string;
      };
    };

    export type PongResponse = {
      ok: true;
      sync?: PongSyncStatus;
    };

    export type LiveDebugSession = {
      uid: string;
      name: string;
      active: boolean;
      lastPong: number;
    };

    export type DebugResponse = {
      pid: number;
      sessions: LiveDebugSession[];
      generatedAt: number;
    };

    export type PollEvent = {
      id: number;
      type: string;
      scope?: "global" | "adventure" | "chat";
      advId?: string;
      targetUid?: string | null;
      payload: unknown;
      createdAt: number;
    };

    export type PollBody = {
      advId?: string;
      sinceId?: number;
      waitMs?: number;
      batchMs?: number;
      sync?: PongSyncSnapshot;
    };

    export type PollResponse = {
      events: PollEvent[];
      latestId: number;
      timedOut: boolean;
      sync?: PongSyncStatus;
    };

    export type PollChatBody = {
      advId: string;
      sinceId?: number;
      waitMs?: number;
      batchMs?: number;
    };

    export type PollChatResponse = {
      events: PollEvent[];
      latestId: number;
      timedOut: boolean;
    };
  }

  export namespace ChatRoutes {
    export type ChatPolicy = {
      allowUserDirect: boolean;
      allowUserAllRoom: boolean;
    };

    export type ChatReferenceKind = "item" | "spell" | "ynev" | "npc";

    export type ChatReferenceSearchBody = {
      query: string;
      limit?: number;
    };

    export type ChatReferenceSearchResult = {
      kind: ChatReferenceKind;
      id: string;
      label: string;
      description?: string;
      x?: number;
      y?: number;
      item?: Character.Item.TItem;
      spell?: Character.Spell.TSpellElements | Character.Spell.ISpellLevel;
      npc?: Omit<Npc.TNpc, "adminNotes">;
    };

    export type ChatReferenceSearchResponse = {
      results: ChatReferenceSearchResult[];
    };

    export type GetConversationBody = {
      withUid: string;
      limit?: number;
    };

    export type SendBody = {
      advId: string;
      toUid: string;
      text: string;
    };

    export type GetPresenceEventsBody = {
      limit?: number;
    };

    export type GetAllRoomBody = {
      advId: string;
      limit?: number;
    };

    export type AllRoomSourceType = "ynev_marker" | "jotunder_ai" | (string & {});

    export type AllRoomMessage = {
      id: string;
      uid: string;
      text: string;
      createdAt: number;
      sourceType?: AllRoomSourceType;
      sourceId?: string;
    };

    export type SendAllRoomBody = {
      advId: string;
      text: string;
    };

    export type DeleteAllRoomBody = {
      advId: string;
      messageId: string;
    };

    export type AllRoomDeletedEvent = {
      advId: string;
      messageId: string;
      deletedByUid: string;
      createdAt: number;
    };

    export type TypingBody = {
      advId: string;
      targetUid: string;
      room: "direct" | "all";
    };

    export type TypingEvent = {
      advId: string;
      fromUid: string;
      targetUid: string;
      room: "direct" | "all";
      createdAt: number;
    };

    export type GetPolicyBody = {
      advId: string;
    };

    export type SetPolicyBody = {
      advId: string;
    } & UpdateGuards;
  }

  export namespace RestRoutes {
    export type Entry = {
      name: string;
      value: string;
    };

    export type UpsertBody = Entry;
    export type DeleteBody = {
      name: string;
    };

    export type UpdateItemBody = UpdateGuards;

    export type ReportClientErrorBody = {
      message: string;
      stack?: string;
      level?: "error" | "warn" | "info";
      context?: string;
      request?: unknown;
      response?: unknown;
      meta?: unknown;
    };

    export type GetErrorLogsBody = {
      limit?: number;
    };

    export type SubmitBugReportBody = {
      content: string;
      status?: "open";
    };

    export type BugReport = {
      id?: number;
      createdAt: number;
      uid: string | null;
      uname: string | null;
      content: string;
      status: "open";
      userAgent?: string | null;
      path?: string | null;
    };

    export type GetBugReportsBody = {
      limit?: number;
    };

    export type DeleteBugReportBody = {
      id: number;
    };

    export type GetRuntimeStateBody = {
      includeCharacters?: boolean;
    };

    export type UpdateXpLevelsBody = UpdateGuards;

    export type UpdateVendorBody = UpdateGuards;

    export type UpdateNpcBody = UpdateGuards;

    export type GetAllNpcsResponse = {
      npcs: Npc.TNpc[];
      hash: string;
    };

    export type UpdateCombatBody = UpdateGuards;

    export type GetAllCombatsResponse = {
      combats: Combat.TCombat[];
      hash: string;
    };
  }

  export namespace UserRoutes {
    export type GetAllUsersAndCharactersResponse = Array<{
      uid: string;
      name: string;
      json: {
        advsAndChars: {
          id: string;
          name: string;
          character: Character.TCharacterServer | null;
        }[];
      };
    }>;

    export type CreateBody = {
      uid: string;
      name: string;
      pwd: string;
      isAdmin?: boolean;
    };

    export type GetBody = {
      uid: string;
    };

    export type DeleteBody = {
      uid: string;
    };

    export type UpdateBody = {
      uid: string;
    } & UpdateGuards;

    export type LoginBody = {
      uid?: string;
      pwd?: string;
      jwt?: boolean;
      keepLogged?: boolean;
    };
  }

  export namespace PushRoutes {
    export type PublicKeyResponse = {
      publicKey: string;
      configured: boolean;
    };

    export type BrowserSubscription = {
      endpoint: string;
      expirationTime?: number | null;
      keys: {
        p256dh: string;
        auth: string;
      };
    };

    export type SubscribeBody = {
      subscription: BrowserSubscription;
      userAgent?: string;
    };

    export type UnsubscribeBody = {
      endpoint: string;
    };

    export type TestBody = {
      title: string;
      body: string;
      message?: string;
      url?: string;
    };

    export type SendResult = {
      attempted: number;
      sent: number;
      removed: number;
      failed: number;
    };
  }

  export namespace YnevRoutes {
    export type MarkerScope = "self" | "all";

    export type Marker = {
      id: string;
      advId: string;
      scope: MarkerScope;
      uid: string;
      creatorName: string;
      x: number;
      y: number;
      label: string;
      color: string;
      comment: string;
      hidden: boolean;
      createdAt: number;
      updatedAt: number;
    };

    export type GetMarkersResponse = {
      markers: Marker[];
    };

    export type CreateMarkerBody = {
      advId: string;
      scope: MarkerScope;
      x: number;
      y: number;
      label?: string;
      color?: string;
      comment?: string;
      hidden?: boolean;
    };

    export type GetMarkersBody = {
      advId: string;
    };

    export type DeleteMarkerBody = {
      id: string;
    };

    export type DeleteMarkerResponse = {
      id: string;
      deleted: true;
    };

    export type MarkerDeletedEvent = {
      advId: string;
      id: string;
      scope: MarkerScope;
    };

    export type MarkerUpsertedEvent = {
      advId: string;
      marker: Marker;
    };

    export type RevealMarkerBody = {
      id: string;
    };

    export type RevealMarkerResponse = {
      marker: Marker;
    };
  }

  export namespace AdventureRoutes {
    export type CreateBody = {
      json: {
        name: string;
      };
    };

    export type GetBody = {
      id: string;
    };

    export type UpdateBody = {
      id: string;
    } & UpdateGuards;

    export type DeleteBody = {
      id: string;
    };

    export type VendorStateBody = {
      advId: string;
    };

    export type SetVendorStateBody = {
      advId: string;
      enabled: boolean;
      vendorId?: string;
    };

    export type SetCombatStateBody = {
      advId: string;
      enabled: boolean;
      turn?: number;
      combatId?: string;
    };

    export type SubmitCombatInitiativeBody = {
      advId: string;
      roll: number;
    };

    export type CombatNpcResourceAction = "damage" | "healHp" | "healEp" | "resourceDelta";

    export type UpdateCombatNpcResourceBody = {
      advId: string;
      npcUid: string;
      action: CombatNpcResourceAction;
      amount: number;
    };
  }

  export namespace CharacterRoutes {
    export type ItemActionSource = {
      from: "storage" | "equipment";
      index: number;
      storageId?: string;
    };

    export type BagEquipmentSlotId = "bag" | "satchel";

    export type CreateBody = {
      name: string;
    };

    export type GetBody = {
      advId: string;
      uid: string;
      createIfMissing?: boolean;
    };

    export type GetAllBody = {
      advId: string;
    };

    export type GetAllDetailedBody = {
      advId: string;
    };

    export type UpdateBody = {
      advId: string;
      uid: string;
      createIfMissing?: boolean;
    } & UpdateGuards;

    export type UpdateAvatarBody = {
      advId: string;
      uid: string;
    } & UpdateGuards;

    export type GrantXpBody = {
      advId: string;
      uid: string;
      xpDelta: number;
    };

    export type GrantItemBody = {
      advId: string;
      uid: string;
      itemName: string;
      amount?: number;
    };

    export type ApplyLevelUpBody = {
      advId: string;
      uid: string;
      hpGains: number[];
      resourceGains: number[];
      hmAlloc: Character.THm;
      secondaryAlloc?: Record<string, number>;
      levelUps: number;
      specialization?: string;
    };

    export type SpendSecondarySkillPointsBody = {
      advId: string;
      uid: string;
      expectedHash: string;
      statId: string;
      points: number;
    };

    export type DropItemBody = {
      advId: string;
      uid: string;
      source: ItemActionSource;
    };

    export type SellItemBody = {
      advId: string;
      uid: string;
      source: ItemActionSource;
      requestedPriceCopper?: number;
    };

    export type BuyVendorItemBody = {
      advId: string;
      uid: string;
      vendorItemId: string;
    };

    export type ResolveVendorTradeBody = {
      advId: string;
      tradeId: string;
      accepted: boolean;
      finalPriceCopper?: number;
    };

    export type VendorTradeResponse = {
      trade: Vendor.TVendorTrade;
      vendor: Vendor.TVendorState;
    };

    export type PlayerTradeStatus = "pending" | "cancelled" | "completed";

    export type PlayerTradeOffer = {
      items: ItemActionSource[];
      moneyCopper: number;
    };

    export type PlayerTradeParticipant = {
      uid: string;
      accepted: boolean;
      offer: PlayerTradeOffer;
    };

    export type PlayerTradeState = {
      id: string;
      advId: string;
      fromUid: string;
      toUid: string;
      status: PlayerTradeStatus;
      createdAt: number;
      updatedAt: number;
      closedByUid?: string;
      participants: Record<string, PlayerTradeParticipant>;
    };

    export type CreatePlayerTradeBody = {
      advId: string;
      toUid: string;
    };

    export type UpdatePlayerTradeOfferBody = {
      advId: string;
      tradeId: string;
      offer: PlayerTradeOffer;
    };

    export type AcceptPlayerTradeBody = {
      advId: string;
      tradeId: string;
    };

    export type ClosePlayerTradeBody = {
      advId: string;
      tradeId: string;
    };

    export type PlayerTradeResponse = {
      trade: PlayerTradeState;
      characters?: Array<Character.TCharacterServer>;
    };

    export type UseItemBody = {
      advId: string;
      uid: string;
      source: ItemActionSource;
    };

    export type EquipItemBody = {
      advId: string;
      uid: string;
      source: ItemActionSource;
      target?: ItemActionSource;
      targetSlotId?: string;
    };

    export type DeleteBody = {
      advId: string;
      uid: string;
    };

    export type GetClassBody = {
      classId: string;
    };

    export type UpdateClassBody = UpdateGuards;

    export type GetDescentBody = {
      descentId: string;
    };

    export type UpdateDescentBody = UpdateGuards;
  }

  export namespace AiRoutes {
    export type ChatMessage = {
      role: "user" | "assistant";
      content: string;
    };

    export type ChatBody = {
      model?: string;
      messages: ChatMessage[];
      temperature?: number;
      maxTokens?: number;
    };

    export type ChatResponse = {
      reply: string;
      model: string;
      usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
      };
    };
  }
}
