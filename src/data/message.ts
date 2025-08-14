import {
    type Message,
    type MessageEntity,
    type RawApi,
    type ReactionType,
    type ReactionTypeEmoji,
} from "../deps.deno.ts";
import { type Other as O, type Ret } from "../plugin.ts";
import { type InlineMessageXFragment } from "./inline-message.ts";
type Other<M extends keyof RawApi, K extends string = never> = O<
    M,
    K | "chat_id" | "message_id"
>;

export interface MessageXFragment extends InlineMessageXFragment {
    /**
     * Message-aware alias for `api.forwardMessage`. Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned.
     *
     * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#forwardmessage
     */
    forward(
        chat_id: number | string,
        other?: Other<"forwardMessage", "from_chat_id">,
        signal?: AbortSignal,
    ): Ret<"forwardMessage">;

    /**
     * Message-aware alias for `api.copyMessage`. Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
     *
     * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#copymessage
     */
    copy(
        chat_id: number | string,
        other?: Other<"copyMessage", "from_chat_id">,
        signal?: AbortSignal,
    ): Ret<"copyMessage">;

    /**
     * Message-aware alias for `api.pinChatMessage`. Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively. Returns True on success.
     *
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#pinchatmessage
     */
    pin(
        other?: Other<"pinChatMessage", "chat_id" | "message_id">,
        signal?: AbortSignal,
    ): Ret<"pinChatMessage">;

    /**
     * Message-aware alias for `api.unpinChatMessage`. Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively. Returns True on success.
     *
     * @param message_id Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned.
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#unpinchatmessage
     */
    unpin(
        other?: Other<"unpinChatMessage", "chat_id" | "message_id">,
        signal?: AbortSignal,
    ): Ret<"unpinChatMessage">;

    /**
     * Message-aware alias for `api.deleteMessage`. Use this method to delete a message, including service messages, with the following limitations:
     * - A message can only be deleted if it was sent less than 48 hours ago.
     * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
     * - Bots can delete outgoing messages in private chats, groups, and supergroups.
     * - Bots can delete incoming messages in private chats.
     * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
     * - If the bot is an administrator of a group, it can delete any message there.
     * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
     * Returns True on success.
     *
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#deletemessage
     */
    delete(signal?: AbortSignal): Ret<"deleteMessage">;

    /**
     * Message-aware alias for `api.setMessageReaction`. Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success.
     *
     * @param reaction New list of reaction types to set on the message
     * @param other Optional remaining parameters, confer the official reference below
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#setmessagereaction
     */
    react(
        reaction:
            | ReactionTypeEmoji["emoji"]
            | ReactionType
            | Array<ReactionTypeEmoji["emoji"] | ReactionType>,
        other?: Other<"setMessageReaction", "reaction">,
        signal?: AbortSignal,
    ): Ret<"setMessageReaction">;

    /**
     * Message-aware alias for `api.getCustomEmojiStickers`. Use this method to get information about emoji stickers by their identifiers. Returns an Array of Sticker on success.
     *
     * @param signal Optional `AbortSignal` to cancel the request
     *
     * **Official reference:** https://core.telegram.org/bots/api#getcustomemojistickers
     */
    getCustomEmojiStickers(signal?: AbortSignal): Ret<"getCustomEmojiStickers">;
}

export type MessageX = MessageXFragment & Message;

export function installMessageMethods(api: RawApi, message: Message) {
    const methods: MessageXFragment = {
        forward: (chat_id, other, signal) =>
            api.forwardMessage(
                {
                    chat_id,
                    from_chat_id: message.chat.id,
                    message_id: message.message_id,
                    ...other,
                },
                signal,
            ),
        copy: (chat_id, other, signal) =>
            api.copyMessage(
                {
                    chat_id,
                    from_chat_id: message.chat.id,
                    message_id: message.message_id,
                    ...other,
                },
                signal,
            ),
        pin: (other, signal) =>
            api.pinChatMessage({
                business_connection_id: message.business_connection_id,
                chat_id: message.chat.id,
                message_id: message.message_id,
                ...other,
            }, signal),
        unpin: (other, signal) =>
            api.unpinChatMessage({
                business_connection_id: message.business_connection_id,
                chat_id: message.chat.id,
                message_id: message.message_id,
                ...other,
            }, signal),
        delete: (signal) =>
            api.deleteMessage(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                },
                signal,
            ),
        editReplyMarkup: (reply_markup, signal) =>
            api.editMessageReplyMarkup(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    reply_markup,
                },
                signal,
            ),
        editText: (text, other, signal) =>
            api.editMessageText(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    text,
                    ...other,
                },
                signal,
            ),
        editLiveLocation: (latitude, longitude, other, signal) =>
            api.editMessageLiveLocation(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    latitude,
                    longitude,
                    ...other,
                },
                signal,
            ),
        stopLiveLocation: (other, signal) =>
            api.stopMessageLiveLocation(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    ...other,
                },
                signal,
            ),
        editCaption: (caption, other, signal) =>
            api.editMessageCaption(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    caption,
                    ...other,
                },
                signal,
            ),
        editMedia: (media, other, signal) =>
            api.editMessageMedia(
                {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    media,
                    ...other,
                },
                signal,
            ),
        react: (reaction, other, signal) =>
            api.setMessageReaction({
                chat_id: message.chat.id,
                message_id: message.message_id,
                reaction: typeof reaction === "string"
                    ? [{ type: "emoji", emoji: reaction }]
                    : (Array.isArray(reaction) ? reaction : [reaction])
                        .map((emoji) =>
                            typeof emoji === "string"
                                ? { type: "emoji", emoji }
                                : emoji
                        ),
                ...other,
            }, signal),
        getCustomEmojiStickers: async (signal) => {
            const entities = message.entities ?? message.caption_entities;
            if (entities === undefined || entities.length === 0) return [];
            type Emoji = MessageEntity.CustomEmojiMessageEntity;
            const identifiers = entities
                .filter((e): e is Emoji => e.type === "custom_emoji")
                .map((e) => e.custom_emoji_id);
            return await api.getCustomEmojiStickers(
                { custom_emoji_ids: identifiers },
                signal,
            );
        },
    };
    Object.assign(message, methods);
}
