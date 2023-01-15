import { type RawApi, type Update } from "../deps.deno.ts";
import {
    type CallbackQueryX,
    installCallbackQueryMethods,
} from "./callback-query.ts";
import {
    type ChatJoinRequestX,
    installChatJoinRequestMethods,
} from "./chat-join-request.ts";
import {
    type ChosenInlineResultX,
    installChosenInlineResultMethods,
} from "./chosen-inline-result.ts";
import {
    type InlineQueryX,
    installInlineQueryMethods,
} from "./inline-query.ts";
import { installMessageMethods, type MessageX } from "./message.ts";
import {
    installPreCheckoutQueryMethods,
    type PreCheckoutQueryX,
} from "./pre-checkout-query.ts";
import {
    installShippingQueryMethods,
    type ShippingQueryX,
} from "./shipping-query.ts";

export interface UpdateX extends Update {
    message: MessageX & Update.NonChannel | undefined;
    edited_message: MessageX & Update.Edited & Update.NonChannel | undefined;
    channel_post: MessageX & Update.Channel | undefined;
    edited_channel_post: MessageX & Update.Edited & Update.Channel | undefined;
    inline_query: InlineQueryX | undefined;
    callback_query: CallbackQueryX | undefined;
    shipping_query: ShippingQueryX | undefined;
    pre_checkout_query: PreCheckoutQueryX | undefined;
    chosen_inline_result: ChosenInlineResultX | undefined;
    chat_join_request: ChatJoinRequestX | undefined;
}

export function installUpdateMethods(api: RawApi, update: Update) {
    if (update.message !== undefined) {
        installMessageMethods(api, update.message);
    } else if (update.channel_post !== undefined) {
        installMessageMethods(api, update.channel_post);
    } else if (update.edited_message !== undefined) {
        installMessageMethods(api, update.edited_message);
    } else if (update.edited_channel_post !== undefined) {
        installMessageMethods(api, update.edited_channel_post);
    } else if (update.inline_query !== undefined) {
        installInlineQueryMethods(api, update.inline_query);
    } else if (update.callback_query !== undefined) {
        installCallbackQueryMethods(api, update.callback_query);
    } else if (update.shipping_query !== undefined) {
        installShippingQueryMethods(api, update.shipping_query);
    } else if (update.pre_checkout_query !== undefined) {
        installPreCheckoutQueryMethods(api, update.pre_checkout_query);
    } else if (update.chosen_inline_result !== undefined) {
        installChosenInlineResultMethods(api, update.chosen_inline_result);
    } else if (update.chat_join_request !== undefined) {
        installChatJoinRequestMethods(api, update.chat_join_request);
    }
}
