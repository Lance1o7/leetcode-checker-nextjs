import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";

let API_URL = "https://leetcode-checker.onrender.com/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Username = (props) => {
  const exportRef = useRef();
  const router = useRouter();
  const { username } = router.query;
  const { data, error } = useSWR(API_URL + "api/ai/" + username, fetcher);
  if (error)
    return (
      <main>
        <code>Loading...</code>
      </main>
    );
  if (!data)
    return (
      <main>
        <code>Loading...</code>
      </main>
    );
  console.log(data["summary"]);

  return (
    <main className="w-100">
      <div className="prose">
        <ReactMarkdown>{data.summary}</ReactMarkdown>
      </div>
    </main>
  );
};
export default Username;
