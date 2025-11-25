import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const updateHeight = () => {
        if (isOpen) {
          setHeight(contentRef.current.scrollHeight);
        } else {
          setHeight(0);
        }
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(contentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOpen, children]);

  return (
    <div className="w-full overflow-hidden">
      <button
        className="w-full px-4 py-5 flex items-center text-left gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">{title}</span>
        <IoChevronDown
          className={`size-5 fill-[#f6f6f6] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="px-4 pb-5 flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

