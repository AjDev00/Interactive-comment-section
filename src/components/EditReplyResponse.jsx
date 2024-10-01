import avatarImg from "../assets/avatars/image-juliusomo.png";
import loadingImg from "../assets/loading.svg";

export default function EditReplyResponse({
  register,
  errors,
  handleSubmit,
  handleEditReply,
  loading,
}) {
  //error handling.
  function errMsg(error) {
    if (error?.type === "required") {
      return "This field is required!";
    } else if (error?.type === "min") {
      return "Min is 3 characters!";
    } else {
      return "Error!";
    }
  }

  function onSubmitEditResponse(data) {
    handleEditReply(data, data.id);
  }

  return (
    <div>
      <div className="ml-4">
        <form
          onSubmit={handleSubmit(onSubmitEditResponse)}
          className="flex flex-col gap-4 pt-4 border border-white px-4 rounded-lg bg-white py-2 w-full mb-3"
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
              min: 3,
            })}
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
                EDIT
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
