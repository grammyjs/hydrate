import { Context } from "../src/deps.deno.ts";
import { type HydrateFlavor } from "../src/plugin.ts";
import {
    assertType,
    describe,
    type Filter,
    type Has,
    type IsExact,
    it,
} from "./deps.test.ts";

// Compile-time type tests for HydrateFlavor preserving type narrowing
// These tests ensure that narrowing from Filter is preserved through HydrateFlavor

describe("HydrateFlavor type preservation", () => {
    describe("Filter<Context, 'message'> narrowing", () => {
        it("should preserve message narrowing - message is not undefined", () => {
            type FilteredCtx = Filter<Context, "message">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            // In the narrowed context, ctx.message should NOT have undefined
            const _testFiltered = (ctx: FilteredCtx) => {
                // ctx.message should be Message, not Message | undefined
                // We check that accessing message_id (which only exists on Message) is a number
                const messageId = ctx.message.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Message text property exists
                const text = ctx.message.text;
                assertType<IsExact<typeof text, string | undefined>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing - message should NOT be undefined
                // We can access message_id directly without optional chaining
                const messageId = ctx.message.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Message properties should still be accessible
                const text = ctx.message.text;
                assertType<IsExact<typeof text, string | undefined>>(true);

                // Hydrated methods should be available
                // Check that delete method exists (not just for type checking but also compilation)
                const deleteMethod = ctx.message.delete;
                // If delete exists, it should be a function
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'callback_query'> narrowing", () => {
        it("should preserve callback_query narrowing", () => {
            type FilteredCtx = Filter<Context, "callback_query">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // callback_query should NOT be undefined - accessing id should work
                const id = ctx.callbackQuery.id;
                assertType<IsExact<typeof id, string>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const id = ctx.callbackQuery.id;
                assertType<IsExact<typeof id, string>>(true);

                // Hydrated properties should be available
                const answer = ctx.callbackQuery.answer;
                // answer should be a function, not undefined
                assertType<IsExact<typeof answer, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'inline_query'> narrowing", () => {
        it("should preserve inline_query narrowing", () => {
            type FilteredCtx = Filter<Context, "inline_query">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // inline_query should NOT be undefined
                const query = ctx.inlineQuery.query;
                assertType<IsExact<typeof query, string>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const query = ctx.inlineQuery.query;
                assertType<IsExact<typeof query, string>>(true);

                // Hydrated methods should be available
                const answer = ctx.inlineQuery.answer;
                // answer should be a function, not undefined
                assertType<IsExact<typeof answer, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'message:text'> narrowing", () => {
        it("should preserve message.text narrowing", () => {
            type FilteredCtx = Filter<Context, "message:text">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // message should NOT be undefined
                const messageId = ctx.message.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // text should be string, not string | undefined
                const text = ctx.message.text;
                assertType<IsExact<typeof text, string>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve both the message and text narrowing
                const messageId = ctx.message.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // text should still be string (not undefined)
                const text = ctx.message.text;
                assertType<IsExact<typeof text, string>>(true);

                // Hydrated methods should be available on the message
                const deleteMethod = ctx.message.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'edited_message'> narrowing", () => {
        it("should preserve edited_message narrowing", () => {
            type FilteredCtx = Filter<Context, "edited_message">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // editedMessage should NOT be undefined
                const messageId = ctx.editedMessage.message_id;
                assertType<IsExact<typeof messageId, number>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const messageId = ctx.editedMessage.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Hydrated methods should be available
                const deleteMethod = ctx.editedMessage.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'channel_post'> narrowing", () => {
        it("should preserve channel_post narrowing", () => {
            type FilteredCtx = Filter<Context, "channel_post">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // channelPost should NOT be undefined
                const messageId = ctx.channelPost.message_id;
                assertType<IsExact<typeof messageId, number>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const messageId = ctx.channelPost.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Hydrated methods should be available
                const editText = ctx.channelPost.editText;
                assertType<IsExact<typeof editText, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'shipping_query'> narrowing", () => {
        it("should preserve shipping_query narrowing", () => {
            type FilteredCtx = Filter<Context, "shipping_query">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // shippingQuery should NOT be undefined
                const id = ctx.shippingQuery.id;
                assertType<IsExact<typeof id, string>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const id = ctx.shippingQuery.id;
                assertType<IsExact<typeof id, string>>(true);

                // Hydrated methods should be available
                const answerMethod = ctx.shippingQuery.answer;
                assertType<IsExact<typeof answerMethod, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'pre_checkout_query'> narrowing", () => {
        it("should preserve pre_checkout_query narrowing", () => {
            type FilteredCtx = Filter<Context, "pre_checkout_query">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // preCheckoutQuery should NOT be undefined
                const id = ctx.preCheckoutQuery.id;
                assertType<IsExact<typeof id, string>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const id = ctx.preCheckoutQuery.id;
                assertType<IsExact<typeof id, string>>(true);

                // Hydrated methods should be available
                const answerMethod = ctx.preCheckoutQuery.answer;
                assertType<IsExact<typeof answerMethod, undefined>>(false);
            };
        });
    });

    describe("Filter<Context, 'chat_join_request'> narrowing", () => {
        it("should preserve chat_join_request narrowing", () => {
            type FilteredCtx = Filter<Context, "chat_join_request">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testFiltered = (ctx: FilteredCtx) => {
                // chatJoinRequest should NOT be undefined
                const date = ctx.chatJoinRequest.date;
                assertType<IsExact<typeof date, number>>(true);
            };

            const _testHydrated = (ctx: HydratedCtx) => {
                // HydrateFlavor should preserve the narrowing
                const date = ctx.chatJoinRequest.date;
                assertType<IsExact<typeof date, number>>(true);

                // Hydrated methods should be available
                const approve = ctx.chatJoinRequest.approve;
                assertType<IsExact<typeof approve, undefined>>(false);
            };
        });
    });

    describe("Combined filters with custom context", () => {
        it("should preserve custom properties with filter narrowing", () => {
            type CustomContext = Context & { myProp: string; count: number };
            type FilteredCtx = Filter<CustomContext, "message">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testHydrated = (ctx: HydratedCtx) => {
                // Custom properties should be preserved
                assertType<IsExact<typeof ctx.myProp, string>>(true);
                assertType<IsExact<typeof ctx.count, number>>(true);

                // Filter narrowing should be preserved - accessing message_id directly
                const messageId = ctx.message.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Hydrated methods should be available
                const deleteMethod = ctx.message.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });
    });

    describe("msg shortcut preservation", () => {
        it("should preserve msg narrowing from message filter", () => {
            type FilteredCtx = Filter<Context, "message">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testHydrated = (ctx: HydratedCtx) => {
                // msg should be accessible without undefined check
                const msgId = ctx.msg.message_id;
                assertType<IsExact<typeof msgId, number>>(true);

                // Hydrated methods should work on msg too
                const deleteMethod = ctx.msg.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });

        it("should preserve msg narrowing from edited_message filter", () => {
            type FilteredCtx = Filter<Context, "edited_message">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testHydrated = (ctx: HydratedCtx) => {
                // msg should point to editedMessage and be accessible
                const msgId = ctx.msg.message_id;
                assertType<IsExact<typeof msgId, number>>(true);

                // Hydrated methods should work on msg
                const deleteMethod = ctx.msg.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });
    });

    describe("API methods return type preservation", () => {
        it("should preserve hydration on ctx.reply", () => {
            type FilteredCtx = Filter<Context, "message">;
            type HydratedCtx = HydrateFlavor<FilteredCtx>;

            const _testHydrated = async (ctx: HydratedCtx) => {
                const sent = await ctx.reply("Hello");

                // Returned message should have message_id
                const messageId = sent.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Returned message should have hydrated methods
                const deleteMethod = sent.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);

                const editText = sent.editText;
                assertType<IsExact<typeof editText, undefined>>(false);
            };
        });

        it("should preserve hydration on ctx.api methods", () => {
            type HydratedCtx = HydrateFlavor<Context>;

            const _testHydrated = async (ctx: HydratedCtx) => {
                const sent = await ctx.api.sendMessage(123, "Hello");

                // Returned message should have message_id
                const messageId = sent.message_id;
                assertType<IsExact<typeof messageId, number>>(true);

                // Returned message should have hydrated methods
                const deleteMethod = sent.delete;
                assertType<IsExact<typeof deleteMethod, undefined>>(false);
            };
        });
    });

    describe("Type narrowing with unfiltered context", () => {
        it("should add hydration methods to optional properties", () => {
            type HydratedCtx = HydrateFlavor<Context>;

            const _testHydrated = (ctx: HydratedCtx) => {
                // Without filter, message is still Message | undefined
                assertType<Has<typeof ctx.message, undefined>>(true);

                // But if we check it exists, we should be able to use hydrated methods
                if (ctx.message) {
                    const messageId = ctx.message.message_id;
                    assertType<IsExact<typeof messageId, number>>(true);

                    const deleteMethod = ctx.message.delete;
                    assertType<IsExact<typeof deleteMethod, undefined>>(false);
                }
            };
        });
    });
});
