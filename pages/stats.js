import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from 'next/link'


const stats = props => {
    const [regions, setRegions] = useState(null);
    const [stats, setStats] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const Loader = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 className="feather feather-loader animate-spin">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
        )
    };

    useEffect(() => {
        axios.get("/api/data/").then((result) => {
            setRegions(result.data);
            axios.get("/api/stats/").then((result) => {
                setStats(result.data);
                axios.get("/api/leaderboard/").then((result) => {
                    setLeaderboard(result.data);
                    setLoading(false)
                }).catch((err) => {
                    alert("An error occurred! " + err.message)
                })
                setLoading(false);
            }).catch((err) => {
                alert("An error occurred! " + err.message)
            })
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })



    }, []);
    return (
        <div className="h-screen w-screen bg-gray-900 flex justify-center items-center">


            <div className="w-3/4 h-2/3 bg-gray-800 text-white rounded-lg shadow-lg p-8 pt-10">
                <div className={"flex items-center"}>
                    <Link href={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="feather feather-arrow-left mt-2 mr-3">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </Link>
                    <h1 className="text-4xl font-bold">Stats</h1>
                </div>

                <hr className="border-2 rounded-full border-gray-700 my-2"/>
                <div className="table w-full table-fixed">
                    <div className="table-row-group">
                        <div className="table-row">
                            <div className="table-cell font-bold">Total number of claimed regions</div>
                            <div className="table-cell text-right">{!loading && regions?.length} {loading && <Loader />}</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell font-bold">Total area claimed</div>
                            <div className="table-cell text-right">{loading && <Loader />}{stats && !loading && <span>{stats.totalArea.toLocaleString()}m² = {(stats.totalArea / 1000000).toLocaleString()} km² (ca. {((parseInt(stats.totalArea) / 357386000000)*100).toFixed(10).toLocaleString()}% of Germany's full area)</span>}</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell font-bold">Number of people whose homes have been built (Very imprecise)</div>
                            <div className="table-cell text-right">{loading && <Loader />}{stats && !loading && <span>{((stats.totalArea/1000000) * 233).toFixed(0).toLocaleString()}</span>}</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell font-bold">Total area claimed (percent of the total build-up area in Germany)</div>
                            <div className="table-cell text-right">{loading && <Loader />}{stats && !loading && <span>{((parseInt(stats.totalArea) / 57213000000)*100).toFixed(10).toLocaleString()}%</span>}</div>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mt-5">Leaderboard</h1>
                <hr className="border-2 rounded-full border-gray-700 my-2"/>
                <div className="table w-full">
                    <div className="table-row-group">
                        {
                            leaderboard &&
                            leaderboard.map((user) => {
                                return (
                                    <div className="table-row">
                                        <div className="table-cell font-bold">{user.username}</div>
                                        <div className="table-cell text-right">{user.NUM}m² ({((parseInt(user.NUM)/ parseInt(stats.totalArea))*100).toFixed(2)}%)</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default stats
