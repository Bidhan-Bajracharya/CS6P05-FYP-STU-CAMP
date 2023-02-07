import React, { useEffect, useState } from "react";
import H1 from "../../components/UI/H1";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../../components/content/Post";
import StaticPost from "../../components/content/StaticPost";
import SettingWrapper from "../../components/UI/SettingWrapper";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useNotification from "../../hooks/useNotification";
import EmptyContent from "../../images/EmptyContent";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";

const AccountPosts = (props) => {
  useNotification();
  const {
    name,
    userType,
    uni_id,
    profile_pic,
    department,
    section,
    year,
    email,
  } = useSelector((store) => store.user);

  const [userPosts, setUserPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // image folder path

  const [postID, setPostID] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [post, setPost] = useState(); // post detail

  const [postClicked, setPostClicked] = useState(); // options for posts
  const [deleteIconClicked, setDeleteIconClicked] = useState(false); // deletion confirmation pop-up
  const [deletedPostId, setDeletedPostId] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentPost, setCommentPost] = useState(); // tracking 'Add comment' clicked for posts
  const [showPostComments, setShowPostComments] = useState(); // tracking 'show comment' clicked for posts
  const [commentDeleteClick, setCommentDeleteClick] = useState(false); // delete icon clicked for a comment
  const [commentClicked, setCommentClicked] = useState(""); // tracking 'id' of the comment that was selected for deletion

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await axiosPrivate.get("/post");
        setUserPosts(response.data.posts);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserPosts();
  }, []);

  const handleDotClick = (_id) => {
    if (_id === postClicked) {
      // resetting clicked post's ID if it is clicked again
      // but dont reset yet if the delete icon was clicked
      if (!deleteIconClicked) {
        setPostClicked(null);
      }
    } else {
      // passing id to detect which post was clicked
      setPostClicked(_id);
    }
  };

  // open/close of deletion pop-over
  const handleDeleteIconClick = () => {
    setDeleteIconClicked((prevState) => !prevState);
  };

  // remove a post by its id
  const handleDelete = async (postId) => {
    try {
      const response = await axiosPrivate.delete(`/post/${postId}`);
      setDeletedPostId(postId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // refetch the data when a post is deleted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/post");
        setUserPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    if (deletedPostId) {
      fetchData();
    }
  }, [deletedPostId]);

  // fetch comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axiosPrivate(`/comment`);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  // Showing/Hiding comments for post handler
  const handleShowCommentClick = (postId) => {
    // only one posts's comments can be viewed at a time
    if (postId === showPostComments) {
      setShowPostComments(null);
    } else {
      setShowPostComments(postId);
    }
  };

  const handleCommentDeleteIconClick = (commentId) => {
    // if delete icon was just clicked, track the comment's id
    if (!commentDeleteClick) {
      setCommentClicked(commentId);
    }
    setCommentDeleteClick((prevState) => !prevState);
  };

  // handle deletion of comments
  const handleCommentDelete = async () => {
    try {
      await axiosPrivate.delete(`/comment/${commentClicked}`);
      setComments(comments.filter((comment) => comment._id !== commentClicked));
    } catch (error) {
      console.log(error);
    }
  };

  // filter comments according to posts
  const getPostComments = (postId) => {
    return comments.filter((comment) => comment.postId === postId);
  };

  // adding new comment
  const handleCommentAdd = (comment) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
  };

  const getPost = async () => {
    try {
      const response = await axiosPrivate.get(`/post/${postID}`);
      setPost(response.data.post);
      console.log(response.data);
    } catch (err) {
      setErrMsg("Post not found");
      setPost();
      console.log(err.response.data.msg);
    }
  };

  const handleClearSearch = () => {
    setPost();
    setPostID("");
  };

  // reset error message after change made in ID field
  useEffect(() => {
    setErrMsg("");
  }, [postID]);

  return (
    <>
      <SettingWrapper>
        <div className="flex flex-row items-center mx-3 mb-5 bg-[#FA8128] rounded-lg h-fit p-2 lg:w-[62%]">
          <Avatar
            size={90}
            icon={<UserOutlined />}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              position: "static",
              marginLeft: "10px",
              boxShadow: "0 0 0 2px #893101",
            }}
            src={
              profile_pic !== "default" && (
                <img alt="user" src={PF + "/" + profile_pic} />
              )
            }
          />

          <div className="flex flex-col ml-6 lg:flex-row">
            <div className="flex flex-col">
              <h1 className="text-white font-medium">Name: {name}</h1>
              <h1 className="text-white font-medium">
                Department: {department}
              </h1>
              <h1 className="text-white font-medium">
                University ID: {uni_id}
              </h1>
              <h1 className="text-white font-medium">College Mail: {email}</h1>
            </div>

            <div className="flex flex-col lg:ml-5">
              <h1 className="text-white font-medium">
                Role: {userType === 1845 ? "Student" : "Class Representative"}
              </h1>
              <h1 className="text-white font-medium">Year: {year}</h1>
              <h1 className="text-white font-medium">Section: {section}</h1>
            </div>
          </div>
        </div>

        <section className="mb-5">
          <H1>Find a post</H1>

          {errMsg && <h1 className="text-red-600 ml-2">{errMsg}</h1>}
          <div className="flex flex-col mb-3 lg:items-center lg:flex-row">
            <input
              placeholder="Post ID"
              className="w-[95%] ml-2 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white lg:w-60 lg:my-auto"
              value={postID}
              onChange={(e) => setPostID(e.target.value)}
              required
            />
            <div className="flex flex-row ml-2">
              <button
                onClick={() => getPost()}
                disabled={!postID}
                className={`rounded-lg mr-2 h-10 p-2 text-white w-[100px] ${
                  !postID ? "bg-gray-500" : "bg-[#ED820E] hover:bg-[#FC6A03]"
                }`}
              >
                Search
              </button>

              {post && (
                <button
                  onClick={() => handleClearSearch()}
                  // disabled={!postID}
                  className={`rounded-lg h-10 p-2 text-white w-[100px] ${
                    !postID ? "bg-gray-500" : "bg-[#ED820E] hover:bg-[#FC6A03]"
                  }`}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {post && (
            <div className="px-3">
              <Post
                id={post?._id}
                name={post?.createdBy.name}
                department={post?.createdBy.department}
                section={post?.createdBy.section}
                profile_pic={post?.createdBy.profile_pic}
                body={post?.body}
                img={post?.img}
                creatorId={post?.createdBy._id}
                createdAt={post?.createdAt}
                postClicked={postClicked}
                handleDotClick={() => handleDotClick(post?._id)}
                onDeleteIconClick={() => handleDeleteIconClick()}
                onCommentClick={() => setCommentPost(post?._id)}
                commentClicked={commentPost}
                onShowCommentClick={() => handleShowCommentClick(post?._id)}
                commentShow={showPostComments}
                onCommentDeleteIconClick={(id) =>
                  handleCommentDeleteIconClick(id)
                }
                comments={getPostComments(post?._id)}
                onCommentAdd={(newComment) => handleCommentAdd(newComment)}
              />
            </div>
          )}
        </section>

        <section>
          <H1>Posts you have made</H1>

          {/* delete comment confirmation pop-up */}
          {commentDeleteClick && (
            <ConfirmationPopUp
              title="Delete this comment?"
              subTitle="This action cannot be undone."
              onAction={() => handleCommentDelete()}
              onClose={() => handleCommentDeleteIconClick()}
            />
          )}

          {/* delete post confirmation pop-up */}
          {deleteIconClicked && (
            <ConfirmationPopUp
              title="Delete this post?"
              subTitle="This action cannot be undone."
              onAction={() => handleDelete(postClicked)}
              onClose={() => handleDeleteIconClick()}
            />
          )}

          <div className="px-3 min-h-screen dark:bg-tb">
            {userPosts.length !== 0 ? (
              userPosts.map((post, index) => (
                <StaticPost
                  key={post._id}
                  id={post._id}
                  name={post.createdBy.name}
                  department={post.createdBy.department}
                  section={post.createdBy.section}
                  profile_pic={post.createdBy.profile_pic}
                  body={post.body}
                  img={post.img}
                  creatorId={post.createdBy._id}
                  createdAt={post.createdAt}
                  postClicked={postClicked}
                  handleDotClick={() => handleDotClick(post._id)}
                  onDeleteIconClick={() => handleDeleteIconClick()}
                  onShowCommentClick={() => handleShowCommentClick(post._id)}
                  commentShow={showPostComments}
                  onCommentDeleteIconClick={(id) =>
                    handleCommentDeleteIconClick(id)
                  }
                  comments={getPostComments(post._id)}
                />
              ))
            ) : (
              <div className="w-[200px] h-[200px] lg:w-[200px] lg:h-[200px] mx-auto">
                <EmptyContent
                  stroke="gray"
                  fill="gray"
                  width="100%"
                  height="100%"
                />
              </div>
            )}
          </div>
        </section>
      </SettingWrapper>
    </>
  );
};

export default AccountPosts;
