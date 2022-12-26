import React from "react";
import { Modal } from "antd";

const UpdateModal = ({ open, onCancel, confirmLoading }) => {
  return (
    <>
      <Modal
        title="Student Info"
        open={open}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label>University ID</label>
            <input className="border-2 border-[#ED820E] rounded-md" />
          </div>
          <div className="flex flex-col">
            <label>Full Name</label>
            <input className="border-2 border-[#ED820E] rounded-md" />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input className="border-2 border-[#ED820E] rounded-md" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateModal;
