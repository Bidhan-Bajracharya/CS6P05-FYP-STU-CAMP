import React, { useEffect, useState } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Post from "../../components/content/Post";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";

const DeletePosts = () => {
  const axiosPrivate = useAxiosPrivate();
  const [postID, setPostID] = useState(""); // postID search field
  const [post, setPost] = useState(); // post detail
  const [errMsg, setErrMsg] = useState("");
  const [deleteIconClicked, setDeleteIconClicked] = useState(false); // confirmation pop-up
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // quick pop-up message

  const [comments, setComments] = useState([]);
  const [commentPost, setCommentPost] = useState(); // tracking 'Add comment' clicked for posts
  const [showPostComments, setShowPostComments] = useState(); // tracking 'show comment' clicked for posts
  const [commentDeleteClick, setCommentDeleteClick] = useState(false); // delete icon clicked for a comment
  const [commentClicked, setCommentClicked] = useState(""); // tracking 'id' of the comment that was selected for deletion

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

  // open/close of deletion pop-over
  const handleDeleteIconClick = () => {
    setDeleteIconClicked((prevState) => !prevState);
  };

  const deletePost = async () => {
    try {
      await axiosPrivate.delete(`/post/${postID}`);
      setPostID("");
      setDeleteIconClicked(false);
      setPost();
      setShowSuccessMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  // reset error message after change made in ID field
  useEffect(() => {
    setErrMsg("");
  }, [postID]);

  // show confirmation message
  useEffect(() => {
    if (showSuccessMessage) {
      const timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); // hide the component after 2 seconds

      // clearing the timeout after component unmounting
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessMessage]);

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

  return (
    <>
      <SettingWrapper>
        <H1>Find and Delete Posts</H1>

        <section className="flex flex-col p-3 mb-5">
          <h1 className="text-xl font-semibold dark:text-white">
            Search for a post
          </h1>

          {errMsg && <h1 className="text-red-600 mb-1">{errMsg}</h1>}

          <input
            placeholder="Post ID"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
            value={postID}
            onChange={(e) => setPostID(e.target.value)}
            required
          />
          <button
            onClick={() => getPost()}
            disabled={!postID}
            className={`rounded-lg h-12 p-2 text-white w-32 ${
              !postID ? "bg-gray-500" : "bg-[#ED820E] hover:bg-[#FC6A03]"
            }`}
          >
            Search
          </button>
        </section>

        {/* Delete confirmation pop-up */}
        {deleteIconClicked && (
          <ConfirmationPopUp
            title="Delete this post?"
            subTitle="This action cannot be undone."
            onAction={() => deletePost()}
            onClose={() => handleDeleteIconClick()}
          />
        )}

        {/* show success message pop-up */}
        {showSuccessMessage && (
          <QuickPopUp
            icon="success"
            title="Deletion successful"
            subTitle="The post has been removed."
          />
        )}

        {post && (
          <section>
            <H1>The Post</H1>
            <div className="px-2 lg:p-0">
              <Post
                id={post?._id}
                name={post?.createdBy?.name}
                department={post?.createdBy?.department}
                section={post?.createdBy?.section}
                profile_pic={post?.createdBy?.profile_pic}
                body={post?.body}
                img={post?.img}
                creatorId={post?.createdBy?._id}
                createdAt={post?.createdAt}
                handleDotClick={() => {}} // cannot interact with the dots
                onCommentClick={() => setCommentPost(post._id)}
                commentClicked={commentPost}
                onShowCommentClick={() => handleShowCommentClick(post._id)}
                commentShow={showPostComments}
                onCommentDeleteIconClick={(id) =>
                  handleCommentDeleteIconClick(id)
                }
                comments={getPostComments(post._id)}
                onCommentAdd={(newComment) => handleCommentAdd(newComment)}
              />
            </div>

            <button
              className={`rounded-lg h-12 p-2 text-white w-32 bg-[#ED820E] hover:bg-[#FC6A03] mb-5 ml-2 lg:ml-0`}
              onClick={() => handleDeleteIconClick()}
            >
              Delete
            </button>
          </section>
        )}
      </SettingWrapper>
    </>
  );
};

export default DeletePosts;
