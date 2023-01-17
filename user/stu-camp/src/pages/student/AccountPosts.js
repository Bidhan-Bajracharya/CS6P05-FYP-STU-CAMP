import React, { useEffect, useState } from "react";
import H1 from "../../components/UI/H1";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../../components/content/Post";
import SettingWrapper from "../../components/UI/SettingWrapper";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmptyContent from "../../images/EmptyContent";

const AccountPosts = (props) => {
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

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await axiosPrivate("/post");
        setUserPosts(response.data.posts);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserPosts();
  }, []);

  return (
    <>
      <SettingWrapper>
        <div className="flex flex-row items-center mx-3 mb-5 bg-[#FA8128] rounded-lg h-fit p-2 lg:w-[50%]">
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
          />

          <div className="flex flex-col ml-6">
            <h1 className="text-white font-medium">Name: {name}</h1>
            <h1 className="text-white font-medium">Department: {department}</h1>
            <h1 className="text-white font-medium">University ID: {uni_id}</h1>
            <h1 className="text-white font-medium">College Mail: {year}</h1>
          </div>
        </div>
        <H1>Posts you have made</H1>

        <div className="px-3 min-h-screen dark:bg-tb">
          {userPosts.length !== 0 ? (
            userPosts.map((post, index) => (
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
                // postClicked={postClicked}
                // handleDotClick={() => handleDotClick(post._id)}
                // handleDelete={() => handleDelete(post._id)}
                // handleReportClick={(reportedUser, reportedPostId) =>
                //   handleReportClick(reportedUser, reportedPostId)
                // }
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
      </SettingWrapper>
    </>
  );
};

export default AccountPosts;
