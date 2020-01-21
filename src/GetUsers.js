import React, { useEffect, useState, Fragment } from "react";

// note: I would maybe change the step names to getData, prepareData, processData and then render

// Front-end Quiz
// 1:1 - Fetch all users
const URL = `https://jsonplaceholder.typicode.com`;
function getUsers() {
  return fetch(`${URL}/users`).then(data => data.json());
}
// 1:2 Fetch all posts
function getPosts() {
  return fetch(`${URL}/posts`).then(data => data.json());
}
// 1:3 Add a post property to each user object
function modifyUserObj(users) {
  return users.map(user => {
    user.posts = [];
    return user;
  });
}

function getPostsById(id, posts) {
  return posts.filter(post => {
    if (id === post.userId) {
      return post;
    }
  });
}

// 1:4 Inserts each user's posts into their posts property
async function addOnUserPosts() {
  let users = await getUsers();
  let posts = await getPosts();
  modifyUserObj(users);
  // I used this incase it is an additional api call (which is normal)
  return await Promise.all(
    users.map(async user => {
      user.posts = await getPostsById(user.id, posts);
      console.log(user);
      // 1:5 returns the result as object
      return { user };
    })
  );
}

export default function GetUsers(props) {
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    getUsers()
      .then(async results => {
        await addOnUserPosts(results);
        console.log(addOnUserPosts(results));
        return results;
      })
      .then(usersList => setUsersList(usersList))
      .catch(err => setUsersList([]));
  }, []);

  return (
    <div>
      {usersList === null ? (
        "...loading"
      ) : usersList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>Users</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
            {usersList.map((person, index) => {
              person.index = index;
              return (
                <Fragment key={person.phone}>
                  <tr>
                    <td>{person.name}</td>
                    <td>{person.index}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        "error"
      )}
    </div>
  );
}
