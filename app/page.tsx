"use client";

import { Suspense } from "react";

import FormsNavMenu from "@/src/components/feature/FormsNavMenu";
import { FormProvider } from "@/src/providers/form";
import Forms from "@/src/components/feature/Forms";

export default function Page() {
  return (
    <div className={"relative size-full overflow-x-auto"}>
      <Suspense fallback={null}>
        <FormProvider>
          <div className={"size-full pb-140"}>
            <Forms />
          </div>

          <FormsNavMenu />
        </FormProvider>
      </Suspense>
    </div>
  );
}
