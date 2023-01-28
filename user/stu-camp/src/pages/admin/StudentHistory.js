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
        const response = await axiosPrivate.get("/users/post");
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    if (deletedPostId) {
      fetchData();
    }
  }, [deletedPostId]);

  return (
    <>
      <SettingWrapper>
        <H1>Student's History</H1>

        <section className="flex flex-col p-3 mb-5">
          <h1 className="text-xl font-semibold dark:text-white">
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
              />
            ))}
          </section>
        )}
      </SettingWrapper>
    </>
  );
};

export default StudentHistory;
