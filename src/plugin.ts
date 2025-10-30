import { type CallbackQueryX } from "./data/callback-query.ts";
import { type ChatJoinRequestX } from "./data/chat-join-request.ts";
import { type ChatX, installChatMethods } from "./data/chat.ts";
import { installInlineMessageMethods } from "./data/inline-message.ts";
import { type InlineQueryX } from "./data/inline-query.ts";
import { installMessageMethods, type MessageX } from "./data/message.ts";
import { type PreCheckoutQueryX } from "./data/pre-checkout-query.ts";
import { type ShippingQueryX } from "./data/shipping-query.ts";
import { installUpdateMethods, UpdateX } from "./data/update.ts";
import { type ChatMemberX, installUserMethods } from "./data/user.ts";
import {
    type Api,
    type ApiCallFn,
    type Chat,
    type ChatMember,
    type Context,
    GrammyError,
    type Message,
    type Opts,
    type RawApi,
    type SentWebAppMessage,
    type Transformer,
    type Update,
} from "./deps.deno.ts";

/**
 * Transformative API Flavor that adds file handling utilities to the supplied
 * context object. Check out the
 * [documentation](https://grammy.dev/guide/context.html#transformative-context-flavours)
 * about this kind of context flavor.
 */
export type HydrateFlavor<C extends Context> = ObjectAssign<C, ContextX<C>>;
export type HydrateApiFlavor<A extends Api> = ApiX<A>;

/**
 * Mapping table from method names to API call result extensions.
 *
 * In other words, every key K of this interface identifies a method of the Bot
 * API that exists as method on `ctx`, `ctx.api`, and `ctx.api.raw`. The return
 * type of every one of these three methods will be augmented by `X[K]` via type
 * intersection.
 */
interface X {
    sendMessage: MessageX;
    forwardMessage: MessageX;
    sendPhoto: MessageX;
    sendAudio: MessageX;
    sendDocument: MessageX;
    sendVideo: MessageX;
    sendAnimation: MessageX;
    sendVoice: MessageX;
    sendVideoNote: MessageX;
    editMessageLiveLocation: MessageX | true;
    stopMessageLiveLocation: MessageX | true;
    sendVenue: MessageX;
    sendContact: MessageX;
    sendPoll: MessageX;
    sendDice: MessageX;
    editMessageText: MessageX | true;
    editMessageCaption: MessageX | true;
    editMessageMedia: MessageX | true;
    editMessageReplyMarkup: MessageX | true;
    sendSticker: MessageX;
    sendInvoice: MessageX;
    sendGame: MessageX;
    setGameScore: MessageX | true;
    getChat: ChatX;
    getChatMember: ChatMemberX;
}

/**
 * Plugin that hydrates the context object and API call results, and equips the
 * objects with useful methods that are calling `bot.api` with values prefilled
 * from the object they are installed on.
 *
 * For example, this plugin allows you to use `await ctx.message.delete()` instead of
 * `await ctx.deleteMessage()`.
 *
 * Check out [the official plugin
 * documentation](https://grammy.dev/plugins/hydrate.html) on the grammY
 * webiste.
 */
export function hydrate<C extends Context>() {
    const hydrator = hydrateApi<C["api"]["raw"]>();
    return (ctx: HydrateFlavor<C>, next: () => Promise<void>) => {
        ctx.api.config.use(hydrator);
        installUpdateMethods(ctx.api.raw, ctx.update);
        return next();
    };
}

export function hydrateContext<C extends Context>() {
    return (ctx: HydrateFlavor<C>, next: () => Promise<void>) => {
        installUpdateMethods(ctx.api.raw, ctx.update);
        return next();
    };
}

export function hydrateApi<R extends RawApi = RawApi>(): Transformer<R> {
    const t: Transformer = async (prev, method, payload, signal) => {
        const res = await prev(method, payload, signal);
        if (res.ok) {
            if (isMessage(res.result)) {
                installMessageMethods(toApi(prev), res.result);
            } else if (isInlineMessage(res.result)) {
                installInlineMessageMethods(toApi(prev), res.result);
            } else if (isChatMember(res.result) && hasChatId(payload)) {
                installUserMethods(
                    toApi(prev),
                    res.result.user,
                    payload.chat_id,
                );
            } else if (isChat(res.result)) {
                installChatMethods(toApi(prev), res.result);
            }
            // TODO: hydrate other method call results
        }
        return res;
    };
    return t;
}

function isMessage(obj: unknown): obj is Message {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "message_id" in obj &&
        "chat" in obj
    );
}

function isInlineMessage(obj: unknown): obj is SentWebAppMessage {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "inline_message_id" in obj
    );
}

function isChatMember(obj: unknown): obj is ChatMember {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "status" in obj &&
        "user" in obj
    );
}

function isChat(obj: unknown): obj is Chat {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "type" in obj &&
        typeof obj.type === "string" &&
        ["private", "group", "supergroup", "channel"].includes(obj.type)
    );
}

function hasChatId(obj: unknown): obj is { chat_id: number } {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "chat_id" in obj &&
        typeof obj.chat_id === "number"
    );
}

export type Other<M extends keyof RawApi, K extends string = never> = Omit<
    Opts<M>,
    K
>;

export type Ret<M extends keyof RawApi> = ReturnType<RawApi[M]>;

function toApi(connector: ApiCallFn) {
    return new Proxy({} as RawApi, {
        get(_, method: string & keyof RawApi) {
            const api = connector.bind(null, method);
            return async (...args: Parameters<typeof api>) => {
                const data = await api(...args);
                if (data.ok) {
                    return data.result;
                } else {
                    throw new GrammyError(
                        `Call to '${method}' failed!`,
                        data,
                        method,
                        args[0],
                    );
                }
            };
        },
    });
}

// Helper types to add `X` to `Context` and `Api` and `RawApi`
type ObjectAssign<DestType, SourceType> = {
    [Key in keyof (DestType & SourceType)]: Key extends keyof SourceType
        ? SourceType[Key]
        : Key extends keyof DestType ? DestType[Key]
        : never;
};

interface ContextX<C extends Context> {
    api: ApiX<C["api"]>;
    reply: Extend<C["reply"], X["sendMessage"]>;
    forwardMessage: Extend<C["forwardMessage"], X["forwardMessage"]>;
    replyWithPhoto: Extend<C["replyWithPhoto"], X["sendPhoto"]>;
    replyWithAudio: Extend<C["replyWithAudio"], X["sendAudio"]>;
    replyWithDocument: Extend<C["replyWithDocument"], X["sendDocument"]>;
    replyWithVideo: Extend<C["replyWithVideo"], X["sendVideo"]>;
    replyWithAnimation: Extend<C["replyWithAnimation"], X["sendAnimation"]>;
    replyWithVoice: Extend<C["replyWithVoice"], X["sendVoice"]>;
    replyWithVideoNote: Extend<C["replyWithVideoNote"], X["sendVideoNote"]>;
    editMessageLiveLocation: Extend<
        C["editMessageLiveLocation"],
        X["editMessageLiveLocation"]
    >;
    stopMessageLiveLocation: Extend<
        C["stopMessageLiveLocation"],
        X["stopMessageLiveLocation"]
    >;
    replyWithVenue: Extend<C["replyWithVenue"], X["sendVenue"]>;
    replyWithContact: Extend<C["replyWithContact"], X["sendContact"]>;
    replyWithPoll: Extend<C["replyWithPoll"], X["sendPoll"]>;
    replyWithDice: Extend<C["replyWithDice"], X["sendDice"]>;
    editMessageText: Extend<C["editMessageText"], X["editMessageText"]>;
    editMessageCaption: Extend<
        C["editMessageCaption"],
        X["editMessageCaption"]
    >;
    editMessageMedia: Extend<C["editMessageMedia"], X["editMessageMedia"]>;
    editMessageReplyMarkup: Extend<
        C["editMessageReplyMarkup"],
        X["editMessageReplyMarkup"]
    >;
    replyWithSticker: Extend<C["replyWithSticker"], X["sendSticker"]>;
    replyWithInvoice: Extend<C["replyWithInvoice"], X["sendInvoice"]>;
    replyWithGame: Extend<C["replyWithGame"], X["sendGame"]>;
    getChatMember: Extend<C["getChatMember"], X["getChatMember"]>;
    getChat: Extend<C["getChat"], X["getChat"]>;
    getAuthor: Extend<C["getAuthor"], X["getChatMember"]>;

    update: UpdateX;

    message: MessageX & C["message"];
    editedMessage: MessageX & C["editedMessage"];
    channelPost: MessageX & C["channelPost"];
    editedChannelPost: MessageX & C["editedChannelPost"];
    inlineQuery: InlineQueryX & C["inlineQuery"];
    callbackQuery: CallbackQueryX & C["callbackQuery"];
    shippingQuery: ShippingQueryX & C["shippingQuery"];
    preCheckoutQuery: PreCheckoutQueryX & C["preCheckoutQuery"];
    chatJoinRequest: ChatJoinRequestX & C["chatJoinRequest"];

    msg: MessageX & C["msg"];
}

type ApiX<A extends Api> = AddX<A> & {
    raw: RawApiX<A["raw"]>;
};
type RawApiX<R extends RawApi> = AddX<R>;

// deno-lint-ignore no-explicit-any
type AddX<Q extends Record<keyof X, (...args: any[]) => any>> = {
    [K in keyof Q]: K extends keyof X ? Extend<Q[K], X[K]>
        : Q[K];
};
// deno-lint-ignore no-explicit-any
type Extend<F extends (...args: any[]) => any, X> = (
    ...args: Parameters<F>
) => Promise<Await<ReturnType<F>> & X>;
type Await<T> = T extends PromiseLike<infer V> ? Await<V> : T;
