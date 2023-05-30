import React, { useEffect, useState } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import StaticPost from "../../components/content/StaticPost";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";
import { useSelector, useDispatch } from "react-redux";
import {
  handleDeleteIconClick,
  setComments,
  handleCommentDeleteIconClick,
} from "../../features/postSlice";

const DeletePosts = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [postID, setPostID] = useState(""); // postID search field
  const [post, setPost] = useState(); // post detail
  const [errMsg, setErrMsg] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // quick pop-up message

  const {
    deleteIconClicked,
    comments,
    commentClicked,
    commentDeleteClick,
  } = useSelector((store) => store.post);

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

  const deletePost = async () => {
    try {
      await axiosPrivate.delete(`/post/${postID}`);
      setPostID("");
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

  // handle deletion of comments
  const handleCommentDelete = async () => {
    try {
      await axiosPrivate.delete(`/comment/${commentClicked}`);
      dispatch(
        setComments(
          comments.filter((comment) => comment._id !== commentClicked)
        )
      ); // redux
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SettingWrapper>
        <H1>Find and Delete Posts</H1>

        <section className="flex flex-col p-3 mb-5">
          <h1 className="text-xl mb-1 font-semibold dark:text-white">
            Search for a post
          </h1>

          {errMsg && <h1 className="text-red-600 mb-1">{errMsg}</h1>}

          <input
            placeholder="Post ID"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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

        {/* Delete post confirmation pop-up */}
        {deleteIconClicked && (
          <ConfirmationPopUp
            title="Delete this post?"
            subTitle="This action cannot be undone."
            onAction={() => deletePost()}
            onClose={() => dispatch(handleDeleteIconClick())} // redux
          />
        )}

        {/* delete comment confirmation pop-up */}
        {commentDeleteClick && (
          <ConfirmationPopUp
            title="Delete this comment?"
            subTitle="This action cannot be undone."
            onAction={() => handleCommentDelete()}
            onClose={() => dispatch(handleCommentDeleteIconClick())} // redux
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
              <StaticPost
                key={post._id}
                id={post._id}
                name={post.createdBy.name}
                department={post.createdBy.department}
                section={post.createdBy.section}
                year={post.createdBy.year}
                profile_pic={post.createdBy.profile_pic}
                body={post.body}
                img={post.img}
                creatorId={post.createdBy._id}
                createdAt={post.createdAt}
              />
            </div>
          </section>
        )}
      </SettingWrapper>
    </>
  );
};

export default DeletePosts;
