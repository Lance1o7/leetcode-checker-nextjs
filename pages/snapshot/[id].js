import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import exportAsImage from "../../components/exportAsImage.js";
import {
  faEyeSlash,
  faImage,
  faEye,
  faPaintRoller,
  faPaintBrush,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Analytics } from "@vercel/analytics/react";
let DEBUG = false;
let BASE_URL = DEBUG ? "http://127.0.0.1:3000/" : "https://1eetcode.com/";
let API_URL =
  "https://lykcwywuhmezltvcgd3f3ug3ki0iydrv.lambda-url.us-west-1.on.aws/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const themes = [
  "light",
  "bumblebee",
  "emerald",
  "corporate",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "cmyk",
  "lemonade",
  "winter",
];

const checkboxthemes = ["checkbox-primary"];
const Username = (props) => {
  const [isActive, setActive] = useState(false);
  const [themeID, setTheme] = useState(0);
  const [checkboxID, setCheckbox] = useState(0);
  let time = new Date().toLocaleString();
  // let [currentTime, changeTime] = React.useState(time);
  function checkTime() {
    time = new Date().toLocaleString();
    changeTime(time);
  }
  //setInterval(checkTime, 1000);
  const toggleClass = () => {
    setActive(!isActive);
  };
  let n = themes.length;
  const toggleTheme = () => {
    setTheme((themeID + 1) % n);
  };
  let checkbox_n = checkboxthemes.length;
  const toggleCheckbox = () => {
    setCheckbox((checkboxID + 1) % checkbox_n);
  };
  const exportRef = useRef();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(API_URL + "api/snapshot/" + id, fetcher);
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
  const username = data["username"];
  const timestamp = data["timestamp"];
  const snapshot_data = data["data"];
  var currentTime = new Date(timestamp * 1000).toLocaleString();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <main className="w-100" data-theme={themes[themeID]}>
        <div className="container">
          <div
            ref={exportRef}
            className="card w-96 bg-base-100 drop-shadow-2xl"
          >
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
              <h1 className="card-title">During the past 24 hours,</h1>
              <p className={isActive ? "blurred" : null}>
                {" "}
                <span>
                  <code>{username}</code>
                </span>{" "}
                finished {snapshot_data.length} problems
              </p>
              <div className="form-control">
                {snapshot_data.map((entry, index) => (
                  <label className="cursor-auto label" key={index}>
                    <span className="label-text font-bold">
                      <a
                        className="problem"
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
                      className={
                        "object-none object-right checkbox checkbox-xs " +
                        checkboxthemes[checkboxID]
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="flex justify-center mt-2">
                <code className="text-sm font-thin text-gray-300 uppercase">
                  {"Snapshot at " + currentTime}
                </code>
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
            <button
              title="Toggle hiding username"
              onClick={() => toggleClass()}
            >
              <FontAwesomeIcon
                icon={!isActive ? faEyeSlash : faEye}
                size="lg"
              />
            </button>
            <button
              title="Toggle hiding username"
              onClick={() => toggleTheme()}
            >
              <FontAwesomeIcon icon={faPaintRoller} size="lg" />
            </button>
            {/* <button
              title="Toggle hiding username"
              onClick={() => toggleCheckbox()}
            >
              <FontAwesomeIcon icon={faPaintBrush} size="lg" />
            </button> */}
            <a href="https://github.com/Lance1o7/leetcode-checker-nextjs">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </div>
      </main>
      <Analytics />
    </>
  );
};

export default Username;
