"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Float, OrbitControls, ScrollControls, useScroll, Scroll } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

interface ModelProps {
    setEnableOrbit: (enable: boolean) => void;
}

function Model({ setEnableOrbit }: ModelProps) {
    // Load the GLTF model
    const { scene } = useGLTF("/human head 3d model.glb");
    const meshRef = useRef<THREE.Group>(null);
    const scroll = useScroll() as any; // Hook to access scroll data
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Basic mobile detection based on viewport width

    useFrame(() => {
        if (!meshRef.current) return;

        const scrollOffset = scroll.offset;

        // Define animation range: logic operates within the first 2/3 of the scroll
        const r1 = scroll.range(0, 2 / 3);

        // Position Logic:
        // Move horizontally on desktop, stay centered on mobile
        const targetX = isMobile ? 0 : 2;
        meshRef.current.position.x = THREE.MathUtils.lerp(0, targetX, r1);

        // Move vertically on desktop, stay fixed on mobile
        const targetYDictionary = {
            desktop: Math.sin(r1 * Math.PI) * -2,
            mobile: 0
        }
        meshRef.current.position.y = isMobile ? targetYDictionary.mobile : targetYDictionary.desktop;

        // Rotation Logic:
        // Continuous rotation when at the very top (idle state)
        if (scrollOffset < 0.01) {
            meshRef.current.rotation.y += 0.005;
            setEnableOrbit(false); // Disable manual control
        } else {
            // Scroll-driven rotation
            let rotationY;
            if (isMobile) {
                // Mobile-specific angles
                const mobileStartAngle = 1;
                const mobileEndAngle = -Math.PI * 0.4;

                rotationY = THREE.MathUtils.lerp(mobileStartAngle, mobileEndAngle, r1);
            } else {
                // Desktop-specific angles
                rotationY = THREE.MathUtils.lerp(0, -Math.PI / 2 - 0.2, r1);
            }
            meshRef.current.rotation.y = rotationY;

            // Enable manual OrbitControls only when the scroll animation is fully complete
            if (r1 >= 1) {
                setEnableOrbit(true);
            } else {
                setEnableOrbit(false);
            }
        }

        // Scale Logic: Responsive scaling for mobile vs desktop
        const mobileScale = 1.3;
        const desktopScale = 1.8;
        const currentScale = isMobile ? mobileScale : desktopScale;

        meshRef.current.scale.setScalar(currentScale);
        meshRef.current.visible = true;
    });

    return (
        <group ref={meshRef}>
            <primitive object={scene} scale={1.5} />
        </group>
    );
}

export default function Scene({ children }: { children: React.ReactNode }) {
    return <SceneContent>{children}</SceneContent>;
}

function SceneContent({ children }: { children: React.ReactNode }) {
    const [orbitEnabled, setOrbitEnabled] = useState(false);

    return (
        <div className="h-screen w-full bg-black">
            {/* Canvas is the 3D scene container */}
            <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                {/* ScrollControls manages the HTML overlay scroll and syncs with 3D animation */}
                <ScrollControls pages={3} damping={1.0}>
                    {/* Float adds a gentle hovering animation to the model */}
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Model setEnableOrbit={setOrbitEnabled} />
                    </Float>

                    {/* Scroll component wraps the actual HTML page content */}
                    <Scroll html style={{ width: '100%', height: '100%' }}>
                        {children}
                    </Scroll>
                </ScrollControls>

                <Environment preset="city" />
                {/* OrbitControls are conditionally enabled based on scroll position */}
                <OrbitControls enabled={orbitEnabled} enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
