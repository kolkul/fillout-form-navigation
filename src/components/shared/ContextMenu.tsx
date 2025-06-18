"use client";

import { useEffect, useRef } from "react";

import CustomIcon, { IconList } from "@/src/components/shared/CustomIcon";

export type ContextMenuType = {
  title: string;
  actions: Array<
    Array<{
      label: string;
      icon: IconList;
      onClick: () => void;
      extraClassName?: string;
    }>
  >;
};

export default function ContextMenu({
  id,
  title,
  actions,

  isOpen,
  onClickOutside,
  className = "",
}: ContextMenuType & {
  id: string | number;
  isOpen?: boolean;

  onClickOutside?: (e: MouseEvent) => void;
  className?: string;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClickOutside?.(e);
      }
    }

    if (onClickOutside && isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClickOutside]);

  return (
    <div
      ref={menuRef}
      className={`border-05 rounded-12 absolute min-w-240 overflow-hidden border-gray-50 bg-white shadow transition-opacity duration-300 select-none ${
        isOpen ? "" : "pointer-events-none opacity-0"
      } ${className}`}
    >
      <div
        className={
          "border-b-05 font-melody text-body-s flex min-h-40 items-center border-gray-50 bg-[#FAFBFC] px-12 font-medium"
        }
      >
        <span>{title}</span>
      </div>

      <div className={"flex flex-col gap-14 px-12 pt-12 pb-14"}>
        {actions.map((item, index) => (
          <ul
            key={"context-menu-actions-list-" + id + "-" + index}
            className={"flex flex-col gap-14"}
          >
            {index !== 0 && (
              <hr
                className={"h-0.5 w-full border-none bg-gray-50 outline-none"}
              />
            )}

            {item.map(({ label, icon, onClick, extraClassName }, index) => (
              <li key={"context-menu-actions-list-item-" + id + "-" + index}>
                <button
                  onClick={onClick}
                  className={`hover:text-blue group/item flex w-full cursor-pointer items-center gap-6 transition-colors duration-300 ${extraClassName}`}
                >
                  <CustomIcon
                    className={
                      "group-hover/item:text-blue size-16 text-gray-100 transition-colors duration-300"
                    }
                    icon={icon}
                  />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
