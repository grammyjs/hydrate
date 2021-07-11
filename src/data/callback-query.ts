import { CallbackQuery, RawApi } from '../deps.deno.ts'
import { Other, Ret } from '../plugin.ts'
import { installMessageMethods, MessageX } from './message.ts'

export interface CallbackQueryX {
    message?: MessageX

    /**
     * Callback query-aware alias for `api.answerCallbackQuery`. Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
     *
     * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @Botfather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
     *
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#answercallbackquery
     */
    answer(
        other?: Other<'answerCallbackQuery', 'callback_query_id'>,
        signal?: AbortSignal
    ): Ret<'answerCallbackQuery'>
}

export function installCallbackQueryMethods(
    api: RawApi,
    callbackQuery: CallbackQuery
) {
    if (callbackQuery.message !== undefined)
        installMessageMethods(api, callbackQuery.message)

    const methods: Omit<CallbackQueryX, 'message'> = {
        answer: (other, signal) =>
            api.answerCallbackQuery(
                { callback_query_id: callbackQuery.id, ...other },
                signal
            ),
    }
    Object.assign(callbackQuery, methods)
}
