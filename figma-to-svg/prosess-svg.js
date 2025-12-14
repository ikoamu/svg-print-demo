import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * IDがパターンにマッチするかチェック
 * @param {string | undefined} id
 * @param {RegExp[]} patterns
 * @returns {boolean}
 */
function matchesAnyPattern(id, patterns) {
  if (!id) return false;
  return patterns.some((pattern) => pattern.test(id));
}

// 右寄せ対象のテキスト要素のIDパターン
const rightAlignedIdPatterns = [
  // 合計金額
  /^amount$/,
  // 明細行の項目
  /^index\[\d+\]$/,
  /^quantity\[\d+\]$/,
  /^price\[\d+\]$/,
  /^amount\[\d+\]$/,
];
/**
 * 右寄せを設定するプラグイン
 * @type {import('svgo').PluginConfig}
 */
const setTextAnchorPlugin = {
  name: "setTextAnchor",
  fn: () => ({
    element: {
      enter: (node) => {
        if (node.name !== "text") return;

        const id = node.attributes.id;
        if (matchesAnyPattern(id, rightAlignedIdPatterns)) {
          node.attributes["text-anchor"] = "end";
        }
      },
    },
  }),
};

/**
 * 下線用のIDを設定するプラグイン
 * @type {import('svgo').PluginConfig}
 */
const setUnderlineIdPlugin = {
  name: "setUnderlineId",
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (node.name !== "path") return;

        const parentId = parentNode.attributes.id;
        const match = parentId?.match(/^row\[(\d+)\]$/);
        if (!match) return;

        node.attributes.id = `underline[${match[1]}]`;
      },
    },
  }),
};

/**
 * 縦線用のIDを設定するプラグイン
 * @type {import('svgo').PluginConfig}
 */
const setVerticalLineIdPlugin = {
  name: "setVerticalLineId",
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (node.name !== "path") return;
        if (parentNode.type !== "element") return;
        if (parentNode.name !== "g") return;

        const parentId = parentNode.attributes.id;
        if (!parentId) return;

        // コンテナ名からライン名へのマッピング
        const containerPatterns = [
          { pattern: /^indexContainer\[(\d+)\]$/, linePrefix: "indexLine" },
          { pattern: /^nameContainer\[(\d+)\]$/, linePrefix: "nameLine" },
          {
            pattern: /^quantityContainer\[(\d+)\]$/,
            linePrefix: "quantityLine",
          },
          { pattern: /^priceContainer\[(\d+)\]$/, linePrefix: "priceLine" },
        ];

        for (const { pattern, linePrefix } of containerPatterns) {
          const match = parentId.match(pattern);
          if (match) {
            node.attributes.id = `${linePrefix}[${match[1]}]`;
            return;
          }
        }
      },
    },
  }),
};

/**
 * SVGを処理する
 * @param {string} svgContent
 * @returns {string}
 */
function processSvg(svgContent) {
  const result = optimize(svgContent, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // デフォルト最適化を無効化
            removeDoctype: false,
            removeXMLProcInst: false,
            removeComments: false,
            removeMetadata: false,
            removeEditorsNSData: false,
            cleanupAttrs: false,
            mergeStyles: false,
            inlineStyles: false,
            minifyStyles: false,
            cleanupIds: false,
            removeUselessDefs: false,
            cleanupNumericValues: false,
            convertColors: false,
            removeUnknownsAndDefaults: false,
            removeNonInheritableGroupAttrs: false,
            removeUselessStrokeAndFill: false,
            cleanupEnableBackground: false,
            removeHiddenElems: false,
            removeEmptyText: false,
            convertShapeToPath: false,
            convertEllipseToCircle: false,
            moveElemsAttrsToGroup: false,
            moveGroupAttrsToElems: false,
            collapseGroups: false,
            convertPathData: false,
            convertTransform: false,
            removeEmptyAttrs: false,
            removeEmptyContainers: false,
            mergePaths: false,
            removeUnusedNS: false,
            sortAttrs: false,
            sortDefsChildren: false,
            removeDesc: false,
          },
        },
      },
      "removeDimensions",
      setTextAnchorPlugin,
      setUnderlineIdPlugin,
      setVerticalLineIdPlugin,
    ],
  });

  return result.data;
}

function main() {
  const svgFilePath = path.join(__dirname, "template.svg");

  if (!fs.existsSync(svgFilePath)) {
    process.exit(1);
  }

  const svgContent = fs.readFileSync(svgFilePath, "utf8");
  const processedSvg = processSvg(svgContent);

  const outputPath = path.join(__dirname, "template-processed.svg");
  fs.writeFileSync(outputPath, processedSvg, "utf8");
}

main();
