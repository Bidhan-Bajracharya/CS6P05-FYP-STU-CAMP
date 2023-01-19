import React from "react";
import DefaultAvatar from "../../images/DefaultAvatar";
const ProfileAvatar = ({imageSrc}) => {
  return (
    <>
      <div className="relative rounded-full overflow-hidden border-2 border-red-500">
        <img
          src={require("../../images/user.png")}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        {/* <DefaultAvatar /> */}
      </div>
    </>
  );
};

export default ProfileAvatar;
