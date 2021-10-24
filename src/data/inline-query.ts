import { InlineQuery, InlineQueryResult, RawApi } from '../deps.deno.ts'
import { Other, Ret } from '../plugin.ts'

export interface InlineQueryX {
    /**
     * Inline query-aware alias for `api.answerInlineQuery`. Use this method to send answers to an inline query. On success, True is returned.
     * No more than 50 results per query are allowed.
     *
     * Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities.
     *
     * @param inline_query_id Unique identifier for the answered query
     * @param results An array of results for the inline query
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#answerinlinequery
     */
    answer(
        results: readonly InlineQueryResult[],
        other?: Other<'answerInlineQuery', 'inline_query_id' | 'results'>,
        signal?: AbortSignal
    ): Ret<'answerInlineQuery'>
}

export function installInlineQueryMethods(
    api: RawApi,
    inlineQuery: InlineQuery
) {
    const methods: Omit<InlineQueryX, 'message'> = {
        answer: (results, other, signal) =>
            api.answerInlineQuery(
                { inline_query_id: inlineQuery.id, results, ...other },
                signal
            ),
    }
    Object.assign(inlineQuery, methods)
}
