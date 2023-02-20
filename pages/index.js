import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const router = useRouter();
  const [route, setRoute] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("daily/" + route);
  };
  return (
    <>
      <main className="w-100">
        <div className="container">
          <div className="card w-96 bg-base-100 drop-shadow-2xl">
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
              <h1 className="card-title flex flex-row justify-center items-center">
                Please Input your LeetCode ID
              </h1>
              <form
                className="form-control inline-flex justify-center"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="JohnDoe"
                  onChange={(e) => {
                    setRoute(e.target.value);
                  }}
                  className="input input-bordered max-w-xs mt-3"
                />
                <button type="submit" className="btn mt-5">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="container py-10 px-10 mx-0 flex justify-evenly items-center">
            <a href="https://github.com/Lance1o7/leetcode-checker-nextjs">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </div>
      </main>
      <Analytics />
    </>
  );
}
