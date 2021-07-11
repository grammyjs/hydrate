import { RawApi, Update } from '../deps.deno.ts'
import { installCallbackQueryMethods } from './callback-query.ts'
import { installInlineQueryMethods } from './inline-query.ts'
import { installPreCheckoutQueryMethods } from './pre-checkout-query.ts'
import { installShippingQueryMethods } from './shipping-query.ts'
import { installMessageMethods } from './message.ts'

export function installUpdateMethods(api: RawApi, update: Update) {
    if (update.message !== undefined) installMessageMethods(api, update.message)
    else if (update.channel_post !== undefined)
        installMessageMethods(api, update.channel_post)
    else if (update.edited_message !== undefined)
        installMessageMethods(api, update.edited_message)
    else if (update.edited_channel_post !== undefined)
        installMessageMethods(api, update.edited_channel_post)
    else if (update.inline_query !== undefined)
        installInlineQueryMethods(api, update.inline_query)
    else if (update.callback_query !== undefined)
        installCallbackQueryMethods(api, update.callback_query)
    else if (update.shipping_query !== undefined)
        installShippingQueryMethods(api, update.shipping_query)
    else if (update.pre_checkout_query !== undefined)
        installPreCheckoutQueryMethods(api, update.pre_checkout_query)
}
