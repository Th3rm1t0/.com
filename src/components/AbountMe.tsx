import type { FC, ReactNode } from "react";

type AboutMeProps = {
	career: ReactNode;
	skills: ReactNode;
	curiosities: ReactNode;
};

export const AboutMe: FC<AboutMeProps> = ({ career, skills, curiosities }) => {
	return (
		<section className="px-4 py-10">
			<div className="mx-auto max-w-4xl border rounded-md border-white/10 bg-white/5 p-8 backdrop-blur">
				<div className="text-center text-slate-200 sm:text-left">
					<h2 className="md:text-3xl text-2xl font-semibold tracking-wide text-white">
						経歴 / Career
					</h2>
					<div className="mt-3 text-sm text-left sm:text-base leading-relaxed text-slate-300">
						{career}
					</div>
				</div>
			</div>
		</section>
	);
};
