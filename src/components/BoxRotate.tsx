import {
	Canvas,
	type ThreeElements,
	useFrame,
	useThree,
} from "@react-three/fiber";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";

const ASCII_CHAR_SET = " .:-+*=%@#";
const ASCII_COLOR = "#727272ff";
const DEFAULT_BOX_X = -0.6;
const DEFAULT_BOX_SCALE = 2.5;

const getResponsiveBoxX = (width: number) => {
	if (width <= 480) return -0.1;
	if (width <= 768) return -0.1;
	if (width <= 1024) return -0.4;
	return DEFAULT_BOX_X;
};

const getResponsiveBoxScale = (width: number) => {
	if (width <= 480) return 2.0;
	if (width <= 768) return 2.0;
	if (width <= 1024) return 2.3;
	return DEFAULT_BOX_SCALE;
};

const useResponsiveBoxX = () => {
	const [boxX, setBoxX] = useState(() => {
		if (typeof window === "undefined") return DEFAULT_BOX_X;
		return getResponsiveBoxX(window.innerWidth);
	});

	useEffect(() => {
		if (typeof window === "undefined") return;
		const handleResize = () => setBoxX(getResponsiveBoxX(window.innerWidth));
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return boxX;
};

const RotatingBox: FC<ThreeElements["mesh"]> = (props) => {
	const meshRef = useRef<Mesh>(null);

	useFrame((_state, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta * 0.5;
		meshRef.current.rotation.y += delta * 0.7;
		meshRef.current.rotation.z += delta * 0.3;
	});

	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={getResponsiveBoxScale(window.innerWidth)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="#ffffff" />
		</mesh>
	);
};

const AsciiRenderer: FC = () => {
	const { gl, size, scene, camera } = useThree();
	const effectRef = useRef<AsciiEffect | null>(null);

	useEffect(() => {
		const effect = new AsciiEffect(gl, ASCII_CHAR_SET, {
			invert: true,
			resolution: 0.1,
		});
		effect.domElement.style.position = "absolute";
		effect.domElement.style.top = "0";
		effect.domElement.style.left = "0";
		effect.domElement.style.pointerEvents = "none";
		effect.domElement.style.color = ASCII_COLOR;
		effect.domElement.style.backgroundColor = "transparent";
		effectRef.current = effect;

		const parent = gl.domElement.parentNode;
		parent?.appendChild(effect.domElement);
		gl.domElement.style.display = "none";

		return () => {
			effect.domElement.remove();
			gl.domElement.style.display = "";
		};
	}, [gl]);

	useEffect(() => {
		effectRef.current?.setSize(size.width, size.height);
	}, [size]);

	useFrame(() => {
		effectRef.current?.render(scene, camera);
	}, 1);

	return null;
};

export const BoxRotate: FC = () => {
	const boxX = useResponsiveBoxX();

	return (
		<Canvas
			style={{ position: "absolute", inset: 0 }}
			camera={{ position: [0, 0, 4] }}
		>
			<color attach="background" args={["#050914"]} />
			<ambientLight intensity={0.01} />
			<directionalLight color={ASCII_COLOR} position={[2.5, 4, 6]} />
			<RotatingBox position={[boxX, 0, 0]} />
			<AsciiRenderer />
		</Canvas>
	);
};
