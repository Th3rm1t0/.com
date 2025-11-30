import {
	type FC,
	lazy,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";

const LazyBoxRotate = lazy(async () => {
	const module = await import("../components/BoxRotate");
	return { default: module.BoxRotate };
});

export const Top: FC = () => {
	const [shouldLoadBox, setShouldLoadBox] = useState(false);
	const heroRef = useRef<HTMLElement | null>(null);

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
		<main
			style={{
				minHeight: "100vh",
				backgroundColor: "#17182cff",
				color: "#e8e8e8",
				fontFamily: "'Noto Sans JP', sans-serif",
			}}
		>
			<section
				ref={(node) => {
					heroRef.current = node;
				}}
				style={{
					position: "relative",
					minHeight: "65vh",
					overflow: "hidden",
				}}
			>
				{shouldLoadBox ? (
					<Suspense
						fallback={
							<div
								aria-hidden="true"
								style={{
									position: "absolute",
									inset: 0,
									background:
										"radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 60%)",
								}}
							/>
						}
					>
						<LazyBoxRotate />
					</Suspense>
				) : (
					<div
						aria-hidden="true"
						style={{
							position: "absolute",
							inset: 0,
							background:
								"radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 60%)",
						}}
					/>
				)}
				<div
					style={{
						position: "relative",
						zIndex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						padding: "3rem 1.5rem",
						textAlign: "center",
					}}
				>
					<h1
						style={{
							margin: "1.5em 0 0 0",
							fontSize: "clamp(3rem, 7vw, 4.5rem)",
							fontWeight: 700,
							color: "#fefefe",
							textShadow: "0 8px 30px rgba(0,0,0,0.75)",
							fontFamily: "Inter, sans-serif",
							fontStyle: "light",
						}}
					>
						Th3rm1t3.com
					</h1>
					<p
						style={{
							maxWidth: "620px",
							margin: "1.25rem auto 2rem",
							fontSize: "1rem",
							lineHeight: 1.6,
							color: "#fefefe",
						}}
					>
						気軽にテルミットと呼んでください
						<br />
					</p>
				</div>
			</section>
			<section>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: "1rem",
						padding: "1rem 0",
					}}
				>
					<div id="x">
						<a
							href="https://x.com/Th3rm1t3"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: "#fefefe",
								textDecoration: "none",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "0.5rem",
							}}
						>
							<img
								src="/x.svg"
								alt="X"
								style={{ width: "32px", height: "32px", display: "block" }}
								loading="lazy"
							/>
							<span style={{ fontSize: "0.85rem" }}>Twitter</span>
						</a>
					</div>
					<div id="github">
						<a
							href="https://github.com/Th3rm1t0"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: "#fefefe",
								textDecoration: "none",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "0.5rem",
							}}
						>
							<img
								src="/github.svg"
								alt="GitHub"
								style={{ width: "32px", height: "32px", display: "block" }}
								loading="lazy"
							/>
							<span style={{ fontSize: "0.85rem" }}>GitHub</span>
						</a>
					</div>
					<div id="zenn">
						<a
							href="https://zenn.dev/th3rm1t3"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: "#fefefe",
								textDecoration: "none",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "0.5rem",
							}}
						>
							<img
								src="/zenn.svg"
								alt="Zenn"
								style={{ width: "32px", height: "32px", display: "block" }}
								loading="lazy"
							/>
							<span style={{ fontSize: "0.85rem" }}>Zenn</span>
						</a>
					</div>
				</div>
			</section>
		</main>
	);
};
