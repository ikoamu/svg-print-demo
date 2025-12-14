import { Button } from "../../components/ui/button";
import type { Item } from "../item/type";
import type { Detail } from "../type";

type Props = {
  index: number;
  detail: Detail[];
  deleteRow: () => void;
};

export function SubtotalRow({ index, detail, deleteRow }: Props) {
  const subtotal = calcSubtotal(detail, index);
  return (
    <div className="col-span-6 grid grid-cols-subgrid items-center gap-2 bg-muted/50">
      <div />
      <div />
      <div />
      <div className="font-bold text-right">小計</div>
      <div className="font-bold text-right">{subtotal.toLocaleString()}</div>
      <Button type="button" variant="destructive" size="sm" onClick={deleteRow}>
        delete
      </Button>
    </div>
  );
}

function calcSubtotal(detail: Detail[], index: number) {
  const previousSubtotalIndex = detail
    .slice(0, index)
    .reverse()
    .findIndex((i) => i.type === "subtotal");
  const startIndex =
    previousSubtotalIndex === -1 ? 0 : index - previousSubtotalIndex;
  return detail
    .slice(startIndex, index)
    .filter((i): i is Item => i.type === "item")
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
}
