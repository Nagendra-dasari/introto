import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function FloatingScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Check initial position

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-8 bottom-8 w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 hover:from-amber-500 hover:via-orange-600 hover:to-orange-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 z-[9999] group animate-fade-in"
      aria-label="Scroll to top"
      style={{
        boxShadow: '0 10px 40px rgba(251, 146, 60, 0.4)',
      }}
    >
      <ChevronUp className="w-7 h-7 text-white group-hover:animate-bounce" strokeWidth={3} />
    </button>
  );
}







