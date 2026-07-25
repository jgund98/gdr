"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * The inquiry line — FormSubmit relay, no backend to maintain.
 * Anti-bot: endpoint assembled client-side, honeypot field, and
 * submissions faster than a human could type are dropped.
 */
export default function InquiryForm() {
  const params = useSearchParams();
  const re = params.get("re");
  const sent = params.get("sent") === "1";
  const [submitting, setSubmitting] = useState(false);
  const [action, setAction] = useState("");
  const [next, setNext] = useState("");
  const armedAt = useRef(0);

  useEffect(() => {
    const user = [103, 117, 115, 114, 101, 110, 110, 121]
      .map((c) => String.fromCharCode(c))
      .join("");
    setAction("https://formsubmit.co/" + user + "@me.com");
    setNext(window.location.origin + "/contact?sent=1");
    armedAt.current = Date.now();
  }, []);

  if (sent) {
    return (
      <div className="chamfer flex min-h-[420px] flex-col items-center justify-center border border-line bg-ink-2 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center bg-green text-ink chamfer-sm">
          <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M4 11.5 9 16.5 18 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
          </svg>
        </span>
        <h3 className="display mt-7 text-3xl md:text-4xl">
          Received. <em className="text-green">Personally.</em>
        </h3>
        <p className="lede mt-4 max-w-md text-mist">
          Your inquiry goes straight to the developer's desk — expect a real
          answer, not an autoresponder.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      method="POST"
      onSubmit={(e) => {
        if (!action || Date.now() - armedAt.current < 3000) {
          e.preventDefault();
          return;
        }
        setSubmitting(true);
      }}
      className="chamfer border border-line bg-ink-2 p-7 md:p-10"
    >
      <input type="hidden" name="_subject" value="Inquiry — GDRDEVELOPMENT.COM" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="true" />
      {/* honeypot — humans never see it, bots can't resist it */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {next && <input type="hidden" name="_next" value={next} />}
      {re && <input type="hidden" name="residence" value={re} />}

      <p className="tag-index">The inquiry line</p>
      <h3 className="mt-3 display text-3xl md:text-4xl">
        {re ? (
          <>
            About <em className="text-green">{re}</em>
          </>
        ) : (
          "Start the conversation"
        )}
      </h3>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label text-faint">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full border border-line bg-ink px-4 py-3.5 text-paper outline-none transition-colors placeholder:text-faint focus:border-green"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="label text-faint">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 w-full border border-line bg-ink px-4 py-3.5 text-paper outline-none transition-colors placeholder:text-faint focus:border-green"
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="label text-faint">Phone (optional)</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="mt-2 w-full border border-line bg-ink px-4 py-3.5 text-paper outline-none transition-colors placeholder:text-faint focus:border-green"
          placeholder="If you'd rather talk"
        />
      </label>

      <label className="mt-5 block">
        <span className="label text-faint">What are you looking for?</span>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-2 w-full resize-none border border-line bg-ink px-4 py-3.5 text-paper outline-none transition-colors placeholder:text-faint focus:border-green"
          placeholder="A residence, a timeline, a question — a few sentences is plenty."
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="chamfer-sm mt-8 w-full bg-green px-8 py-4 font-semibold text-ink transition-colors hover:bg-green-bright disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Send the Inquiry"}
      </button>
      <p className="mt-4 text-sm text-faint">
        Answered by the team — pricing, timelines, and anything else you need.
      </p>
    </form>
  );
}
