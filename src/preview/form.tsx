import { useState } from "react";
import { DatePicker } from "../components/ui/date-picker";
import { Input } from "../components/ui/input";
import type { Detail } from "../detail/type";
import { setCustomer, setDate, setRemarks } from "./utils/base-info";
import { toggleIndexLines } from "./utils/detail";

export function SettingForm({ detail }: { detail: Detail[] }) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  return (
    <form className="mx-2 p-2 border rounded-md w-80 flex flex-col gap-y-4 bg-white max-w-2xs">
      <div className="flex flex-col gap-y-2">
        <label className="text-lg font-bold" htmlFor="customer">
          支払先
        </label>
        <Input
          type="text"
          name="customer"
          id="customer"
          className="border p-1 w-full mb-2"
          onChange={(e) => {
            setCustomer(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-lg font-bold" htmlFor="date">
          日付
        </label>
        <DatePicker
          date={selectedDate}
          setDate={(d) => {
            setDate(d);
            setSelectedDate(d);
          }}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-lg font-bold" htmlFor="remarks">
          備考
        </label>
        <Input
          type="text"
          name="remarks"
          id="remarks"
          className="border p-1 w-full mb-2"
          onChange={(e) => {
            setRemarks(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-lg font-bold" htmlFor="remarks">
          No列
        </label>
        <div className="flex gap-x-4">
          <label className="flex items-center gap-x-2">
            <input
              type="radio"
              name="show-index"
              value="show"
              defaultChecked
              onChange={() => {
                toggleIndexLines(detail, true);
              }}
            />
            表示
          </label>
          <label className="flex items-center gap-x-2">
            <input
              type="radio"
              name="show-index"
              value="hide"
              onChange={() => {
                toggleIndexLines(detail, false);
              }}
            />
            非表示
          </label>
        </div>
      </div>
    </form>
  );
}
