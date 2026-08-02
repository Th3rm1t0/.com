import { type CSSProperties, type FC, useCallback, useState } from "react";
import { SkillCategoryCard } from "./SkillCategoryCard";
import { SkillDetailModal } from "./SkillDetailModal";
import { countSkills, type Skill, type SkillCategory } from "./types";
import { useRevealOnScroll } from "./useRevealOnScroll";

const GRID_BACKDROP: CSSProperties = {
	backgroundImage:
		"linear-gradient(var(--band-grid) 2px, transparent 2px), linear-gradient(90deg, var(--band-grid) 2px, transparent 2px)",
	backgroundSize: "clamp(2.5rem, 7vw, 4rem) clamp(2.5rem, 7vw, 4rem)",
	maskImage: "radial-gradient(115% 85% at 50% 25%, #000 30%, transparent 100%)",
	WebkitMaskImage:
		"radial-gradient(115% 85% at 50% 25%, #000 30%, transparent 100%)",
};

/** モーダルはカテゴリのアクセント色も使うため、両方を保持する */
type ActiveSkill = {
	skill: Skill;
	category: SkillCategory;
};

type SkillsSectionProps = {
	categories: ReadonlyArray<SkillCategory>;
	title?: string;
};

export const SkillsSection: FC<SkillsSectionProps> = ({
	categories,
	title = "Skills",
}) => {
	const { targetRef, isRevealed } = useRevealOnScroll<HTMLElement>();
	const [activeSkill, setActiveSkill] = useState<ActiveSkill | null>(null);

	const closeDetail = useCallback(() => setActiveSkill(null), []);

	return (
		<section
			id="skills"
			className="relative isolate px-5 py-20 sm:px-6 sm:py-24"
		>
			<div
				aria-hidden="true"
				className="-z-10 absolute inset-0"
				style={GRID_BACKDROP}
			/>

			<div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
				<header
					ref={targetRef}
					className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${
						isRevealed ? "" : "motion-safe:translate-y-6 motion-safe:opacity-0"
					} motion-safe:transition-[translate,opacity] motion-safe:duration-[600ms] motion-safe:ease-out`}
				>
					<h2 className="-rotate-1 inline-block self-start bg-band-ink px-4 py-2 font-black font-display text-4xl text-band-paper uppercase tracking-tight shadow-[0.35rem_0.35rem_0_var(--band-cyan)] motion-safe:transition-[background-color,color,box-shadow] motion-safe:duration-200 sm:px-5 sm:text-6xl sm:shadow-[0.5rem_0.5rem_0_var(--band-cyan)]">
						{title}
					</h2>

					<dl className="flex shrink-0 self-start border-[3px] border-band-ink bg-band-paper text-band-ink shadow-[0.3rem_0.3rem_0_var(--band-ink)] sm:self-auto">
						<div className="border-band-ink border-r-[3px] px-4 py-2">
							<dt className="font-black font-mono text-[0.55rem] uppercase tracking-[0.2em] opacity-60">
								Categories
							</dt>
							<dd className="font-black font-display text-2xl leading-none">
								{String(categories.length).padStart(2, "0")}
							</dd>
						</div>
						<div className="px-4 py-2">
							<dt className="font-black font-mono text-[0.55rem] uppercase tracking-[0.2em] opacity-60">
								Items
							</dt>
							<dd className="font-black font-display text-2xl leading-none">
								{String(countSkills(categories)).padStart(2, "0")}
							</dd>
						</div>
					</dl>
				</header>

				<div className="grid gap-7 md:grid-cols-2 md:gap-8">
					{categories.map((category, index) => (
						<SkillCategoryCard
							key={category.id}
							category={category}
							index={index}
							onSelectSkill={(skill) => setActiveSkill({ skill, category })}
						/>
					))}
				</div>
			</div>

			{activeSkill ? (
				<SkillDetailModal
					key={activeSkill.skill.id}
					skill={activeSkill.skill}
					category={activeSkill.category}
					onClose={closeDetail}
				/>
			) : null}
		</section>
	);
};
