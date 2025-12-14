import { calcItemIndex } from "../preview/utils/detail";
import { HeadlineRow } from "./headline/row";
import { ItemRow } from "./item/row";
import type { Item } from "./item/type";
import { SubtotalRow } from "./subtotal/row";
import type { Detail } from "./type";

type Props = {
  detail: Detail[];
  updateItemAt: (index: number, newItem: Item) => void;
  updateHeadlineAt: (index: number, title: string) => void;
  deleteDetailAt: (index: number) => void;
};

export function DetailList({
  detail,
  updateItemAt,
  updateHeadlineAt,
  deleteDetailAt,
}: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr_100px_100px_100px_auto] gap-2 mt-2">
      <DetailListHeader />
      {detail.map((d, index) =>
        d.type === "item" ? (
          <ItemRow
            key={"index"}
            displayIndex={calcItemIndex(index, detail)}
            item={d}
            setItem={(newItem) => updateItemAt(index, newItem)}
            deleteItem={() => deleteDetailAt(index)}
          />
        ) : d.type === "subtotal" ? (
          <SubtotalRow
            key={"index"}
            index={index}
            detail={detail}
            deleteRow={() => deleteDetailAt(index)}
          />
        ) : (
          <HeadlineRow
            key={"index"}
            headline={d}
            setHeadline={(newHeadline) =>
              updateHeadlineAt(index, newHeadline.title)
            }
            deleteRow={() => deleteDetailAt(index)}
          />
        ),
      )}
    </div>
  );
}

function DetailListHeader() {
  return (
    <div className="col-span-6 grid grid-cols-subgrid border-b-2 pb-2 items-center">
      <div className="font-bold">No.</div>
      <div className="font-bold">商品名</div>
      <div className="font-bold">数量</div>
      <div className="font-bold">単価</div>
      <div className="font-bold">金額</div>
      <div className="w-20" />
    </div>
  );
}
