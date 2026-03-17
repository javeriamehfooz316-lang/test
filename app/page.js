"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data?.name,
          email: data?.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || result?.message || "Request failed");
      }

      setMessage("Submitted successfully.");
      setData({ name: "", email: "" });
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Something went wrong.");
      console.error("Error:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || !data.name.trim() || !data.email.trim();

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 py-10 text-slate-100 md:py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-cyan-300/20 bg-slate-900/80 p-6 shadow-[0_20px_70px_-20px_rgba(6,182,212,0.45)] backdrop-blur md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">MongoDB Form</p>
        <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">Create User</h1>
        <p className="mt-2 text-sm text-slate-300">Add a name and email, then submit to store in your database.</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="name@example.com"
              disabled={isSubmitting}
            />
          </div>

          {message ? (
            <p className={`text-sm ${isError ? "text-rose-300" : "text-emerald-300"}`}>{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
