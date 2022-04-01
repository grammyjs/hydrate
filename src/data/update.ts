import { RawApi, Update } from "../deps.deno.ts";
import { CallbackQueryX, installCallbackQueryMethods } from "./callback-query.ts";
import { InlineQueryX, installInlineQueryMethods } from "./inline-query.ts";
import { installPreCheckoutQueryMethods, PreCheckoutQueryX } from "./pre-checkout-query.ts";
import { installShippingQueryMethods, ShippingQueryX } from "./shipping-query.ts";
import { installMessageMethods, MessageX } from "./message.ts";

export interface UpdateX extends Update {
    message: MessageX | undefined;
    edited_message: MessageX | undefined;
    channel_post: MessageX | undefined;
    edited_channel_post: MessageX | undefined;
    inline_query: InlineQueryX | undefined;
    callback_query: CallbackQueryX | undefined;
    shipping_query: ShippingQueryX | undefined;
    pre_checkout_query: PreCheckoutQueryX | undefined;
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
    }
}
