import { useEffect, useRef } from "react";

export function ClickOutside({ onClickOutside, ...props }) {
  // props에 클래스네임, 스타일, 다 전달받게 해서 Resuable component로 쓰기
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!props.show) return null;

  return (
    <ul ref={ref} {...props}>
      {props.message}
    </ul>
  );
}
