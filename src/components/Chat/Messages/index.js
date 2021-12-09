import React from "react";
import PropTypes from "prop-types";
import { Empty, Spin, Modal } from "antd";
import classNames from "classnames";
import { Message } from "components";
import "./Messages.scss";

const Messages = ({
  onRemoveMessage,
  blockRef,
  isLoading,
  items,
  user,
  previewImage,
  blockHeight,
  setPreviewImage,
  isTyping,
  partner,
}) => {
  return (
    <div
      className="chat__dialog-messages"
      style={{ height: `calc(100% - ${blockHeight}px)` }}
    >
      <div
        ref={blockRef}
        className={classNames("messages", { "messages--loading": isLoading })}
      >
        {isLoading && !user ? (
          <Spin size="large" tip="Loading messages..." />
        ) : items && !isLoading ? (
          items.length > 0 ? (
            items.map((item) => (
              <Message
                key={item._id}
                {...item}
                isMe={user && user.id === item.user.id}
                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                setPreviewImage={setPreviewImage}
              />
            ))
          ) : (
            <Empty description="Write a message to start a dialogue" />
          )
        ) : (
          <Empty description="Open dialogue to start chatting" />
        )}
        <Modal
          visible={!!previewImage}
          onCancel={() => setPreviewImage(null)}
          footer={null}
        >
          <img src={previewImage} style={{ width: "100%" }} alt="Preview"></img>
        </Modal>
      </div>
    </div>
  );
};

Message.propTypes = {
  items: PropTypes.array,
};

export default Messages;
