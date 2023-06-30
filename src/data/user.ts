import { Chat, ChatPermissions, RawApi, User } from "../deps.deno.ts";
import { Other, Ret } from "../plugin.ts";

export interface NoChatInfoUserXFragment {
    getProfilePhotos(
        other?: Other<"getUserProfilePhotos">,
        signal?: AbortSignal,
    ): Ret<"getUserProfilePhotos">;
    // TODO: determine if these should be hydrated
    // ban(
    //     chatId: Chat | number,
    //     other?: Other<"banChatMember">,
    //     signal?: AbortSignal,
    // ): Ret<"banChatMember">;
    // unban(
    //     chatId: Chat | number,
    //     other?: Other<"unbanChatMember">,
    //     signal?: AbortSignal,
    // ): Ret<"unbanChatMember">;
    // restrict(
    //     permissions: ChatPermissions,
    //     chatId: Chat | number,
    //     other?: Other<"restrictChatMember">,
    //     signal?: AbortSignal,
    // ): Ret<"restrictChatMember">;
    // promote(
    //     chatId: Chat | number,
    //     other?: Other<"promoteChatMember">,
    //     signal?: AbortSignal,
    // ): Ret<"promoteChatMember">;
    // setCustomTitle(
    //     title: string,
    //     chatId: number | Chat,
    //     other?: Other<"setChatAdministratorCustomTitle">,
    //     signal?: AbortSignal,
    // ): Ret<"setChatAdministratorCustomTitle">;
    // getChatMembership(
    //     chatId: number | Chat,
    //     other?: Other<"getChatMember">,
    //     signal?: AbortSignal,
    // ): Ret<"getChatMember">;
}

export interface UserXFragment extends NoChatInfoUserXFragment {
    ban(
        other?: Other<"banChatMember">,
        signal?: AbortSignal,
    ): Ret<"banChatMember">;
    unban(
        other?: Other<"unbanChatMember">,
        signal?: AbortSignal,
    ): Ret<"unbanChatMember">;
    restrict(
        permissions: ChatPermissions,
        other?: Other<"restrictChatMember">,
        signal?: AbortSignal,
    ): Ret<"restrictChatMember">;
    promote(
        other?: Other<"promoteChatMember">,
        signal?: AbortSignal,
    ): Ret<"promoteChatMember">;
    setCustomTitle(
        title: string,
        other?: Other<"setChatAdministratorCustomTitle">,
        signal?: AbortSignal,
    ): Ret<"setChatAdministratorCustomTitle">;
    getChatMembership(
        other?: Other<"getChatMember">,
        signal?: AbortSignal,
    ): Ret<"getChatMember">;
}

export type NoChatInfoUserX = NoChatInfoUserXFragment & User;
export type UserX = UserXFragment & User;

function installCommonMethods(api: RawApi, user: User) {
    const methods: NoChatInfoUserXFragment = {
        getProfilePhotos: (other, signal) =>
            api.getUserProfilePhotos({
                user_id: user.id,
                ...other,
            }, signal),
    };

    return Object.assign(user, methods);
}

export function installUserMethods(api: RawApi, user: User, chat?: Chat) {
    installCommonMethods(api, user);

    if (!chat) return user;

    const methods: Omit<UserXFragment, "getProfilePhotos"> = {
        ban: (other, signal) =>
            api.banChatMember({
                chat_id: chat.id,
                user_id: user.id,
                ...other,
            }, signal),
        getChatMembership: (other, signal) =>
            api.getChatMember({
                chat_id: chat.id,
                user_id: user.id,
                ...other,
            }, signal),

        promote: (other, signal) =>
            api.promoteChatMember({
                chat_id: chat.id,
                user_id: user.id,
                ...other,
            }, signal),
        restrict: (permissions, other, signal) =>
            api.restrictChatMember({
                permissions,
                chat_id: chat.id,
                user_id: user.id,
                ...other,
            }, signal),
        setCustomTitle: (title, other, signal) =>
            api.setChatAdministratorCustomTitle({
                custom_title: title,
                chat_id: chat.id,
                user_id: user.id,
                ...other,
            }, signal),
        unban: (other, signal) =>
            api.unbanChatMember({
                chat_id: chat.id,
                user_id: user.id,
                ...other,
            }, signal),
    };

    return Object.assign(user, methods);
}
