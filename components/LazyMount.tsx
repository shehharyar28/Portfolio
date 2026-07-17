"use client";

import {
  memo,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Mounts children only when near the viewport.
 * Keeps a min-height placeholder so layout / scroll anchors stay stable.
 */
function LazyMountComponent({
  children,
  rootMargin = "220px 0px",
  minHeight = 280,
  className = "",
  style,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={show ? style : { ...style, minHeight }}
    >
      {show ? children : null}
    </div>
  );
}

export const LazyMount = memo(LazyMountComponent);
