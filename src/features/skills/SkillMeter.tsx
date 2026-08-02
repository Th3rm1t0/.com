import type { FC } from "react";
import { SKILL_LEVEL_MAX, type SkillLevel } from "./types";

const SEGMENTS = Array.from(
	{ length: SKILL_LEVEL_MAX },
	(_, index) => index + 1,
);

/** 1 セグメントごとにずらす時間 (ms) */
const SEGMENT_STEP_MS = 55;

const SIZE_CLASSES = {
	sm: "h-3.5 w-2.5 sm:w-3",
	lg: "h-5 w-4",
} as const;

type SkillMeterProps = {
	level: SkillLevel;
	isRevealed: boolean;
	delayMs?: number;
	size?: keyof typeof SIZE_CLASSES;
};

export const SkillMeter: FC<SkillMeterProps> = ({
	level,
	isRevealed,
	delayMs = 0,
	size = "sm",
}) => {
	return (
		<div className="flex shrink-0 gap-[0.2rem]">
			{/* セグメントは装飾。読み上げには文章を 1 つだけ渡す */}
			<span className="sr-only">
				{`熟練度 ${SKILL_LEVEL_MAX} 段階中 ${level}`}
			</span>
			{SEGMENTS.map((segment) => (
				<span
					key={segment}
					aria-hidden="true"
					style={{
						transitionDelay: `${delayMs + segment * SEGMENT_STEP_MS}ms`,
					}}
					className={`border-2 border-band-ink motion-safe:origin-bottom motion-safe:transition-[scale] motion-safe:duration-300 motion-safe:ease-out ${SIZE_CLASSES[size]} ${
						segment <= level ? "bg-[var(--skill-accent)]" : "bg-transparent"
					} ${isRevealed ? "" : "motion-safe:scale-y-0"}`}
				/>
			))}
		</div>
	);
};
