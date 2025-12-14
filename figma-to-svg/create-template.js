/// <reference types="@figma/plugin-typings" />

/**
 * @param {string} id
 */
async function getComponentById(id) {
  const component = await figma.getNodeByIdAsync(id);
  if (component?.type !== "COMPONENT")
    throw new Error(`Component with ID ${id} not found`);
  return component;
}

/**
 * @param {number} index
 */
async function createRow(index) {
  const itemRowComponentId = "17:634";
  const noIndexRowComponentId = "102:5374";
  const itemComponent = await getComponentById(itemRowComponentId);
  const noIndexComponent = await getComponentById(noIndexRowComponentId);

  // itemコンポーネントからテンプレートを作成する
  const itemTemplate = itemComponent.createInstance().detachInstance();
  itemTemplate.name = `row[${index}]`;

  // noIndexRowコンポーネントのインスタンスを作成
  const noIndexRow = noIndexComponent.createInstance().detachInstance();

  // noIndexRowのindexContainerの中身をitemTemplateにコピー
  const noIndexRowIndexContainer = noIndexRow.children.find(
    (child) => child.name === "indexContainer" && child.type === "FRAME",
  );
  if (noIndexRowIndexContainer?.type === "FRAME") {
    noIndexRowIndexContainer.children.forEach((child) => {
      itemTemplate.children
        .find((c) => c.name === "indexContainer")
        ?.appendChild(child.clone());
    });
  }
  // noIndexRowのインスタンスは不要なので削除
  noIndexRow.remove();

  // 各欄とその中のテキストのidをindex付きに変更する
  itemTemplate.children.map((cell) => {
    // No
    if (cell.name === "indexContainer") {
      cell.name = `indexContainer[${index}]`;
      const indexText = cell.children.find(
        (c) => c.name === "index" && c.type === "TEXT",
      );
      indexText.name = `index[${index}]`;
      // 右寄せ対応
      indexText.x = indexText.x + indexText.width;

      // nameNoIndex
      const nameNoIndex = cell.children.find(
        (c) => c.name === "nameNoIndex" && c.type === "TEXT",
      );
      nameNoIndex.name = `nameNoIndex[${index}]`;
    }
    // 商品名
    else if (cell.name === "nameContainer") {
      cell.name = `nameContainer[${index}]`;
      const text = cell.children[0];
      text.name = `name[${index}]`;
    }
    // 数量
    else if (cell.name === "quantityContainer") {
      cell.name = `quantityContainer[${index}]`;
      const text = cell.children[0];
      text.name = `quantity[${index}]`;
      // 右寄せ対応
      text.x = text.x + text.width;
    }
    // 単価
    else if (cell.name === "priceContainer") {
      cell.name = `priceContainer[${index}]`;
      const text = cell.children[0];
      text.name = `price[${index}]`;
      // 右寄せ対応
      text.x = text.x + text.width;
    }
    // 金額
    else if (cell.name === "amountContainer") {
      cell.name = `amountContainer[${index}]`;
      const text = cell.children[0];
      text.name = `amount[${index}]`;
      // 右寄せ対応
      text.x = text.x + text.width;
    }
    return cell;
  });

  return itemTemplate;
}

async function createTemplate() {
  const baseComponentId = "17:957";
  const headerComponentId = "17:620";

  // baseコンポーネントからテンプレートを作成
  const baseComponent = await getComponentById(baseComponentId);
  const base = baseComponent.createInstance().detachInstance();
  base.name = "Template";
  base.children.forEach((child) => {
    console.log(`Child: ${child.name} (${child.type})`);
  });
  // 合計金額の右寄せ対応
  const amountContainer = base.children.find(
    (child) => child.name === "amountContainer" && child.type === "GROUP",
  );
  const amountText = amountContainer.children.find(
    (child) => child.name === "amount" && child.type === "TEXT",
  );
  amountText.x = amountText.x + amountText.width;

  // テンプレート内の明細表示エリアを取得
  const detailContainer = base.children.find(
    (child) => child.name === "detailContainer" && child.type === "FRAME",
  );
  if (!detailContainer) throw new Error("Detail area not found");

  // headerコンポーネントからインスタンスを作成し、先ほどの明細表示エリアに追加
  const headerComponent = await getComponentById(headerComponentId);
  const header = headerComponent.createInstance();
  detailContainer.appendChild(header);

  // 帳票に表示できる明細行のMAX
  const maxItems = 13;
  for (let i = 0; i < maxItems; i++) {
    const row = await createRow(i);
    detailContainer.appendChild(row);
  }
}

await createTemplate();
