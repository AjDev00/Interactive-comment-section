//insert comments.
export async function insertComments(data) {
  const res = await fetch("http://localhost:8000/api/comments", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

//get comments.
export async function getComments() {
  const res = await fetch("http://localhost:8000/api/get-comments");

  return await res.json();
}

export async function deleteComment(id) {
  const res = await fetch("http://localhost:8000/api/erase-comment/" + id, {
    method: "DELETE",
  });

  return res.json();
}

// //get replies.
// export async function getReplies() {
//   const res = await fetch("http://localhost:8000/api/get-reply");

//   return await res.json();
// }

// //get replies of reply.
// export async function getRepliesOfReply() {
//   const res = await fetch("http://localhost:8000/api/get-replyOfReply");

//   return await res.json();
// }

// //insert comments reply.
// export async function insertReply(data) {
//   const res = await fetch("http://localhost:8000/api/add-reply", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }
