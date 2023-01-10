import { useRouter } from 'next/router'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())


const Username = () => {
    const router = useRouter()
    const { username } = router.query;
    const { data, error } = useSWR('https://leetcode-checker.onrender.com/api/day/' + username, fetcher)
    if (error) return <code>Failed to load. Please check your username</code>
    if (!data) return <code>Loading...</code>
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h1 className="card-title"> {new Date().toLocaleString("en-US", options)}
                </h1>
                <p> <code>birdtosky</code> finished 6 problems</p>
                <div className='form-control'>
                    {data.map((entry, index) => (
                        <label className="cursor-pointer label" key={index}>
                            <span className="label-text"><a href='https://leetcode.com/'>{entry.title}</a></span>
                            <input type="checkbox" checked="checked" readOnly={true} className="checkbox checkbox-success checkbox-xs" />
                        </label>
                    ))}</div>
            </div>
        </div>
    )
}

export default Username