import React, { useState, useContext } from "react"
import { CommFormContext } from "../pages/CommPage";

const StepContext = React.createContext(null);  
const CommNameContext = React.createContext(null);
const CommDescContext = React.createContext(null);

export default function CommCreator() {

    const [step, setStep] = useState(1);
    const [comFromState, setComFormState] = useContext(CommFormContext);
    const [communityName, setCommunityName] = useState("");
    const [communityDesc, setCommunityDesc] = useState("Your community description");

    return (
        <div id="community-creator">

            <svg onClick={() => setComFormState(false)} className="closeBtn" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>

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
    const [comFormState, setComFormState] = useContext(CommFormContext);
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
                <input value={communityName} type="text" name="communityName" id="communityName" onChange={changeCommunityName} maxLength={20} />
            </div>

            <div className="input-area">
                <label htmlFor="communityTopic">Community Topic</label>
                <select id="communityTopic">
                    {
                        topics.map((data, key) => {
                            return <option key={key} value={data}>{data}</option>
                        })
                    }
                </select>
            </div>

            <div className="input-area">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" onChange={changeDescription}></textarea>
            </div>

            <div className="buttons">
                <button onClick={() => setComFormState(false)}>Cancel</button>
                <button onClick={() => setStep(step + 1)}>Next</button>
            </div>
        </div>
    )
}



function Step2() {

    const [step, setStep] = useContext(StepContext);
    const [communityName, setCommunityName] = useContext(CommNameContext);
    const [communityDescription, setCommunityDescription] = useContext(CommDescContext)

    return (
        <div className="form">

            <div className="top-bar">
                <h1>Style your community</h1>
                <p>Adding visuals will catch new members attention and help establish your community’s culture! You can update this at any time</p>
            </div>

            <div className="replica">
                <div className="banner"></div>
                <div className="top-bar">
                    <div className="profile"></div>
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
                <label htmlFor="icon">No image selected</label>
                <input type="file" name="icon" id="icon" />
            </div>

            <div className="image-area">
                <p>Community Banner</p>
                <label htmlFor="banner">No image selected</label>
                <input type="file" name="banner" id="banner" />
            </div>

            <div className="buttons">
                <button onClick={() => setStep(step - 1)}>Back</button>
                <button onClick={() => setStep(step + 1)}>Next</button>
            </div>

        </div>
    )
}


function Step3() {

    const [step, setStep] = useContext(StepContext);

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
                    <input type="radio" name="type" id="public" />
                </div>
                <div className="input">
                    <div>
                        <h1>Private</h1>
                        <p>Only approved members can view and contribute to this community</p>
                    </div>
                    <input type="radio" name="type" id="public" />
                </div>
                <div className="input">
                    <div>
                        <h1>Restricted</h1>
                        <p>Anyone can view, but only approved users can contribute</p>
                    </div>
                    <input type="radio" name="type" id="public" />
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
                <button>Create Community</button>
            </div>

        </div>
    )
}