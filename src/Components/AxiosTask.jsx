import React, { useState, useEffect } from "react";
import Axios from "axios";
import DeleteButton from "./DeleteButton";
import ModifyButton from "./ModifyButton";
import Modal from "./Modal";

export default function AxiosTask() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState("");
  useEffect(() => {
    Axios.get("https://northwind.vercel.app/api/orders")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (newPost) => {
    postToEdit === null
      ? setPosts([...posts, newPost])
      : setPosts(
          posts.map((currPost, idx) => {
            if (idx !== postToEdit) return currPost;

            return newPost;
          })
        );
  };

  return (
    <div>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setPostToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={postToEdit !== null && posts[postToEdit]}
          postToEdit={postToEdit}
          setPostToEdit={setPostToEdit}
        />
      )}
      <table>
        <thead>
          <tr>
            <td>CustomerId</td>
            <td>ShipName</td>
            <td>EmployeeId</td>
            <td>ShipVia</td>
            <td>UnitPrice</td>
            <td>Modify</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.customerId}</td>
              <td>{post.shipName}</td>
              <td>{post.employeeId}</td>
              <td>{post.shipVia}</td>
              <td>{post.details[0].unitPrice}</td>
              <td>
                {/* <ModifyButton
                  post={post}
                  setPosts={setPosts}
                  setModalOpen={setModalOpen}
                  postToEdit={postToEdit}
                  setPostToEdit={setPostToEdit}
                /> */}
              </td>
              <td>
                <DeleteButton post={post} setPosts={setPosts} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
