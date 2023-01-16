import React, { useState, useRef, useEffect } from "react";
import NavButtons from "../../components/Layout/NavButtons";
import Slider from "../../components/Slider";
import StARs from "../../components/stARs/StARs";
import InputBox from "../../components/content/InputBox";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../../components/content/Post";

import { useDispatch, useSelector } from "react-redux";
import { showInputBox } from "../../features/homeSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { hideInputBox } from "../../features/homeSlice";

import "../../styles/share.css";
import EmptyContent from "../../images/EmptyContent";
import ReportModal from "../../components/UI/ReportModal";

const Home = () => {
  const { shareIsShown } = useSelector((store) => store.home);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [body, setBody] = useState(""); // content of the post
  const [postClicked, setPostClicked] = useState(); // options for posts
  const [deletedPostId, setDeletedPostId] = useState(null);
  const [reportClicked, setReportClicked] = useState(false);

  const [reportBody, setReportBody] = useState(""); // reason for report
  const [reportInformation, setReportInformation] = useState({});

  const effectRun = useRef(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const handleDotClick = (_id) => {
    if (_id === postClicked) {
      // closing popover if it is clicked again
      setPostClicked(null);
    } else {
      // passing id to detect which post was clicked
      setPostClicked(_id);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/users/post");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get("/users/post", {
          signal: controller.signal,
        });
        isMounted && setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    // Check if useEffect has run the first time
    if (effectRun.current) {
      getPosts();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosPrivate.post("/post", JSON.stringify({ body }));
      setBody("");
      dispatch(hideInputBox());
      // window.location.reload();
      fetchData(); // fetches data again after posting
    } catch (error) {
      console.log(error);
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
    if (deletedPostId) {
      fetchData();
    }
  }, [deletedPostId]);

  const handleReportClick = (reportedUser, reportedPostId) => {
    setReportClicked((prevState) => !prevState);
    // creator of the post, id of the post that was clicked
    setReportInformation({ reportedUser, reportedPostId });
    setReportBody("");
  };

  const handleReportSubmit = async (event) => {
    event.preventDefault();

    try {
      const content = {
        reportedUser: reportInformation.reportedUser,
        reportedPostId: reportInformation.reportedPostId,
        reason: reportBody,
      };

      const response = await axiosPrivate.post(
        "/users/report",
        JSON.stringify(content)
      );

      console.log(response);
      setReportClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          {/* the [stream/people] div on the main body, during mobile mode*/}
          <NavButtons />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-auto">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs />

          {/* div for 'create post' and posts */}
          <div className="flex flex-col w-full ml-2 mr-6 min-h-screen lg:ml-3 lg:mr-[30px] sm:max-lg:w-auto sm:max-lg:ml-[22px] sm:max-lg:mr-[37px]">
            <div className="shadow flex flex-row items-center rounded-lg w-full h-16 border-[1px] mb-6 dark:border-[#FFA500]">
              <Avatar
                size={45}
                icon={<UserOutlined />}
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  position: "static",
                  marginRight: "20px",
                  marginLeft: "10px",
                  boxShadow: "0 0 0 2px #FFA500",
                }}
                className="cursor-pointer"
              />
              <p
                className="mb-0 cursor-pointer text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
                onClick={() => {
                  dispatch(showInputBox());
                }}
              >
                Share your thoughts, with your friends.
              </p>
            </div>
            {shareIsShown && (
              <InputBox
                handleSubmit={handleSubmit}
                body={body}
                setBody={(e) => setBody(e.target.value)}
                onClose={() => {
                  dispatch(hideInputBox());
                }}
              />
            )}

            {/* Report pop-up modal */}
            {reportClicked && (
              <ReportModal
                onClose={() => handleReportClick()}
                body={reportBody}
                setBody={(e) => setReportBody(e.target.value)}
                handleSubmit={handleReportSubmit}
              />
            )}

            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              {posts ? (
                posts.map((post, index) => (
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
                    handleDelete={() => handleDelete(post._id)}
                    handleReportClick={(reportedUser, reportedPostId) =>
                      handleReportClick(reportedUser, reportedPostId)
                    }
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
