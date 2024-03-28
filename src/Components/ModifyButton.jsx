import React from "react";

export default function ModifyButton({
  post,
  setPost,
  setModalOpen,
  postToEdit,
  setPostToEdit,
}) {
  function startModal(isDisplayed, post) {
    setPostToEdit(post);
    setModalOpen(true);
  }
  return (
    <button onClick={() => startModal(true, post)} className="btn">
      Modify
    </button>
  );
}
