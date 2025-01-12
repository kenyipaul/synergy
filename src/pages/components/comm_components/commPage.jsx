import Axios from "axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CommFormContext } from "../../CommPage";
import { communityRoute } from "../../../routes/routes";
import { useState, useEffect, useContext } from "react";
import CommunityCard from "../../../modules/CommunityCard";


function groupTopics(data) {
    const grouped = {};
  
    for (const item of data) {
        const topic = item.community_topic;
        if (!grouped[topic]) {
            grouped[topic] = [];
        }
        grouped[topic].push(item);
    }
  
    return Object.entries(grouped).map(([topic, items]) => ({
        [topic]: items
    }));
}

export default function CommunityPage() {

    const navigate = useNavigate();
    const authorizedState = useSelector(store => store.authorizedState)
    const [comFormState, setComFormState] = useContext(CommFormContext);
    const [communities, setCommunities] = useState([]);

    useEffect(() => {

        Axios({
            method: "GET",
            url: `${communityRoute}/fetch`,
        }).then((response) => {
            const groupedData = groupTopics(response.data);
            setCommunities(groupedData);
        })

    }, [comFormState])

    return (
        <div className="community-view-content">
        <div className="community-banner">
            <div className="container">
                <div className="content">
                    <h1>The Community Hub: Learn, Share and Grow</h1>
                    <p>The Community Hub: Where learning, sharing, and growth are at the heart of everything we do.</p>
                    <button onClick={() => {
                        authorizedState.authorized ? setComFormState(true) : navigate("/login")
                    }}>Create Your Community</button>
                </div>
            </div>
        </div>

        <div className="search-area">
            <div className="input-area">
                <svg width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.989 15.4905L19.5 19.0015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <input type="text" name="search" id="search" placeholder="Search for communities" />
            </div>
        </div>

        <div className="main">
            <div className="title-bar">
                <h1 className="title">Explore communities</h1>
            </div>

            {
                communities.length > 0 ? communities.map((data, key) => {
                    return <div key={key} className="community-container">
                        <div className="top-bar">
                            <h1>{Object.keys(data)}</h1>
                            <button onClick={() => navigate(`/communities/${Object.keys(data)}`)}>View All</button>
                        </div>
                        <div className="community-list">
                            {
                                Object.values(data)[0].slice(0, 8).map((data, key) => {
                                    return <CommunityCard data={data} key={key} />
                                })
                            }
                        </div>
                    </div>
                }) :
                <div className="community-placeholder">
                    <h1>Huh, looks like there are no communities here.</h1>
                    <button onClick={() => {
                        authorizedState.authorized ? setComFormState(true) : navigate("/login")
                    }}>Create Your Community</button>
                </div>
            }

        </div>
    </div>
    )
}