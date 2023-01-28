import React, { useState, useEffect } from "react";
import NavButtons from "../../components/Layout/NavButtons";
import Slider from "../../components/Slider";
import StARs from "../../components/stARs/StARs";
import InputBox from "../../components/content/InputBox";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../../components/content/Post";

import { useDispatch, useSelector } from "react-redux";
import { showInputBox } from "../../features/homeSlice";
import { hideInputBox } from "../../features/homeSlice";
import {
  setNotifications,
  setUnreadNotifications,
} from "../../features/notificationSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../../styles/share.css";
import EmptyContent from "../../images/EmptyContent";
import ReportModal from "../../components/UI/ReportModal";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";
import words from "../../data/words";

const Home = () => {
  const { shareIsShown } = useSelector((store) => store.home);
  const { currentIndex } = useSelector((store) => store.slider);
  const { userId, profile_pic } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]); // list of posts
  const [body, setBody] = useState(""); // content of the post
  const [postClicked, setPostClicked] = useState(); // options for posts
  const [deletedPostId, setDeletedPostId] = useState(null);
  const [vulgarWords] = useState(words); // array of vulgar words
  const [showVulgarPopUp, setShowVulgarPopUp] = useState(false); // quick warning pop-up

  const [deleteIconClicked, setDeleteIconClicked] = useState(false); // deletion confirmation pop-up
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // path for image folder

  const defaultReasonState = {
    inappropriateContent: false,
    vulgarWords: false,
    spam: false,
    harassment: false,
  };
  const [reasons, setReasons] = useState(defaultReasonState); // reasons for report
  const [checkedCounter, setCheckedCounter] = useState(0); // counter for checked boxes
  const [reportInformation, setReportInformation] = useState({}); // information on reported & reporting user
  const [reportClicked, setReportClicked] = useState(false); // report modal pop-up

  const [currentSection, setCurrentSection] = useState("");
  const [file, setFile] = useState(); // for image

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  // fetching notifications
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notification");
        dispatch(setNotifications(response.data.notifications));

        const getUnReadNotifications = () => {
          return response.data.notifications
            .slice(0, 10) // only top 10 notifications
            .filter((notification) => !notification.readBy.includes(userId)) // getting unread/unseen notifications
            .map((notification) => notification._id); // '_id' of those unseen notifications
        };

        const unread = getUnReadNotifications();
        dispatch(setUnreadNotifications(unread));
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

  const handleSectionChange = () => {
    if (currentIndex === 0) {
      setCurrentSection("Common");
    } else if (currentIndex === 1) {
      setCurrentSection("Computing");
    } else if (currentIndex === 2) {
      setCurrentSection("Networking");
    } else if (currentIndex === 3) {
      setCurrentSection("Multimedia");
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

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/users/post");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showVulgarPopUp) {
      const timeoutId = setTimeout(() => {
        setShowVulgarPopUp(false);
      }, 2000); // hide the component after 2 seconds

      // clearing the timeout after component unmounting
      return () => clearTimeout(timeoutId);
    }
  }, [showVulgarPopUp]);

  useEffect(() => {
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get("/users/post", {
          signal: controller.signal,
        });
        setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();

    return () => {
      controller.abort();
    };
  }, []);

  // post submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      body: body,
    };

    // if file exists in the post
    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name; // creating unique file name
      formData.append("name", fileName);
      formData.append("file", file);
      newPost.img = fileName;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/upload",
          formData
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const lowerCaseParagraph = body.toLowerCase();

      // check for vulgar words in body before submission
      const result = vulgarWords.some((word) =>
        lowerCaseParagraph.includes(word)
      );

      if (result) {
        setShowVulgarPopUp(true);
        return;
        // throw new Error("bad words detected");
      }

      // if safe then post
      await axiosPrivate.post("/post", JSON.stringify(newPost));

      setBody("");
      setFile(null);
      dispatch(hideInputBox());
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

    // resetting the reason's states
    setReasons(defaultReasonState);
    setCheckedCounter(0);
  };

  const handleReportSubmit = async (reason) => {
    try {
      const content = {
        reportedUser: reportInformation.reportedUser,
        reportedPostId: reportInformation.reportedPostId,
        reason: reason,
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

  useEffect(() => {
    handleSectionChange();
  }, [currentIndex]);

  const displayPosts = posts.filter((post) =>
    currentSection === "Common"
      ? true
      : post.createdBy.department === currentSection
  );

  return (
    <>
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          {/* the [stream/people] div on the main body, during mobile mode*/}
          <NavButtons userRoute="/" />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-auto">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs currentSection={currentSection} />

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
                src={
                  profile_pic !== "default" && (
                    <img alt="user" src={PF + "/" + profile_pic} />
                  )
                }
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

            {/* Write a post pop-up modal */}
            {shareIsShown && (
              <InputBox
                handleSubmit={handleSubmit}
                body={body}
                setBody={(e) => setBody(e.target.value)}
                onClose={() => {
                  dispatch(hideInputBox());
                }}
                imgFile={file}
                onImageIconClick={(file) => setFile(file)}
                onImageRemove={() => setFile(null)}
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

            {/* Vulgar word detection pop up */}
            {showVulgarPopUp && (
              <QuickPopUp
                icon="warning"
                title="Vulgar words detected"
                subTitle="This content cannot be shared."
              />
            )}

            {/* Report pop-up modal */}
            {reportClicked && (
              <ReportModal
                onClose={() => handleReportClick()}
                handleSubmit={handleReportSubmit}
                reasons={reasons}
                onReasonChange={(reason) => setReasons(reason)}
                checkedCounter={checkedCounter}
                onCounterChange={(counter) => setCheckedCounter(counter)}
              />
            )}

            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              {displayPosts.length !== 0 ? (
                displayPosts.map((post, index) => (
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
                    handleReportClick={(reportedUser, reportedPostId) =>
                      handleReportClick(reportedUser, reportedPostId)
                    }
                    onDeleteIconClick={() => handleDeleteIconClick()}
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
