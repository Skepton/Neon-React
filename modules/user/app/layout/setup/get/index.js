module.exports = [
  {
    "path": "/login",
    "handle": "page",
    "handleUpdates": ['login']
  },
  {
    "path": "/register",
    "handle": "page",
    "handleUpdates": ['register']
  },
  {
    "path": "/user/:user",
    "handle": "page",
    "handleUpdates": ['user']
  }
]
