import { useState, useRef, useEffect, useCallback } from "react";

export default function Drawer({
  visibleContent,
  drawerContent,
  onClose,
  onOpen
}) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startTranslateYRef = useRef(0);
  const drawerRef = useRef(null);
  const visibleContentRef = useRef(null);
  const hiddenContentRef = useRef(null);
  const [drawerContentTopOffset, setDrawerContentTopOffset] = useState(0);

  // drawerContent 상단부터 contentWrapper 상단까지의 거리 측정
  useEffect(() => {
    const updateDrawerContentTopOffset = () => {
      if (hiddenContentRef.current) {
        const drawerContentRect =
          hiddenContentRef.current.getBoundingClientRect();
        setDrawerContentTopOffset(drawerContentRect.height);
      }
    };

    updateDrawerContentTopOffset();

    const resizeObserver = new ResizeObserver(updateDrawerContentTopOffset);
    if (hiddenContentRef.current) {
      resizeObserver.observe(hiddenContentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [drawerContent]);

  // 초기 상태: hiddenContent가 숨겨진 상태
  useEffect(() => {
    if (drawerContentTopOffset > 0 && translateY === 0) {
      setTranslateY(drawerContentTopOffset);
    }
  }, [drawerContentTopOffset]);

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;
    startTranslateYRef.current = translateY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startYRef.current;
    const newTranslateY = startTranslateYRef.current + deltaY;

    // translateY는 0 ~ drawerContentTopOffset 사이로 제한
    // 0: 모든 컨텐츠가 보임
    const maxTranslateY = drawerContentTopOffset;
    const clampedTranslateY = Math.max(
      0,
      Math.min(newTranslateY, maxTranslateY)
    );
    setTranslateY(clampedTranslateY);
  };

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);

    // 현재 위치를 기준으로 완전히 펼치거나 접기
    const maxTranslateY = drawerContentTopOffset;
    const threshold = maxTranslateY * 0.5; // 중간 지점

    setTranslateY((currentTranslateY) => {
      // 중간 지점을 넘었으면 완전히 접기, 아니면 완전히 펼치기
      return currentTranslateY > threshold ? maxTranslateY : 0;
    });
  }, [drawerContentTopOffset]);

  const handleMouseDown = (e) => {
    startYRef.current = e.clientY;
    startTranslateYRef.current = translateY;
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const currentY = e.clientY;
      const deltaY = currentY - startYRef.current;
      const newTranslateY = startTranslateYRef.current + deltaY;

      const maxTranslateY = drawerContentTopOffset;
      const clampedTranslateY = Math.max(
        0,
        Math.min(newTranslateY, maxTranslateY)
      );
      setTranslateY(clampedTranslateY);
    },
    [isDragging, drawerContentTopOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // 현재 위치를 기준으로 완전히 펼치거나 접기
    const maxTranslateY = drawerContentTopOffset;
    const threshold = maxTranslateY * 0.5; // 중간 지점

    setTranslateY((currentTranslateY) => {
      // 중간 지점을 넘었으면 완전히 접기, 아니면 완전히 펼치기
      return currentTranslateY > threshold ? maxTranslateY : 0;
    });
  }, [drawerContentTopOffset]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // translateY 변경 시 콜백 호출
  useEffect(() => {
    const maxTranslateY = drawerContentTopOffset;
    if (translateY >= maxTranslateY - 1 && maxTranslateY > 0) {
      // 숨겨진 상태 (handle + visibleContent만 보임)
      if (onClose) onClose();
    } else if (translateY <= 1) {
      // 모두 보이는 상태
      if (onOpen) onOpen();
    }
  }, [translateY, drawerContentTopOffset, onClose, onOpen]);

  return (
    <div
      ref={drawerRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#171717] rounded-t-2xl shadow-2xl border-t border-[#404040] cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateY(${translateY}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out"
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* 드래그 핸들 */}
      <div
        data-handle
        className="w-full flex justify-center pt-3 pb-2 touch-none"
      >
        <div className="w-12 h-1.5 bg-[#404040] rounded-full"></div>
      </div>

      {/* 항상 보이는 기본 컨텐츠 */}
      <div className="w-full pt-6 px-6 mb-4" ref={visibleContentRef}>
        {visibleContent}
      </div>

      {/* 숨겨지는 컨텐츠 */}
      <div className="w-full mt-6 px-6 pb-16" ref={hiddenContentRef}>
        {drawerContent}
      </div>
    </div>
  );
}
