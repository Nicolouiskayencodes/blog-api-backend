const prisma = require('./client.js');

async function createUser(username, password) {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
    }
  })
}

async function getUser(username) {
  const user =await prisma.user.findUnique({
    where: {
      username: username
    }
  })
  return user;
}

async function grantAdmin(id) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      admin: true,
    }
  })
}

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        include: {
          author :{
            select: {
              username: true,
            },
          },
        },
      },
    },
  })
  return posts
}

async function getUnpublished() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        include: {
          author :{
            select: {
              username: true,
            },
          },
        },
      },
    },
  })
  return posts
}

async function postPost(authorId, title, content) {
  await prisma.post.create({
    data: {
      authorId: authorId,
      title: title,
      content: content,
    }
  })
}

async function publishPost(id) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      published: true,
    }
  })
}

async function deletePost(id) {
  await prisma.post.delete({
    where: {
      id: id,
    },
  })
}

async function updatePost(id, title, content) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data:{
      title:title,
      content: content,
    },
  })
}

async function createComment(postId, userId, content) {
  await prisma.comment.create({
    data: {
      postId: postId,
      authorId: userId,
      content: content,
    }
  })
}

async function deleteComment(id) {
  await prisma.comment.delete({
    where: {
      id: id,
    },
  })
}

async function updateComment(commentId, content) {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  })
}
async function getComment(id) {
  const comment = prisma.comment.findUnique({
    where:{
      id : id,
    }
  })
  return(comment)
}


module.exports = {createUser, getUser, getPosts, postPost, grantAdmin, createComment, publishPost, deleteComment, deletePost, updateComment, updatePost, getComment, getUnpublished}