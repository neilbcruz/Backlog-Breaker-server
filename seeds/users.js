const loginUserData = require("../seed_data/loginUserData");

exports.seed = function (knex) {
  return knex('create_user')
    .del()
    .then(function() {
      return knex('create_user').insert(createUsersData);
    })
    .then(()=>{
      return knex('login_user').del();
    })
    .then(()=>{
      return knex('login_user').insert(loginUserData);
    })
};