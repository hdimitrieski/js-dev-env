import './index.css'

import { deleteUser, getUsers } from './api/userApi';

getUsers().then(result => {
  console.log(result); // eslint-disable-line no-console

  deleteUser(result[0].id)
    .then((result2) => {
      console.log(result2); // eslint-disable-line no-console
    });
});

// TODO improve the webpack config
// TODO implement automatic preduction deploy (use heroku and surge)
