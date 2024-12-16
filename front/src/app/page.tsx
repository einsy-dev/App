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

  function getRequest() {
    $host
      .get("/")
      .then((res) => {
        setState((prev) => ({ ...prev, get: res.data }));
      })
      .catch(setErr);
  }

  function postRequest() {
    $host
      .post("/")
      .then((res) => {
        setState((prev) => ({ ...prev, post: res.data }));
      })
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
        <Button text="GET" onClick={getRequest} />
        <Button text="POST" onClick={postRequest} />
      </div>
    </div>
  );
}

function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
