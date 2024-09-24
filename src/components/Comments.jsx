import reply from "../assets/icon-reply.svg";
import { useEffect, useState } from "react";
import { deleteComment, getComments } from "../services/commentServices";
import loadingImg from "../assets/loading.svg";
import avatarImg from "../assets/avatars/image-juliusomo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteImg from "../assets/icon-delete.svg";
import editImg from "../assets/icon-edit.svg";
import { useForm } from "react-hook-form";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);
  const { register, errors, handleSubmit } = useForm();

  async function fetchComments() {
    const data = await getComments();

    console.log(data);
    setComments(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  async function eraseComment(id) {
    const del = await deleteComment(id);

    if (del.status === true) {
      toast(del.message);
      window.location.reload();
    } else {
      toast(del.message);
    }
  }

  function handleReplyClick(index) {
    setActiveReplyIndex(index === activeReplyIndex ? null : index);
  }

  function submitReply(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {loading && (
        <div className="flex justify-center items-center pt-10 mb-20 ">
          <img src={loadingImg} alt="" className="w-10 animate-spin" />
        </div>
      )}
      {!loading &&
        comments.map((comment, index) => (
          <div key={index}>
            <div className="flex flex-col justify-center items-center px-4 pt-5">
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
                      <img src={editImg} alt="" className="h-fit" />
                      <img
                        onClick={() => handleReplyClick(index)}
                        src={reply}
                        alt=""
                        className="h-fit"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {activeReplyIndex === index && (
                  <form
                    onSubmit={handleSubmit(submitReply)}
                    className="flex flex-col border border-white bg-white rounded-md w-[330px] p-4 gap-4 mt-2"
                  >
                    <textarea
                      cols={30}
                      rows={5}
                      className="border border-slate-300 rounded-md px-2 py-2 text-left focus:outline-none"
                      type="text"
                      {...register("reply_comment", {
                        required: true,
                      })}
                      placeholder="Reply comment..."
                    ></textarea>
                    {errors.reply_comment && (
                      <p className="text-red-500 font-semibold">
                        Reply is required!
                      </p>
                    )}
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <img src={avatarImg} alt="" className="w-8" />
                      </div>
                      <button
                        type="submit"
                        className="text-[15px] border border-transparent bg-blue-800 cursor-pointer text-white p-3 font-bold px-5 rounded-md hover:opacity-60 duration-300"
                      >
                        REPLY
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
