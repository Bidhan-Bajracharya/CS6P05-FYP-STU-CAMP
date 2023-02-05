import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Post from "../../components/content/Post";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";

const StudentHistory = () => {
  const [uniID, setUniID] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [posts, setPosts] = useState([]); // student's posts
  const axiosPrivate = useAxiosPrivate();

  const [postClicked, setPostClicked] = useState(); // options for posts
  const [deleteIconClicked, setDeleteIconClicked] = useState(false); // deletion confirmation pop-up
  const [deletedPostId, setDeletedPostId] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentPost, setCommentPost] = useState(); // tracking 'Add comment' clicked for posts
  const [showPostComments, setShowPostComments] = useState(); // tracking 'show comment' clicked for posts
  const [commentDeleteClick, setCommentDeleteClick] = useState(false); // delete icon clicked for a comment
  const [commentClicked, setCommentClicked] = useState(""); // tracking 'id' of the comment that was selected for deletion

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
            onClose={() => handleCommentDeleteIconClick()}
          />
        )}

        {/* delete confirmation pop-up */}
        {deleteIconClicked && (
          <ConfirmationPopUp
            title="Delete this post?"
            subTitle="This action cannot be undone."
            onAction={() => handleDelete(postClicked)}
            onClose={() => handleDeleteIconClick()}
          />
        )}

        {posts.length !== 0 && !errMsg && (
          <section>
            <H1>User's Posts</H1>

            {posts.map((post) => (
              <Post
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
            ))}
          </section>
        )}
      </SettingWrapper>
    </>
  );
};

export default StudentHistory;
