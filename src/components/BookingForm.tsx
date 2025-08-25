"use client";

import { useMemo, useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// shadcn/ui
import { Calendar,  CalendarDayButton } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

{/* Define form type */}
type Form = {
  name: string;
  phone: string;                 // digits only
  date: string;                  // "YYYY-MM-DD"
  time: string;                  // e.g., "10:00 AM"
  period: "morning" | "evening";
};

{/* Time Slots */}
const SLOTS: Record<Form["period"], string[]> = {
  morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  evening: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
};

{/* Helper function to format date */}
function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingForm() {

  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    date: "",
    time: "",
    period: "morning",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  // Temp date inside calendar modal
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined);

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

  // Initialize tempDate when opening calendar
  useEffect(() => {
    if (openCalendar) setTempDate(selectedDate ?? new Date());
  }, [openCalendar]); 

  {/* Updaters */}
  function onChange<K extends keyof Form>(key: K, v: string) {
    setSubmitted(false);
    setForm((prev) => ({
      ...prev,
      [key]: key === "phone" ? v.replace(/[^\d]/g, "") : v,
    }));
  }

  {/* Submit */}
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    // post to backend here in real app
    setSubmitted(true);
  }

  {/* UI */}
  return (
    <div className="mx-auto max-w-4xl rounded-[28px] bg-stone-100 p-6 md:p-8">
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
        <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col space-y-7">
            <label className="text-sm text-black">Select Date and Time</label>

            {/* Trigger: open calendar modal */}
            <button
              type="button"
              aria-label="Select date and time"
              onClick={() => setOpenCalendar(true)}
              className="w-full md:w-[341px] h-[73px] rounded-[20px] border-2 border-stone-400/90 px-[20px] py-[15px]
                         text-base outline-none focus:border-stone-500 focus:ring-0
                         placeholder:font-light placeholder:text-[20px] placeholder:leading-[20px] placeholder:text-black/60"
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    form.date || form.time
                      ? "text-stone-900 text-[20px] leading-[20px] font-normal"
                      : "text-black/60 text-[20px] leading-[20px]"
                  }
                >
                  {form.date && selectedDate
                    ? `${format(selectedDate, "dd/MM")} , ${form.time || "Time"}`
                    : "DD/MM , Time"}
                </span>
                <ChevronDown className="h-4 w-4 text-black/50" />
              </div>
            </button>
          </div>
        </div>

        {/* ---------- Calendar Modal ---------- */}
        <Dialog open={openCalendar} onOpenChange={setOpenCalendar}>
          <DialogContent
            showCloseButton={false}
            className="w-[740px] max-w-[95vw] max-h-[95vh] overflow-auto rounded-[24px] p-6 md:p-8 shadow-x"
          >
            <DialogHeader className="sr-only">
              <DialogTitle>Select a date</DialogTitle>
            </DialogHeader>

            <div className="p-0">
              <div className="cal-figma mx-auto box-border w-full max-w-[860.8px] rounded-[24px] [--cell-size:60px]">
                <Calendar
                  mode="single"
                  selected={tempDate}
                  defaultMonth={tempDate}
                  disabled={{ before: new Date() }}
                  showOutsideDays={false}
                  locale={enUS}
                  // Weekday labels like Figma: Sun Mon Tue ...
                  formatters={{
                    formatWeekdayName: (date) => format(date, "EEE"),
                  }}
                  className="mx-auto w-full max-w-[720px]"
                  onSelect={(d) => {
                    if (!d) return;
                    setTempDate(d);
                    // immediately show time popup after picking a date
                    setOpenTime(true);
                  }}
                  classNames={{
                    caption_label: "text-[20px] font-medium tracking-tight",
                    day_outside: "hidden",
                  }}
                  components={{
                    Chevron: ({ orientation, className, ...p }) =>
                      orientation === "left" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className={`size-7 ${className}`}
                          {...p}
                        >
                          <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : orientation === "right" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className={`size-7 ${className}`}
                          {...p}
                        >
                          <path
                            d="M9 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className={`size-7 ${className}`}
                          {...p}
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),

                    DayButton: (props) => (
                      <CalendarDayButton
                        {...props}
                        className={[
                          // brand filled chip when selected (wins over defaults)
                          "data-[selected-single=true]:!bg-[#A96046]",
                          "data-[selected-single=true]:!text-white",
                          // keep brand on hover when selected
                          "data-[selected-single=true]:hover:!bg-[#A96046]",
                          // neutral hover when not selected
                          "hover:bg-stone-200",
                        ].join(" ")}
                      />
                    ),
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpenCalendar(false);
                  setTempDate(selectedDate ?? undefined); // discard
                }}
                size="xl"
                className="rounded-[12px]"
              >
                Cancel
              </Button>

              
              <Button
                type="button"
                size="xl"
                className="rounded-[12px] bg-[#A96046] text-white hover:brightness-95"
                onClick={() => {
                  if (tempDate) {
                    onChange("date", toISODate(tempDate));
                  }
                  setOpenCalendar(false);
                }}
                
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ---------- Time Modal ---------- */}
        <Dialog open={openTime} onOpenChange={setOpenTime}>
          <DialogContent 
            className="sm:max-w-[520px] rounded-3xl border-0 bg-stone-50 p-6 sm:p-8 shadow-xl"
            showCloseButton={false}>
            {/* Accent color (from the mock) */}
            <style>{`:root { --accent:#B76851; }`}</style>

            <DialogTitle className="hidden">Select a time slot</DialogTitle>

            {/* Morning / Evening tabs */}
            <div className="mb-6">
              <div className="flex items-end justify-center gap-10 border-b border-stone-200">
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
                        "relative pb-3 text-2xl font-medium transition-colors",
                        active
                          ? "text-[color:var(--accent)] after:absolute after:left-0 after:-bottom-[2px] after:h-1 after:w-full after:rounded-full after:bg-[color:var(--accent)] after:content-['']"
                          : "text-stone-400 hover:text-stone-600",
                      ].join(" ")}
                    >
                      {p[0].toUpperCase() + p.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            {(() => {
              const disabledSlots = new Set<string>(["10:00 AM"]); // to match figma design
              return (
                <div className="grid grid-cols-3 gap-4">
                  {slots.map((t) => {
                    const active = form.time === t;
                    const disabled = disabledSlots.has(t);

                    return (
                      <Button
                        key={t}
                        type="button"
                        variant={active ? "main" : "outline"}
                        size="xl"
                        onClick={() => !disabled && onChange("time", t)}
                        disabled={disabled}
                        className={[
                          "h-12 rounded-xl px-5 text-lg shadow-sm transition",
                          !active && !disabled && "bg-white text-stone-900 border-stone-300 hover:bg-stone-50",
                          active && "bg-[color:var(--accent)] text-white border-0 hover:opacity-95 active:opacity-90",
                          disabled && "cursor-not-allowed bg-stone-200 text-stone-400 border-stone-300",
                        ].join(" ")}
                      >
                        {t}
                      </Button>
                    );
                  })}
                </div>
              );
            })()}

            {/* Action row */}
            <div className="mt-8 flex items-center justify-end">
              <Button
                type="button"
                size="xl"
                onClick={() => setOpenTime(false)}
                className="rounded-xl bg-[color:var(--accent)] px-7 py-5 text-base text-white hover:opacity-90"
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>


        {/* Footer actions */}
        <div className="mt-10 flex justify-end gap-4">
          <Button
            type="button"
            size="xl"
            variant="main"
            className="rounded-[15px] border-2 border-stone-900 bg-white px-6 py-3 text-sm text-black/73"
            onClick={() =>
              setForm({ name: "", phone: "", date: "", time: "", period: "morning" })
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="xl"
            disabled={!isValid}
            variant="main"
            className={[
              "rounded-[15px] px-6 py-3 text-sm text-white",
              isValid
                ? "bg-[#A96046] hover:brightness-95"
                : "cursor-not-allowed bg-stone-400",
            ].join(" ")}
          >
            Confirm
          </Button>
        </div>

        {/* Demo success */}
        {submitted && (
          <p className="mt-6 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            Success — booking saved locally (demo). ✅
          </p>
        )}
      </form>
    </div>
  );
}
