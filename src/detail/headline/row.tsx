import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import type { Headline } from "./type";

type Props = {
  headline: Headline;
  setHeadline: (headline: Headline) => void;
  deleteRow: () => void;
};

export function HeadlineRow({ headline, setHeadline, deleteRow }: Props) {
  return (
    <div className="col-span-6 grid grid-cols-subgrid items-center gap-2">
      <div />
      <Input
        type="text"
        value={headline.title}
        onChange={(e) => setHeadline({ ...headline, title: e.target.value })}
      />
      <div />
      <div />
      <div />
      <Button type="button" variant="destructive" size="sm" onClick={deleteRow}>
        delete
      </Button>
    </div>
  );
}
