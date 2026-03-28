"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let aimX = -100,
      aimY = -100;
    let curX = -100,
      curY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      aimX = e.clientX;
      aimY = e.clientY;
      dot.style.transform = `translate(calc(${aimX}px - 50%), calc(${aimY}px - 50%))`;
    };

    const renderLoop = () => {
      curX += (aimX - curX) * 0.13;
      curY += (aimY - curY) * 0.13;
      ring.style.transform = `translate(calc(${curX}px - 50%), calc(${curY}px - 50%))`;
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    const onEnter = () => document.documentElement.classList.add("cursor-hover");
    const onLeave = () => document.documentElement.classList.remove("cursor-hover");

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    // Initial attach + re-attach after any dynamic content
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
