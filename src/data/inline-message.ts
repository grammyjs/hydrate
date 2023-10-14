import { type InlineKeyboardMarkup, type InputMedia, type RawApi, type SentWebAppMessage } from "../deps.deno.ts";
import { Other as O, Ret } from "../plugin.ts";
type Other<M extends keyof RawApi, K extends string = never> = O<
  M,
  K | "chat_id" | "message_id"
>;

export interface InlineMessageXFragment {
  /**
   * Message-aware alias for `api.editMessageReplyMarkup`. Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   *
   * @param reply_markup An object for an inline keyboard.
   * @param signal Optional `AbortSignal` to cancel the request
   *
   * **Official reference:** https://core.telegram.org/bots/api#editmessagereplymarkup
   */
  editReplyMarkup(
    reply_markup?: InlineKeyboardMarkup,
    signal?: AbortSignal,
  ): Ret<"editMessageReplyMarkup">;

  /**
   * Message-aware alias for `api.editMessageText`. Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   *
   * @param text New text of the message, 1-4096 characters after entities parsing
   * @param other Optional remaining parameters, confer the official reference below
   * @param signal Optional `AbortSignal` to cancel the request
   *
   * **Official reference:** https://core.telegram.org/bots/api#editmessagetext
   */
  editText(
    text: string,
    other?: Other<"editMessageText", "text">,
    signal?: AbortSignal,
  ): Ret<"editMessageText">;

  /**
   * Message-aware alias for `api.editMessageLiveLocation`. Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   *
   * @param latitude Latitude of new location
   * @param longitude Longitude of new location
   * @param other Optional remaining parameters, confer the official reference below
   * @param signal Optional `AbortSignal` to cancel the request
   *
   * **Official reference:** https://core.telegram.org/bots/api#editmessagelivelocation
   */
  editLiveLocation(
    latitude: number,
    longitude: number,
    other?: Other<
      "editMessageLiveLocation",
      "inline_message_id" | "latitude" | "longitude"
    >,
    signal?: AbortSignal,
  ): Ret<"editMessageLiveLocation">;

  /**
   * Message-aware alias for `api.stopMessageLiveLocation`. Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   *
   * @param other Optional remaining parameters, confer the official reference below
   * @param signal Optional `AbortSignal` to cancel the request
   *
   * **Official reference:** https://core.telegram.org/bots/api#stopmessagelivelocation
   */
  stopLiveLocation(
    other?: Other<"stopMessageLiveLocation", "inline_message_id">,
    signal?: AbortSignal,
  ): Ret<"stopMessageLiveLocation">;

  /**
   * Message-aware alias for `api.editMessageCaption`. Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   *
   * @param caption New caption of the message, 0-1024 characters after entities parsing
   * @param other Optional remaining parameters, confer the official reference below
   * @param signal Optional `AbortSignal` to cancel the request
   *
   * **Official reference:** https://core.telegram.org/bots/api#editmessagecaption
   */
  editCaption(
    caption?: string,
    other?: Other<"editMessageCaption", "inline_message_id" | "caption">,
    signal?: AbortSignal,
  ): Ret<"editMessageCaption">;

  /**
   * Message-aware alias for `api.editMessageMedia`. Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   *
   * @param media An object for a new media content of the message
   * @param other Optional remaining parameters, confer the official reference below
   * @param signal Optional `AbortSignal` to cancel the request
   *
   * **Official reference:** https://core.telegram.org/bots/api#editmessagemedia
   */
  editMedia(
    media: InputMedia,
    other?: Other<"editMessageMedia", "inline_message_id" | "media">,
    signal?: AbortSignal,
  ): Ret<"editMessageMedia">;
}

export type InlineMessageX = InlineMessageXFragment & SentWebAppMessage;

export function installInlineMessageMethods(
  api: RawApi,
  message: SentWebAppMessage,
) {
  const methods: InlineMessageXFragment = {
    editReplyMarkup: (reply_markup, signal) =>
      api.editMessageReplyMarkup(
        { inline_message_id: message.inline_message_id, reply_markup },
        signal,
      ),
    editText: (text, other, signal) =>
      api.editMessageText(
        {
          inline_message_id: message.inline_message_id,
          text,
          ...other,
        },
        signal,
      ),
    editLiveLocation: (latitude, longitude, other, signal) =>
      api.editMessageLiveLocation(
        {
          inline_message_id: message.inline_message_id,
          latitude,
          longitude,
          ...other,
        },
        signal,
      ),
    stopLiveLocation: (other, signal) =>
      api.stopMessageLiveLocation(
        { inline_message_id: message.inline_message_id, ...other },
        signal,
      ),
    editCaption: (caption, other, signal) =>
      api.editMessageCaption(
        {
          inline_message_id: message.inline_message_id,
          caption,
          ...other,
        },
        signal,
      ),
    editMedia: (media, other, signal) =>
      api.editMessageMedia(
        {
          inline_message_id: message.inline_message_id,
          media,
          ...other,
        },
        signal,
      ),
  };
  Object.assign(message, methods);
}
