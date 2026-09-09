"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function OrbitScene() {
  const mount = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [available, setAvailable] = useState(true);
  const [ready, setReady] = useState(false);
  const pauseRef = useRef(false);
  const requestRef = useRef(() => {});
  useEffect(() => {
    pauseRef.current = paused;
    requestRef.current();
  }, [paused]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let disposed = false;
    let teardown = () => {};
    import("three")
      .then((THREE) => {
        if (disposed) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
          });
        } catch {
          setAvailable(false);
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);
        setReady(true);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
        camera.position.z = 8.8;
        scene.add(new THREE.HemisphereLight(0xffffff, 0x5565bb, 3));
        const key = new THREE.DirectionalLight(0xffffff, 5);
        key.position.set(3, 5, 4);
        scene.add(key);
        const pink = new THREE.PointLight(0xff8466, 35);
        pink.position.set(-3, 2, 2);
        scene.add(pink);
        const fill = new THREE.DirectionalLight(0xbbf05b, 3);
        fill.position.set(-4, -2, 1);
        scene.add(fill);
        const group = new THREE.Group();
        scene.add(group);
        const knotGeometry = new THREE.TorusKnotGeometry(
          1.28,
          0.36,
          150,
          24,
          2,
          3,
        );
        const knotMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x404eff,
          metalness: 0.32,
          roughness: 0.23,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
          iridescence: 0.65,
          iridescenceIOR: 1.5,
        });
        const knot = new THREE.Mesh(knotGeometry, knotMaterial);
        group.add(knot);
        knot.rotation.set(0.45, 0.3, -0.35);
        const orbitGeometry = new THREE.TorusGeometry(2.08, 0.018, 8, 120);
        const orbitMaterial = new THREE.MeshStandardMaterial({
          color: 0x829481,
          metalness: 0.15,
          roughness: 0.5,
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.set(1.05, 0.35, 0.2);
        group.add(orbit);
        const beadGeometry = new THREE.SphereGeometry(0.14, 20, 20);
        const beadMaterial = new THREE.MeshStandardMaterial({
          color: 0xe8ff70,
          roughness: 0.3,
        });
        const bead = new THREE.Mesh(beadGeometry, beadMaterial);
        bead.position.set(1.95, 0.6, 0.45);
        group.add(bead);
        let frame = 0,
          visible = true,
          lastTime = 0,
          rotation = 0;
        let pointerX = 0,
          pointerY = 0;
        const resize = () => {
          const w = host.clientWidth,
            h = host.clientHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        const requestRender = () => {
          cancelAnimationFrame(frame);
          if (visible && !document.hidden && !reduced && !pauseRef.current)
            frame = requestAnimationFrame(animate);
        };
        const intersection = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
          requestRender();
        });
        intersection.observe(host);
        document.addEventListener("visibilitychange", requestRender);
        const move = (e: PointerEvent) => {
          if (reduced) return;
          const rect = host.getBoundingClientRect();
          pointerX = (e.clientX - rect.left) / rect.width - 0.5;
          pointerY = (e.clientY - rect.top) / rect.height - 0.5;
        };
        const leave = () => {
          pointerX = 0;
          pointerY = 0;
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", leave);
        const contextLost = (e: Event) => {
          e.preventDefault();
          setAvailable(false);
          cancelAnimationFrame(frame);
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        const animate = (time: number) => {
          if (!visible || document.hidden || reduced || pauseRef.current)
            return;
          frame = requestAnimationFrame(animate);
          if (time - lastTime < 32) return;
          const delta = Math.min((time - lastTime) / 1000, 0.06);
          lastTime = time;
          if (!reduced && !pauseRef.current) {
            rotation += delta * 0.18;
            knot.rotation.y = 0.3 + rotation;
            knot.rotation.z = -0.35 + Math.sin(rotation) * 0.12;
            group.position.y = Math.sin(rotation * 2) * 0.08;
            group.rotation.y += (pointerX * 0.35 - group.rotation.y) * 0.04;
            group.rotation.x += (pointerY * 0.2 - group.rotation.x) * 0.04;
          }
          renderer.render(scene, camera);
        };
        requestRef.current = requestRender;
        resize();
        requestRender();
        teardown = () => {
          requestRef.current = () => {};
          cancelAnimationFrame(frame);
          observer.disconnect();
          intersection.disconnect();
          document.removeEventListener("visibilitychange", requestRender);
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerleave", leave);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          knotGeometry.dispose();
          knotMaterial.dispose();
          orbitGeometry.dispose();
          orbitMaterial.dispose();
          beadGeometry.dispose();
          beadMaterial.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        if (!disposed) setAvailable(false);
      });
    return () => {
      disposed = true;
      teardown();
    };
  }, [reduced]);

  return (
    <div className="orbit-wrap">
      <div className="scene-coordinate coordinate-top" aria-hidden="true">
        <span>04 / INFINITE CURIOSITY</span>
        <span>✳</span>
      </div>
      <div className="orbit-grid" aria-hidden="true" />
      <div
        className="orbit-mount"
        ref={mount}
        role="img"
        aria-label="An abstract blue three-dimensional knot inside a thin orbit"
      />
      {(!available || !ready) && (
        <div className="scene-fallback">
          <span>AI</span>
          <b>×</b>
          <span>SE</span>
        </div>
      )}
      <div className="scene-pill pill-one">
        <span className="status-dot" /> SOFTWARE × INTELLIGENCE
      </div>
      <div className="scene-pill pill-two">
        Built to leave the lab. <span>↗</span>
      </div>
      <div className="scene-coordinate coordinate-bottom">
        <span>
          {reduced
            ? "STILL BY PREFERENCE"
            : paused
              ? "A MOMENT OF STILLNESS"
              : "A LITTLE CURIOSITY IN MOTION"}
        </span>
        {available && !reduced && (
          <button
            className="motion-toggle"
            aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
