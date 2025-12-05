import { type FC, lazy, type ReactNode, Suspense } from "react";

const LazyBoxRotate = lazy(async () => {
	const module = await import("./BoxRotate");
	return { default: module.BoxRotate };
});

type HeroSectionProps = {
	heroRef: React.RefObject<HTMLElement | null>;
	shouldLoadBox: boolean;
	title: string;
	tagline: ReactNode;
};

export const HeroSection: FC<HeroSectionProps> = ({
	heroRef,
	shouldLoadBox,
	title,
	tagline,
}) => {
	return (
		<section
			ref={(node) => {
				heroRef.current = node;
			}}
			className="relative min-h-[65vh] overflow-hidden"
		>
			{shouldLoadBox ? (
				<Suspense
					fallback={
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_60%)]"
						/>
					}
				>
					<LazyBoxRotate />
				</Suspense>
			) : (
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_60%)]"
				/>
			)}
			<div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center">
				<h1 className="mt-[2em] font-['Inter',sans-serif] text-[clamp(3rem,7vw,4.5rem)] font-bold text-[#fefefe]">
					{title}
				</h1>
				<div className="mx-auto mb-8 mt-5 p-1 max-w-[620px] text-base leading-[1.6] text-[#fefefe] backdrop-blur rounded">
					<p>{tagline}</p>
				</div>
			</div>
		</section>
	);
};
