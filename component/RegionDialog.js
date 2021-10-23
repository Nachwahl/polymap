import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    Puff
} from '@agney/react-loading';
import {motion, AnimatePresence} from "framer-motion";
import Moment from "react-moment";
import { getSession } from 'next-auth/client'
import {toast} from "react-toastify";


const RegionDialog = props => {
    const [region, setRegion] = useState(null);
    const [editPerms, setEditPerms] = useState(false);
    const [allowCityChange, setAllowCityChange] = useState(false);
    const [additionalBuilders, setAdditionalBuilders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [addUserField, setAddUserField] = useState("")
    const [changeCityNameField, setChangeCityNameField] = useState("")
    const [transferRegionField, setTransferRegionField] = useState("")
    useEffect(() => {
        getSession().then((session) => {
            setSession(session)


            axios.get(`/api/region/${props.uid}`).then((result) => {
                setRegion(result.data);
                axios.get(`/api/region/addBuilders/${props.uid}`).then((result) => {
                    setAdditionalBuilders(result.data);
                    if(session) {
                        axios.post(`/api/region/testPermission/${props.uid}`, {email: session.user.email}).then((result) => {
                            setEditPerms(result.data);
                            axios.post(`/api/region/testPermission/allowCityChange/${props.uid}`, {email: session.user.email}).then((result) => {
                                setAllowCityChange(result.data);
                                setLoading(false);
                            }).catch((err) => {
                                alert("An error occurred! " + err.message)
                            })
                        }).catch((err) => {
                            alert("An error occurred! " + err.message)
                        })

                    } else {
                        setLoading(false);
                    }

                }).catch((err) => {
                    alert("An error occurred! " + err.message)
                })
            }).catch((err) => {
                alert("An error occurred! " + err.message)
            })
        });

    },[props.uid])

    const deleteRegion = () => {
        axios.delete( `/api/region/${props.uid}`, {}).then(() => {
            toast.dark('✅ Deleted region successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.setDialogOpen(false)
            props.updateData();
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }

    const handleOnUserSubmit = (event) => {
        addUser(addUserField);
        event.preventDefault();
    }

    const addUser = (username) => {
        axios.put(`/api/region/addBuilders/${props.uid}`, {username: username}).then(() => {
            toast.dark(`✅ Added ${username} to the region`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.setDialogOpen(false)
            props.updateData();
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }
    const removeUser = (username) => {
        axios.delete(`/api/region/addBuilders/${props.uid}`, {data: {username: username}}, ).then(() => {
            toast.dark(`✅ Removed ${username} from the region`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.setDialogOpen(false)
            props.updateData();
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }

    const changeCityName = (e) => {
        e.preventDefault();
        axios.post(`/api/region/changeCity/${props.uid}`, {city: changeCityNameField}, ).then(() => {
            toast.dark(`✅ Changed the city name to ${changeCityNameField}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.setDialogOpen(false)
            props.updateData();
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }

    const copyToClipboard = (text) => {
        toast.dark(`✅ Command copied successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', text);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }


    const transferRegion = (e) => {
        e.preventDefault();
        axios.get("https://playerdb.co/api/player/minecraft/" + transferRegionField).then((result) => {
            if(!result.data.code === "player.found") {
                toast.error(`User not found.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
            axios.post(`/api/region/${props.uid}`, {useruuid: result.data.data.player.id, username: transferRegionField}, ).then(() => {
                toast.dark(`✅ Transferred region successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                props.setDialogOpen(false)
                props.updateData();
            }).catch((err) => {
                alert("An error occurred! " + err.message)
            })
        })
    }

    const getCentroid2 = (arr) => {
        let twoTimesSignedArea = 0;
        let cxTimes6SignedArea = 0;
        let cyTimes6SignedArea = 0;

        let length = arr.length

        let x = function (i) { return arr[i % length][0] };
        let y = function (i) { return arr[i % length][1] };

        for ( let i = 0; i < arr.length; i++) {
            let twoSA = x(i)*y(i+1) - x(i+1)*y(i);
            twoTimesSignedArea += twoSA;
            cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
            cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
        }
        let sixSignedArea = 3 * twoTimesSignedArea;
        return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];
    }
    return (
        <div>
            {loading &&
                <div className="w-full flex justify-center my-8 items-center">
                    <Puff width="40"/>
                </div>
            }

            <AnimatePresence>
                {
                    !loading &&
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}>
                        <div className="flex m-5 items-center">
                            <img src={region.useruuid !== "EVENT" ? `https://crafatar.com/avatars/${region.useruuid}`:"/logo.png"} alt="" className="mr-2" width="40" height="40"/>
                            <p className="text-4xl font-black ">{region.username}</p>

                        </div>
                        <div className="grid grid-cols-2 gap-4 m-5">
                            <div>
                                <p className="font-bold border-b">General information</p>
                                <table className="table-fixed w-full">
                                    <tbody>
                                    <tr>
                                        <td>City</td>
                                        <td className="text-right">{region.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Created</td>
                                        <td className="text-right"><Moment date={region.createdDate} format="DD.MM.YYYY HH:mm"/></td>
                                    </tr>
                                    <tr>
                                        <td>Area</td>
                                        <td className="text-right">{region.area}m²</td>
                                    </tr>
                                    <tr>
                                        <td>Center Coordinates</td>
                                        <td className="text-right cursor-pointer" onClick={() => copyToClipboard("/tpll " + getCentroid2(JSON.parse(region.data))[0] + " " + getCentroid2(JSON.parse(region.data))[1])}>
                                            {getCentroid2(JSON.parse(region.data))[0].toFixed(5)}<br />
                                            {getCentroid2(JSON.parse(region.data))[1].toFixed(5)}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <p className="font-bold border-b">Additional builders</p>
                                <ul className="py-1">
                                    {
                                        additionalBuilders?.map((builder) => {
                                            return (<li className="grid grid-cols-2 w-full"><img src={`https://minotar.net/avatar/${builder.username}/20`} alt=""/><p className="text-right">{builder.username}
                                                {editPerms && <a href="#" className="ml-1" onClick={() => removeUser(builder.username)}>&times;</a>}</p></li>)
                                        })
                                    }

                                </ul>
                            </div>
                        </div>
                        {
                            editPerms && <div>
                                <div className="m-5">
                                    <p className="text-2xl font-bold mb-3">Edit region</p>
                                    <form onSubmit={handleOnUserSubmit}>
                                        <div className="grid grid-cols-5 gap-4 mb-3">
                                            <div className="col-span-4">
                                                <input placeholder="Additional builder" className="focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 sm:text-sm border border-gray-300 rounded-md shadow-lg h-full focus:outline-none" value={addUserField} onChange={(e) => setAddUserField(e.target.value)}/>
                                            </div>
                                            <div>
                                                <button type="submit"
                                                        className="bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition w-full">Add
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <form onSubmit={transferRegion}>
                                        <div className="grid grid-cols-5 gap-4 mb-3">
                                            <div className="col-span-4">
                                                <input placeholder="Transfer to user" className="focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 sm:text-sm border border-gray-300 rounded-md shadow-lg h-full focus:outline-none" value={transferRegionField} onChange={(e) => setTransferRegionField(e.target.value)}/>
                                            </div>
                                            <div>
                                                <button type="submit"
                                                        className="bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition w-full">Transfer
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {
                                        allowCityChange &&
                                        <form onSubmit={changeCityName}>
                                            <div className="grid grid-cols-5 gap-4 mb-3">
                                                <div className="col-span-4">
                                                    <input placeholder="New city name" className="focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 sm:text-sm border border-gray-300 rounded-md shadow-lg h-full focus:outline-none" value={changeCityNameField} onChange={(e) => setChangeCityNameField(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <button type="submit"
                                                            className="bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition w-full">Change
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    }



                                    <button onClick={() => deleteRegion()}
                                            className="bg-red-500 hover:bg-red-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition w-full">Delete Region
                                    </button>
                                </div>
                            </div>
                        }
                        <div>

                        </div>
                    </motion.div>
                }
            </AnimatePresence>








        </div>
    );
}

export default RegionDialog
