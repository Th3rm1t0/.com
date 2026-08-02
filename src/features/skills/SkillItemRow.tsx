import type { FC } from "react";
import { FiChevronRight } from "react-icons/fi";
import { SkillMeter } from "./SkillMeter";
import type { Skill } from "./types";

/** 行ごとにずらす時間 (ms) */
const ROW_STEP_MS = 65;

type SkillItemRowProps = {
	skill: Skill;
	index: number;
	isRevealed: boolean;
	baseDelayMs: number;
	onSelect: (skill: Skill) => void;
};

export const SkillItemRow: FC<SkillItemRowProps> = ({
	skill,
	index,
	isRevealed,
	baseDelayMs,
	onSelect,
}) => {
	const delayMs = baseDelayMs + index * ROW_STEP_MS;
	const Icon = skill.icon;

	return (
		<li
			style={{ transitionDelay: `${delayMs}ms` }}
			className={`border-band-ink/15 border-b-2 last:border-b-0 motion-safe:transition-[translate,opacity] motion-safe:duration-500 motion-safe:ease-out ${
				isRevealed ? "" : "motion-safe:-translate-x-3 motion-safe:opacity-0"
			}`}
		>
			<button
				type="button"
				onClick={() => onSelect(skill)}
				className="group flex w-full cursor-pointer items-center gap-3 px-1 py-2.5 text-left hover:bg-[var(--skill-accent)]/25 focus-visible:-outline-offset-2 focus-visible:bg-[var(--skill-accent)]/25 focus-visible:outline-2 focus-visible:outline-band-ink"
			>
				{Icon ? (
					<Icon aria-hidden="true" className="size-5 shrink-0" />
				) : (
					<span
						aria-hidden="true"
						className="grid size-5 shrink-0 place-items-center border-2 border-band-ink font-black font-display text-[0.6rem] leading-none"
					>
						{skill.name.charAt(0).toUpperCase()}
					</span>
				)}
				<span className="min-w-0 flex-1 truncate font-bold font-display text-sm">
					{skill.name}
				</span>
				<SkillMeter
					level={skill.level}
					isRevealed={isRevealed}
					delayMs={delayMs}
				/>
				<FiChevronRight
					aria-hidden="true"
					className="size-4 shrink-0 opacity-35 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
					strokeWidth={3}
				/>
			</button>
		</li>
	);
};
