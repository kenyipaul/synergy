import "./styles/postCreator.scss";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useContext, useRef, useState } from "react";
import { PostCreatorContext } from "../pages/CommPage";
import { postRoute } from "../routes/routes";
import { useNavigate } from "react-router-dom";

export default function PostCreator() {

    const [currentTab, setCurrentTab] = useState(1);
    const [postCreatorState, setPostCreatorState] = useContext(PostCreatorContext)

    console.log(postCreatorState)

    return (
        <div className="post-creator">
            <svg onClick={() => setPostCreatorState({...postCreatorState, state: false})} className="closeBtn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="currentColor"></path> </g></svg>
            <div className="container">
                <div className="form">
                    <h1>Create post</h1>

                    <div className="tab-nav">
                        <p onClick={() => setCurrentTab(1) } className={currentTab == 1 ? "active" : ""} >Text</p>
                        <p onClick={() => setCurrentTab(2) } className={currentTab == 2 ? "active" : ""} >Image</p>
                    </div>

                    { currentTab == 1 ? <Tab1 /> : <Tab2 /> }

                </div>

            </div>
        </div>
    )
}

function Tab1() {

    const titleRef = useRef();
    const bodyRef = useRef();
    const authorizedState = useSelector(store => store.authorizedState)
    const [postCreatorState, setPostCreatorState] = useContext(PostCreatorContext)

    const post = () => {
        const title = titleRef.current.value;
        const body = bodyRef.current.value;
        const id = postCreatorState.id;
        const admin = authorizedState.user.id;
        const image = ""

        Axios({
            method: "POST",
            url: postRoute,
            data: {
                admin_id: admin,
                community_id: id,
                post_body: body,
                post_image: image,
                post_title: title
            }
        }).then((response) => {
            if (response.data.accepted) {
                alert(response.data.msg)
                setPostCreatorState(false)
            }
        })
    }

    return (
        <div className="tab text-tab">
            <div className="form">

                <div className="input-area">
                    <label htmlFor="title">Title</label>
                    <input ref={titleRef} type="text" name="title" id="title" />
                </div>

                <div className="input-area">
                    <label htmlFor="body">Body</label>
                    <textarea ref={bodyRef} name="body" id="body" placeholder="Write here"></textarea>
                </div>

                <button onClick={post}>Post</button>
            </div>
        </div>
    )
}


function Tab2() {

    const fileRef = useRef();
    const titleRef = useRef();
    const navigate = useNavigate();
    const authorizedState = useSelector(store => store.authorizedState)
    const [postCreatorState, setPostCreatorState] = useContext(PostCreatorContext)

    const post = () => {
        const body = "";
        const id = postCreatorState.id;
        const title = titleRef.current.value;
        const admin = authorizedState.user.id;
        const image = fileRef.current.files[0]

        if (image.size < 3000000) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image)

            fileReader.onload = () => {
                Axios({
                    method: "POST",
                    url: postRoute,
                    data: {
                        admin_id: admin,
                        community_id: id,
                        post_body: body,
                        post_image: fileReader.result,
                        post_title: title
                    }
                }).then((response) => {
                    alert(response.data.msg)
                    setPostCreatorState(false)
                })
            }
        } else {
            alert("Image is too large")
        }

    }

    return (
        <div className="tab image-tab">
            <div className="form">

                <div className="input-area">
                    <label htmlFor="title">Title</label>
                    <input ref={titleRef} type="text" name="title" id="title" />
                </div>

                <div className="input-area">
                    <p>Upload media</p>
                    <label htmlFor="file">
                        <h1>Select File here</h1>
                        <h4>Files supported: png, jpg, jpeg, wepb</h4>
                        <p>Choose a File</p>
                    </label>
                    <input ref={fileRef} type="file" name="file" id="file" />
                </div>

                <button onClick={post}>Post</button>
            </div>
        </div>
    )
}