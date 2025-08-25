'use client'
import { useState, useMemo } from "react";

type Form = {
    name: string;
    phone: string;
    date: string;
    time: string;
    period: "morning" | "evening";
};

const SLOTS = {
    morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
    evening: ["1:00 PM", "2:00 PM", "3:00 AM", "4:OO PM", "5:00 PM"]
};

export default function BookingForm(){
    const [form, setForm] = useState<Form>({
        name: "",
        phone: "",
        date: "",
        time: "",
        period: "morning",
    });

    const [submitted, setSubmitted] = useState(false);
    const isPhoneValid = /^\d{7,}$/.test(form.phone);
    const isValid = useMemo(() => {
    return !!(
        form.name.trim() !== "" &&
        isPhoneValid &&
        form.date.trim() !== "" &&
        form.time.trim() !== ""
        );
    }, [form, isPhoneValid]);

    const slots = SLOTS[form.period]

    function onChange<K extends keyof Form>(key: K, v: string) {
    setSubmitted(false);
    setForm((f) => ({
      ...f,
      [key]: key === "phone" ? v.replace(/[^\d]/g, "") : v,
    }));
  }

  function submit(e:React.FormEvent){
    e.preventDefault();
    if(!isValid) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-stone-100 p-6 md:p-8">

      {/* Card */}
      <form
        onSubmit={submit}
        className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
      >
        {/* name + phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-600">Your Name</label>
            <input
              className="w-full rounded-2xl border border-stone-300 p-3 outline-none transition-shadow placeholder:text-stone-400 focus:ring-2 focus:ring-stone-300"
              placeholder="First Name + Last Name"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-600">Phone Number</label>
            <input
              inputMode="numeric"
              className="w-full rounded-2xl border border-stone-300 p-3 outline-none transition-shadow placeholder:text-stone-400 focus:ring-2 focus:ring-stone-300"
              placeholder="06-xxxxxxxx"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              required
            />
            {!isPhoneValid && form.phone !== "" && (
              <p className="pt-1 text-xs text-rose-600">
                Digits only, at least 7 numbers.
              </p>
            )}
          </div>
        </div>

        {/* Date text & faux select */}
        <div className="mt-4 space-y-1">
          <label className="text-xs font-medium text-stone-600">
            Select Date and Time
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full rounded-2xl border border-stone-300 p-3 pr-10 outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-stone-300"
              placeholder="DD/MM , Time"
              value={form.date}
              onChange={(e) => onChange("date", e.target.value)}
              required
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-stone-400">
              ▾
            </span>
          </div>
        </div>

        {/* Time picker (tabs + slots) */}
        <div className="mt-6 rounded-2xl border border-stone-200 p-4">
          {/* Tabs */}
          <div className="mb-3 flex gap-6 border-b pb-2">
            {(["morning", "evening"] as const).map((p) => {
              const active = form.period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    onChange("period", p);
                    onChange("time", ""); // reset time when switching
                  }}
                  className={`-mb-[1px] border-b-2 pb-1 text-sm transition-colors ${
                    active
                      ? "border-stone-500 font-semibold text-stone-700"
                      : "border-transparent text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {p[0].toUpperCase() + p.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Slots */}
          <div className="flex flex-wrap gap-3">
            {slots.map((t) => {
              const active = form.time === t;
              const disabled = false; // make true for unavailable slots if needed
              return (
                <button
                  key={t}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange("time", t)}
                  className={[
                    "rounded-xl border px-4 py-2 text-sm",
                    disabled && "cursor-not-allowed opacity-40",
                    active
                      ? "border-stone-700 bg-stone-700 text-white"
                      : "border-stone-300 bg-stone-100 hover:bg-stone-200",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
              onClick={() =>
                setForm({ name: "", phone: "", date: "", time: "", period: "morning" })
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`ml-3 rounded-xl px-4 py-2 text-sm font-semibold text-white ${
                isValid
                  ? "bg-[#A96046] hover:brightness-95"
                  : "bg-stone-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>

        {submitted && (
          <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            Success — booking saved locally (demo). ✅
          </p>
        )}
      </form>
    </div>
  );
}