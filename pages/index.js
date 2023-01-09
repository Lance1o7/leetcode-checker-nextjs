import Head from 'next/head';

export default function Home() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Today, Username finished 6 problems</h2>
        <ul>
          <li>
            Two Sum <div className="badge badge-accent"> Easy </div>
          </li>
          <li>
            Two Sum <div className="badge badge-neutral">Medium</div>
          </li>
          <li>
            Two Sum <div className="badge badge-secondary">Hard</div>
          </li>
          <li>
            Two Sum <div className="badge badge-accent"> Easy </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
