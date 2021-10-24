# Hydration plugin for grammY

Please confer the [official documentation](https://grammy.dev/plugins/hydrate.html) for this plugin to learn more about this plugin, including about its **Installation**.

Here is a brief description, though:
This plugin installs useful methods on two types of objects, namely

1. the results of API calls, and
2. the objects on the context object `ctx`.

The purpose of this plugin is best illustrated by an example.

**WITHOUT** this plugin:

```ts
bot.on(":photo", async (ctx) => {
    const statusMessage = await ctx.reply("Processing your image, please wait");
    await doWork(); // some long image processing
    await ctx.api.deleteMessage(statusMessage.message_id);
});
bot.on("callback_query", async (ctx) => {
    await ctx.answerCallbackQuery();
});
```

**WITH** this plugin:

```ts
bot.on(":photo", async (ctx) => {
    const statusMessage = await ctx.reply("Processing your image, please wait");
    await doWork(); // some long image processing
    await statusMessage.delete(); // so easy!
});
bot.on("callback_query", async (ctx) => {
    await ctx.callbackQuery.answer(); // this works now, too
});
```
