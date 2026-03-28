"use client";
import Image from "next/image";

interface Tech {
  image: string;
  title: string;
}

interface StackMarqueeProps {
  technologies: Tech[];
}

export default function StackMarquee({ technologies }: StackMarqueeProps) {
  // Duplicate for seamless loop
  const doubled = [...technologies, ...technologies];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((tech, i) => (
          <div key={i} className="marquee-item">
            <Image
              src={tech.image}
              alt={tech.title}
              width={28}
              height={28}
              style={{ width: "auto", height: "1.4rem" }}
              unoptimized
            />
            <span>{tech.title}</span>
            {i !== doubled.length - 1 && <span className="marquee-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
