"use client";

import { useMemo, useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// shadcn/ui
import { Calendar,  CalendarDayButton } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";

{/* Define form type */}
type Form = {
  name: string;
  phone: string;                 
  date: string;                  
  time: string;                  
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
        <div className="relative">
          {/* Calendar Modal */}
          <Dialog open={openCalendar} onOpenChange={setOpenCalendar}>
            <DialogContent
              showCloseButton={false}
              className="w-[calc(100vw-24px)] md:w-auto md:max-w-none max-h-[90vh] overflow-auto rounded-[24px] p-4 md:p-6 shadow-x"
              
              onInteractOutside={(e) => {
                const el = e.target as HTMLElement | null;
                if (el && el.closest('[data-time-popover="true"]')) {
                e.preventDefault(); // to allow popover interaction without closing dialog
                }
              }}
              onPointerDownOutside={(e) => {
                const el = e.target as HTMLElement | null;
                if (el && el.closest('[data-time-popover="true"]')) {
                e.preventDefault();
                }
              }}
              >
              <DialogHeader className="sr-only">
                <DialogTitle>Select a date</DialogTitle>
              </DialogHeader>

              <div className="p-0">
                <div className="booking-calendar mx-auto w-[min(96vw,650px)] rounded-[24px] bg-white h-[min(500px,80vh)]">
                  <Calendar
                    mode="single"
                    selected={tempDate}
                    defaultMonth={tempDate}
                    disabled={{ before: new Date() }}
                    showOutsideDays={false}
                    locale={enUS}
                    formatters={{
                      formatWeekdayName: (date) => format(date, "EEE"),
                    }}
                    className="w-full [--rdp-cell-size:46px]
                              sm:[--rdp-cell-size:54px]
                              md:[--rdp-cell-size:62px]
                              [--rdp-months-gap:0.5rem]"
                    onSelect={(d) => {
                      if (!d) return;
                      setTempDate(d);
                      // immediately show time popup after picking a date
                      setOpenTime(true);
                    }}
                    classNames={{
                                  table: "w-auto",  
                                  day_today: "!bg-transparent !text-inherit",}}
                    components={{
                      Chevron: ({ orientation, className, ...p }) =>
                      orientation === "left" ? (
                        <ChevronLeft className={`size-7 ${className}`} {...p} />
                      ) : orientation === "right" ? (
                        <ChevronRight className={`size-7 ${className}`} {...p} />
                      ) : (
                        <ChevronDown className={`size-7 ${className}`} {...p} />
                      ),
                      DayButton: (props) => (
                        <CalendarDayButton
                          {...props}
                          className="w-full aspect-[4/3] absolute inset-0 m-0 flex items-center justify-center rounded-[8px] text-base font-medium
                                    hover:bg-stone-200
                                    data-[today=true]:ring-1 data-[today=true]:ring-[#A96046] data-[today=true]:text-[#A96046]
                                    data-[selected-single=true]:!bg-[#A96046] data-[selected-single=true]:!text-white "
                        />
                      ),
                    }}
                  />

                  <div className="flex justify-end gap-3">
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
                  {openTime && (
                    <div className="fixed inset-0 z-[120] bg-black/20
                                    backdrop-brightness-150
                                    md:absolute md:inset-0 md:z-10 md:rounded-[24px]
                                    pointer-events-none" />
                  )}
                </div>
              </div>
              
            </DialogContent>
          </Dialog>

          {/* Time Popover */}
          <Popover open={openTime} onOpenChange={setOpenTime}>
            {/* Trigger button (small & tidy). Disabled until a date is picked. */}
            <PopoverTrigger asChild>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
              />
            </PopoverTrigger>

            <PopoverContent
              data-time-popover="true"
              align="center"
              side="top"
              sideOffset={5}
              className={[
                  // MOBILE: centered sheet
                  "w-[calc(100vw-24px)] max-w-[520px]",
                  "max-h-[min(70vh,520px)] overflow-auto",
                  "rounded-[20px] border-0 bg-white shadow-xl",
                  // DESKTOP: centered over calendar
                  "md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
                  "md:w-[487px] md:max-h-none md:rounded-[20px] md:px-6 md:pt-6 md:pb-6",
                ].join(" ")}
            >
              {/* Accent color from the mock */}
              <style>{`:root { --accent:#B76851; }`}</style>

              {/* Morning / Evening tabs */}
              <div className="mb-3">
                <div className="flex items-end justify-center gap-8">
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
                          "relative pb-2 text-lg font-medium transition-colors",
                          active
                            ? "text-[color:var(--accent)] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[2px] after:h-[3px] after:w-24 after:rounded-full after:bg-[color:var(--accent)] after:content-['']"
                            : "text-stone-400 hover:text-stone-600",
                        ].join(" ")}
                      >
                        {p[0].toUpperCase() + p.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots (compact) */}
              {(() => {
                const disabledSlots = new Set<string>(["10:00 AM"]); // to match the figma design
                const slots = SLOTS[form.period];

                return (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-2">
                    {slots.map((t) => {
                      const active = form.time === t;
                      const disabled = disabledSlots.has(t);
                      return (
                        <Button
                          key={t}
                          type="button"
                          variant={active ? "default" : "outline"}
                          size="lg"
                          onClick={() => !disabled && onChange("time", t)}
                          disabled={disabled}
                          className={[
                            "h-12 rounded-[12px] px-5 text-[18px] transition",
                            !active && !disabled && "bg-white text-stone-900 border-stone-300 hover:bg-stone-50",
                            active && "bg-[color:var(--accent)] text-white border-0 hover:opacity-95",
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

              {/* Confirm */}
              <div className="mt-5 flex items-center justify-end pr-2">
                <Button
                  type="button"
                  size="xl"
                  onClick={() => setOpenTime(false)}
                  className="rounded-[12px] px-5 py-2 text-sm font-medium bg-[color:var(--accent)] text-white hover:opacity-90"
                  disabled={!form.time}
                >
                  Confirm
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

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
