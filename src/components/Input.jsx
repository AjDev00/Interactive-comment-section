import avatar from "../assets/avatars/image-juliusomo.png";
import "react-toastify/dist/ReactToastify.css";
import { useFieldArray, useForm } from "react-hook-form";
import { insertComments } from "../services/commentServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useState } from "react";
import Comments from "./Comments";
import loadingImg from "../assets/loading.svg";

export default function Input() {
  const history = useHistory();
  const [loading, setLoading] = useState(null);
  const [commentLoading, setCommentLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);
  const [editResponseIndex, setEditResponseIndex] = useState(null);
  const defaultComment = {
    user_comment: "",
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: defaultComment });

  function errMsg(error) {
    if (error?.type === "required") {
      return "This field is required!";
    } else if (error?.type === "min") {
      return "Min is 3 characters!";
    } else {
      return "Error!";
    }
  }

  async function onSubmit(data) {
    setLoading(true);

    const comment = await insertComments(data);

    console.log(comment);
    setLoading(false);

    if (comment.status === true) {
      history.push("/");
      window.location.reload();
    } else {
      toast("Min is 3 characters");
    }
  }

  return (
    <div>
      <div>
        <Comments
          register={register}
          errors={errors}
          reset={reset}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          handleSubmit={handleSubmit}
          setCommentLoading={setCommentLoading}
          commentLoading={commentLoading}
          activeReplyIndex={activeReplyIndex}
          setActiveReplyIndex={setActiveReplyIndex}
          setEditResponseIndex={setEditResponseIndex}
          editResponseIndex={editResponseIndex}
        />
      </div>
      {editIndex === null &&
        activeReplyIndex === null &&
        editResponseIndex === null &&
        !commentLoading && (
          <div className="flex justify-center items-center mt-14">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 pt-4 border border-white px-4 rounded-lg bg-white mb-4 py-2"
            >
              <div className="flex flex-col gap-2">
                <textarea
                  cols={30}
                  rows={5}
                  className={
                    errors.user_comment
                      ? "border border-red-500 w-72 px-2 py-2 rounded-md text-left focus:outline-red-500"
                      : "border border-slate-300 w-72 px-2 py-2 rounded-md text-left focus:outline-blue-950"
                  }
                  type="text"
                  {...register("user_comment", {
                    required: true,
                    min: 3,
                  })}
                  placeholder="Add a comment..."
                ></textarea>
                {errors.user_comment && (
                  <span className="text-red-500 font-semibold">
                    {errMsg(errors.user_comment)}
                  </span>
                )}
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <img src={avatar} alt="" className="w-8" />
                </div>
                {!loading && (
                  <div className="text-[15px] border border-transparent bg-blue-800 cursor-pointer text-white p-3 font-bold px-5 rounded-md hover:opacity-60 duration-300">
                    <button type="submit">SEND</button>
                  </div>
                )}
                {loading && (
                  <div className="flex justify-center items-center ">
                    <img
                      src={loadingImg}
                      alt=""
                      className="w-10 animate-spin"
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
    </div>
  );
}
