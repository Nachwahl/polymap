
import React from "react";
import dynamic from "next/dynamic";
import Search from "../component/Search";

export default function Home() {
    const MapWithNoSSR = dynamic(() => import("../component/Map"), {
        ssr: false
    });



    return (
    <div className="w-screen h-screen">
        <div id="map">
            <div className="absolute top-0 left-0 p-4 ml-12 mt-1 w-64" style={{zIndex: "999"}}>
                <Search />
            </div>
            <MapWithNoSSR />
        </div>

    </div>


    )
}
