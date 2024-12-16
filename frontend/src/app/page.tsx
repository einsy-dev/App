"use client";

import axios from "axios";
import { useState } from "react";


const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Home() {
  const [state, setState] = useState({ get: "", post: "" });
  const [err, setErr] = useState({ message: "" });
  const [allowed, setAllowed] = useState(true);

  function getRequest() {
    setAllowed(false);
    setErr({ message: "" });
    $host
      .get("/")
      .then((res) => {
        setState((prev) => ({ ...prev, get: res.data }));
      })
      .finally(() => setAllowed(true))
      .catch(setErr);
  }

  function postRequest() {
    setAllowed(false);
    setErr({ message: "" });
    $host
      .post("/")
      .then((res) => {
        setState((prev) => ({ ...prev, post: res.data }));
      })
      .finally(() => setAllowed(true))
      .catch(setErr);
  }

  return (
    <div className="h-screen grid place-content-center gap-5">
      <div className="w-fit border p-10">
        <p>server: {process.env.NEXT_PUBLIC_SERVER}</p>
        <p>get: {state.get}</p>
        <p>post: {state.post}</p>
        <p>err: {err.message}</p>
      </div>
      <div className="flex flex-row gap-5 justify-center">
        <Button text="GET" onClick={getRequest} disabled={!allowed} />
        <Button text="POST" onClick={postRequest} disabled={!allowed} />
      </div>
    </div>
  );
}

function Button({ text, disabled, onClick }: { text: string; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
