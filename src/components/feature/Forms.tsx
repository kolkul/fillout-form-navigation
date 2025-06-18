import { useFormContext } from "@/src/providers/form";
import Button from "@/src/components/shared/Button";

export default function Forms() {
  const { activeId, formsList, addNewItem } = useFormContext();

  return (
    <div className={"relative flex size-full items-center justify-center"}>
      {formsList && formsList.length > 0 ? (
        formsList.map(({ id, label }) => (
          <div
            key={"form-" + id}
            className={`absolute text-center ${id == activeId ? "" : "pointer-events-none opacity-0 select-none"}`}
          >
            <p className={"text-body-m font-bold"}>{label}</p>
            <p>
              <strong>Form ID:</strong> {id}
            </p>
          </div>
        ))
      ) : (
        <div
          className={
            "absolute flex flex-col items-center justify-center text-center"
          }
        >
          <p className={"text-body-m mb-16 font-bold"}>Please Add new Form</p>
          <Button
            onClick={() => addNewItem()}
            icon={"plus"}
            size={"s"}
            className={"gap-4!"}
          >
            Add page
          </Button>
        </div>
      )}
    </div>
  );
}
