import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Comment = ({ comment, replies }) => {
  return (
    <>
      <div className="flex flex-row my-2">
        <Avatar
          size="default"
          icon={<UserOutlined />}
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "static",
          }}
        />

        <div className="flex flex-col ml-3">
          <div className="flex flex-row">
            <h1 className="mb-0 mr-2 font-semibold">{comment.username}</h1>
            <h1 className="mb-0 text-sg">{comment.createdAt}</h1>
          </div>
          <h1 className="mb-0">{comment.body}</h1>

          {/* render only if replies exist */}
          {replies.length > 0 && (
            <div>
              {replies.map((reply) => (
                // replies cannot have any nested comments, due to performance issues
                <Comment comment={reply} key={reply.id} replies={[]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
