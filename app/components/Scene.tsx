"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Model() {
    const { scene } = useGLTF("/human head 3d model.glb");
    const meshRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.005; //rotation speed
    });

    return (
        <group ref={meshRef}>
            <primitive object={scene} scale={2.5} />
        </group>
    );
}

export default function Scene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Model />
                </Float>
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
