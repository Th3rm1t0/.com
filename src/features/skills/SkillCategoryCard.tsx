import type { FC } from "react";
import { SkillItemRow } from "./SkillItemRow";
import { getAccentStyle } from "./skillAccents";
import type { Skill, SkillCategory } from "./types";
import { useRevealOnScroll } from "./useRevealOnScroll";

/** カードごとにずらす時間 (ms) */
const CARD_STEP_MS = 90;

type SkillCategoryCardProps = {
	category: SkillCategory;
	index: number;
	onSelectSkill: (skill: Skill) => void;
};

export const SkillCategoryCard: FC<SkillCategoryCardProps> = ({
	category,
	index,
	onSelectSkill,
}) => {
	const { targetRef, isRevealed } = useRevealOnScroll<HTMLDivElement>();
	const baseDelayMs = index * CARD_STEP_MS;
	const CategoryIcon = category.icon;
	const tilt = index % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.4deg]";

	return (
		// 出現アニメーション用のラッパー。ホバーの遅延と干渉させないため
		// transition-delay を持つ層とホバーする層を分けている。
		<div
			ref={targetRef}
			style={{ transitionDelay: `${baseDelayMs}ms` }}
			className={`h-full motion-safe:transition-[translate,opacity] motion-safe:duration-[600ms] motion-safe:ease-out ${
				isRevealed ? "" : "motion-safe:translate-y-10 motion-safe:opacity-0"
			}`}
		>
			<article
				style={getAccentStyle(category.accent)}
				className={`flex h-full flex-col border-[3px] border-band-ink bg-band-paper text-band-ink shadow-[0.45rem_0.45rem_0_var(--band-ink)] motion-safe:transition-[translate,rotate,box-shadow] motion-safe:duration-200 motion-safe:ease-out hover:translate-x-[0.3rem] hover:translate-y-[0.3rem] hover:rotate-0 hover:shadow-[0.1rem_0.1rem_0_var(--band-ink)] ${tilt}`}
			>
				<header className="flex items-center gap-3 border-band-ink border-b-[3px] bg-[var(--skill-accent)] px-4 py-2.5">
					<h3 className="min-w-0 truncate font-black font-display text-lg uppercase tracking-tight sm:text-xl">
						{category.label}
					</h3>
					{CategoryIcon ? (
						<CategoryIcon
							aria-hidden="true"
							className="ml-auto size-5 shrink-0"
						/>
					) : null}
				</header>

				<div className="flex flex-1 flex-col px-4 py-3 sm:px-5">
					{category.caption ? (
						<p className="mb-2 border-band-ink/25 border-b-2 border-dashed pb-2.5 text-[0.72rem] text-band-ink/70 leading-relaxed">
							{category.caption}
						</p>
					) : null}
					<ul className="flex flex-col">
						{category.skills.map((skill, skillIndex) => (
							<SkillItemRow
								key={skill.id}
								skill={skill}
								index={skillIndex}
								isRevealed={isRevealed}
								baseDelayMs={baseDelayMs + 120}
								onSelect={onSelectSkill}
							/>
						))}
					</ul>
				</div>

				<div
					aria-hidden="true"
					className="h-2 border-band-ink border-t-[3px]"
					style={{
						backgroundImage:
							"repeating-linear-gradient(45deg, var(--skill-accent) 0 6px, transparent 6px 12px)",
					}}
				/>
			</article>
		</div>
	);
};
