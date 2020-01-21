import React, { useEffect, useState, Fragment } from "react";

// REFACTOR - Question 2 - use id list and handle errors for ids that DNE
const URL = `https://jsonplaceholder.typicode.com`;
function getUsers() {
  return fetch(`${URL}/users`).then(data => data.json());
  //--> /users/${id} does not work so get all for now
}

async function getPostsById(users) {
  // request individual posts here not all
  return await Promise.all(
    users.map(async user => {
      user.posts = await fetch(`${URL}/posts?userId=${user.id}`).then(data =>
        data.json()
      );
      return { user };
    })
  );
}

// filter the 2 arrays to find existing ones
function filterById(users, idsRequested) {
  return users.filter(e => idsRequested.indexOf(e.id) !== -1);
}
// get error ids out - maybe could refactor to one condtional function
// depends on how th errors will be used and rendered etc
function getErrorIds(users, idsRequested) {
  let idsArr = [];
  for (let i = 0; i < users.length; i++) {
    idsArr.push(users[i].id);
  }
  return idsRequested.filter(e => idsArr.indexOf(e) === -1);
}

// hardcoded idsRequested is where you would send the ids list on through
async function gatherData(idsRequested = [2, 99, 22, 1, 4]) {
  /* 
   Rename function - main call to this one used in useEffect
 */
  let users = await getUsers();
  const existingUsers = await filterById(users, idsRequested);
  const doesNotExist = await getErrorIds(existingUsers, idsRequested);
  // would render this to the UI with red text
  console.log("These ids DO NOT EXIST", JSON.stringify(doesNotExist));
  return await getPostsById(existingUsers);
}

export default function GetUsers(props) {
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    getUsers()
      .then(async results => {
        // just for viewing in console since UI is unfinished
        await gatherData();
        console.log("done", await gatherData());
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
