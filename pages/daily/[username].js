import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Username = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data, error } = useSWR(
    "https://leetcode-checker.onrender.com/api/day/" + username,
    fetcher
  );
  if (error)
    return (
      <main className="content">
        <code>Failed to load. Please check your username</code>
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
    <main className="content">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="w-96">
          <img src="/logo.png" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h1 className="card-title">
            {" "}
            {new Date().toLocaleString("en-US", options)}
          </h1>
          <p>
            {" "}
            <code>{username}</code> finished {data.length} problems
          </p>
          <div className="form-control">
            {data.map((entry, index) => (
              <label className="cursor-auto label" key={index}>
                <span className="label-text font-bold">
                  <a href={`https://leetcode.com/problems/${entry.titleSlug}`}>
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
    </main>
  );
};

export default Username;
