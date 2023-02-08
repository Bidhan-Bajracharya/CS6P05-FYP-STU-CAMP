import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import StaticPost from "../../components/content/StaticPost";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import { useSelector, useDispatch } from "react-redux";
import {
  handleDeleteIconClick,
  setComments,
  handleCommentDeleteIconClick,
} from "../../features/postSlice";

const StudentHistory = () => {
  const dispatch = useDispatch();
  const [uniID, setUniID] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  
  const {
    postClicked,
    deleteIconClicked,
    comments,
    commentClicked,
    commentDeleteClick,
  } = useSelector((store) => store.post);
  const [posts, setPosts] = useState([]); // student's posts
  const [deletedPostId, setDeletedPostId] = useState(null);

  // clear error on ID change
  useEffect(() => {
    setErrMsg("");
  }, [uniID]);

  const getHistory = async () => {
    try {
      const response = await axiosPrivate.get(`/admin/user-history/${uniID}`);
      setPosts(response.data.posts);
    } catch (error) {
      setPosts([]);
      setErrMsg(error.response.data.msg);
    }
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
        const response = await axiosPrivate.get(`/admin/user-history/${uniID}`);
        setPosts(response.data.posts);
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
        dispatch(setComments(response.data.comments));
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
        <H1>Student's History</H1>

        <section className="flex flex-col p-3 mb-5">
          <h1 className="text-xl mb-1 font-semibold dark:text-white">
            Search for a student
          </h1>

          {errMsg && <h1 className="text-red-600 mb-1">{errMsg}</h1>}

          <input
            placeholder="University ID"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
            value={uniID}
            onChange={(e) => setUniID(e.target.value)}
            required
          />
          <button
            onClick={() => getHistory()}
            disabled={!uniID}
            className={`rounded-lg h-12 p-2 text-white w-32 ${
              !uniID ? "bg-gray-500" : "bg-[#ED820E] hover:bg-[#FC6A03]"
            }`}
          >
            Search
          </button>
        </section>

        {/* delete comment confirmation pop-up */}
        {commentDeleteClick && (
          <ConfirmationPopUp
            title="Delete this comment?"
            subTitle="This action cannot be undone."
            onAction={() => handleCommentDelete()}
            onClose={() => dispatch(handleCommentDeleteIconClick())} // redux
          />
        )}

        {/* delete confirmation pop-up */}
        {deleteIconClicked && (
          <ConfirmationPopUp
            title="Delete this post?"
            subTitle="This action cannot be undone."
            onAction={() => handleDelete(postClicked)}
            onClose={() => dispatch(handleDeleteIconClick())} // redux
          />
        )}

        {posts.length !== 0 && !errMsg && (
          <section>
            <H1>User's Posts</H1>

            {posts.map((post) => (
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
              />
            ))}
          </section>
        )}
      </SettingWrapper>
    </>
  );
};

export default StudentHistory;
