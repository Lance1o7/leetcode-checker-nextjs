import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import exportAsImage from "../../components/exportAsImage.js";
import { faEyeSlash, faImage, faEye } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Username = (props) => {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  const exportRef = useRef();
  const router = useRouter();
  const { username } = router.query;
  const { data, error } = useSWR(
    "https://leetcode-checker.onrender.com/api/day/" + username,
    fetcher
  );
  if (error)
    return (
      <main className="content">
        <code>Loading...</code>
      </main>
    );
  if (!data)
    return (
      <main className="content">
        <code>Loading...</code>
      </main>
    );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <main className="w-100">
      <div className="container">
        <div ref={exportRef} className="card w-96 bg-base-100 drop-shadow-2xl">
          <figure className="w-96">
            <img
              src="/light.png"
              className="block dark:hidden"
              alt="LeetCode Logo"
            />
            <img
              src="/dark.png"
              className="hidden dark:block"
              alt="LeetCode Logo"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title">
              {" "}
              {new Date().toLocaleString("en-US", options)}
            </h1>
            <p className={isActive ? "blurred" : null}>
              {" "}
              <span>
                <code>{username}</code>
              </span>{" "}
              finished {data.length} problems
            </p>
            <div className="form-control">
              {data.map((entry, index) => (
                <label className="cursor-auto label" key={index}>
                  <span className="label-text font-bold">
                    <a
                      href={`https://leetcode.com/problems/${entry.titleSlug}`}
                    >
                      {entry.title} &nbsp;
                      <code className="text-xs font-thin text-gray-300 uppercase">
                        {entry.difficulty}
                      </code>
                    </a>
                  </span>
                  <input
                    type="checkbox"
                    checked="checked"
                    readOnly={true}
                    className="object-none object-right checkbox checkbox-success checkbox-xs"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="container py-10 px-10 mx-0 inline-flex justify-evenly	 items-center">
          <button
            title="Export as image"
            onClick={() => {
              exportAsImage(
                exportRef.current,
                new Date().toLocaleString("zh-CN") + "_" + username
              );
            }}
          >
            <FontAwesomeIcon icon={faImage} size="lg" />
          </button>
          <button title="Toggle hiding username" onClick={() => toggleClass()}>
            <FontAwesomeIcon icon={!isActive ? faEyeSlash : faEye} size="lg" />
          </button>
          <a href="https://github.com/Lance1o7/leetcode-checker-nextjs">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Username;
