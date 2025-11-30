import {
	Canvas,
	type ThreeElements,
	useFrame,
	useThree,
} from "@react-three/fiber";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";

const BOX_NAME = "rotating-box";

const RotatingBox: FC<ThreeElements["mesh"]> = (props) => {
	useFrame(({ scene }, delta) => {
		const mesh = scene.getObjectByName(BOX_NAME);
		if (!mesh) return;
		mesh.rotation.x += delta * 0.5;
		mesh.rotation.y += delta * 0.7;
		mesh.rotation.z += delta * 0.3;
	});

	return (
		<mesh {...props} name={BOX_NAME} scale={2.5}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="#ffffff" />
		</mesh>
	);
};

const AsciiRenderer: FC = () => {
	const { gl, size, scene, camera } = useThree();
	const effectRef = useRef<AsciiEffect | null>(null);

	useEffect(() => {
		const effect = new AsciiEffect(gl, " .:-+*=%@#", { invert: true });
		effect.domElement.style.position = "absolute";
		effect.domElement.style.top = "0";
		effect.domElement.style.left = "0";
		effect.domElement.style.pointerEvents = "none";
		effect.domElement.style.color = "#bdbdbdff";
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
	return (
		<Canvas
			style={{ position: "absolute", inset: 0 }}
			camera={{ position: [0, 0, 4] }}
		>
			<color attach="background" args={["#050914"]} />
			<ambientLight intensity={0.05} />
			<directionalLight color="#bdbdbdff" position={[2, 3, 5]} />
			<RotatingBox />
			<AsciiRenderer />
		</Canvas>
	);
};
