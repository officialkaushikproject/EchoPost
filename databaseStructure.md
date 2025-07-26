📍 User Collection
{
  "_id": ObjectId,
  "email": String,          // required, unique
  "password": String,       // hashed password (or null if GitHub login)
  "handler": String,        // required, unique (used in URL search)
  "createdAt": Date,
  "updatedAt": Date
}
🔐 Notes:

password is hashed using bcrypt for security.

handler acts like a username (e.g., @suman_raj) and is searchable.

If user signs in with GitHub, password will be null.


📝  Post Collection
{
  "_id": ObjectId,
  "title": String,         // required
  "content": String,       // required
  "author": ObjectId,      // reference to User._id
  "createdAt": Date,
  "updatedAt": Date
}
🔗 Notes:

author field links each post to its creator.

Use .populate("author") to get user info when fetching posts.