"use client";

import { useMemo, useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
// shadcn/ui
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

//form type
type Form = {
  name: string;
  phone: string;
  date: string;
  time: string;
  period: "morning" | "evening";
};

// Time SLots
const SLOTS: Record<Form["period"], string[]> = {
  morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  evening: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
};

//Helper function to format date
function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingForm({
  isOpen = true,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
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

  const isNameValid = useMemo(() => {
    const trimed = form.name.trim();
    return /^\S+\s+\S+/.test(trimed);
  }, [form.name]);
  const isPhoneValid = /^0\d{9,}$/.test(form.phone);
  const isValid = useMemo(
    () =>
      !!(
        isNameValid &&
        isPhoneValid &&
        form.date.trim() !== "" &&
        form.time.trim() !== ""
      ),
    [isNameValid, isPhoneValid, form.date, form.time],
  );

  const selectedDate: Date | undefined = form.date
    ? new Date(form.date + "T00:00:00")
    : undefined;

  const slots = SLOTS[form.period];

  // Initialize tempDate when opening calendar
  useEffect(() => {
    if (openCalendar) setTempDate(selectedDate ?? new Date());
  }, [openCalendar]);

  // Clear form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        period: "morning",
      });
      setSubmitted(false);
    }
  }, [isOpen]);

  //Updaters
  function onChange<K extends keyof Form>(key: K, v: string) {
    setSubmitted(false);
    setForm((prev) => ({
      ...prev,
      [key]: key === "phone" ? v.replace(/[^\d]/g, "") : v,
    }));
  }

  // Submit
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    const prettyDate = selectedDate ? format(selectedDate, "dd/MM/yyyy") : "—";

    toast.success("Booking submitted", {
      description: `${form.name} • ${prettyDate} at ${form.time}`,
      duration: 4000,
    });

    // Close modal after successful submission
    if (onClose) {
      onClose();
    }
  }

  //UI
  const formContent = (
    <div className="p-4">
      <form
        onSubmit={submit}
        className="rounded-[20px] bg-transparent p-4 md:p-6 mx-auto max-w-[800px]"
      >
        {/* Row: Name + Phone */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Name */}
          <div className="flex flex-col space-y-3 md:space-y-7 order-2 md:order-1">
            <label htmlFor="name" className="text-sm text-black">
              Your Name
            </label>
            <input
              id="name"
              placeholder="First Name + Last Name"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              required
              className="w-full md:w-[341px] h-12 md:h-[73px] rounded-[14px] md:rounded-[20px] border-2 border-stone-400/90 px-4 py-3 md:px-[20px] md:py-[15px]
                         text-base md:text-[20px] outline-none focus:border-stone-500 focus:ring-0
                         placeholder:font-light placeholder:text-base md:placeholder:text-[20px] placeholder:leading-[20px] placeholder:text-black/60"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-3 md:space-y-7 order-1 md:order-2">
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
              className="w-full md:w-[341px] h-12 md:h-[73px] rounded-[14px] md:rounded-[20px] border-2 border-stone-400/90 px-4 py-3 md:px-[20px] md:py-[15px]
                         text-base md:text-[20px] outline-none focus:border-stone-500 focus:ring-0
                         placeholder:font-light placeholder:text-base md:placeholder:text-[20px] placeholder:leading-[20px] placeholder:text-black/60"
            />
            {!isPhoneValid && form.phone !== "" && (
              <p className="pt-1 text-xs text-rose-600">
                Must start with zero, at least 10 numbers.
              </p>
            )}
          </div>
        </div>

        {/* Date/Time field */}
        <div className="mt-6 md:mt-7 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          <div className="flex flex-col space-y-3 md:space-y-7">
            <label className="text-sm text-black">Select Date and Time</label>
            {/* Trigger to open calendar modal */}
            <Button
              type="button"
              aria-label="Select date and time"
              onClick={() => setOpenCalendar(true)}
              variant="ghost"
              className="w-full md:w-[341px] h-12 md:h-[73px] rounded-[14px] md:rounded-[20px] 
                        border-2 border-stone-400/90 px-4 md:px-[20px]
                        text-left text-base md:text-[20px] outline-none focus:border-stone-500 focus:ring-0
                        placeholder:font-light placeholder:text-base md:placeholder:text-[20px] 
                        placeholder:leading-[20px] placeholder:text-black/60"
            >
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
              <ChevronDown className="ml-auto h-4 w-4 text-black/50" />
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Calendar Modal */}
          <Dialog open={openCalendar} onOpenChange={setOpenCalendar}>
            <DialogContent
              showCloseButton={false}
              className="overflow-hidden p-0 w-[calc(100vw-24px)] max-w-[720px] md:max-w-[760px] rounded-[24px] shadow-xl"
              onInteractOutside={(e) => {
                const element = e.target as HTMLElement | null;
                if (element && element.closest('[data-time-popover="true"]')) {
                  e.preventDefault(); // to allow popover interaction without closing dialog
                }
              }}
              onPointerDownOutside={(e) => {
                const element = e.target as HTMLElement | null;
                if (element && element.closest('[data-time-popover="true"]')) {
                  e.preventDefault();
                }
              }}
            >
              <DialogHeader className="sr-only">
                <DialogTitle>Select a date</DialogTitle>
              </DialogHeader>

              <div className="max-h-[80vh] overflow-auto py-6">
                <div className="mx-auto w-full max-w-[650px] rounded-[24px] bg-transparent">
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
                    className="w-full relative bg-transparent p-0"
                    onSelect={(d) => {
                      if (!d) return;
                      setTempDate(d);
                      // immediately show time popup after picking a date
                      setOpenTime(true);
                    }}
                    classNames={{
                      root: "w-full bg-transparent p-0",
                      table: "w-full table-fixed border-collapse",
                      weekdays: "space-y-5",
                      week: "mt-1",
                      day: "p-[5px] text-center align-middle",
                      // header
                      month_caption:
                        "flex justify-center items-center py-2 md:py-3",
                      caption_label:
                        "text-[18px] md:text-[20px] font-semibold text-stone-900",
                      weekday:
                        "py-2 text-center text-[13px] md:text-[14px] font-semibold text-stone-900",
                      //navButtons
                      button_next: "rounded-md p-2 hover:bg-stone-200",
                      button_previous: "rounded-md p-2 hover:bg-stone-200",
                      day_button:
                        "mx-auto m-[5px] grid place-items-center rounded-[8px] w-[56px] h-[34px] sm:w-[68px] sm:h-[52px] md:w-[80px] md:h-[60px] px-3 py-2 md:px-6 md:py-3 text-base font-medium leading-none select-none transition-colors hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B76851]/30",
                      today: "bg-transparent text-inherit",
                      outside: "text-stone-300",
                      disabled: "text-stone-300 cursor-not-allowed",
                      hidden: "invisible",
                    }}
                    components={{
                      Chevron: ({ orientation, className, ...p }) =>
                        orientation === "left" ? (
                          <ChevronLeft
                            className={`size-7 ${className}`}
                            {...p}
                          />
                        ) : (
                          <ChevronRight
                            className={`size-7 ${className}`}
                            {...p}
                          />
                        ),
                      DayButton: (props) => (
                        <CalendarDayButton
                          {...props}
                          className="rounded-[8px] w-[40px] h-[40px] md:w-[68px] md:h-[48px] flex items-center justify-center 
                                      text-[14px] md:text-[16px] font-medium transition-colors text-stone-900 hover:bg-[#F5EDE9] hover:text-[#A96046]
                                      data-[today=true]:ring-1 data-[today=true]:ring-[#A96046]
                                      data-[selected-single=true]:!bg-[#A96046] 
                                      data-[selected-single=true]:!text-white 
                                      data-[selected-single=true]:hover:!bg-[#8C4E3B]"
                        />
                      ),
                    }}
                  />

                  <div className="mt-6 flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="xl"
                      className="rounded-[12px] border border-[#AF674F] text-stone-500 hover:bg-[#AF674F] active:bg-[#7F3F29]"
                      onClick={() => {
                        setOpenCalendar(false);
                        setTempDate(selectedDate ?? undefined);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      size="xl"
                      variant="main"
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
                  {/*backdrop*/}
                  {openTime && (
                    <div className="absolute inset-0 md:rounded-[24px] z-[40] bg-black/20 pointer-events-none md:block" />
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Time Popover */}
          <Popover open={openTime} onOpenChange={setOpenTime}>
            <PopoverTrigger asChild>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
              />
            </PopoverTrigger>

            <PopoverContent
              data-time-popover="true"
              align="center"
              className={[
                // Center on MOBILE (viewport)
                "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                // Size
                "w-[calc(100vw-24px)] max-w-[520px] max-h-[min(70vh,520px)] overflow-auto z-[50] rounded-[20px] border-0 bg-white shadow-2xl",
                // Center on DESKTOP
                "md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
                "md:w-[487px] md:max-h-none md:px-6 md:pt-6 md:pb-6",
              ].join(" ")}
            >
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
                            ? "text-[#B76851] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[2px] after:h-[3px] after:w-24 after:rounded-full after:bg-[#B76851] after:content-['']"
                            : "text-stone-400 hover:text-stone-600",
                        ].join(" ")}
                      >
                        {p[0].toUpperCase() + p.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots */}
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
                            !active &&
                              !disabled &&
                              "bg-white text-stone-900 border-stone-300 hover:bg-stone-50",
                            active &&
                              "bg-[#B76851] text-white border-0 hover:opacity-95",
                            disabled &&
                              "cursor-not-allowed bg-stone-200 text-stone-400 border-stone-300",
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
                  className="rounded-[12px] px-5 py-2 text-sm font-medium bg-[#B76851] text-white hover:opacity-90"
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
            onClick={() => {
              setForm({
                name: "",
                phone: "",
                date: "",
                time: "",
                period: "morning",
              });
              // Close modal
              if (onClose) {
                onClose();
              }
            }}
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
      </form>
    </div>
  );

  // Always return as modal with specified size
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[95vh] p-0 w-[calc(100vw-24px)] max-w-[720px] md:max-w-[760px]"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>
        <main>{formContent}</main>
      </DialogContent>
    </Dialog>
  );
}
