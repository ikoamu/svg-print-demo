import { Button } from "./components/ui/button";
import { DetailList } from "./detail/detail-list";
import { useDetail } from "./detail/hook";
import { MAX_ITEM } from "./preview/constants";
import { PreviewDialog } from "./preview/dialog";

function App() {
  const {
    detail,
    addItem,
    addSubtotal,
    updateItemAt,
    deleteDetailAt,
    addHeadline,
    updateHeadlineAt,
  } = useDetail();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">SVG Preview Print</h1>
      <div className="flex my-5 gap-x-2">
        <Button
          type="button"
          disabled={detail.length >= MAX_ITEM}
          onClick={addItem}
        >
          +1 item
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={detail.length >= MAX_ITEM}
          onClick={addSubtotal}
        >
          +1 subtotal
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={detail.length >= MAX_ITEM}
          onClick={addHeadline}
        >
          +1 headline
        </Button>
        <PreviewDialog detail={detail} />
      </div>
      <DetailList
        detail={detail}
        updateItemAt={updateItemAt}
        updateHeadlineAt={updateHeadlineAt}
        deleteDetailAt={deleteDetailAt}
      />
    </div>
  );
}

export default App;
