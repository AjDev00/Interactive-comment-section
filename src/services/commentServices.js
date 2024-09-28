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

//delete comment.
export async function deleteComment(id) {
  const res = await fetch("http://localhost:8000/api/erase-comment/" + id, {
    method: "DELETE",
  });

  return res.json();
}

//update comment.
export async function editComment(data, id) {
  const res = await fetch("http://localhost:8000/api/edit-comment/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

//get a single comment content.
export async function singleComment(id) {
  const res = await fetch("http://localhost:8000/api/get-single-comment/" + id);

  return await res.json();
}

//insert comments reply.
export async function insertReply(data) {
  const res = await fetch("http://localhost:8000/api/add-reply", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

//delete reply.
export async function deleteReply(id) {
  const res = await fetch("http://localhost:8000/api/erase-reply/" + id, {
    method: "DELETE",
  });

  return res.json();
}

//update reply.
export async function editReply(data, id) {
  const res = await fetch("http://localhost:8000/api/edit-reply/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

//get a single comment content.
export async function singleReply(id) {
  const res = await fetch("http://localhost:8000/api/get-single-reply/" + id);

  return await res.json();
}
