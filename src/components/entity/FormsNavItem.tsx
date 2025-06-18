"use client";

import { useState, useRef } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CustomIcon, { type IconList } from "@/src/components/shared/CustomIcon";
import ContextMenu from "@/src/components/shared/ContextMenu";

export default function FormsNavItem({
  id,
  label,
  icon,
  isActive,

  onClick,

  onSetFirst,
  onLabelChange,
  onCopy,
  onDuplicate,
  onDelete,

  className = "",
}: {
  id: string | number;
  label: string;
  icon?: IconList;
  isActive?: boolean;

  onSetFirst: () => void;
  onLabelChange: (value: string) => void;
  onCopy?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;

  onClick?: () => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [labelChange, setLabelChange] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  async function startRename() {
    setMenuOpened(false);
    await setLabelChange(true);
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  return (
    <div
      {...attributes}
      {...listeners}
      className={`relative cursor-grab touch-none active:cursor-grabbing ${className}`}
      ref={setNodeRef}
      style={style}
    >
      <button
        onDoubleClick={() => startRename()}
        onClick={() => onClick?.()}
        className={`group/button text-body border-05 rounded-8 flex h-32 cursor-pointer items-center gap-6 px-9.5 duration-300 outline-none select-none ${
          isActive
            ? "active:shadow-active active:border-blue border-gray-50 bg-white shadow"
            : "border-transparent bg-gray-100/15 hover:bg-gray-100/35"
        }`}
      >
        {icon && (
          <CustomIcon
            icon={icon}
            className={`size-20 min-w-20 ${
              isActive ? "text-yellow" : "text-gray-200"
            }`}
          />
        )}

        {labelChange ? (
          <input
            ref={inputRef}
            value={label}
            disabled={!labelChange}
            onChange={(e) => {
              onLabelChange?.(e.target.value);
            }}
            onBlur={() => setLabelChange(false)}
            className={`focus:outline-05 rounded-4 w-100 text-black focus:px-4 focus:outline-gray-50`}
          />
        ) : (
          <p
            className={`whitespace-nowrap ${isActive ? "text-black" : "text-body text-gray-300"}`}
          >
            {label}
          </p>
        )}

        {isActive && (
          <div
            className={
              "hover:text-blue size-16 min-w-16 cursor-pointer border-none bg-transparent text-gray-200 outline-none"
            }
            onMouseDown={(e) => {
              e.stopPropagation();
              setMenuOpened((prevState) => !prevState);
            }}
          >
            <CustomIcon icon={"menu"} className={"size-full"} />
          </div>
        )}
      </button>

      <ContextMenu
        title={"Settings"}
        className={"bottom-[calc(100%+0.5625rem)] left-0"}
        id={id}
        isOpen={menuOpened}
        onClickOutside={() => {
          setMenuOpened(false);
        }}
        actions={[
          [
            {
              label: "Set as first page",
              icon: "flag",
              onClick: () => {
                setMenuOpened(false);
                onSetFirst?.();
              },
              extraClassName: "[&_.custom-icon]:text-blue",
            },
            {
              label: "Rename",
              icon: "pencil-line",
              onClick: () => startRename(),
            },
            {
              label: "Copy",
              icon: "clipboard",
              onClick: () => {
                setMenuOpened(false);
                onCopy?.();
              },
            },
            {
              label: "Duplicate",
              icon: "duplicate",
              onClick: () => {
                setMenuOpened(false);
                onDuplicate?.();
              },
            },
          ],
          [
            {
              label: "Delete",
              icon: "garbage",
              onClick: () => {
                setMenuOpened(false);
                onDelete?.();
              },
              extraClassName:
                "text-red [&_.custom-icon]:text-red hover:text-red hover:opacity-75 transition-opacity",
            },
          ],
        ]}
      />
    </div>
  );
}
