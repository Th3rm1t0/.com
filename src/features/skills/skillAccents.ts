import type { CSSProperties } from "react";

export const skillAccents = [
	"magenta",
	"cyan",
	"yellow",
	"lime",
	"orange",
	"violet",
] as const;

export type SkillAccent = (typeof skillAccents)[number];

const ACCENT_VARIABLES: Record<SkillAccent, string> = {
	magenta: "var(--band-magenta)",
	cyan: "var(--band-cyan)",
	yellow: "var(--band-yellow)",
	lime: "var(--band-lime)",
	orange: "var(--band-orange)",
	violet: "var(--band-violet)",
};

/**
 * カテゴリのアクセント色を --skill-accent に流し込む。
 * 配下のコンポーネントは bg-[var(--skill-accent)] を見るだけなので、
 * 色を増やすときは skillAccents と ACCENT_VARIABLES に 1 行足すだけで済む。
 */
export const getAccentStyle = (accent: SkillAccent): CSSProperties =>
	({ "--skill-accent": ACCENT_VARIABLES[accent] }) as CSSProperties;
