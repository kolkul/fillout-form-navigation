"use client";

import { useState } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

import { useFormContext, type FormContextType } from "@/src/providers/form";

import FormsNavItem from "@/src/components/entity/FormsNavItem";
import CustomIcon from "@/src/components/shared/CustomIcon";
import Button from "@/src/components/shared/Button";

export default function FormsNavMenu() {
  const {
    activeId,
    setActiveId,
    formsList,
    setFormList,
    addNewItem,
    setFirst,
    onCopy,
    onDelete,
    onDuplicate,
    onRename,
  }: FormContextType = useFormContext();

  const [isDragging, setDragging] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.5,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setDragging(false);

    if (over && active.id !== over.id) {
      setFormList((items) => {
        const oldIndex = items.findIndex((i) => i.id == active.id);
        const newIndex = items.findIndex((i) => i.id == over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <div
        className={
          "absolute inset-0 flex w-full flex-col justify-end justify-self-end overflow-x-auto overflow-y-hidden overscroll-x-contain px-32 pb-40 max-lg:px-20 max-lg:pb-32 lg:pointer-events-none"
        }
      >
        <div
          className={
            "rounded-16 pointer-events-auto flex h-60 w-fit items-center border border-gray-50 bg-white px-16"
          }
        >
          <ul
            className={
              "group/list relative z-1 flex items-center justify-start"
            }
          >
            {formsList && formsList.length > 0 && (
              // @ts-ignore: Library works fine
              <SortableContext
                items={formsList}
                strategy={horizontalListSortingStrategy}
              >
                {formsList &&
                  formsList.map(({ id, label, isInfo }, index) => (
                    <li
                      key={"navigation-item-" + id}
                      className={"flex items-center justify-start"}
                    >
                      <FormsNavItem
                        className={"active:z-10"}
                        onClick={() => {
                          setActiveId(id);
                        }}
                        id={id}
                        label={label}
                        isActive={id == activeId}
                        icon={
                          isInfo
                            ? "circle-info"
                            : index + 1 === formsList.length
                              ? "circle-check"
                              : "document"
                        }
                        onSetFirst={() => setFirst(id)}
                        onLabelChange={(value) => onRename(id, value)}
                        onCopy={() => onCopy(id)}
                        onDuplicate={() => onDuplicate(id)}
                        onDelete={() => onDelete(id)}
                      />

                      {index + 1 !== formsList.length && (
                        <div
                          className={`group/add relative flex w-20 items-center justify-center duration-300 hover:w-56 max-lg:w-56 ${
                            isDragging ? "pointer-events-none opacity-0" : ""
                          }`}
                        >
                          <button
                            className={
                              "hover:border-blue relative z-1 flex size-16 cursor-pointer items-center justify-center rounded-full border border-gray-50 bg-white opacity-0 shadow duration-300 outline-none group-hover/add:opacity-100 max-lg:opacity-100"
                            }
                            onClick={() => {
                              addNewItem(index);
                            }}
                          >
                            <CustomIcon className={"size-8"} icon={"plus"} />
                          </button>
                          <hr
                            className={
                              "absolute inset-x-0 border border-dashed border-[#C0C0C0]"
                            }
                          />
                        </div>
                      )}
                    </li>
                  ))}
              </SortableContext>
            )}

            <li className={"flex items-center"}>
              {formsList && formsList.length > 0 && (
                <div className={"relative flex w-20 items-center"}>
                  <hr
                    className={
                      "absolute inset-x-0 border border-dashed border-[#C0C0C0]"
                    }
                  />
                </div>
              )}

              <Button
                onClick={() => addNewItem()}
                icon={"plus"}
                size={"s"}
                className={"gap-4!"}
              >
                Add page
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </DndContext>
  );
}
