// import { useEffect, useState } from "react";
// import rasmeron from "../assets/avatars/image-ramsesmiron.png";
// import replyImg from "../assets/icon-reply.svg";
// import { getReplies } from "../services/commentServices";

// export default function Responses() {
//   const [replies, setReplies] = useState([]);

//   async function fetchReplies() {
//     const reply = await getReplies();

//     console.log(reply);
//     setReplies(reply.data);
//   }

//   useEffect(() => {
//     fetchReplies();
//   }, []);
//   return (
//     <div>
//       {replies &&
//         replies.map((reply, index) => (
//           <div key={index}>
//             <div className="flex flex-col gap-4 justify-center items-center px-4 border-l border-slate-300">
//               <div className="flex flex-col pt-4 border border-white px-4 rounded-lg bg-white py-2 w-full ml-7">
//                 <div className="flex flex-col gap-4">
//                   <div className="flex flex-row gap-3 items-center">
//                     <div>
//                       <img src={rasmeron} alt="" className="w-8" />
//                     </div>
//                     <div className="text-blue-950 font-bold text-[17px]">
//                       ramsesmiron
//                     </div>
//                     <div className="text-blue-950 font-semibold opacity-90">
//                       1 week ago
//                     </div>
//                   </div>
//                   <div className="text-blue-950 font-semibold opacity-90">
//                     <span className="text-blue-800 font-bold opacity-100 mr-2">
//                       @maxblagun
//                     </span>
//                     {reply.reply_comment}
//                   </div>
//                   <div className="flex flex-row justify-between items-center">
//                     <div className="flex flex-row border border-transparent bg-blue-500 bg-opacity-20 p-2 px-2 gap-3 py-1 rounded-md">
//                       <div className="text-blue-950 font-bold text-[17px] cursor-pointer">
//                         +
//                       </div>
//                       <div className="text-blue-950 font-bold text-[17px]">
//                         4
//                       </div>
//                       <div className="text-blue-950 font-bold text-[17px] cursor-pointer">
//                         -
//                       </div>
//                     </div>
//                     <div
//                       // onClick={() => append({ reply_comment: "" })}
//                       className="flex flex-row items-center justify-center gap-2 cursor-pointer"
//                     >
//                       <img src={replyImg} alt="" className="h-fit" />
//                       <div className="text-blue-950 font-bold text-[15px]">
//                         Reply
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }
