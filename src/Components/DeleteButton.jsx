import Axios from "axios";
import React from "react";

export default function DeleteButton({ post, setPosts }) {
  const DeleteAction = () => {
    Axios.delete(`https://northwind.vercel.app/api/orders/${post.id}`).then(
      (response) => {
        Axios.get("https://northwind.vercel.app/api/orders").then(
          (response) => {
            setPosts(response.data);
          }
        );
      }
    );
  };
  return <button onClick={DeleteAction}>Delete</button>;
}
