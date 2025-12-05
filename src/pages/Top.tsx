import { type FC, useEffect, useRef, useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { Profile } from "../components/Profile";
import type { SocialLink } from "../components/SocialLinks";
import { SocialLinks } from "../components/SocialLinks";

export const Top: FC = () => {
	const [shouldLoadBox, setShouldLoadBox] = useState(false);
	const heroRef = useRef<HTMLElement | null>(null);

	const socialLinks: SocialLink[] = [
		{
			id: "x",
			label: "Twitter",
			href: "https://x.com/Th3rm1t3",
			iconSrc: "/x.svg",
		},
		{
			id: "github",
			label: "GitHub",
			href: "https://github.com/Th3rm1t0",
			iconSrc: "/github.svg",
		},
		{
			id: "zenn",
			label: "Zenn",
			href: "https://zenn.dev/th3rm1t3",
			iconSrc: "/zenn.svg",
		},
		{
			id: "bluesky",
			label: "Bluesky",
			href: "https://bsky.app/profile/th3rm1t3.bsky.social",
			iconSrc: "/bluesky.svg",
		},
	];

	useEffect(() => {
		if (shouldLoadBox) return;
		const target = heroRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setShouldLoadBox(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [shouldLoadBox]);

	return (
		<main className="min-h-screen bg-[#17182cff] font-['Noto Sans JP',sans-serif] text-[#e8e8e8]">
			<div>
				<HeroSection
					heroRef={heroRef}
					shouldLoadBox={shouldLoadBox}
					title="Th3rm1t3.com"
					tagline={
						<>
							Hello and, again, welcome to my site.
							<br />
						</>
					}
				/>
			</div>
			<div className="mt-4">
				<SocialLinks links={socialLinks} />
			</div>
			<div className="mt-24">
				<Profile
					imageSrc="/icon.webp"
					name="Th3rm1t3 / テルミット"
					bio={<>やったりやらなかったり系人間</>}
				/>
			</div>
		</main>
	);
};
