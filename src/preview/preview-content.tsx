import { type RefObject, useEffect } from "react";
import type { Detail } from "../detail/type";
import Template from "./template.svg?react";
import { setAmount, setCustomer, setDate, setRemarks } from "./utils/base-info";
import { setDetail } from "./utils/detail";

type Props = {
  detail: Detail[];
  contentRef: RefObject<HTMLDivElement | null>;
};

function initContent(detail: Detail[]) {
  setCustomer("");
  setDate(new Date());
  setAmount(detail);
  setRemarks("");
  setDetail(detail);
}

export function PreviewContent({ detail, contentRef }: Props) {
  useEffect(() => {
    initContent(detail);
  }, [detail]);

  return (
    <div
      ref={contentRef}
      className={`w-full max-w-xl min-w-[100px] max-h-[90vh] min-h-[100px] p-3 bg-gray-200 rounded
         print:w-full print:max-w-full print:min-w-full print:max-h-full print:min-h-full print:p-0 print:bg-white print:rounded-none`}
    >
      <style type="text/css" media="print" hidden>
        {"@page { size: A4 portrait; }"}
      </style>
      <Template />
    </div>
  );
}
