import type {
    ChatMember,
    ChatPermissions,
    RawApi,
    User,
} from "../deps.deno.ts";
import type { Other, Ret } from "../plugin.ts";

export interface UserXFragment {
    getProfilePhotos(
        other?: Other<"getUserProfilePhotos">,
        signal?: AbortSignal,
    ): Ret<"getUserProfilePhotos">;
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
}

export type UserX = UserXFragment & User;
export type ChatMemberX = ChatMember & { user: UserX };

export function installUserMethods(api: RawApi, user: User, chatId: number) {
    const methods: UserXFragment = {
        getProfilePhotos: (other, signal) =>
            api.getUserProfilePhotos({
                user_id: user.id,
                ...other,
            }, signal),
        ban: (other, signal) =>
            api.banChatMember({
                chat_id: chatId,
                user_id: user.id,
                ...other,
            }, signal),
        promote: (other, signal) =>
            api.promoteChatMember({
                chat_id: chatId,
                user_id: user.id,
                ...other,
            }, signal),
        restrict: (permissions, other, signal) =>
            api.restrictChatMember({
                permissions,
                chat_id: chatId,
                user_id: user.id,
                ...other,
            }, signal),
        setCustomTitle: (title, other, signal) =>
            api.setChatAdministratorCustomTitle({
                custom_title: title,
                chat_id: chatId,
                user_id: user.id,
                ...other,
            }, signal),
        unban: (other, signal) =>
            api.unbanChatMember({
                chat_id: chatId,
                user_id: user.id,
                ...other,
            }, signal),
    };

    return Object.assign(user, methods);
}
