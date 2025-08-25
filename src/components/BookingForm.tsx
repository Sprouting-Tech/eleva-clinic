"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

// shadcn/ui
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * ---- Types ----
 */
type Form = {
  name: string;
  phone: string;                 // stored as digits-only
  date: string;                  // "YYYY-MM-DD"
  time: string;                  // e.g., "10:00 AM"
  period: "morning" | "evening"; // which time set to show in the dialog
};

/**
 * ---- Time Slots ----
 * Normalized and typo-free.
 */
const SLOTS: Record<Form["period"], string[]> = {
  morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  evening: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
};

/**
 * ---- Helpers ----
 */
function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingForm() {
  /**
   * ---- State ----
   */
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    date: "",
    time: "",
    period: "morning",
  });

  const [submitted, setSubmitted] = useState(false);

  // Controlled open state for the two popups
  const [openDate, setOpenDate] = useState(false); // calendar popover
  const [openTime, setOpenTime] = useState(false); // time dialog

  /**
   * ---- Derived Values ----
   */
  const isPhoneValid = /^\d{7,}$/.test(form.phone);
  const isValid = useMemo(
    () =>
      !!(
        form.name.trim() !== "" &&
        isPhoneValid &&
        form.date.trim() !== "" &&
        form.time.trim() !== ""
      ),
    [form, isPhoneValid]
  );

  const selectedDate: Date | undefined = form.date
    ? new Date(form.date + "T00:00:00")
    : undefined;

  const slots = SLOTS[form.period];

  /**
   * ---- Field Updaters ----
   */
  function onChange<K extends keyof Form>(key: K, v: string) {
    setSubmitted(false);
    setForm((prev) => ({
      ...prev,
      [key]: key === "phone" ? v.replace(/[^\d]/g, "") : v,
    }));
  }

  /**
   * ---- Submit ----
   */
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    // In real app: POST form to backend here
    setSubmitted(true);
  }

  /**
   * ---- UI ----
   */
  return (
    <div className="mx-auto max-w-4xl rounded-[28px] bg-stone-100 p-6 md:p-8">
      {/* Card */}
      <form
        onSubmit={submit}
        className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200"
      >
        {/* Row: Name + Phone */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col space-y-7">
            <label htmlFor="name" className="text-sm text-black">
              Your Name
            </label>
            <input
              id="name"
              placeholder="First Name + Last Name"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              required
              className="w-full md:w-[341px] h-[73px] rounded-[20px] border-2 border-stone-400/90 px-[20px] py-[15px]
                        text-base outline-none focus:border-stone-500 focus:ring-0
                        placeholder:font-light placeholder:text-[20px] placeholder:leading-[20px] placeholder:text-black/60"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-7">
            <label htmlFor="phone" className="text-sm text-black">
              Phone Number
            </label>
            <input
              id="phone"
              inputMode="numeric"
              placeholder="06-xxxxxxxx"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              required
              className="w-full md:w-[341px] h-[73px] rounded-[20px] border-2 border-stone-400/90 px-[20px] py-[15px]
                        text-base outline-none focus:border-stone-500 focus:ring-0
                        placeholder:font-light placeholder:text-[20px] placeholder:leading-[20px] placeholder:text-black/60"
            />
            {!isPhoneValid && form.phone !== "" && (
              <p className="pt-1 text-xs text-rose-600">
                Digits only, at least 7 numbers.
              </p>
            )}
          </div>
        </div>

        {/* Date/Time field */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-7">
          <div className="flex flex-col space-y-7">
            <label className="text-sm text-black">
              Select Date and Time
            </label>

            {/* opens the calendar popover */}
            <Popover open={openDate} onOpenChange={setOpenDate}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Select date and time"
                  onClick={() => setOpenDate(true)}
                  className="w-full md:w-[341px] h-[73px] rounded-[20px] border-2 border-stone-400/90 px-[20px] py-[15px]
                             text-base outline-none focus:border-stone-500 focus:ring-0
                             placeholder:font-light placeholder:text-[20px] placeholder:leading-[20px] placeholder:text-black/60"
                >
                  <div className="flex items-center justify-between">
                    {/* value or placeholder */}
                    <span className={
                      form.date || form.time 
                        ? "text-stone-900 text-[20px] leading-[20px] font-normal" 
                        : "text-black/60 text-[20px] leading-[20px]"}
                    >
                      {form.date && selectedDate
                        ? `${format(selectedDate, "dd/MM")} , ${form.time || "Time"}`
                        : "DD/MM , Time"}
                    </span>
                    {/* DropDown Arrow */}
                    <ChevronDown className="h-4 w-4 text-black/50" />
                  </div>
                </button>
              </PopoverTrigger>

              {/* Calendar popup */}
              <PopoverContent
                align="start"
                className="w-auto p-0"
                sideOffset={8}
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => {
                    if (!d) return;
                    onChange("date", toISODate(d));
                    setOpenDate(false);
                    setTimeout(() => setOpenTime(true), 30);
                  }}
                  // disable past days
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* pop up to appear AFTER picking a date. */}
        <Dialog open={openTime} onOpenChange={setOpenTime}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-base">
                Pick a time {selectedDate ? `for ${format(selectedDate, "EEE, dd MMM yyyy")}` : ""}
              </DialogTitle>
            </DialogHeader>

            {/* simple two buttons */}
            <div className="mb-3 flex gap-3">
              {(["morning", "evening"] as const).map((p) => {
                const active = form.period === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      onChange("period", p);
                      onChange("time", "");
                    }}
                    className={[
                      "rounded-full border px-4 py-2 text-sm transition",
                      active
                        ? "border-stone-800 bg-stone-800 text-white"
                        : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50",
                    ].join(" ")}
                  >
                    {p[0].toUpperCase() + p.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* Slots grid */}
            <div className="grid grid-cols-3 gap-3">
              {slots.map((t) => {
                const active = form.time === t;
                const disabled = false; // put your availability logic here
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange("time", t)}
                    className={[
                      "rounded-xl border px-3 py-2 text-sm",
                      disabled && "cursor-not-allowed opacity-40",
                      active
                        ? "border-stone-800 bg-stone-800 text-white"
                        : "border-stone-300 bg-stone-100 hover:bg-stone-200",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Confirm/Close row for the dialog */}
            <div className="mt-5 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenTime(false)}
                className="rounded-full border-2 border-stone-900 bg-white px-6 text-stone-900 hover:bg-stone-50"
              >
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Footer actions */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            className="rounded-[15px] border-2 border-stone-900 bg-white px-6 py-3 text-sm text-[#AF674F]-900 hover:bg-[#AF674F]-50"
            onClick={() =>
              setForm({ name: "", phone: "", date: "", time: "", period: "morning" })
            }
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={[
              "rounded-[15px] px-6 py-3 text-sm text-white",
              isValid
                ? "bg-[#A96046] hover:brightness-95"
                : "cursor-not-allowed bg-stone-400",
            ].join(" ")}
          >
            confirm
          </button>
        </div>

        {/* Demo success notice */}
        {submitted && (
          <p className="mt-6 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            Success — booking saved locally (demo). ✅
          </p>
        )}
      </form>
    </div>
  );
}
