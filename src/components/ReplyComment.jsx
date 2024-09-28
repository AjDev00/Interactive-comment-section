import { toast } from "react-toastify";
import avatarImg from "../assets/avatars/image-juliusomo.png";
import { insertReply } from "../services/commentServices";

export default function ReplyComment({
  register,
  errors,
  handleSubmit,
  commentId,
}) {
  //error handling.
  function errMsg(error) {
    if (error?.type === "required") {
      return "This field is required";
    } else if (error?.type === "min") {
      return "Min is 3 characters";
    } else {
      return "Error!";
    }
  }

  //insert reply.
  async function submitReply(data) {
    const finalData = {
      comment_id: commentId,
      reply_comment: data.reply_comment,
    };

    const reply = await insertReply(finalData);
    if (reply.status === true) {
      toast(reply.message);
      window.location.reload();
    } else {
      toast("Unable to reply!");
    }

    console.log(data.reply_comment);
    console.log(commentId);
  }

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(submitReply)}
          className="flex flex-col border border-white bg-white rounded-md w-[330px] p-4 gap-4 mt-2"
        >
          <textarea
            cols={30}
            rows={5}
            className={
              errors.user_comment
                ? "border border-red-500 w-72 px-2 py-2 rounded-md text-left focus:outline-red-500"
                : "border border-slate-300 w-72 px-2 py-2 rounded-md text-left focus:outline-blue-950"
            }
            type="text"
            {...register("reply_comment", {
              required: true,
            })}
            placeholder="Type a reply..."
          ></textarea>
          {errors.reply_comment && (
            <span className="text-red-500 font-semibold">
              {errMsg(errors.reply_comment)}
            </span>
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
      </div>
    </div>
  );
}
