import { type FC, useEffect, useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { SkillMeter } from "./SkillMeter";
import { getAccentStyle } from "./skillAccents";
import type { Skill, SkillCategory } from "./types";

const TITLE_ID = "skill-detail-title";
const TERM_CLASS =
	"w-20 shrink-0 font-black font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-60";

type SkillDetailModalProps = {
	skill: Skill;
	category: SkillCategory;
	onClose: () => void;
};

export const SkillDetailModal: FC<SkillDetailModalProps> = ({
	skill,
	category,
	onClose,
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const detail = skill.detail;
	const Icon = skill.icon;

	// showModal() でトップレイヤーに出す。フォーカストラップと Esc は
	// ネイティブの <dialog> にそのまま任せる。
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (!dialog.open) dialog.showModal();

		// 背景（::backdrop）へのクリックはダイアログ自身が target になる。
		// 背景はキーボードから到達できないため、対になるキー操作は
		// <dialog> ネイティブの Esc がそのまま担う。
		const handleBackdropClick = (event: globalThis.MouseEvent) => {
			if (event.target === dialog) dialog.close();
		};
		dialog.addEventListener("click", handleBackdropClick);

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			dialog.removeEventListener("click", handleBackdropClick);
			document.body.style.overflow = previousOverflow;
		};
	}, []);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		dialog.addEventListener("close", onClose);
		return () => dialog.removeEventListener("close", onClose);
	}, [onClose]);

	const close = () => dialogRef.current?.close();

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={TITLE_ID}
			style={getAccentStyle(category.accent)}
			className="m-auto w-[min(32rem,calc(100vw-2rem))] overflow-hidden border-[3px] border-band-ink bg-band-paper p-0 text-band-ink shadow-[0.5rem_0.5rem_0_var(--band-ink)] backdrop:bg-band-ink/70 motion-safe:animate-skill-modal-in motion-safe:backdrop:animate-skill-backdrop-in"
		>
			<div className="flex max-h-[min(40rem,calc(100dvh-3rem))] flex-col">
				<header className="flex shrink-0 items-center gap-3 border-band-ink border-b-[3px] bg-[var(--skill-accent)] px-4 py-3">
					{Icon ? (
						<Icon aria-hidden="true" className="size-6 shrink-0" />
					) : (
						<span
							aria-hidden="true"
							className="grid size-6 shrink-0 place-items-center border-2 border-band-ink font-black font-display text-[0.7rem] leading-none"
						>
							{skill.name.charAt(0).toUpperCase()}
						</span>
					)}
					<h2
						id={TITLE_ID}
						className="min-w-0 flex-1 truncate font-black font-display text-xl uppercase tracking-tight sm:text-2xl"
					>
						{skill.name}
					</h2>
					<button
						type="button"
						onClick={close}
						aria-label="閉じる"
						className="grid size-8 shrink-0 cursor-pointer place-items-center border-[3px] border-band-ink bg-band-paper shadow-[0.15rem_0.15rem_0_var(--band-ink)] hover:translate-x-[0.15rem] hover:translate-y-[0.15rem] hover:shadow-none focus-visible:outline-2 focus-visible:outline-band-ink focus-visible:outline-offset-2 motion-safe:transition-[translate,box-shadow] motion-safe:duration-150"
					>
						<FiX aria-hidden="true" className="size-4" strokeWidth={3} />
					</button>
				</header>

				<div className="flex flex-col gap-5 overflow-y-auto px-5 py-5">
					<dl className="flex flex-col gap-3">
						<div className="flex items-center gap-4">
							<dt className={TERM_CLASS}>Category</dt>
							<dd className="font-bold font-display text-sm uppercase tracking-tight">
								{category.label}
							</dd>
						</div>
						<div className="flex items-center gap-4">
							<dt className={TERM_CLASS}>Level</dt>
							<dd>
								<SkillMeter level={skill.level} isRevealed size="lg" />
							</dd>
						</div>
						{detail?.experience ? (
							<div className="flex items-center gap-4">
								<dt className={TERM_CLASS}>Since</dt>
								<dd className="font-mono text-sm">{detail.experience}</dd>
							</div>
						) : null}
					</dl>

					{detail?.summary ? (
						<p className="border-band-ink border-l-[3px] pl-3 text-[0.85rem] leading-[1.9]">
							{detail.summary}
						</p>
					) : null}

					{detail?.highlights?.length ? (
						<div>
							<h3 className="mb-2 font-black font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-60">
								Highlights
							</h3>
							<ul className="flex flex-col gap-2">
								{detail.highlights.map((highlight) => (
									<li
										key={highlight}
										className="flex gap-2.5 text-[0.82rem] leading-relaxed"
									>
										<span
											aria-hidden="true"
											className="mt-[0.4rem] size-2.5 shrink-0 border-2 border-band-ink bg-[var(--skill-accent)]"
										/>
										<span>{highlight}</span>
									</li>
								))}
							</ul>
						</div>
					) : null}

					{detail?.links?.length ? (
						<div className="flex flex-wrap gap-2">
							{detail.links.map((link) => (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 border-[3px] border-band-ink bg-band-paper px-3 py-1.5 font-black font-display text-xs uppercase no-underline shadow-[0.2rem_0.2rem_0_var(--band-ink)] hover:translate-x-[0.15rem] hover:translate-y-[0.15rem] hover:shadow-none focus-visible:outline-2 focus-visible:outline-band-ink focus-visible:outline-offset-2 motion-safe:transition-[translate,box-shadow] motion-safe:duration-150"
								>
									{link.label}
									<FiArrowUpRight
										aria-hidden="true"
										className="size-3.5"
										strokeWidth={3}
									/>
								</a>
							))}
						</div>
					) : null}
				</div>
			</div>
		</dialog>
	);
};
