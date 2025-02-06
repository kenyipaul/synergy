import "./styles/commPostPage.scss";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import Axios from "axios"
import { convert } from "html-to-text";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { BackendHost } from "../../../routes/routes";
import { useSelector } from "react-redux";
import { CommunityPostContext } from "../../CommPage"
import { useSocket } from "../../../providers/socketProvider";

const PostContext = React.createContext(null)

export default function CommunityPostPage() {

    const [postData, setPostData] = useState({})
    const [posts, setPosts] = useContext(CommunityPostContext)
    const { socket, isConnected } = useSocket()

    const bodyRef = useRef(null);
    const location = useLocation();
    const tmp = decodeURIComponent(location.pathname).split("/");
    const url = tmp[tmp.length - 1]
    const authorizedState = useSelector(store => store.authorizedState)


    useEffect(() => {
        if (isConnected) {

            socket.emit("/fetch/post", url)
            socket.on("/fetch/post/response", response => {
                if (!response.error) {
                    setPosts([response.data, ...posts])
                }
            })

        }
    }, [isConnected, socket, url]);

    useEffect(() => {

        if (posts.length > 0) {    
            const post = posts.filter((data) => data._id === url)
            setPostData(post[0])
        }
    }, [posts, url])

    useEffect(() => {
        if (postData && Object.keys(postData).length > 0) {
            if (postData.post_body) {
                bodyRef.current.innerHTML = postData.post_body
            }
        }
    }, [postData])


    const like = () => {
        const postId = postData._id;
        const community_id = tmp[tmp.length - 1]
        const userId = authorizedState.user.id

        if (isConnected) {
            socket.emit("/like/post", { postId, community_id, userId })
            socket.on("/like/post/response", response => {
                if (!response.error) {
                    setPostData(response.data)
                }
            })

        } else {
            alert("Failed to connected to server")
        }
    }
    
    const dislike = () => {
        const postId = postData._id;
        const userId = authorizedState.user.id
        const community_id = tmp[tmp.length - 1]

        if (isConnected) {
            socket.emit("/dislike/post", { postId, community_id, userId })
            socket.on("/dislike/post/response", response => {
                if (!response.error) {
                    setPostData(response.data)
                }
            })

        } else {
            alert("Failed to connected to server")
        }

    }

    return (
        <PostContext.Provider value={[postData, setPostData]}>
            { 
                postData && Object.keys(postData).length > 0 ? 
                    <>   
                    <div className="community-post-page">
                        <div className="community-post-content">
                            <div className="post-header">

                                <div className="top-bar">
                                    <div className="profile" style={{
                                        backgroundImage: `url(${BackendHost}/${postData.admin_image})`
                                    }}></div>
                                    <div>
                                        <h1>{postData.admin_name}</h1>
                                        <p>{ timeAgo(postData.post_date)}</p>
                                    </div>
                                </div>

                                <div className="content">
                                    <h1>{postData.post_title}</h1>
                                    {postData.post_body &&
                                        <div className="body" >
                                            <p ref={bodyRef}></p>
                                        </div>
                                    }
                                    {postData.post_image &&
                                        <div className="image" style={{
                                            backgroundImage: `url(${BackendHost}/${postData.post_image})`
                                        }}></div>
                                    }
                                </div>

                                <div className="post-footer">
                                    <button onClick={
                                        authorizedState.authorized ?
                                            postData.post_likes && postData.post_likes.includes(authorizedState.user.id) ? dislike : like
                                        : null
                                        } className={postData.post_likes && postData.post_likes.includes(authorizedState.user.id) ? "active" : ""}> <svg width="1.2rem" height="1.2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.4382 2.77841C12.2931 2.73181 12.1345 2.74311 11.9998 2.80804C11.8523 2.87913 11.7548 3.0032 11.7197 3.13821L11.244 4.97206C11.0777 5.61339 10.8354 6.23198 10.5235 6.81599C10.0392 7.72267 9.30632 8.42 8.62647 9.00585L7.18773 10.2456C6.96475 10.4378 6.8474 10.7258 6.87282 11.0198L7.68498 20.4125C7.72601 20.887 8.12244 21.25 8.59635 21.25H13.245C16.3813 21.25 19.0238 19.0677 19.5306 16.1371L20.2361 12.0574C20.3332 11.4959 19.9014 10.9842 19.3348 10.9842H14.1537C13.1766 10.9842 12.4344 10.1076 12.5921 9.14471L13.2548 5.10015C13.3456 4.54613 13.3197 3.97923 13.1787 3.43584C13.1072 3.16009 12.8896 2.92342 12.5832 2.82498L12.4382 2.77841L12.6676 2.06435L12.4382 2.77841ZM11.3486 1.45674C11.8312 1.2242 12.3873 1.18654 12.897 1.35029L13.042 1.39686L12.8126 2.11092L13.042 1.39686C13.819 1.64648 14.4252 2.26719 14.6307 3.0592C14.8241 3.80477 14.8596 4.58256 14.7351 5.34268L14.0724 9.38724C14.0639 9.439 14.1038 9.4842 14.1537 9.4842H19.3348C20.8341 9.4842 21.9695 10.8365 21.7142 12.313L21.0087 16.3928C20.3708 20.081 17.0712 22.75 13.245 22.75H8.59635C7.3427 22.75 6.29852 21.7902 6.19056 20.5417L5.3784 11.149C5.31149 10.3753 5.62022 9.61631 6.20855 9.10933L7.64729 7.86954C8.3025 7.30492 8.85404 6.75767 9.20042 6.10924C9.45699 5.62892 9.65573 5.12107 9.79208 4.59542L10.2678 2.76157C10.417 2.18627 10.8166 1.71309 11.3486 1.45674ZM2.96767 9.4849C3.36893 9.46758 3.71261 9.76945 3.74721 10.1696L4.71881 21.4061C4.78122 22.1279 4.21268 22.75 3.48671 22.75C2.80289 22.75 2.25 22.1953 2.25 21.5127V10.2342C2.25 9.83256 2.5664 9.50221 2.96767 9.4849Z" fill="currentColor"></path> </g></svg> <p>{postData && postData.post_likes && postData.post_likes.length}</p> </button>
                                    <button> <svg width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 1024 1024" t="1569682881658" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style type="text/css"></style></defs><path d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zM293 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8186"></path><path d="M894 345c-48.1-66-115.3-110.1-189-130v0.1c-17.1-19-36.4-36.5-58-52.1-163.7-119-393.5-82.7-513 81-96.3 133-92.2 311.9 6 439l0.8 132.6c0 3.2 0.5 6.4 1.5 9.4 5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-0.5 0.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6 17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5-99 31-1-104-8-9c-84.6-103.2-90.2-251.9-11-361 96.4-132.2 281.2-161.4 413-66 132.2 96.1 161.5 280.6 66 412-80.1 109.9-223.5 150.5-348 102z m505-17l-8 10 1 104-98-33-12 5c-56 20.8-115.7 22.5-171 7l-0.2-0.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l0.6 0.4c23 16.5 44.1 37.1 62 62 72.6 99.6 68.5 235.2-8 330z" p-id="8187"></path><path d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8188"></path></g></svg> <p>{postData.post_comments && postData.post_comments.length}</p> </button>
                                </div>
                            </div>

                            <CommentSection />

                        </div>
                    </div>
            </>
                : null
            }
        </PostContext.Provider>
    )
}

const CommentContext = React.createContext(null)

function CommentSection() {

    const location = useLocation()
    const tmp = decodeURIComponent(location.pathname).split("/");
    const postId = tmp[tmp.length - 1]

    const [comments, setComments] = useState([])
    const [postData, setPostData] = useContext(PostContext)
    const authorizedState = useSelector(store => store.authorizedState)

    useEffect(() => {
        if (postData && postData.post_comments) {
            setComments(postData.post_comments.reverse());
        }
    }, [postData])

    return (
        <CommentContext.Provider value={[comments, setComments]}>
            <div className="post-comments">
                { authorizedState.authorized ? <CommentWriter /> : <></> }
                <h1>Comments <span>{comments ? comments.length : ""}</span></h1>
                <div className="comment-grid" id="comment-grid">
                    {
                        comments && comments.map((data, key) => {
                            return <Comment data={data} id={data._id} key={key} />
                        })
                    }
                </div>
            </div>
        </CommentContext.Provider>
    )
}



function Comment(props) {

    const bodyRef = useRef(null);
    const editorRef = useRef(null)
    const [postData, setPostData] = useContext(PostContext)
    const [replyEditorState, setReplyEditorState] = useState(false);
    const authorizedState = useSelector(store => store.authorizedState)
    const [replies , setReplies] = useState([]);

    const location = useLocation();
    const tmp = decodeURIComponent(location.pathname).split("/");

    useEffect(() => {
        if (postData) {
            let filtered = postData.post_replies.filter(data => data.commentId == props.data._id)
            setReplies(filtered)
        }
    }, [postData, setPostData])

    useEffect(() => {

        if (replyEditorState) {
            new Quill(`.editor.c${props.id}`, {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'clean'],
                    ]
                },
                placeholder: "",
                theme: 'snow' // or 'bubble'
            })
        }


    }, [replyEditorState, setReplyEditorState])


    useEffect(() => {
        if (props.data) {
            let commentBody = bodyRef.current;

            commentBody.innerHTML = props.data.comment
        }
    }, [props.data])


    const postReply = () => {

        const postId = tmp[tmp.length - 1]
        const userId = authorizedState.user.id;
        const commId = props.data._id;
        const reply = document.querySelector("#replyEditor .ql-editor").innerHTML;
        const date = new Date()

        Axios({
            method: "POST",
            url: `${BackendHost}/api/post/reply`,
            data: { postId, userId, reply, commId, date }
        }).then((response) => {
            setReplies([response.data, ...replies])
            document.querySelector("#replyEditor .ql-editor").innerHTML = ""
            setReplyEditorState(false)
        })

    }


    return (
        <div className="comment">
            <div className="topBar">
                <div className="profile" style={{
                    backgroundImage: `url(${BackendHost}/${props.data.userImage})`
                }}></div>
                <h4>{props.data.userName}</h4>
                <p>{props.data && timeAgo(new Date(props.data.date).getTime())}</p>
            </div>
            
            <div className="body" ref={bodyRef}></div>

            <div className="footer">
                <button onClick={() => setReplyEditorState(!replyEditorState)}> <svg width="1.2rem" height="1.2rem" fill="currentColor" viewBox="0 0 1024 1024" t="1569682881658" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style type="text/css"></style></defs><path d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zM293 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8186"></path><path d="M894 345c-48.1-66-115.3-110.1-189-130v0.1c-17.1-19-36.4-36.5-58-52.1-163.7-119-393.5-82.7-513 81-96.3 133-92.2 311.9 6 439l0.8 132.6c0 3.2 0.5 6.4 1.5 9.4 5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-0.5 0.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6 17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5-99 31-1-104-8-9c-84.6-103.2-90.2-251.9-11-361 96.4-132.2 281.2-161.4 413-66 132.2 96.1 161.5 280.6 66 412-80.1 109.9-223.5 150.5-348 102z m505-17l-8 10 1 104-98-33-12 5c-56 20.8-115.7 22.5-171 7l-0.2-0.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l0.6 0.4c23 16.5 44.1 37.1 62 62 72.6 99.6 68.5 235.2-8 330z" p-id="8187"></path><path d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8188"></path></g></svg> <p>Reply</p> </button>
            </div>
            { replyEditorState ?
                <div className="comment-editor">
                    <div id="replyEditor" className={`editor c${props.id}`}></div>
                    <div className="buttons">
                        <button onClick={() => setReplyEditorState(false)}>Cancel</button>
                        { authorizedState.authorized ? <button onClick={postReply}>Post Reply</button> : <></> }
                    </div>
                </div> : <></>
            }
            <div className="replies">
                {
                    replies.map((data, key) => {
                        return <Reply data={data} key={key}  />
                    })
                }
            </div>
        </div>
    )
}


function Reply(props) {

    const replyBodyRef = useRef(null);

    useEffect(() => {
        replyBodyRef.current.innerHTML = props.data.reply
    }, [props.data])

    return (
        <div className="comment comment-reply">
            <div className="topBar">
                <div className="profile" style={{
                    backgroundImage: `url(${BackendHost}/${props.data.userImage})`
                }}></div>
                <h4>{props.data.userName}</h4>
                <p>{props.data && timeAgo(props.data.date)}</p>
            </div>
            <div className="body" ref={replyBodyRef}>
                {/* <p>{props.data.reply}</p> */}
            </div>
            <div className="footer">
                {/* <button> <svg width="1.2rem" height="1.2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.4382 2.77841C12.2931 2.73181 12.1345 2.74311 11.9998 2.80804C11.8523 2.87913 11.7548 3.0032 11.7197 3.13821L11.244 4.97206C11.0777 5.61339 10.8354 6.23198 10.5235 6.81599C10.0392 7.72267 9.30632 8.42 8.62647 9.00585L7.18773 10.2456C6.96475 10.4378 6.8474 10.7258 6.87282 11.0198L7.68498 20.4125C7.72601 20.887 8.12244 21.25 8.59635 21.25H13.245C16.3813 21.25 19.0238 19.0677 19.5306 16.1371L20.2361 12.0574C20.3332 11.4959 19.9014 10.9842 19.3348 10.9842H14.1537C13.1766 10.9842 12.4344 10.1076 12.5921 9.14471L13.2548 5.10015C13.3456 4.54613 13.3197 3.97923 13.1787 3.43584C13.1072 3.16009 12.8896 2.92342 12.5832 2.82498L12.4382 2.77841L12.6676 2.06435L12.4382 2.77841ZM11.3486 1.45674C11.8312 1.2242 12.3873 1.18654 12.897 1.35029L13.042 1.39686L12.8126 2.11092L13.042 1.39686C13.819 1.64648 14.4252 2.26719 14.6307 3.0592C14.8241 3.80477 14.8596 4.58256 14.7351 5.34268L14.0724 9.38724C14.0639 9.439 14.1038 9.4842 14.1537 9.4842H19.3348C20.8341 9.4842 21.9695 10.8365 21.7142 12.313L21.0087 16.3928C20.3708 20.081 17.0712 22.75 13.245 22.75H8.59635C7.3427 22.75 6.29852 21.7902 6.19056 20.5417L5.3784 11.149C5.31149 10.3753 5.62022 9.61631 6.20855 9.10933L7.64729 7.86954C8.3025 7.30492 8.85404 6.75767 9.20042 6.10924C9.45699 5.62892 9.65573 5.12107 9.79208 4.59542L10.2678 2.76157C10.417 2.18627 10.8166 1.71309 11.3486 1.45674ZM2.96767 9.4849C3.36893 9.46758 3.71261 9.76945 3.74721 10.1696L4.71881 21.4061C4.78122 22.1279 4.21268 22.75 3.48671 22.75C2.80289 22.75 2.25 22.1953 2.25 21.5127V10.2342C2.25 9.83256 2.5664 9.50221 2.96767 9.4849Z" fill="currentColor"></path> </g></svg> <p>12</p> </button> */}
                {/* <button> <svg width="1.2rem" height="1.2rem" fill="currentColor" viewBox="0 0 1024 1024" t="1569682881658" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style type="text/css"></style></defs><path d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zM293 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8186"></path><path d="M894 345c-48.1-66-115.3-110.1-189-130v0.1c-17.1-19-36.4-36.5-58-52.1-163.7-119-393.5-82.7-513 81-96.3 133-92.2 311.9 6 439l0.8 132.6c0 3.2 0.5 6.4 1.5 9.4 5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-0.5 0.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6 17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5-99 31-1-104-8-9c-84.6-103.2-90.2-251.9-11-361 96.4-132.2 281.2-161.4 413-66 132.2 96.1 161.5 280.6 66 412-80.1 109.9-223.5 150.5-348 102z m505-17l-8 10 1 104-98-33-12 5c-56 20.8-115.7 22.5-171 7l-0.2-0.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l0.6 0.4c23 16.5 44.1 37.1 62 62 72.6 99.6 68.5 235.2-8 330z" p-id="8187"></path><path d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z" p-id="8188"></path></g></svg> <p>Reply</p> </button> */}
            </div>
        </div>
    )
}



function CommentWriter() {

    const [loading, setLoading] = useState(false)
    const authorizedState = useSelector(store => store.authorizedState)
    const [comments, setComments] = useContext(CommentContext);
    const location = useLocation();
    const tmp = decodeURIComponent(location.pathname).split("/");
    const url = tmp[tmp.length - 1]
    
    useEffect(() => {
        new Quill("#comment-editor", {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'clean'],
                ]
            },
            placeholder: "",
            theme: 'snow' // or 'bubble'
        })
    }, [])



    const post = () => {
        setLoading(true)
        const postId = url;
        const userId = authorizedState.user.id;
        const comment = document.querySelector("#comment-editor .ql-editor").innerHTML;
        const date = new Date()

        let comm = convert(comment, {}).trim()
        
        if (comm) {
            Axios({
                method: "POST",
                url: `${BackendHost}/api/post/comment`,
                data: { postId, userId, comment, date}
            }).then((response) => {
                setComments([response.data, ...comments])
                document.querySelector("#comment-editor .ql-editor").innerHTML = "";
                setLoading(false)
            })
        } else {
            alert("Please write a comment")
        }
    }
    
    return (
        <div className="comment-writer">
            <div id="comment-editor"></div>
            {
                loading ? <button className="postBtn">Uploading...</button> :
                <button className="postBtn" onClick={post}>Post Comment</button>
            }
        </div>
    )
}






function timeAgo(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 0) {
      return "in the future"; // Or handle future dates more specifically
    }
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
  
    for (const unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
  
    if (seconds < 30) { // "Just now" for up to 30 seconds
      return "Just now";
    }
  
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}