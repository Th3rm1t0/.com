import { useEffect, useRef, useState } from "react";

type RevealOptions = {
	rootMargin?: string;
	threshold?: number;
};

/**
 * 要素がビューポートに入ったら一度だけ isRevealed を立てる。
 * 実際の動きは呼び出し側が motion-safe: 付きのクラスで表現するため、
 * prefers-reduced-motion のときは初期状態がそのまま最終状態になる。
 */
export const useRevealOnScroll = <T extends HTMLElement = HTMLElement>({
	rootMargin = "0px 0px -12% 0px",
	threshold = 0.15,
}: RevealOptions = {}) => {
	const [isRevealed, setIsRevealed] = useState(false);
	const targetRef = useRef<T>(null);

	useEffect(() => {
		if (isRevealed) return;
		const target = targetRef.current;
		if (!target) return;

		if (typeof IntersectionObserver === "undefined") {
			setIsRevealed(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setIsRevealed(true);
					observer.disconnect();
				}
			},
			{ rootMargin, threshold },
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [isRevealed, rootMargin, threshold]);

	return { targetRef, isRevealed };
};
