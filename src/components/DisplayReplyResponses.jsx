import { toast } from "react-toastify";
import rasmeron from "../assets/avatars/image-ramsesmiron.png";
import deleteImg from "../assets/icon-delete.svg";
import editImg from "../assets/icon-edit.svg";
import {
  deleteResponse,
  editResponses,
  singleResponse,
} from "../services/commentServices";
import { useState } from "react";
import EditReplyResponse from "./EditReplyResponse";

export default function DisplayReplyResponses({
  comment,
  register,
  errors,
  handleSubmit,
  reset,
  setResponseIndex,
  responseIndex,
}) {
  const [loading, setLoading] = useState(false);
  //delete a reply.
  async function handleDeleteReply($id) {
    const data = await deleteResponse($id);

    if (data.status === true) {
      toast("Deleted!");
      window.location.reload();
    } else {
      toast("Unable to delete");
    }
  }

  //update reply.
  async function handleEditReply(data, id) {
    setLoading(true);

    const edit = await editResponses(data, id);

    if (edit.status === true) {
      toast("Updated Successfully!");
      window.location.reload();
      setLoading(false);
    } else {
      toast("Unsuccessfull!");
    }
  }

  //retain reply details to be updated.
  async function getSingleReplyDetails($id) {
    const data = await singleResponse($id);

    const singleRep = data.data;
    console.log(singleRep);
    reset(singleRep);
  }

  function handleEdit(index, id) {
    handleEditClick(index);
    getSingleReplyDetails(id);
  }

  function handleEditClick(index) {
    setResponseIndex(index === responseIndex ? null : index);
    console.log(index);
    console.log(responseIndex);
  }

  return (
    <div>
      {comment &&
        comment.reply_responses.map((reply, index) => (
          <div key={index}>
            {/* <div className="flex flex-col gap-4 justify-center items-center px-0 border-l-2 border-slate-300"> */}
            {responseIndex !== reply.id && (
              <div className="flex flex-col pt-4 border border-white px-4 rounded-lg bg-white py-2 w-full ml-7 mb-3">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <div>
                      <img src={rasmeron} alt="" className="w-8" />
                    </div>
                    <div className="text-blue-950 font-bold text-[17px]">
                      tammy
                    </div>
                    <div className="text-blue-950 font-semibold opacity-90">
                      1 week ago
                    </div>
                  </div>
                  <div className="text-blue-950 font-semibold opacity-90">
                    <span className="text-blue-800 font-bold opacity-100 mr-2">
                      @ramsesmiron
                    </span>
                    {reply.reply_response}
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row border border-transparent bg-blue-500 bg-opacity-20 p-2 px-2 gap-3 py-1 rounded-md">
                      <div className="text-blue-950 font-bold text-[17px] cursor-pointer">
                        +
                      </div>
                      <div className="text-blue-950 font-bold text-[17px]">
                        2
                      </div>
                      <div className="text-blue-950 font-bold text-[17px] cursor-pointer">
                        -
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4 cursor-pointer">
                      <img
                        onClick={() => handleDeleteReply(reply.id)}
                        src={deleteImg}
                        alt=""
                        className="h-fit"
                      />
                      <img
                        onClick={() => handleEdit(reply.id, reply.id)}
                        src={editImg}
                        alt=""
                        className="h-fit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {responseIndex === reply.id && (
              <div>
                <EditReplyResponse
                  register={register}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  handleEditReply={handleEditReply}
                  loading={loading}
                />
              </div>
            )}
            {/* </div> */}
          </div>
        ))}
    </div>
  );
}
