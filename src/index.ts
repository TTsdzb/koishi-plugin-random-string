import { Context, Schema } from "koishi";

export const name = "random-string";

export interface Config {
  chars: string;
}

export const Config: Schema<Config> = Schema.object({
  chars: Schema.string().default(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`-=[]\\;',./~!@#$%^&*()_+{}|:\"<>?"
  ),
}).i18n({
  "zh-CN": require("./locales/zh-CN")._config,
});

export function apply(ctx: Context, config: Config) {
  // Register i18n
  ctx.i18n.define("zh-CN", require("./locales/zh-CN"));

  const pool = [];
  for (const char of config.chars) pool.push(char);

  ctx.command("rands <len:posint>").action(({ session }, len) => {
    if (!len) return session.text(".lengthRequired");

    let s = "";
    while (s.length < len)
      s += config.chars[Math.floor(Math.random() * config.chars.length)];

    return s;
  });
}
