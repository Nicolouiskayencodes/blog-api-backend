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

async function getPosts() {
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

module.exports = {createUser, getUser, getPosts, postPost, grantAdmin}