import type { Detail } from "../../detail/type";
import { setTextById } from "./svg";

export function setCustomer(customer: string | undefined) {
  setTextById("customer", customer);
}

export function setDate(date: Date | undefined) {
  if (!date) {
    setTextById("date");
    return;
  }
  const formattedDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;
  setTextById("date", formattedDate);
}

export function setRemarks(remarks: string | undefined) {
  setTextById("remark", remarks);
}

export function setAmount(detail: Detail[]) {
  const totalAmount = detail
    .filter((i) => i.type === "item")
    .reduce((sum, item) => sum + item.quantity * item.price, 0);
  setTextById("amount", `¥ ${totalAmount.toLocaleString()} -`);
}
