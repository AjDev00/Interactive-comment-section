import { toast } from "react-toastify";
import avatarImg from "../assets/avatars/image-juliusomo.png";
import { insertResponseReply } from "../services/commentServices";
import loadingImg from "../assets/loading.svg";
import { useState } from "react";

export default function ReplyResponses({
  register,
  errors,
  handleSubmit,
  replyId,
  commentId,
}) {
  const [loading, setLoading] = useState(null);
  //error handling.
  function errMsg(error) {
    if (error?.type === "required") {
      return "This field is required!";
    } else if (error?.type === "min") {
      return "Min is 3 characters";
    } else {
      return "Error!";
    }
  }

  //insert response reply.
  async function submitReplyResponses(data) {
    setLoading(true);

    const finalData = {
      reply_id: replyId,
      comment_id: commentId,
      reply_response: data.reply_response,
    };

    const rep = await insertResponseReply(finalData);
    if (rep.status === true) {
      toast(rep.message);
      setLoading(false);
      window.location.reload();
    } else {
      toast("Unsuccessfull!");
      setLoading(false);
    }
  }
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(submitReplyResponses)}
          className="flex flex-col border border-white bg-white rounded-md w-[330px] p-4 gap-4 mt-2"
        >
          <textarea
            cols={30}
            rows={5}
            className={
              errors.reply_response
                ? "border border-red-500 w-72 px-2 py-2 rounded-md text-left focus:outline-red-500"
                : "border border-slate-300 w-72 px-2 py-2 rounded-md text-left focus:outline-blue-950"
            }
            type="text"
            {...register("reply_response", {
              required: true,
            })}
            placeholder="Type a reply..."
          ></textarea>
          {errors.reply_response && (
            <span className="text-red-500 font-semibold">
              {errMsg(errors.reply_response)}
            </span>
          )}
          <div className="flex flex-row justify-between items-center">
            <div>
              <img src={avatarImg} alt="" className="w-8" />
            </div>
            {!loading && (
              <button
                type="submit"
                className="text-[15px] border border-transparent bg-blue-800 cursor-pointer text-white p-3 font-bold px-5 rounded-md hover:opacity-60 duration-300"
              >
                REPLY
              </button>
            )}
            {loading && (
              <div className="flex justify-center items-center ">
                <img src={loadingImg} alt="" className="w-10 animate-spin" />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
