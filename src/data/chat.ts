import type {
    Chat,
    ChatFromGetChat,
    ChatPermissions,
    InputFile,
    RawApi,
} from "../deps.deno.ts";
import type { Other, Ret } from "../plugin.ts";

export interface ChatXFragment {
    setPermissions(
        permissions: ChatPermissions,
        other?: Other<"setChatPermissions">,
        signal?: AbortSignal,
    ): Ret<"setChatPermissions">;
    getMember(
        userId: number,
        other?: Other<"getChatMember">,
        signal?: AbortSignal,
    ): Ret<"getChatMember">;
    getMembersCount(
        other?: Other<"getChatMemberCount">,
        signal?: AbortSignal,
    ): Ret<"getChatMemberCount">;
    getAdmins(
        other?: Other<"getChatAdministrators">,
        signal?: AbortSignal,
    ): Ret<"getChatAdministrators">;
    setStickerSet(
        stickerSetName: string,
        other?: Other<"setChatStickerSet">,
        signal?: AbortSignal,
    ): Ret<"setChatStickerSet">;
    deleteStickerSet(
        other?: Other<"deleteChatStickerSet">,
        signal?: AbortSignal,
    ): Ret<"deleteChatStickerSet">;
    createForumTopic(
        name: string,
        other?: Other<"createForumTopic">,
        signal?: AbortSignal,
    ): Ret<"createForumTopic">;
    editForumTopic(
        messageThreadId: number,
        other?: Other<"editForumTopic">,
        signal?: AbortSignal,
    ): Ret<"editForumTopic">;
    closeForumTopic(
        messageThreadId: number,
        other?: Other<"closeForumTopic">,
        signal?: AbortSignal,
    ): Ret<"closeForumTopic">;
    reopenForumTopic(
        messageThreadId: number,
        other?: Other<"reopenForumTopic">,
        signal?: AbortSignal,
    ): Ret<"reopenForumTopic">;
    deleteForumTopic(
        messageThreadId: number,
        other?: Other<"deleteForumTopic">,
        signal?: AbortSignal,
    ): Ret<"deleteForumTopic">;
    unpinAllForumTopicMessages(
        messageThreadId: number,
        other?: Other<"unpinAllForumTopicMessages">,
        signal?: AbortSignal,
    ): Ret<"unpinAllForumTopicMessages">;
    editGeneralForumTopic(
        name: string,
        other?: Other<"editGeneralForumTopic">,
        signal?: AbortSignal,
    ): Ret<"editGeneralForumTopic">;
    closeGeneralForumTopic(
        other?: Other<"closeGeneralForumTopic">,
        signal?: AbortSignal,
    ): Ret<"closeGeneralForumTopic">;
    reopenGeneralForumTopic(
        other?: Other<"reopenGeneralForumTopic">,
        signal?: AbortSignal,
    ): Ret<"reopenGeneralForumTopic">;
    hideGeneralForumTopic(
        other?: Other<"hideGeneralForumTopic">,
        signal?: AbortSignal,
    ): Ret<"hideGeneralForumTopic">;
    unhideGeneralForumTopic(
        other?: Other<"unhideGeneralForumTopic">,
        signal?: AbortSignal,
    ): Ret<"unhideGeneralForumTopic">;
    setMenuButton(
        other?: Other<"setChatMenuButton">,
        signal?: AbortSignal,
    ): Ret<"setChatMenuButton">;
    getMenuButton(
        other?: Other<"getChatMenuButton">,
        signal?: AbortSignal,
    ): Ret<"getChatMenuButton">;
    leave(
        other?: Other<"leaveChat">,
        signal?: AbortSignal,
    ): Ret<"leaveChat">;
    setPhoto(
        photo: InputFile,
        other?: Other<"setChatPhoto">,
        signal?: AbortSignal,
    ): Ret<"setChatPhoto">;
    deletePhoto(
        other?: Other<"deleteChatPhoto">,
        signal?: AbortSignal,
    ): Ret<"deleteChatPhoto">;
    setTitle(
        title: string,
        other?: Other<"setChatTitle">,
        signal?: AbortSignal,
    ): Ret<"setChatTitle">;
    setDescription(
        description: string,
        other?: Other<"setChatDescription">,
        signal?: AbortSignal,
    ): Ret<"setChatDescription">;
    unpinAllMessages(
        other?: Other<"unpinAllChatMessages">,
        signal?: AbortSignal,
    ): Ret<"unpinAllChatMessages">;
    revokeInviteLink(
        inviteLink: string,
        other?: Other<"revokeChatInviteLink">,
        signal?: AbortSignal,
    ): Ret<"revokeChatInviteLink">;
    editInviteLink(
        inviteLink: string,
        other?: Other<"editChatInviteLink">,
        signal?: AbortSignal,
    ): Ret<"editChatInviteLink">;
    createInviteLink(
        other?: Other<"createChatInviteLink">,
        signal?: AbortSignal,
    ): Ret<"createChatInviteLink">;
    exportInviteLink(
        other?: Other<"exportChatInviteLink">,
        signal?: AbortSignal,
    ): Ret<"exportChatInviteLink">;
    unbanSenderChat(
        senderChatId: number,
        other?: Other<"unbanChatSenderChat">,
        signal?: AbortSignal,
    ): Ret<"unbanChatSenderChat">;
    banSenderChat(
        senderChatId: number,
        other?: Other<"banChatSenderChat">,
        signal?: AbortSignal,
    ): Ret<"banChatSenderChat">;
    banMember(
        userId: number,
        other?: Other<"banChatMember">,
        signal?: AbortSignal,
    ): Ret<"banChatMember">;
    unbanMember(
        userId: number,
        other?: Other<"unbanChatMember">,
        signal?: AbortSignal,
    ): Ret<"unbanChatMember">;
}

export type ChatX = ChatXFragment & ChatFromGetChat;

export function installChatMethods(api: RawApi, chat: Chat) {
    const methods: ChatXFragment = {
        setPermissions: (permissions, other, signal) =>
            api.setChatPermissions(
                {
                    chat_id: chat.id,
                    permissions,
                    ...other,
                },
                signal,
            ),
        getMember: (userId, other, signal) =>
            api.getChatMember(
                {
                    chat_id: chat.id,
                    user_id: userId,
                    ...other,
                },
                signal,
            ),
        getMembersCount: (other, signal) =>
            api.getChatMemberCount({ chat_id: chat.id, ...other }, signal),
        getAdmins: (other, signal) =>
            api.getChatAdministrators({ chat_id: chat.id, ...other }, signal),
        setStickerSet: (stickerSetName, other, signal) =>
            api.setChatStickerSet({
                chat_id: chat.id,
                sticker_set_name: stickerSetName,
                ...other,
            }, signal),
        deleteStickerSet: (other, signal) =>
            api.deleteChatStickerSet({ chat_id: chat.id, ...other }, signal),
        createForumTopic: (name, other, signal) =>
            api.createForumTopic({ chat_id: chat.id, name, ...other }, signal),
        editForumTopic: (messageThreadId, other, signal) =>
            api.editForumTopic({
                chat_id: chat.id,
                message_thread_id: messageThreadId,
                ...other,
            }, signal),
        closeForumTopic: (messageThreadId, other, signal) =>
            api.closeForumTopic({
                chat_id: chat.id,
                message_thread_id: messageThreadId,
                ...other,
            }, signal),
        reopenForumTopic: (messageThreadId, other, signal) =>
            api.reopenForumTopic({
                chat_id: chat.id,
                message_thread_id: messageThreadId,
                ...other,
            }, signal),
        deleteForumTopic: (messageThreadId, other, signal) =>
            api.deleteForumTopic({
                chat_id: chat.id,
                message_thread_id: messageThreadId,
                ...other,
            }, signal),
        unpinAllForumTopicMessages: (messageThreadId, other, signal) =>
            api.unpinAllForumTopicMessages(
                {
                    chat_id: chat.id,
                    message_thread_id: messageThreadId,
                    ...other,
                },
                signal,
            ),
        editGeneralForumTopic: (name, other, signal) =>
            api.editGeneralForumTopic(
                { chat_id: chat.id, name, ...other },
                signal,
            ),
        closeGeneralForumTopic: (other, signal) =>
            api.closeGeneralForumTopic({ chat_id: chat.id, ...other }, signal),
        reopenGeneralForumTopic: (other, signal) =>
            api.reopenGeneralForumTopic({ chat_id: chat.id, ...other }, signal),
        hideGeneralForumTopic: (other, signal) =>
            api.hideGeneralForumTopic({ chat_id: chat.id, ...other }, signal),
        unhideGeneralForumTopic: (other, signal) =>
            api.unhideGeneralForumTopic({ chat_id: chat.id, ...other }, signal),
        setMenuButton: (other, signal) =>
            api.setChatMenuButton({ chat_id: chat.id, ...other }, signal),
        getMenuButton: (other, signal) =>
            api.getChatMenuButton({ chat_id: chat.id, ...other }, signal),
        leave: (other, signal) =>
            api.leaveChat({ chat_id: chat.id, ...other }, signal),
        setPhoto: (photo, other, signal) =>
            api.setChatPhoto({ chat_id: chat.id, photo, ...other }, signal),
        deletePhoto: (other, signal) =>
            api.deleteChatPhoto({ chat_id: chat.id, ...other }, signal),
        setTitle: (title, other, signal) =>
            api.setChatTitle({ chat_id: chat.id, title, ...other }, signal),
        setDescription: (description, other, signal) =>
            api.setChatDescription(
                { chat_id: chat.id, description, ...other },
                signal,
            ),
        unpinAllMessages: (other, signal) =>
            api.unpinAllChatMessages({ chat_id: chat.id, ...other }, signal),
        revokeInviteLink: (inviteLink, other, signal) =>
            api.revokeChatInviteLink({
                chat_id: chat.id,
                invite_link: inviteLink,
                ...other,
            }, signal),
        editInviteLink: (inviteLink, other, signal) =>
            api.editChatInviteLink({
                chat_id: chat.id,
                invite_link: inviteLink,
                ...other,
            }, signal),
        createInviteLink: (other, signal) =>
            api.createChatInviteLink({ chat_id: chat.id, ...other }, signal),
        exportInviteLink: (other, signal) =>
            api.exportChatInviteLink({ chat_id: chat.id, ...other }, signal),
        unbanSenderChat: (senderChatId, other, signal) =>
            api.unbanChatSenderChat({
                chat_id: chat.id,
                sender_chat_id: senderChatId,
                ...other,
            }, signal),
        banSenderChat: (senderChatId, other, signal) =>
            api.banChatSenderChat({
                chat_id: chat.id,
                sender_chat_id: senderChatId,
                ...other,
            }, signal),
        banMember: (userId, other, signal) =>
            api.banChatMember(
                { chat_id: chat.id, user_id: userId, ...other },
                signal,
            ),
        unbanMember: (userId, other, signal) =>
            api.unbanChatMember(
                { chat_id: chat.id, user_id: userId, ...other },
                signal,
            ),
    };

    Object.assign(chat, methods);
}
