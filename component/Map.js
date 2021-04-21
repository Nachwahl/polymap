import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, LayersControl} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import axios from "axios";
import {
    TailSpin,
} from '@agney/react-loading';
import Moment from "react-moment";
import AccountButton from "./AccountButton";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion"
import RegionDialog from "./RegionDialog";

const Map = props => {
    const [regions, setRegions] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState(null);

    useEffect(() => {
        axios.get("/api/data/").then((result) => {
            setRegions(result.data);
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }, [])

    const openDialog = (uid) => {
        setDialogData(uid);
        setDialogOpen(true);
    }

    const updateData = () => {
        axios.get("/api/data/").then((result) => {
            setRegions(result.data);
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }
    if(!regions)
        return (<div className="bg-gray-900 h-screen w-100 flex items-center justify-center"><TailSpin width="100"/></div>);
    return (
        <div>
            <AnimatePresence>
            {
                dialogOpen && <div>
                    <motion.div className="absolute top-0 left-0 h-screen w-screen" initial={{ backdropFilter: "blur(0px)"}} animate={{ backdropFilter: "blur(6px)"}} exit={{ backdropFilter: "blur(0px)" }} style={{zIndex: "4000"}} onClick={() => setDialogOpen(false)}/>
                    <div  className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center" >
                        <motion.div className="bg-white rounded-lg w-1/3 h-auto transition" initial={{opacity: 0, scale: 0.95} }
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.8}}
                                    transition={{ease: "easeOut", duration: 0.15}} style={{originX: 0.5, originY: 0.5, zIndex: "5000"}}>
                            <span onClick={() => setDialogOpen(false)} className="float-right m-3 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6"
                                                                                                 y2="18"></line><line
                                    x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </span>
                            <RegionDialog uid={dialogData} setDialogOpen={setDialogOpen} updateData={updateData}/>
                        </motion.div>
                    </div>

                </div>
            }
            </AnimatePresence>

            <a href="#" onClick={updateData}>

                <div className="absolute top-0 right-0 text-white p-4 flex justify-center items-center" style={{zIndex: "999"}}>
                    <AccountButton />
                    <div className="opacity-50 hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-refresh-cw">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                    </div>
                    <Link href="/stats">
                        <div className="opacity-50 hover:opacity-100 transition ml-2">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 className="feather feather-bar-chart-2">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </div>
                    </Link>
                    <a href="https://discord.gg/FuePqMTZqg"><img src="/logoanimated.gif" width="24" alt="" className="ml-2"/></a>




                </div>
            </a>
            <MapContainer center={props.zoomPosition ? props.zoomPosition : [51.1642292, 10.4541194]} zoom={props.zoomPosition ? 17 : 7} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw" }}>

                <LayersControl position="bottomright">
                    <LayersControl.BaseLayer checked name="Dark">
                        <TileLayer
                            attribution={`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a> | <a href="https://github.com/Nachwahl/polymap">PolyMap</a> | Total regions: ${regions.length}`}
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OpenStreetMap Default">
                        <TileLayer
                            attribution={`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="https://github.com/Nachwahl/polymap">PolyMap</a> | Total regions: ${regions.length}`}
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                            attribution={`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://mapbox.com">Mapbox</a> | <a href="https://github.com/Nachwahl/polymap">PolyMap</a> | Total regions: ${regions.length}`}
                            url="https://api.mapbox.com/styles/v1/nachwahl/ckmkvfkwg00ds17rwt7u4zlyi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFjaHdhaGwiLCJhIjoiY2tta3ZkdXJ2MDAwbzJ1cXN3ejM5N3NkcyJ9.t2yFHFQzb2PAHvPHF16sFw"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Navigation">
                        <TileLayer
                            attribution={`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://mapbox.com">Mapbox</a> | <a href="https://github.com/Nachwahl/polymap">PolyMap</a> | Total regions: ${regions.length}`}
                            url="https://api.mapbox.com/styles/v1/nachwahl/ckmkvtwzd3l0617s6rmry2gm5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFjaHdhaGwiLCJhIjoiY2tta3ZkdXJ2MDAwbzJ1cXN3ejM5N3NkcyJ9.t2yFHFQzb2PAHvPHF16sFw"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Base">
                        <TileLayer
                            attribution={`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://mapbox.com">Mapbox</a> | <a href="https://github.com/Nachwahl/polymap">PolyMap</a> | Total regions: ${regions.length}`}
                            url="https://api.mapbox.com/styles/v1/nachwahl/ckmkvx4vbeplx17qyfztyb6pk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFjaHdhaGwiLCJhIjoiY2tta3ZkdXJ2MDAwbzJ1cXN3ejM5N3NkcyJ9.t2yFHFQzb2PAHvPHF16sFw"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {
                regions?.map((region) => {
                    return (
                        <Polygon pathOptions={region.useruuid !== "EVENT" ? { fillColor: 'blue' }:{color: 'red',fillColor: 'red'}} positions={JSON.parse(region.data)} key={region.uid} eventHandlers={{click: () => {openDialog(region.uid)}}}>
                            <Tooltip style={{width: "100%"}} sticky>
                                <div >
                                    <img src={region.useruuid !== "EVENT" ? `https://crafatar.com/avatars/${region.useruuid}`:"/logo.png"} className="w-1/2 h-1/2" alt=""/>
                                    <div className="mt-3">
                                        <b >{region.username}</b>
                                        <p className="m-0">{region.city}</p>
                                        <p className="text-gray-300 italic text-xs m-0"><Moment date={region.createdDate} format="DD.MM.YYYY" /></p>
                                    </div>
                                </div>
                            </Tooltip>
                        </Polygon>
                    )
                })
            }

            </MapContainer>
        </div>


    );
}

export default Map
