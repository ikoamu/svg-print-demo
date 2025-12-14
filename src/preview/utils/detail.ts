import { set } from "date-fns";
import type { Headline } from "../../detail/headline/type";
import type { Item } from "../../detail/item/type";
import type { Detail } from "../../detail/type";
import { MAX_ITEM } from "../constants";
import { setTextById, toggleDisplayById } from "./svg";

function setIndex(index: number, value: number | undefined) {
  setTextById(`index[${index}]`, value?.toString());
}

function setName(index: number, value: string | undefined) {
  setTextById(`name[${index}]`, value);
}

function setQuantity(index: number, value: number | undefined) {
  setTextById(`quantity[${index}]`, value?.toString());
}

function setPrice(index: number, value: number | undefined) {
  setTextById(`price[${index}]`, value?.toLocaleString());
}

function setAmount(index: number, value: number | undefined) {
  setTextById(`amount[${index}]`, value?.toLocaleString());
}

function setItem(
  i: number,
  displayIndex: number,
  item: Item,
  showIndex: boolean = true,
) {
  if (showIndex) {
    setIndex(i, displayIndex);
    setTextById(`nameNoIndex[${i}]`);
    setName(i, item.name);
  } else {
    setTextById(`index[${i}]`);
    setTextById(`nameNoIndex[${i}]`, item.name);
    setName(i, "");
  }
  setQuantity(i, item.quantity);
  setPrice(i, item.price);
  setAmount(i, item.quantity * item.price);
}

function setHeadline(i: number, headline: Headline, showIndex: boolean = true) {
  if (showIndex) {
    setTextById(`index[${i}]`);
    setTextById(`nameNoIndex[${i}]`);
    setTextById(`name[${i}]`, headline.title);
  } else {
    setTextById(`index[${i}]`);
    setTextById(`nameNoIndex[${i}]`, headline.title);
    setName(i, "");
  }
  setTextById(`quantity[${i}]`);
  setTextById(`price[${i}]`);
  setTextById(`amount[${i}]`);
  toggleDisplayById(`indexLine[${i}]`, false);
  toggleDisplayById(`nameLine[${i}]`, false);
  toggleDisplayById(`quantityLine[${i}]`, false);
  toggleDisplayById(`priceLine[${i}]`, false);
}

function setSubtotal(i: number, value: number | undefined) {
  setTextById(`index[${i}]`);
  setTextById(`nameNoIndex[${i}]`);
  setTextById(`name[${i}]`);
  setTextById(`quantity[${i}]`);
  setTextById(`price[${i}]`, "小計");
  setTextById(`amount[${i}]`, value?.toLocaleString());
  toggleDisplayById(`indexLine[${i}]`, false);
  toggleDisplayById(`nameLine[${i}]`, false);
  toggleDisplayById(`quantityLine[${i}]`, false);
}

function setEmptyRow(i: number) {
  setTextById(`index[${i}]`);
  setTextById(`nameNoIndex[${i}]`);
  setTextById(`name[${i}]`);
  setTextById(`quantity[${i}]`);
  setTextById(`price[${i}]`);
  setTextById(`amount[${i}]`);
  toggleDisplayById(`underline[${i}]`, false);
}

export function setDetail(detail: Detail[]) {
  for (let i = 0; i < MAX_ITEM; i++) {
    const item = detail[i];
    if (item) {
      if (item.type === "item") {
        const displayIndex = calcItemIndex(i, detail);
        setItem(i, displayIndex, item);
      } else if (item.type === "headline") {
        setHeadline(i, item);
      } else if (item.type === "subtotal") {
        setSubtotal(i, calcSubtotalAt(i, detail));
      }
    } else {
      setEmptyRow(i);
    }
  }
}

export function calcItemIndex(index: number, detail: Detail[]): number {
  let count = 0;
  for (let i = 0; i <= index; i++) {
    const d = detail[i];
    if (d && d.type === "item") {
      count += 1;
    }
  }
  return count;
}

function calcSubtotalAt(index: number, detail: Detail[]): number {
  let sum = 0;
  for (let i = index - 1; i >= 0; i--) {
    const item = detail[i];
    if (item.type === "subtotal") break;
    if (item.type === "item") {
      sum += item.price * item.quantity;
    }
  }

  return sum;
}

export function toggleIndexLines(detail: Detail[], showIndex: boolean) {
  setTextById("indexHeader", "No");
  setTextById("nameNoIndexHeader");
  for (let i = 0; i < MAX_ITEM; i++) {
    toggleDisplayById(`indexLine[${i}]`, showIndex);
    const d = detail[i];
    if (!d) {
    } else if (d.type === "item") {
      setItem(i, calcItemIndex(i, detail), d, showIndex);
    } else if (d.type === "headline") {
      setHeadline(i, d, showIndex);
    }
  }
}
