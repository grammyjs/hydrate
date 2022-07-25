import { type ChatJoinRequest, type RawApi } from "../deps.deno.ts";
import { type Ret } from "../plugin.ts";

interface ChatJoinRequestXFragment {
    /**
     * Join chat request-aware alias for `api.approveChatJoinRequest`. Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
     *
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#approvechatjoinrequest
     */
    approve(signal?: AbortSignal): Ret<"approveChatJoinRequest">;

    /**
     * Join chat request-aware alias for `api.declineChatJoinRequest`. Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
     *
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#declinechatjoinrequest
     */
    decline(signal?: AbortSignal): Ret<"declineChatJoinRequest">;
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
    };
    Object.assign(chatJoinRequest, methods);
}
