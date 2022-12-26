import { type PreCheckoutQuery, type RawApi } from "../deps.deno.ts";
import { type Other, type Ret } from "../plugin.ts";

export interface PreCheckoutQueryXFragment {
    /**
     * Pre-checkout query-aware alias for `api.answerPreCheckoutQuery`. Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
     *
     * @param ok Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#answerprecheckoutquery
     */
    answer(
        ok: boolean,
        other?: Other<"answerPreCheckoutQuery", "pre_checkout_query_id">,
        signal?: AbortSignal,
    ): Ret<"answerPreCheckoutQuery">;
}

export type PreCheckoutQueryX = PreCheckoutQueryXFragment & PreCheckoutQuery;

export function installPreCheckoutQueryMethods(
    api: RawApi,
    preCheckoutQuery: PreCheckoutQuery,
) {
    const methods: Omit<PreCheckoutQueryXFragment, "message"> = {
        answer: (ok, other, signal) =>
            api.answerPreCheckoutQuery(
                { pre_checkout_query_id: preCheckoutQuery.id, ok, ...other },
                signal,
            ),
    };
    Object.assign(preCheckoutQuery, methods);
}
