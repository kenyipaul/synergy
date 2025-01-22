import Axios from "axios"
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CommFormContext, CommunitiesContext } from "../../CommPage";
import { BackendHost, communityRoute } from "../../../routes/routes";
import { useState, useEffect, useContext, useRef } from "react";
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

    const socket = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const authorizedState = useSelector(store => store.authorizedState)
    const [commFormState, setCommFormState] = useContext(CommFormContext);
    const [communities, setCommunities] = useContext(CommunitiesContext)



    return (
        <div className="community-view-content">
        <div className="community-banner">
            <div className="container">
                <div className="content">
                    <h1>The Community Hub: Learn, Share and Grow</h1>
                    <p>The Community Hub: Where learning, sharing, and growth are at the heart of everything we do.</p>
                    <button onClick={() => {``
                        authorizedState.authorized ? setCommFormState(true) : navigate("/login")
                    }}>Create Your Community</button>
                </div>
            </div>
        </div>

        <SearchArea data={communities} />

        <div className="main">
            <div className="title-bar">
                <h1 className="title">Explore communities</h1>
            </div>

            {
                loading ? 
                <>
                    <div className="loading-community">Loading...</div>
                </> :
                communities.length > 0 ? groupTopics(communities).map((data, key) => {
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
                <>
                    <div className="community-placeholder">
                        <h1>Huh, looks like there are no communities here.</h1>
                        <button onClick={() => {
                            authorizedState.authorized ? setCommFormState(true) : navigate("/login")
                        }}>Create Your Community</button>
                    </div>
                </>
            }

        </div>
    </div>
    )
}



function SearchArea(props) {

    const [searchState, setSearchState] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (props.data) {
            setSearchResults(props.data)
        }
    }, [props])

    const search = (e) => {
        let results = []
        const searchInput = e.target.value.toLowerCase()

        for (let i = 0; i < props.data.length; i++) {
            let title = props.data[i].community_name.toLowerCase()
            if (title.includes(searchInput)) {
                results.push(props.data[i])
            }
        }

        setSearchResults(results)
    }

    return (
        <div className={ searchState ? "search-area active" : "search-area"}>
            <div className="input-area">
                <svg className="searchBtn" width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.989 15.4905L19.5 19.0015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <svg onClick={() => setSearchState(false)} className="closeBtn" width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="currentColor"></path> </g></svg>
                <input onInput={search} onFocus={() => setSearchState(true)} type="text" name="search" id="search" placeholder="Search for communities" />
            </div>
            <div className="search-result-area">
                <h1 className="title">Search Results:</h1>
                <div className="event-list">
                    {
                        searchResults.map((data, key) => {
                            return <CommunityCard data={data} key={key} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}