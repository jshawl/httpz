use admin;
db.createUser({
  user: 'root',
  pwd: 'root',
  roles: [
    'userAdminAnyDatabase'
  ]
});
