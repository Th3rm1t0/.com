import type { IconType } from "react-icons";
import type { SkillAccent } from "./skillAccents";

/** メーターの段階数。SkillLevel の上限と必ず揃える。 */
export const SKILL_LEVEL_MAX = 5;

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type SkillLink = {
	label: string;
	href: string;
};

/** モーダルに出す詳細。どの項目も任意で、あるものだけ描画される。 */
export type SkillDetail = {
	summary?: string;
	/** 使用歴（例: "2020 〜 / 約 5 年"） */
	experience?: string;
	highlights?: ReadonlyArray<string>;
	links?: ReadonlyArray<SkillLink>;
};

export type Skill = {
	id: string;
	name: string;
	level: SkillLevel;
	/** 省略した場合は頭文字のフォールバックを表示する */
	icon?: IconType;
	detail?: SkillDetail;
};

export type SkillCategory = {
	id: string;
	/** カード見出し。大文字表示されるので英語想定 */
	label: string;
	caption?: string;
	accent: SkillAccent;
	icon?: IconType;
	skills: ReadonlyArray<Skill>;
};

export const countSkills = (categories: ReadonlyArray<SkillCategory>): number =>
	categories.reduce((total, category) => total + category.skills.length, 0);
