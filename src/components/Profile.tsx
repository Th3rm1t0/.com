import type { FC, ReactNode } from "react";

type ProfileProps = {
	imageSrc: string;
	name: string;
	bio: ReactNode;
};

export const Profile: FC<ProfileProps> = ({ imageSrc, name, bio }) => {
	return (
		<section className="px-4 py-10">
			<div className="mx-auto max-w-4xl border rounded-md border-white/10 bg-white/5 p-8 backdrop-blur">
				<div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
					<img
						src={imageSrc}
						alt={name}
						className="h-28 w-28 flex-shrink-0 rounded-full border border-white/20 object-cover sm:h-32 sm:w-32"
						loading="lazy"
					/>
					<div className="text-center text-slate-200 sm:text-left">
						<h2 className="md:text-4xl text-2xl font-semibold tracking-wide text-white">
							{name}
						</h2>
						<p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
							{bio}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
