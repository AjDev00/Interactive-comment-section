import reply from "../assets/icon-reply.svg";
import { useEffect, useState } from "react";
import {
  deleteComment,
  editComment,
  getComments,
  singleComment,
} from "../services/commentServices";
import loadingImg from "../assets/loading.svg";
import avatarImg from "../assets/avatars/image-juliusomo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteImg from "../assets/icon-delete.svg";
import editImg from "../assets/icon-edit.svg";
import EditComment from "./EditComments";
import ReplyComment from "./ReplyComment";
import Responses from "./Responses";

export default function Comments({
  register,
  errors,
  reset,
  editIndex,
  setEditIndex,
  handleSubmit,
  commentLoading,
  setCommentLoading,
  activeReplyIndex,
  setActiveReplyIndex,
  setEditResponseIndex,
  editResponseIndex,
}) {
  const [comments, setComments] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  const [commentId, setCommentId] = useState("");

  //fetch comments.
  async function fetchComments() {
    const data = await getComments();

    console.log(data);
    setComments(data.data);
    setCommentLoading(false);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  //erase comment.
  async function eraseComment(id) {
    const del = await deleteComment(id);

    if (del.status === true) {
      toast(del.message);
      window.location.reload();
    } else {
      toast(del.message);
    }
  }

  //update comment.
  async function handleEditComment(data, id) {
    setEditLoading(true);

    const edit = await editComment(data, id);

    if (edit.status === true) {
      toast("Updated Successfully!");
      setEditIndex(null);
      window.location.reload();
      setEditLoading(false);
    }
  }

  //get previous comment data.
  async function getSingleCommentDetails(id) {
    const data = await singleComment(id);

    const getSingleDetails = data.data;
    console.log(getSingleDetails);
    reset(getSingleDetails);
  }

  function handleEdit(index, id) {
    handleEditClick(index);
    getSingleCommentDetails(id);
  }

  function handleEditClick(index) {
    setEditIndex(index === editIndex ? null : index);
  }

  function handleReplyClick(index) {
    setActiveReplyIndex(index === activeReplyIndex ? null : index);
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {commentLoading && (
        <div className="flex justify-center items-center pt-64 mb-20 ">
          <img src={loadingImg} alt="" className="w-10 animate-spin" />
        </div>
      )}
      {!commentLoading &&
        comments.map((comment, index) => (
          <div key={index}>
            <div className="flex flex-col justify-center items-center px-4 pt-5">
              {editIndex !== index && (
                <div className="flex flex-col pt-4 border border-white px-4 rounded-lg bg-white py-2 w-80">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-3 items-center">
                      <div>
                        <img src={avatarImg} alt="" className="w-8" />
                      </div>
                      <div className="text-blue-950 font-bold text-[17px]">
                        amyrobson
                      </div>
                      <div className="text-blue-950 font-semibold opacity-90">
                        1 month ago
                      </div>
                    </div>
                    <div className="text-blue-950 font-semibold opacity-90">
                      {comment.user_comment}
                      {/* {comment.replies.map((reply) => (
                        <div key={reply.id}>{reply.reply_comment}</div>
                      ))} */}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row border border-transparent bg-blue-500 bg-opacity-20 p-2 px-2 gap-3 py-1 rounded-md">
                        <div
                          // onClick={comment.likes + 1}
                          className="text-blue-950 font-bold text-[17px] cursor-pointer"
                        >
                          +
                        </div>
                        <div className="text-blue-950 font-bold text-[17px]">
                          0
                        </div>
                        <div className="text-blue-950 font-bold text-[17px] cursor-pointer">
                          -
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-4 cursor-pointer">
                        <img
                          onClick={() => eraseComment(comment.id)}
                          src={deleteImg}
                          alt=""
                          className="h-fit"
                        />
                        <img
                          onClick={() => handleEdit(index, comment.id)}
                          src={editImg}
                          alt=""
                          className="h-fit"
                        />
                        <img
                          onClick={() =>
                            handleReplyClick(index) - setCommentId(comment.id)
                          }
                          src={reply}
                          alt=""
                          className="h-fit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {editIndex === index && (
                <div>
                  <EditComment
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleEditComment={handleEditComment}
                    editLoading={editLoading}
                  />
                </div>
              )}
              <div>
                {activeReplyIndex === index && (
                  <ReplyComment
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    commentId={commentId}
                  />
                )}
              </div>
              {comments && (
                <div className="mr-3 mt-3">
                  <Responses
                    comment={comment}
                    register={register}
                    errors={errors}
                    reset={reset}
                    handleSubmit={handleSubmit}
                    setEditResponseIndex={setEditResponseIndex}
                    editResponseIndex={editResponseIndex}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
