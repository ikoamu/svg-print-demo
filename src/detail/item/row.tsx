import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import type { Item } from "./type";

type Props = {
  displayIndex: number;
  item: Item;
  setItem: (item: Item) => void;
  deleteItem: () => void;
};

export function ItemRow({ displayIndex, item, setItem, deleteItem }: Props) {
  return (
    <div className="col-span-6 grid grid-cols-subgrid items-center gap-2">
      <div className="text-right">{displayIndex}</div>
      <Input
        type="text"
        value={item.name}
        onChange={(e) => {
          setItem({ ...item, name: e.target.value });
        }}
      />
      <Input
        type="number"
        value={item.quantity}
        onChange={(e) => {
          setItem({ ...item, quantity: Number(e.target.value) });
        }}
      />
      <Input
        type="number"
        value={item.price}
        onChange={(e) => {
          setItem({ ...item, price: Number(e.target.value) });
        }}
      />
      <div className="text-right">
        {(item.price * item.quantity).toLocaleString()}
      </div>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={deleteItem}
      >
        delete
      </Button>
    </div>
  );
}
