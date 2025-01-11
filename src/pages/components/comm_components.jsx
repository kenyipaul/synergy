import Axios from "axios"
import CommunityCard from "../../modules/CommunityCard";

import { useSelector } from "react-redux";
import { BackendHost } from "../../routes/routes";
import { communityRoute } from "../../routes/routes";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CommFormContext, PostCreatorContext } from "../CommPage";

// COMMUNITY PROFILE 

export function CommunityProfile() {

    const location = useLocation();
    const [posts, setPosts] = useState([])
    const [response, setResponse] = useState([])
    const [currentTab, setCurrentTab] = useState(1);
    const [postCreatorState, setPostCreatorState] = useContext(PostCreatorContext)

    const tmp = location.pathname.split("/")
    const community_id = tmp[tmp.length - 1]
    const authorizedState = useSelector(store => store.authorizedState);

    useEffect(() => {

        Axios({
            method: "GET",
            url: `${communityRoute}/fetch/${community_id}`,
        }).then((response) => {
            setResponse(response.data)
        })

    }, [community_id])


    useEffect(() => {

        Axios({
            method: "GET",
            url: `${BackendHost}/api/posts/`
        }).then((response) => {
            setPosts(response.data)
        })

    }, [postCreatorState])

    const join = () => {
        Axios({
            method: "POST",
            url: `${communityRoute}/join`,
            data: {
                community_id: props.data._id,
                user_id: authorizedState.user.id
            }
        }).then((response) => {
            alert(response.data.msg)
        })
    }

    return (
        <div className="community-profile">

            <div className="community-profile-header">
                <div className="community-profile-banner">
                    <div className="cover" style={{
                        backgroundImage: `url(${BackendHost}/${response.community_banner})`
                    }}></div>
                    
                    <section>
                        <div className="profile">
                            <div className="image" style={{
                            backgroundImage: `url(${BackendHost}/${response.community_icon})`
                        }}></div>
                            <div>
                                <h1>{response.community_name}</h1>
                                {/* <p>{response.community_members && response.community_members.length} members</p> */}
                            </div>
                        </div>

                        <div className="buttons">
                            {/* <button>Create Post</button> */}
                            { response.community_members && !response.community_members.includes(authorizedState.user.id) && <button onClick={join}>Join</button> }
                            { response.community_members && response.community_members.includes(authorizedState.user.id) && <button onClick={() => setPostCreatorState({id: response._id, state: true})}>Create Post</button> }
                        </div>
                    </section>
                </div>
                <div className="navigation-tabs">
                    <button onClick={() => setCurrentTab(1)} className={currentTab == 1 ? "active" : ""} >Feed</button>
                    <button onClick={() => setCurrentTab(2)} className={currentTab == 2 ? "active" : ""} >About</button>
                </div>
            </div>

            <div className="view-container">

                { currentTab == 1 ?
                    <div className="view feed-view feed-view-mobile">    
                        {
                            posts && posts.length > 0 ?
                                posts.map((data, key) => {
                                    return <Post data={data} key={key} />
                                })
                            : <div className="placeholder">
                                <h1>This community doesn't have any posts yet</h1>
                                { response.community_members && response.community_members.includes(authorizedState.user.id) && <button onClick={() => setPostCreatorState(true)}>Create Post</button> }
                            </div>
                        }
                    </div>
                :
                <div className="view about-view about-view-mobile">
                    <div className="top-bar">
                        <div className="profile" style={{
                            backgroundImage: `url(${BackendHost}/${response.community_icon})`
                        }}></div>
                        <h1>sy/{response.community_name}</h1>
                    </div>
                    <div className="content">
                        <h1>{response.community_topic}</h1>
                        <p>{response.community_description}</p>
                        <div className="details">
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <rect width="24" height="24" /> <path id="Shape" d="M11.9997 0C5.3722 0.000328125 0.0005625 5.37216 0 11.9997C0.0005625 18.6272 5.3722 23.9991 11.9997 23.9994C18.6278 23.9991 23.9996 18.6272 24 11.9997C23.9996 5.37216 18.6278 0.000328125 11.9997 0C11.9997 0 11.9997 0 11.9997 0ZM4.57532 4.57528C5.66938 3.48178 7.00162 2.63114 8.48728 2.1038C7.77557 2.96512 7.18228 4.06814 6.71742 5.34361C6.71742 5.34361 3.87993 5.34361 3.87993 5.34361C4.09931 5.07666 4.33106 4.81959 4.57532 4.57528C4.57532 4.57528 4.57532 4.57528 4.57532 4.57528ZM3.07556 6.46861C3.07556 6.46861 6.35615 6.46861 6.35615 6.46861C5.9339 7.96528 5.68068 9.64833 5.63601 11.4372C5.63601 11.4372 1.51532 11.4372 1.51532 11.4372C1.61128 9.61828 2.17031 7.92572 3.07556 6.46861C3.07556 6.46861 3.07556 6.46861 3.07556 6.46861ZM3.07556 17.5308C2.17031 16.0737 1.61128 14.3812 1.51532 12.5622C1.51532 12.5622 5.6399 12.5622 5.6399 12.5622C5.68495 14.3493 5.93099 16.0353 6.35268 17.5309C6.35268 17.5309 3.07556 17.5309 3.07556 17.5309C3.07556 17.5309 3.07556 17.5308 3.07556 17.5308ZM4.57533 19.4241C4.33106 19.1798 4.09926 18.9227 3.87989 18.6558C3.87989 18.6558 6.71925 18.6558 6.71925 18.6558C6.91987 19.2077 7.14201 19.7313 7.39012 20.2125C7.71609 20.8424 8.0819 21.4063 8.48456 21.8948C6.99994 21.3675 5.66864 20.5169 4.57533 19.4241C4.57533 19.4241 4.57533 19.4241 4.57533 19.4241ZM11.4374 22.4841C11.2618 22.4749 11.0873 22.4618 10.9141 22.4438C10.638 22.32 10.3646 22.1508 10.0938 21.93C9.26728 21.2569 8.50115 20.1173 7.91887 18.6558C7.91887 18.6558 11.4374 18.6558 11.4374 18.6558L11.4374 22.4841C11.4374 22.4841 11.4374 22.4841 11.4374 22.4841ZM11.4374 17.5308C11.4374 17.5308 7.52635 17.5308 7.52635 17.5308C7.08211 16.0697 6.80841 14.3756 6.76097 12.5622C6.76097 12.5622 11.4374 12.5622 11.4374 12.5622L11.4374 17.5308L11.4374 17.5308ZM11.4374 11.4372C11.4374 11.4372 6.76453 11.4372 6.76453 11.4372C6.81178 9.62269 7.0868 7.93008 7.53136 6.46861C7.53136 6.46861 11.4375 6.46861 11.4375 6.46861L11.4375 11.4372L11.4374 11.4372ZM11.4374 5.34361C11.4374 5.34361 7.92407 5.34361 7.92407 5.34361C8.06981 4.97845 8.22253 4.62586 8.38973 4.30322C8.88848 3.33642 9.47582 2.574 10.0938 2.06934C10.3646 1.84856 10.638 1.67934 10.9141 1.55559C11.0873 1.53769 11.2618 1.52447 11.4374 1.51533C11.4374 1.51533 11.4374 5.34361 11.4374 5.34361L11.4374 5.34361ZM20.9246 6.46861C21.8299 7.92572 22.3887 9.61833 22.4847 11.4372C22.4847 11.4372 18.3601 11.4372 18.3601 11.4372C18.315 9.65016 18.069 7.96416 17.6471 6.46861C17.6471 6.46861 20.9246 6.46861 20.9246 6.46861C20.9246 6.46861 20.9246 6.46861 20.9246 6.46861ZM19.4247 4.57528C19.6689 4.81955 19.9007 5.07666 20.1201 5.34361C20.1201 5.34361 17.2806 5.34361 17.2806 5.34361C17.0799 4.79175 16.8576 4.26806 16.6097 3.78689C16.2838 3.15703 15.9179 2.59308 15.5153 2.10455C17.0001 2.63222 18.3312 3.48258 19.4247 4.57528C19.4247 4.57528 19.4247 4.57528 19.4247 4.57528ZM12.5624 1.51533C12.738 1.52447 12.9125 1.53802 13.0855 1.55559C13.3616 1.67977 13.6351 1.84856 13.906 2.06934C14.7327 2.74242 15.4987 3.88205 16.0809 5.34356C16.0809 5.34356 12.5624 5.34356 12.5624 5.34356L12.5624 1.51533C12.5624 1.51533 12.5624 1.51533 12.5624 1.51533ZM12.5624 6.46861C12.5624 6.46861 16.4735 6.46861 16.4735 6.46861C16.9177 7.92975 17.1916 9.62377 17.2388 11.4372C17.2388 11.4372 12.5624 11.4372 12.5624 11.4372L12.5624 6.46861L12.5624 6.46861ZM12.5624 12.5622C12.5624 12.5622 17.2351 12.5622 17.2351 12.5622C17.1879 14.3767 16.9129 16.0693 16.4683 17.5309C16.4683 17.5309 12.5624 17.5309 12.5624 17.5309L12.5624 12.5622L12.5624 12.5622ZM13.906 21.93C13.635 22.1508 13.3616 22.3197 13.0855 22.4438C12.9125 22.4614 12.7379 22.4749 12.5624 22.4841C12.5624 22.4841 12.5624 18.6558 12.5624 18.6558C12.5624 18.6558 16.0757 18.6558 16.0757 18.6558C15.9299 19.0209 15.7772 19.3736 15.6101 19.6962C15.1114 20.663 14.524 21.4254 13.906 21.93C13.906 21.93 13.906 21.93 13.906 21.93ZM19.4247 19.4241C18.3308 20.5176 16.9982 21.3682 15.5125 21.8955C16.2244 21.0342 16.8173 19.9312 17.2824 18.6558C17.2824 18.6558 20.1201 18.6558 20.1201 18.6558C19.9007 18.9228 19.6689 19.1798 19.4247 19.4241C19.4247 19.4241 19.4247 19.4241 19.4247 19.4241ZM20.9246 17.5308C20.9246 17.5308 17.6435 17.5308 17.6435 17.5308C18.0657 16.0342 18.3191 14.3507 18.3638 12.5622C18.3638 12.5622 22.4847 12.5622 22.4847 12.5622C22.3887 14.3812 21.8299 16.0737 20.9246 17.5308C20.9246 17.5308 20.9246 17.5308 20.9246 17.5308Z" fill="currentColor" transform="translate(0 0)" /> </g> </svg>{response.community_access}</div>
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <rect width="24" height="24" /> <path id="Path" d="M2.67 5.16C2.61 5.15 2.54 5.15 2.48 5.16C1.1 5.11 0 3.98 0 2.58C0 1.15 1.15 0 2.58 0C4.01 0 5.16 1.16 5.16 2.58C5.15 3.98 4.05 5.11 2.67 5.16C2.67 5.16 2.67 5.16 2.67 5.16Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(15.33 2)" /> <path id="Path" d="M0.0300007 4.94012C1.4 5.17013 2.91 4.93013 3.97 4.22013C5.38 3.28012 5.38 1.74013 3.97 0.800126C2.9 0.0901661 1.37 -0.149844 0 0.0901556" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(16.94 9.5)" /> <path id="Path" d="M2.49 5.16C2.55 5.15 2.62 5.15 2.68 5.16C4.06 5.11 5.16 3.98 5.16 2.58C5.16 1.15 4.01 0 2.58 0C1.15 0 0 1.16 0 2.58C0.00999999 3.98 1.11 5.11 2.49 5.16C2.49 5.16 2.49 5.16 2.49 5.16Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3.48 2)" /> <path id="Path" d="M4.9975 4.94012C3.6275 5.17013 2.1175 4.93013 1.0575 4.22013C-0.3525 3.28012 -0.3525 1.74013 1.0575 0.800126C2.1275 0.0901661 3.6575 -0.149844 5.0275 0.0901556" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2.002 9.5)" /> <path id="Path" d="M2.67004 5.16003C2.61004 5.15003 2.54004 5.15003 2.48004 5.16003C1.10004 5.11003 0 3.98003 0 2.58003C0 1.15003 1.15004 0 2.58004 0C4.01004 0 5.16004 1.16003 5.16004 2.58003C5.15004 3.98003 4.05004 5.12003 2.67004 5.16003C2.67004 5.16003 2.67004 5.16003 2.67004 5.16003Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.33 9.47)" /> <path id="Path" d="M1.0575 0.795C-0.3525 1.735 -0.3525 3.275 1.0575 4.215C2.65753 5.285 5.27753 5.285 6.87753 4.215C8.28753 3.275 8.28753 1.735 6.87753 0.795C5.28753 -0.265001 2.65753 -0.265001 1.0575 0.795C1.0575 0.795 1.0575 0.795 1.0575 0.795Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(8.032 16.985)" /> </g> </svg>{response.community_members.length} member(s)</div>
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <rect width="24" height="24" /> <path id="Shape" d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 11 22 11 22 11ZM2.0068 11C2.0068 15.9668 6.03318 19.9932 11 19.9932C15.9668 19.9932 19.9932 15.9668 19.9932 11C19.9932 6.03321 15.9668 2.00683 11 2.00683C6.03318 2.00683 2.0068 6.03321 2.0068 11C2.0068 11 2.0068 11 2.0068 11Z" fill="currentColor" transform="translate(1 1)" /> <path id="Path" d="M1 0C0.4477 0 0 0.44771 0 1C0 1 0 7.4667 0 7.4667C0 7.4667 0 7.7274 0.1267 7.9235C0.2115 8.0898 0.3437 8.2343 0.5174 8.3346C0.5174 8.3346 5.1372 11.0019 5.1372 11.0019C5.6155 11.278 6.2271 11.1141 6.5032 10.6358C6.7793 10.1575 6.6155 9.5459 6.1372 9.2698C6.1372 9.2698 2 6.8812 2 6.8812C2 6.8812 2 1 2 1C2 0.44772 1.5523 0 1 0C1 0 1 0 1 0Z" fill="currentColor" transform="translate(11 5)" /> </g> </svg>{response.community_date}</div>
                        </div>
                    </div>
                </div>
                }

                <div className="view feed-view feed-view-desktop">
                    {
                        posts && posts.length > 0 ?
                        posts.map((data, key) => {
                            return <Post data={data} key={key} />
                        })
                        : <div className="placeholder">
                            <h1>This community doesn't have any posts yet</h1>
                            { response.community_members && response.community_members.includes(authorizedState.user.id) && <button onClick={() => setPostCreatorState({id: response.community_id, state: true})}>Create Post</button> }
                            { response.community_members && response.community_members.includes(authorizedState.user.id) && <button onClick={() => setPostCreatorState(true)}>Create Post</button> }
                        </div>
                    }
                </div>

                <div className="view about-view about-view-desktop">
                    <div className="top-bar">
                        <div className="profile" style={{
                            backgroundImage: `url(${BackendHost}/${response.community_icon})`
                        }}></div>
                        <h1>sy/{response.community_name}</h1>
                    </div>
                    <div className="content">
                        <h1>{response.community_topic}</h1>
                        <p>{response.community_description}</p>
                        <div className="details">
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <rect width="24" height="24" /> <path id="Shape" d="M11.9997 0C5.3722 0.000328125 0.0005625 5.37216 0 11.9997C0.0005625 18.6272 5.3722 23.9991 11.9997 23.9994C18.6278 23.9991 23.9996 18.6272 24 11.9997C23.9996 5.37216 18.6278 0.000328125 11.9997 0C11.9997 0 11.9997 0 11.9997 0ZM4.57532 4.57528C5.66938 3.48178 7.00162 2.63114 8.48728 2.1038C7.77557 2.96512 7.18228 4.06814 6.71742 5.34361C6.71742 5.34361 3.87993 5.34361 3.87993 5.34361C4.09931 5.07666 4.33106 4.81959 4.57532 4.57528C4.57532 4.57528 4.57532 4.57528 4.57532 4.57528ZM3.07556 6.46861C3.07556 6.46861 6.35615 6.46861 6.35615 6.46861C5.9339 7.96528 5.68068 9.64833 5.63601 11.4372C5.63601 11.4372 1.51532 11.4372 1.51532 11.4372C1.61128 9.61828 2.17031 7.92572 3.07556 6.46861C3.07556 6.46861 3.07556 6.46861 3.07556 6.46861ZM3.07556 17.5308C2.17031 16.0737 1.61128 14.3812 1.51532 12.5622C1.51532 12.5622 5.6399 12.5622 5.6399 12.5622C5.68495 14.3493 5.93099 16.0353 6.35268 17.5309C6.35268 17.5309 3.07556 17.5309 3.07556 17.5309C3.07556 17.5309 3.07556 17.5308 3.07556 17.5308ZM4.57533 19.4241C4.33106 19.1798 4.09926 18.9227 3.87989 18.6558C3.87989 18.6558 6.71925 18.6558 6.71925 18.6558C6.91987 19.2077 7.14201 19.7313 7.39012 20.2125C7.71609 20.8424 8.0819 21.4063 8.48456 21.8948C6.99994 21.3675 5.66864 20.5169 4.57533 19.4241C4.57533 19.4241 4.57533 19.4241 4.57533 19.4241ZM11.4374 22.4841C11.2618 22.4749 11.0873 22.4618 10.9141 22.4438C10.638 22.32 10.3646 22.1508 10.0938 21.93C9.26728 21.2569 8.50115 20.1173 7.91887 18.6558C7.91887 18.6558 11.4374 18.6558 11.4374 18.6558L11.4374 22.4841C11.4374 22.4841 11.4374 22.4841 11.4374 22.4841ZM11.4374 17.5308C11.4374 17.5308 7.52635 17.5308 7.52635 17.5308C7.08211 16.0697 6.80841 14.3756 6.76097 12.5622C6.76097 12.5622 11.4374 12.5622 11.4374 12.5622L11.4374 17.5308L11.4374 17.5308ZM11.4374 11.4372C11.4374 11.4372 6.76453 11.4372 6.76453 11.4372C6.81178 9.62269 7.0868 7.93008 7.53136 6.46861C7.53136 6.46861 11.4375 6.46861 11.4375 6.46861L11.4375 11.4372L11.4374 11.4372ZM11.4374 5.34361C11.4374 5.34361 7.92407 5.34361 7.92407 5.34361C8.06981 4.97845 8.22253 4.62586 8.38973 4.30322C8.88848 3.33642 9.47582 2.574 10.0938 2.06934C10.3646 1.84856 10.638 1.67934 10.9141 1.55559C11.0873 1.53769 11.2618 1.52447 11.4374 1.51533C11.4374 1.51533 11.4374 5.34361 11.4374 5.34361L11.4374 5.34361ZM20.9246 6.46861C21.8299 7.92572 22.3887 9.61833 22.4847 11.4372C22.4847 11.4372 18.3601 11.4372 18.3601 11.4372C18.315 9.65016 18.069 7.96416 17.6471 6.46861C17.6471 6.46861 20.9246 6.46861 20.9246 6.46861C20.9246 6.46861 20.9246 6.46861 20.9246 6.46861ZM19.4247 4.57528C19.6689 4.81955 19.9007 5.07666 20.1201 5.34361C20.1201 5.34361 17.2806 5.34361 17.2806 5.34361C17.0799 4.79175 16.8576 4.26806 16.6097 3.78689C16.2838 3.15703 15.9179 2.59308 15.5153 2.10455C17.0001 2.63222 18.3312 3.48258 19.4247 4.57528C19.4247 4.57528 19.4247 4.57528 19.4247 4.57528ZM12.5624 1.51533C12.738 1.52447 12.9125 1.53802 13.0855 1.55559C13.3616 1.67977 13.6351 1.84856 13.906 2.06934C14.7327 2.74242 15.4987 3.88205 16.0809 5.34356C16.0809 5.34356 12.5624 5.34356 12.5624 5.34356L12.5624 1.51533C12.5624 1.51533 12.5624 1.51533 12.5624 1.51533ZM12.5624 6.46861C12.5624 6.46861 16.4735 6.46861 16.4735 6.46861C16.9177 7.92975 17.1916 9.62377 17.2388 11.4372C17.2388 11.4372 12.5624 11.4372 12.5624 11.4372L12.5624 6.46861L12.5624 6.46861ZM12.5624 12.5622C12.5624 12.5622 17.2351 12.5622 17.2351 12.5622C17.1879 14.3767 16.9129 16.0693 16.4683 17.5309C16.4683 17.5309 12.5624 17.5309 12.5624 17.5309L12.5624 12.5622L12.5624 12.5622ZM13.906 21.93C13.635 22.1508 13.3616 22.3197 13.0855 22.4438C12.9125 22.4614 12.7379 22.4749 12.5624 22.4841C12.5624 22.4841 12.5624 18.6558 12.5624 18.6558C12.5624 18.6558 16.0757 18.6558 16.0757 18.6558C15.9299 19.0209 15.7772 19.3736 15.6101 19.6962C15.1114 20.663 14.524 21.4254 13.906 21.93C13.906 21.93 13.906 21.93 13.906 21.93ZM19.4247 19.4241C18.3308 20.5176 16.9982 21.3682 15.5125 21.8955C16.2244 21.0342 16.8173 19.9312 17.2824 18.6558C17.2824 18.6558 20.1201 18.6558 20.1201 18.6558C19.9007 18.9228 19.6689 19.1798 19.4247 19.4241C19.4247 19.4241 19.4247 19.4241 19.4247 19.4241ZM20.9246 17.5308C20.9246 17.5308 17.6435 17.5308 17.6435 17.5308C18.0657 16.0342 18.3191 14.3507 18.3638 12.5622C18.3638 12.5622 22.4847 12.5622 22.4847 12.5622C22.3887 14.3812 21.8299 16.0737 20.9246 17.5308C20.9246 17.5308 20.9246 17.5308 20.9246 17.5308Z" fill="currentColor" transform="translate(0 0)" /> </g> </svg>{response.community_access}</div>
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <rect width="24" height="24" /> <path id="Path" d="M2.67 5.16C2.61 5.15 2.54 5.15 2.48 5.16C1.1 5.11 0 3.98 0 2.58C0 1.15 1.15 0 2.58 0C4.01 0 5.16 1.16 5.16 2.58C5.15 3.98 4.05 5.11 2.67 5.16C2.67 5.16 2.67 5.16 2.67 5.16Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(15.33 2)" /> <path id="Path" d="M0.0300007 4.94012C1.4 5.17013 2.91 4.93013 3.97 4.22013C5.38 3.28012 5.38 1.74013 3.97 0.800126C2.9 0.0901661 1.37 -0.149844 0 0.0901556" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(16.94 9.5)" /> <path id="Path" d="M2.49 5.16C2.55 5.15 2.62 5.15 2.68 5.16C4.06 5.11 5.16 3.98 5.16 2.58C5.16 1.15 4.01 0 2.58 0C1.15 0 0 1.16 0 2.58C0.00999999 3.98 1.11 5.11 2.49 5.16C2.49 5.16 2.49 5.16 2.49 5.16Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3.48 2)" /> <path id="Path" d="M4.9975 4.94012C3.6275 5.17013 2.1175 4.93013 1.0575 4.22013C-0.3525 3.28012 -0.3525 1.74013 1.0575 0.800126C2.1275 0.0901661 3.6575 -0.149844 5.0275 0.0901556" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2.002 9.5)" /> <path id="Path" d="M2.67004 5.16003C2.61004 5.15003 2.54004 5.15003 2.48004 5.16003C1.10004 5.11003 0 3.98003 0 2.58003C0 1.15003 1.15004 0 2.58004 0C4.01004 0 5.16004 1.16003 5.16004 2.58003C5.15004 3.98003 4.05004 5.12003 2.67004 5.16003C2.67004 5.16003 2.67004 5.16003 2.67004 5.16003Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.33 9.47)" /> <path id="Path" d="M1.0575 0.795C-0.3525 1.735 -0.3525 3.275 1.0575 4.215C2.65753 5.285 5.27753 5.285 6.87753 4.215C8.28753 3.275 8.28753 1.735 6.87753 0.795C5.28753 -0.265001 2.65753 -0.265001 1.0575 0.795C1.0575 0.795 1.0575 0.795 1.0575 0.795Z" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(8.032 16.985)" /> </g> </svg>{response.community_members && response.community_members.length} member(s)</div>
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <rect width="24" height="24" /> <path id="Shape" d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 11 22 11 22 11ZM2.0068 11C2.0068 15.9668 6.03318 19.9932 11 19.9932C15.9668 19.9932 19.9932 15.9668 19.9932 11C19.9932 6.03321 15.9668 2.00683 11 2.00683C6.03318 2.00683 2.0068 6.03321 2.0068 11C2.0068 11 2.0068 11 2.0068 11Z" fill="currentColor" transform="translate(1 1)" /> <path id="Path" d="M1 0C0.4477 0 0 0.44771 0 1C0 1 0 7.4667 0 7.4667C0 7.4667 0 7.7274 0.1267 7.9235C0.2115 8.0898 0.3437 8.2343 0.5174 8.3346C0.5174 8.3346 5.1372 11.0019 5.1372 11.0019C5.6155 11.278 6.2271 11.1141 6.5032 10.6358C6.7793 10.1575 6.6155 9.5459 6.1372 9.2698C6.1372 9.2698 2 6.8812 2 6.8812C2 6.8812 2 1 2 1C2 0.44772 1.5523 0 1 0C1 0 1 0 1 0Z" fill="currentColor" transform="translate(11 5)" /> </g> </svg>{response.community_date}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


// COMMUNITY POST

function Post(props) {
    return (
        <div className="post">
            <div className="post-header">
                <div className="post-header-image"></div>
                <div>
                    <h1>John Doe</h1>
                    <p>Posted 2 hours ago</p>
                </div>
            </div>
            <div className="post-content">
                <h1>{props.data.post_title}</h1>
                <p>{props.data.post_body}</p>
                {
                    props.data.post_image && 
                    <div className="poster" style={{
                        backgroundImage: `url(${BackendHost}/${props.data.post_image})`
                    }}></div>
                }
            </div>
            <div className="post-footer">
                <button> <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Arrow_Up_SM"> <path id="Vector" d="M12 17V7M12 7L8 11M12 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg> <p>2k</p> <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Arrow_Down_SM"> <path id="Vector" d="M12 7V17M12 17L16 13M12 17L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg> </button>
                <button> <svg width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 1024 1024" t="1569682881658" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style type="text/css"></style></defs><path d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zM293 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8186"></path><path d="M894 345c-48.1-66-115.3-110.1-189-130v0.1c-17.1-19-36.4-36.5-58-52.1-163.7-119-393.5-82.7-513 81-96.3 133-92.2 311.9 6 439l0.8 132.6c0 3.2 0.5 6.4 1.5 9.4 5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-0.5 0.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6 17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5-99 31-1-104-8-9c-84.6-103.2-90.2-251.9-11-361 96.4-132.2 281.2-161.4 413-66 132.2 96.1 161.5 280.6 66 412-80.1 109.9-223.5 150.5-348 102z m505-17l-8 10 1 104-98-33-12 5c-56 20.8-115.7 22.5-171 7l-0.2-0.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l0.6 0.4c23 16.5 44.1 37.1 62 62 72.6 99.6 68.5 235.2-8 330z" p-id="8187"></path><path d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8188"></path></g></svg> <p>24k</p> </button>
                <button> <svg width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.734 15.8974L19.22 12.1374C19.3971 11.9927 19.4998 11.7761 19.4998 11.5474C19.4998 11.3187 19.3971 11.1022 19.22 10.9574L14.734 7.19743C14.4947 6.9929 14.1598 6.94275 13.8711 7.06826C13.5824 7.19377 13.3906 7.47295 13.377 7.78743V9.27043C7.079 8.17943 5.5 13.8154 5.5 16.9974C6.961 14.5734 10.747 10.1794 13.377 13.8154V15.3024C13.3888 15.6178 13.5799 15.8987 13.8689 16.0254C14.158 16.1521 14.494 16.1024 14.734 15.8974Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> <p>Share</p> </button>
            </div>
        </div>
    )
}


// COMMUNITY PAGE 

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


export function CommunityPage() {

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
                communities.map((data, key) => {
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
                })
            }

        </div>
    </div>
    )
}


export function CommunityTopicPage() {

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
                    <svg onClick={() => window.history.back()} viewBox="0 0 1024 1024" width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
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