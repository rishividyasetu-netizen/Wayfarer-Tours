"use client";

import { FormEvent, useState } from "react";
import SimplePageHeader from "../components/SimplePageHeader";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#1d2731]"><SimplePageHeader /><section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-[1280px] items-center gap-12 px-6 py-14 lg:grid-cols-[1fr_.85fr] lg:px-10"><div className="hidden min-h-[580px] rounded-[28px] bg-[url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center lg:block" /><div className="mx-auto w-full max-w-[470px] rounded-[24px] bg-white p-8 shadow-[0_18px_50px_rgba(18,40,61,0.1)] md:p-11"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b98b42]">Welcome back</p><h1 className="serif mt-3 text-5xl text-[#12283d]">Continue your journey.</h1><p className="mt-3 text-sm leading-6 text-[#687570]">Sign in to view your enquiries and keep your travel plans together.</p>{submitted ? <div className="mt-8 bg-[#e8ede5] p-5 text-sm leading-6 text-[#53616d]">Login is ready to connect to your account service. Your details were accepted for this demo.</div> : <form onSubmit={handleSubmit} className="mt-8 space-y-5"><label className="block text-sm font-semibold text-[#12283d]">Email or mobile number<input required name="identifier" placeholder="you@example.com" className="mt-2 block w-full border border-[#d8dfe1] px-4 py-3 text-sm outline-none focus:border-[#d8b16a]" /></label><label className="block text-sm font-semibold text-[#12283d]">Password<input required type="password" name="password" placeholder="Enter your password" className="mt-2 block w-full border border-[#d8dfe1] px-4 py-3 text-sm outline-none focus:border-[#d8b16a]" /></label><div className="flex justify-end"><a href="#" className="text-sm font-semibold text-[#b98b42]">Forgot Password?</a></div><button className="w-full rounded-full bg-[#d8b16a] px-5 py-3.5 text-sm font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#c99745]">Login</button><p className="text-center text-sm text-[#687570]">New to Wayfarer? <a href="#" className="font-bold text-[#12283d]">Create Account / Sign Up</a></p></form>}</div></section></main>
  );
}
