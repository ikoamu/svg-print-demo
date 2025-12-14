import { useState } from "react";
import type { Item } from "./item/type";
import type { Detail } from "./type";

export function useDetail() {
	const [detail, setDetail] = useState<Detail[]>([]);

	const addItem = () => {
		setDetail((prevItems) => [
			...prevItems,
			{
				type: "item",
				name: `商品${prevItems.length + 1}`,
				price: (prevItems.length + 1) * 100,
				quantity: prevItems.length + 1,
			},
		]);
	};

	const updateItemAt = (index: number, newItem: Item) => {
		setDetail((prevItems) => {
			const newItems = [...prevItems];
			newItems[index] = newItem;
			return newItems;
		});
	};

	const addHeadline = () => {
		setDetail((prevItems) => [
			...prevItems,
			{ type: "headline", title: `見出し:${prevItems.length + 1}` },
		]);
	};

	const updateHeadlineAt = (index: number, title: string) => {
		setDetail((prevItems) => {
			const newItems = [...prevItems];
			const current = newItems[index];
			if (current.type === "headline") {
				newItems[index] = { ...current, title };
			}
			return newItems;
		});
	};

	const addSubtotal = () => {
		setDetail((prevItems) => [...prevItems, { type: "subtotal" }]);
	};

	const deleteDetailAt = (index: number) => {
		setDetail((prevItems) => prevItems.filter((_, i) => i !== index));
	};

	return {
		detail,
		setDetail,
		addItem,
		addSubtotal,
		updateItemAt,
		updateHeadlineAt,
		addHeadline,
		deleteDetailAt,
	};
}
