"use client";
import { useEffect, useRef } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const line = lineRef.current;
    const counter = counterRef.current;
    const name = nameRef.current;
    if (!loader || !line || !counter || !name) return;

    let gsap: typeof import("gsap").default;
    let cleanup = false;

    const run = async () => {
      const mod = await import("gsap");
      gsap = mod.default;
      if (cleanup) return;

      // Fade name in
      gsap.fromTo(
        name,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Count + line expand together
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate() {
          const v = Math.floor(obj.val);
          counter.textContent = v.toString().padStart(3, "0");
          line.style.transform = `scaleX(${v / 100})`;
        },
        onComplete() {
          // Slide loader out upward
          gsap.to(loader, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            delay: 0.2,
            onComplete,
          });
        },
      });
    };

    run();
    return () => {
      cleanup = true;
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-inner">
        <div ref={nameRef} className="loader-name" style={{ opacity: 0 }}>
          RS<span>.</span>
        </div>
        <div className="loader-bar">
          <div ref={lineRef} className="loader-line" />
        </div>
        <span ref={counterRef} className="loader-counter">
          000
        </span>
      </div>
    </div>
  );
}
