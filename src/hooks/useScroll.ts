import { useState, useEffect } from "react";

export default function useScroll() {
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);
  const [distanceFromTop, setDistanceFromTop] = useState(0);

  // Track scrolling and distance from bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.body.scrollHeight - window.innerHeight - window.scrollY;
      setDistanceFromBottom(distanceFromBottom);
      setDistanceFromTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { distanceFromBottom, distanceFromTop };
}
