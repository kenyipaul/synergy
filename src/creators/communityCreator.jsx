import { useState } from "react"
import { useDispatch } from "react-redux";
import { setComCreatorState } from "../store/states/comCreatorState"

export default function CommunityCreator() {

    const dispatch = useDispatch();
    const [communityName, setCommunityName] = useState("");
    const [communityDescription, setCommunityDescription] = useState("Your community description");

    const changeCommunityName = (e) => {
        console.log(e)
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

    return (
        <div id="community-creator">
            
            <div className="container">

                <div className="form">
                    <div className="top-bar">
                        <h1>Create a community</h1>
                        <h2>Tell us about your Community</h2>
                    </div>

                    <div className="replica">
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

                    <div className="input-area">
                        <label htmlFor="communityName">Community Name</label>
                        <input value={communityName} type="text" name="communityName" id="communityName" onChange={changeCommunityName} maxLength={20} />
                    </div>

                    <div className="input-area">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" onChange={changeDescription}></textarea>
                    </div>

                    <div className="buttons">
                        <button onClick={() => dispatch(setComCreatorState(false))}>Cancel</button>
                        <button>Next</button>
                    </div>
                </div>

            </div>

        </div>
    )
}