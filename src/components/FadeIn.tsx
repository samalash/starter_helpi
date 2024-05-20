import { useRef } from "react";
import { useInView } from "framer-motion";

// FadeIn component that takes in children
export default function FadeIn({ children }: { children: React.ReactNode }) {
  // useRef hook to create a reference to the element
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Return a section element with a span element that contains the children
  return (
    <section ref={ref}>
      <span
        style={{
          // transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        {children}
      </span>
    </section>
  );
}
