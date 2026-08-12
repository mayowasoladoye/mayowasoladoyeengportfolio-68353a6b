import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const SEGMENTS = 120;
const SIZE = 26;

/**
 * Interactive CFD-style surface.
 * Vertex displacement + thermal HSL colour bands, with a synchronized
 * wireframe overlay. Camera and useFrame math are intentionally fixed.
 */
const FluidSurface = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const active = useRef(0);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS),
    [],
  );
  const wireGeometry = useMemo(
    () => new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS),
    [],
  );

  const base = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry],
  );

  const colors = useMemo(() => {
    const count = geometry.attributes.position.count;
    const arr = new Float32Array(count * 3);
    geometry.setAttribute("color", new THREE.BufferAttribute(arr, 3));
    return arr;
  }, [geometry]);

  const color = useMemo(() => new THREE.Color(), []);

  console.log('FLUID_RENDER');
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = geometry.attributes.position;
    const wirePos = wireGeometry.attributes.position;

    // ease hover influence
    active.current += ((meshRef.current?.userData.hover ? 1 : 0.35) - active.current) * 0.05;

    const px = pointer.current.x;
    const py = pointer.current.y;

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = base[ix];
      const y = base[ix + 1];

      // ambient travelling waves
      let z =
        Math.sin(x * 0.55 + t * 0.8) * 0.32 +
        Math.cos(y * 0.45 - t * 0.6) * 0.28 +
        Math.sin((x + y) * 0.3 + t * 0.35) * 0.22;

      // pointer-driven trough / crest
      const dx = x - px;
      const dy = y - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      z += Math.sin(d * 1.15 - t * 2.4) * Math.exp(-d * 0.42) * 1.5 * active.current;

      pos.array[ix + 2] = z;
      wirePos.array[ix + 2] = z;

      // thermal band mapping: deep blue -> cyan -> green -> yellow -> red
      const raw = THREE.MathUtils.clamp((z + 0.9) / 3.0, 0, 1);
      const norm = Math.pow(raw, 3);
      color.setHSL(0.62 - norm * 0.62, 0.6, 0.1 + norm * 0.28);
      colors[ix] = color.r;
      colors[ix + 1] = color.g;
      colors[ix + 2] = color.b;
    }

    if (!(window as any).__zlogged) {
      (window as any).__zlogged = true;
      let mn = 9, mx = -9;
      for (let i = 0; i < pos.count; i++) { const v = pos.array[i * 3 + 2]; if (v < mn) mn = v; if (v > mx) mx = v; }
      console.log("ZRANGE", mn.toFixed(2), mx.toFixed(2), "active", active.current.toFixed(2));
    }
    pos.needsUpdate = true;
    wirePos.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    // the plane is tilted, so map the hit point into local surface coords
    pointer.current.set(e.point.x, -e.point.z);
    if (meshRef.current) meshRef.current.userData.hover = true;
  };

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerMove={handleMove}
        onPointerOut={() => {
          if (meshRef.current) meshRef.current.userData.hover = false;
        }}
      >
        <meshStandardMaterial
          vertexColors
          metalness={0.3}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={wireRef} geometry={wireGeometry} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
};

const Rig = () => {
  const { camera } = useThree();
  camera.position.set(0, 3, 6);
  camera.lookAt(0, 0, 0);
  return null;
};

const Hero = () => {
  const [ready, setReady] = useState(false);

  return (
    <section className="relative h-[86vh] min-h-[540px] w-full overflow-hidden bg-[#0a1628]">
      <Canvas
        camera={{ position: [0, 3, 6], fov: 60 }}
        dpr={[1, 1.8]}
        onCreated={() => setReady(true)}
        className="absolute inset-0"
      >
        <color attach="background" args={["#0a1628"]} />
        <fog attach="fog" args={["#0a1628", 6, 17]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 8, 5]} intensity={0.7} />
        <pointLight position={[-6, 3, -4]} intensity={0.4} color="#38bdf8" />
        <Rig />
        <FluidSurface />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-primary/90">
          Mayowa Soladoye
        </p>
        <h1 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-[0.12em] text-foreground sm:text-6xl md:text-7xl">
          Chemical Engineering
        </h1>
        <p className="mt-6 max-w-xl text-sm text-muted-foreground sm:text-base">
          Process design, simulation and data-driven engineering — alongside a set of
          creative and analytical sub-portfolios.
        </p>
        <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.2em]">
          <a
            href="#areas"
            className="rounded-full border border-primary/60 px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="rounded-full border border-border px-6 py-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            Skills
          </a>
        </div>
      </div>

      {!ready && <div className="absolute inset-0 bg-[#0a1628]" />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
};

export default Hero;
