import { type ChatJoinRequest, type RawApi } from "../deps.deno.ts";
import { type Ret } from "../plugin.ts";

export interface ChatJoinRequestXFragment {
    /**
     * Chat join request-aware alias for `api.approveChatJoinRequest`. Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
     *
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#approvechatjoinrequest
     */
    approve(signal?: AbortSignal): Ret<"approveChatJoinRequest">;

    /**
     * Chat join request-aware alias for `api.declineChatJoinRequest`. Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
     *
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#declinechatjoinrequest
     */
    decline(signal?: AbortSignal): Ret<"declineChatJoinRequest">;

    /**
     * Chat join request-aware alias for `api.answerChatJoinRequestQuery`. Use this method to process a received chat join request query. Returns True on success.
     *
     * @param result Result of the query. Must be either “approve” to allow the user to join the chat, “decline” to disallow the user to join the chat, or “queue” to leave the decision to other administrators.
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#answerchatjoinrequestquery
     */
    answer(
        result: "approve" | "decline" | "queue",
        signal?: AbortSignal,
    ): Ret<"answerChatJoinRequestQuery">;

    /**
     * Chat join request-aware alias for `api.sendChatJoinRequestWebApp`. Use this method to process a received chat join request query by showing a Mini App to the user before deciding the outcome. Returns True on success.
     *
     * @param web_app_url The URL of the Mini App to be opened
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#sendchatjoinrequestwebapp
     */
    sendWebApp(
        web_app_url: string,
        signal?: AbortSignal,
    ): Ret<"answerChatJoinRequestQuery">;
}

export type ChatJoinRequestX = ChatJoinRequestXFragment & ChatJoinRequest;

export function installChatJoinRequestMethods(
    api: RawApi,
    chatJoinRequest: ChatJoinRequest,
) {
    const methods: ChatJoinRequestXFragment = {
        approve: (signal) =>
            api.approveChatJoinRequest(
                {
                    chat_id: chatJoinRequest.chat.id,
                    user_id: chatJoinRequest.from.id,
                },
                signal,
            ),
        decline: (signal) =>
            api.declineChatJoinRequest(
                {
                    chat_id: chatJoinRequest.chat.id,
                    user_id: chatJoinRequest.from.id,
                },
                signal,
            ),
        answer: (result, signal) =>
            api.answerChatJoinRequestQuery({
                chat_join_request_query_id: orThrow(chatJoinRequest.query_id),
                result,
            }, signal),
        sendWebApp: (web_app_url, signal) =>
            api.sendChatJoinRequestWebApp({
                chat_join_request_query_id: orThrow(chatJoinRequest.query_id),
                web_app_url,
            }, signal),
    };
    Object.assign(chatJoinRequest, methods);
}

function orThrow(query: string | undefined) {
    if (query === undefined) {
        throw new Error("chat join request did not contain query_id");
    }
    return query;
}
