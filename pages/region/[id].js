import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TailSpin} from "@agney/react-loading";
import Search from "../../component/Search";

export default function Home() {
    const router = useRouter()
    const { id } = router.query
    const MapWithNoSSR = dynamic(() => import("../../component/Map"), {
        ssr: false
    });
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
    const [region, setRegion] = useState(null);
    useEffect(() => {
        axios.get(`/api/region/${id}`).then((result) => {
            setRegion(result.data);
        }).catch((err) => {
            alert("An error occurred! " + err.message)
        })
    }, [id])
    if(!region || !id)
        return (<div className="bg-gray-900 h-screen w-100 flex items-center justify-center"><TailSpin width="100"/></div>);

    return (
        <div className="w-screen h-screen">
            <div id="map">
                <div className="absolute top-0 left-0 p-4 ml-12 mt-1 w-64" style={{zIndex: "999"}}>
                    <Search />
                </div>
                <MapWithNoSSR zoomPosition={getCentroid2(JSON.parse(region.data))}/>
            </div>

        </div>


    )
}
