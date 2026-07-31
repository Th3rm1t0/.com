import type { FC, ReactNode } from "react";

type ProfileProps = {
	imageSrc: string;
	name: string;
	bio: ReactNode;
};

export const Profile: FC<ProfileProps> = ({ imageSrc, name, bio }) => {
	return (
		<section className="relative isolate overflow-hidden px-5 py-28 sm:px-6 sm:py-32">
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-10 translate-y-[4%] bg-band-yellow motion-safe:transition-colors motion-safe:duration-200"
				style={{ clipPath: "var(--band-shape-a)" }}
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-band-magenta motion-safe:transition-colors motion-safe:duration-200"
				style={{ clipPath: "var(--band-shape-a)" }}
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-band-cyan motion-safe:transition-colors motion-safe:duration-200"
				style={{
					clipPath: "var(--band-shape-b)",
					backgroundImage:
						"radial-gradient(var(--band-halftone) 1px, transparent 1.6px)",
					backgroundSize: "9px 9px",
				}}
			/>
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:gap-10 sm:text-left lg:gap-12">
				<img
					src={imageSrc}
					alt={name}
					className="size-28 flex-shrink-0 rounded-full object-cover ring-4 ring-band-paper shadow-[0.35rem_0.35rem_0_var(--band-ink)] motion-safe:transition-shadow motion-safe:duration-200 sm:size-36"
					loading="lazy"
				/>
				<div className="flex min-w-0 flex-col items-center gap-4 sm:items-start sm:gap-5">
					<h2 className="-rotate-1 inline-block max-w-full bg-band-ink px-4 py-2 font-display text-2xl font-extrabold tracking-tight text-balance text-band-paper shadow-[0.3rem_0.3rem_0_var(--band-yellow)] motion-safe:transition-[background-color,color,box-shadow] motion-safe:duration-200 sm:px-5 sm:py-2.5 sm:text-4xl sm:shadow-[0.4rem_0.4rem_0_var(--band-yellow)] lg:text-5xl">
						{name}
					</h2>
					<p className="max-w-prose text-[0.95rem] leading-[2.2] text-pretty sm:text-base">
						<span className="box-decoration-clone bg-band-paper px-2.5 py-1 text-band-ink motion-safe:transition-colors motion-safe:duration-200 sm:px-3">
							{bio}
						</span>
					</p>
				</div>
			</div>
		</section>
	);
};
