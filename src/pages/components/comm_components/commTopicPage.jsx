import Axios from "axios"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CommunityTopicPage() {

    const location = useLocation();
    const tmp = decodeURIComponent(location.pathname).split("/");
    const url = tmp[tmp.length - 1]

    const [communities, setCommunities] = useState([]);

    useEffect(() => {

        Axios({
            method: "GET",
            url: `${communityRoute}/fetch`,
        }).then((response) => {
            const groupedData = groupTopics(response.data);

            let filteredData = groupedData.filter((data, key) => {
                if (Object.keys(data) == url) {
                    return data
                } 
            })

            setCommunities(Object.values(filteredData[0])[0])

        })

    }, [])

    return (
        <div className="community-topic-page">
            <div className="community-container">
                <div className="top-bar">
                    <svg onClick={() => window.history.back()} viewBox="0 0 1024 1024" width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                    <h1>{url}</h1>
                </div>
                <div className="community-grid">
                {
                    communities.map((data, key) => {
                        return <CommunityCard data={data} key={key} />
                    })        
                }
                </div>
            </div>
        </div>
    )
}