import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import type { Detail } from "../detail/type";
import { SettingForm } from "./form";
import { PreviewContent } from "./preview-content";

type Props = {
  detail: Detail[];
};

export function PreviewDialog({ detail }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <Dialog>
      <DialogTrigger className="border bg-blue-800 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700">
        preview
      </DialogTrigger>
      <DialogContent className="bg-gray-100 min-w-[80vw] max-h-screen overflow-scroll">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <PreviewContent detail={detail} contentRef={contentRef} />
          <div className="flex flex-col gap-y-4 ml-4 mt-2">
            <SettingForm detail={detail} />
            <Button onClick={reactToPrintFn}>PDF出力</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
