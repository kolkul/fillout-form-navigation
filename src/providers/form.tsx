import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { type NavFormType } from "@/src/types/form";

export type FormContextType = {
  activeId: NavFormType["id"] | null;
  setActiveId: (id: NavFormType["id"]) => void;

  formsList: NavFormType[] | null;
  setFormList: React.Dispatch<React.SetStateAction<NavFormType[] | null>>;

  addNewItem: (place?: number, label?: string) => void;

  setFirst: (id: NavFormType["id"]) => void;
  onRename: (id: NavFormType["id"], value: NavFormType["label"]) => void;
  onCopy: (id: NavFormType["id"]) => void;
  onDuplicate: (id: NavFormType["id"]) => void;
  onDelete: (id: NavFormType["id"]) => void;

  randomId: () => number;
};

const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error("Must be used inside <FormProvider />");
  return context;
}

function randomId(): number {
  return Math.floor(Math.random() * 9e9) + 1e9; // завжди 10 цифр, не починається з 0
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeId, setActiveId] = useState<FormContextType["activeId"]>(null);
  const [formsList, setFormList] = useState<FormContextType["formsList"]>(null);

  useEffect(() => {
    if (!searchParams || !router) return;

    const storage = JSON.parse(localStorage.getItem("formsList"));
    const formId = searchParams.get("formId");

    if (storage) setFormList(storage);
    if (formId) setActiveId(formId);
  }, [searchParams, router]);

  useEffect(() => {
    if (!activeId || !searchParams || !router) return;

    const params = new URLSearchParams(searchParams);
    params.set("formId", `${activeId}`);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [activeId, searchParams, router]);

  useEffect(() => {
    if (!formsList || formsList?.length <= 0) return;
    localStorage.setItem("formsList", JSON.stringify(formsList));
  }, [formsList]);

  function addNewItem(place?: number, label?: string) {
    const newId = randomId();

    if (place) {
      setFormList((prevState) => [
        ...prevState.slice(0, place + 1),
        {
          id: newId,
          label: label ? label : "New",
          isInfo: false,
        },
        ...prevState.slice(place + 1),
      ]);
    } else {
      setFormList((prevState) =>
        prevState && prevState.length > 0
          ? [
              ...prevState,
              {
                id: newId,
                label: label ? label : "New",
                isInfo: false,
              },
            ]
          : [
              {
                id: newId,
                label: label ? label : "New",
                isInfo: false,
              },
            ]
      );
    }

    setActiveId(newId);
  }

  function setFirst(id: NavFormType["id"]) {
    setFormList((prevState) => {
      const array = [...prevState];
      const index = array.findIndex((item) => item.id === id);
      const item = array.splice(index, 1);
      return [...item, ...array];
    });
  }
  function onRename(id: NavFormType["id"], value: string) {
    setFormList((prevState) =>
      prevState.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            label: value,
          };
        }

        return item;
      })
    );
  }
  function onCopy(id: NavFormType["id"]) {
    console.log(id);
  }
  function onDuplicate(id: NavFormType["id"]) {
    const item = formsList.find((item) => item.id === id);
    const index = formsList.findIndex((item) => item.id === id);

    let newLabel: string = null;

    for (let i = 1; newLabel === null; i++) {
      const labelCheck = item.label + `(${i})`;
      const isExist = formsList.some((i) => i.label == labelCheck);

      if (!isExist) {
        newLabel = labelCheck;
      }
    }

    addNewItem(index, newLabel);
  }
  function onDelete(id: NavFormType["id"]) {
    setFormList((prevState) =>
      prevState.filter((i, index) => {
        if (i.id !== id) {
          return true;
        }
        if (prevState[index - 1]) setActiveId(prevState[index - 1].id);
        return false;
      })
    );
  }

  return (
    <FormContext.Provider
      value={{
        activeId,
        setActiveId,
        formsList,
        addNewItem,
        setFormList,
        setFirst,
        onRename,
        onCopy,
        onDuplicate,
        onDelete,
        randomId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
