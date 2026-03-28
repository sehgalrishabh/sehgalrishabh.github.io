"use client";
import { useEffect, useRef } from "react";

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: import("three").WebGLRenderer | null = null;
    let mounted = true;

    const init = async () => {
      const THREE = await import("three");
      if (!mounted || !container) return;

      const w = container.clientWidth;
      const h = container.clientHeight;

      /* ── Scene ── */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 28;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      /* ── Particles ── */
      const COUNT = 480;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);

      const teal = new THREE.Color("#10ca8b");
      const dim = new THREE.Color(0x303030);

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 55;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 55;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

        const c = Math.random() > 0.88 ? teal : dim;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.13,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      /* ── Mouse parallax ── */
      let mx = 0,
        my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      /* ── Animate ── */
      const clock = new THREE.Clock();
      const tick = () => {
        if (!mounted) return;
        animId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        points.rotation.y = t * 0.012;
        points.rotation.x = t * 0.007;

        camera.position.x += (mx * 2.5 - camera.position.x) * 0.04;
        camera.position.y += (my * 2.5 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer!.render(scene, camera);
      };
      tick();

      /* ── Resize ── */
      const onResize = () => {
        if (!container || !renderer) return;
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);

      /* ── Fade in via opacity transition ── */
      renderer.domElement.style.opacity = "0";
      renderer.domElement.style.transition = "opacity 1.5s ease";
      requestAnimationFrame(() => {
        if (renderer) renderer.domElement.style.opacity = "1";
      });

      return () => {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
      };
    };

    let innerCleanup: (() => void) | undefined;
    init().then((fn) => {
      innerCleanup = fn;
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(animId);
      innerCleanup?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.parentNode?.removeChild(renderer.domElement);
        renderer = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
