import avatarImg from "../assets/avatars/image-juliusomo.png";
import loadingImg from "../assets/loading.svg";

export default function EditResponses({
  register,
  errors,
  handleSubmit,
  handleEditReply,
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
    console.log(data);
  }

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmitEditResponse)}
          className="flex flex-col border border-white bg-white rounded-md w-[330px] p-4 gap-4 mt-2"
        >
          <textarea
            cols={30}
            rows={5}
            className={
              errors.reply_comment
                ? "border border-red-500 w-72 px-2 py-2 rounded-md text-left focus:outline-red-500"
                : "border border-slate-300 w-72 px-2 py-2 rounded-md text-left focus:outline-blue-950"
            }
            type="text"
            {...register("reply_comment", {
              required: true,
              min: 3,
            })}
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
              EDIT
            </button>
          </div>
          {/* {!editLoading ? (
            <div className="flex flex-row justify-between items-center">
              <div>
                <img src={avatarImg} alt="" className="w-8" />
              </div>
              <button
                type="submit"
                className="text-[15px] border border-transparent bg-blue-800 cursor-pointer text-white p-3 font-bold px-5 rounded-md hover:opacity-60 duration-300"
              >
                EDIT
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <div>
                <img src={avatarImg} alt="" className="w-8" />
              </div>
              <div className="flex justify-center items-center ">
                <img src={loadingImg} alt="" className="w-10 animate-spin" />
              </div>
            </div>
          )} */}
        </form>
      </div>
    </div>
  );
}
