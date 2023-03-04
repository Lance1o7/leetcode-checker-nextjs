import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";

let API_URL =
  "https://lykcwywuhmezltvcgd3f3ug3ki0iydrv.lambda-url.us-west-1.on.aws/";

const AI = (props) => {
  const exportRef = useRef();
  const router = useRouter();
  const { username } = router.query;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
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
export default AI;
