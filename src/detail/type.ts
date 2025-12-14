import type { Headline } from "./headline/type";
import type { Item } from "./item/type";
import type { Subtotal } from "./subtotal/type";

export type Detail = Item | Subtotal | Headline;
