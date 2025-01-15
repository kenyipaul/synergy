import "./styles/_commCreator.scss";
import Axios from "axios"
import React, { useState, useContext, useRef, useEffect } from "react"
import { CommFormContext } from "../pages/CommPage";
import { communityRoute } from "../routes/routes";
import { useNavigate } from "react-router-dom";

const StepContext = React.createContext(null);  
const CommNameContext = React.createContext(null);
const CommDescContext = React.createContext(null);

export default function CommCreator() {

    const [step, setStep] = useState(1);
    const [commFromState, setCommFormState] = useContext(CommFormContext);
    const [communityName, setCommunityName] = useState("");
    const [communityDesc, setCommunityDesc] = useState("Your community description");

    return (
        <div id="community-creator">

            <svg onClick={() => setCommFormState(false)} className="closeBtn" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>

            <CommDescContext.Provider value={[communityDesc, setCommunityDesc]}>
            <CommNameContext.Provider value={[communityName, setCommunityName]}>
            <StepContext.Provider value={[step, setStep]}>

                <div className="container">
                    {step === 1 ? <Step1 /> : step === 2 ? <Step2 /> : <Step3 />}
                </div>

            </StepContext.Provider>
            </CommNameContext.Provider>
            </CommDescContext.Provider>

        </div>
    )
}


function Step1() {

    const [step, setStep] = useContext(StepContext);
    const [commFormState, setCommFormState] = useContext(CommFormContext);
    const [communityName, setCommunityName] = useContext(CommNameContext);
    const [communityDescription, setCommunityDescription] = useContext(CommDescContext)


    const changeCommunityName = (e) => {
        let communityNameInput = document.getElementById("communityName")

        if (communityNameInput.value == "") {
            setCommunityName("")
        } else {
            setCommunityName(e.target.value.replace(/\s/g, ''))
        }
    }

    const changeDescription = (e) => {
        let communityInput = document.getElementById("description")

        if (communityInput.value == "") {
            setCommunityDescription("Your community description")
        } else {
            setCommunityDescription(e.target.value)
        }
    }

    const topics = [
        "Arts & Entertainment",
        "Gaming",
        "Technology",
        "Science & Nature",
        "News & Politics",
        "Sports",
        "Business & Finance",
        "Health & Fitness",
        "Food & Drink",
        "Travel",
        "Hobbies & Interests",
        "Relationships & Family",
        "Personal Development",
        "Learning & Education",
        "History & Culture",
        "Funny & Humor",
        "Advice & Support",
        "Music",
        "Movies & TV",
        "Books & Literature",
        "Fashion & Beauty",
        "Home & Garden",
        "Pets & Animals",
        "Writing & Creativity",
        "Philosophy & Ideas",
        "Websites & Internet",
        "Cryptocurrency",
        "Investing",
        "Programming",
        "Data Science",
        "Artificial Intelligence",
        "Space Exploration",
        "Environmentalism",
        "Activism & Social Issues",
        "Podcasts",
        "Board Games & Tabletop",
        "Collectibles",
        "Photography"
    ]

    const communityNameRef = useRef(null)
    const communityTopicRef = useRef(null)
    const communityDescRef = useRef(null)

    const submit = () => {

        const communityName = communityNameRef.current.value;
        const communityDesc = communityDescRef.current.value;
        const communityTopic = communityTopicRef.current.value;

        if (communityName && communityDesc && communityTopic) {

            const community = {
                community_name: communityName,
                community_topic: communityTopic,
                community_description: communityDesc
            }

            sessionStorage.setItem("community", JSON.stringify(community));
            setStep(step + 1)

        } else {
            alert("Please fill in the form")
        }

    }

    return (
        <div className="form">
            <div className="top-bar">
                <h1>Create a community</h1>
                <h2>Tell us about your Community</h2>
            </div>

            <div className="replica">
                <div className="top-bar">
                    <div className="profile"></div>
                    <div>
                        <h1>sy/{communityName !== "" ? communityName : "communityname"}</h1>
                        <div className="info">
                            <p>1 member</p>
                            <p>1 online</p>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <p>{communityDescription}</p>
                </div>
            </div>

            <div className="input-area">
                <label htmlFor="communityName">Community Name</label>
                <input value={communityName} ref={communityNameRef} type="text" name="communityName" id="communityName" onChange={changeCommunityName} maxLength={20} />
            </div>

            <div className="input-area">
                <label htmlFor="communityTopic">Community Topic</label>
                <select id="communityTopic" ref={communityTopicRef} >
                    {
                        topics.map((data, key) => {
                            return <option key={key} value={data}>{data}</option>
                        })
                    }
                </select>
            </div>

            <div className="input-area">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" ref={communityDescRef} onChange={changeDescription}></textarea>
            </div>

            <div className="buttons">
                <button onClick={() => setCommFormState(false)}>Cancel</button>
                <button onClick={submit}>Next</button>
            </div>
        </div>
    )
}



function Step2() {

    const [step, setStep] = useContext(StepContext);
    const [communityName, setCommunityName] = useContext(CommNameContext);
    const [communityDescription, setCommunityDescription] = useContext(CommDescContext)
    const [selectedCommIcon, setSelectedCommIcon] = useState(null);
    const [selectedCommBanner, setSelectedCommBanner] = useState(null);
    const [icon, setIcon] = useState("");
    const [banner, setBanner] = useState("");

    const communityIconRef = useRef(null);
    const communityBannerRef = useRef(null);

    const submit = () => {
        const communityIcon = communityIconRef.current.files[0];
        const communityBanner = communityBannerRef.current.files[0];
        const communityAdmin = JSON.parse(sessionStorage.getItem("user")).id;
        const community = JSON.parse(sessionStorage.getItem("community"))

        community.community_icon = icon || "";
        community.community_banner = banner || "";
        community.community_admin = communityAdmin

        sessionStorage.setItem("community", JSON.stringify(community))
        setStep(step + 1)
    }


    useEffect(() => {

        if (selectedCommBanner) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(selectedCommBanner);

            fileReader.onload = function() {
                setBanner(fileReader.result)
            }
        }
        
    }, [selectedCommBanner])
    
    useEffect(() => {

        if (selectedCommIcon) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(selectedCommIcon);
            
            fileReader.onload = function() {
                setIcon(fileReader.result)
            }
        }

    }, [selectedCommIcon])

    return (
        <div className="form">

            <div className="top-bar">
                <h1>Style your community</h1>
                <p>Adding visuals will catch new members attention and help establish your community’s culture! You can update this at any time</p>
            </div>

            <div className="replica">
                <div className="banner" style={{
                    backgroundImage: banner && `url(${banner})`
                }}></div>
                <div className="top-bar">
                    <div className="profile" style={{
                        backgroundImage: icon && `url(${icon})`
                    }}></div>
                    <div>
                        <h1>@/{communityName !== "" ? communityName : "communityname"}</h1>
                        <div className="info">
                            <p>1 member</p>
                            <p>1 online</p>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <p>{communityDescription}</p>
                </div>
            </div>

            <div className="image-area">
                <p>Community Icon</p>
                <label htmlFor="icon">{ selectedCommIcon && selectedCommIcon.name || "No image selected"}</label>
                <input type="file" name="icon" id="icon" ref={communityIconRef} onChange={(e) => setSelectedCommIcon(e.target.files[0])} />
            </div>

            <div className="image-area">
                <p>Community Banner</p>
                <label htmlFor="banner">{ selectedCommBanner && selectedCommBanner.name || "No image selected"}</label>
                <input type="file" name="banner" id="banner" ref={communityBannerRef} onChange={(e) => setSelectedCommBanner(e.target.files[0])} />
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                <button onClick={submit}>Next</button>
            </div>

        </div>
    )
}


function Step3() {

    const navigate = useNavigate();
    const [step, setStep] = useContext(StepContext);
    const [loading, setLoading] = useState(false)
    const [commFromState, setCommFormState] = useContext(CommFormContext);

    const submit = () => {
        const communityAccess = document.querySelector("input[id='access_type']:checked");
        const communityMaturity = document.getElementById("mature").checked;
        
        const community = JSON.parse(sessionStorage.getItem("community"))
        community.community_access= communityAccess.value;
        community.community_maturity = communityMaturity;
        
        const token = sessionStorage.getItem("token")
        
        if (token) {
            setLoading(true)
            
            Axios({
                method: 'POST',
                url: `${communityRoute}/create/`,
                data: community,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) =>  {
                alert(response.data.msg)
                sessionStorage.removeItem("community")
                setCommFormState(false);
            }).catch((err) => {
                alert(err.response.data.msg)
            })
            setLoading(false)
        } else {
            alert("Session invalid or expired, please login")
        }

    }

    return (
        <div className="form">

            <div className="top-bar">
                <h1>What kind of community is this?</h1>
                <p>Decide who can view and contribute in your community. Only public communities show up in search. Important: Once set, you will need to submit a request to change your community type.</p>
            </div>

            <div className="type-area">
                <div className="input">
                    <div>
                        <h1>Public</h1>
                        <p>Anyone can view, post, and comment to this community</p>
                    </div>
                    <input type="radio" name="type" value="public" id="access_type" defaultChecked />
                </div>
                <div className="input">
                    <div>
                        <h1>Private</h1>
                        <p>Only approved members can view and contribute to this community</p>
                    </div>
                    <input type="radio" name="type" value="private" id="access_type" />
                </div>
                <div className="input">
                    <div>
                        <h1>Restricted</h1>
                        <p>Anyone can view, but only approved users can contribute</p>
                    </div>
                    <input type="radio" name="type" value="restricted" id="access_type" />
                </div>
            </div>

            <div className="check-area">
                <div>
                    <h1>Mature(18+)</h1>
                    <p>Users must be over 18 to view and contribute</p>
                </div>
                <input type="checkbox" name="mature" id="mature" />
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                {
                    loading ?
                    <button className="loading">Processing</button> :
                    <button onClick={submit}>Create Community</button>
                }
            </div>

        </div>
    )
}