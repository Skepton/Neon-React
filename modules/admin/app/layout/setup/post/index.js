module.exports = [
  {
    "path": "/admin/settings/categorizer/add/child/:parentCategory",
    "model": "admin/settings/categorizer/add/post"
  },
  {
    "path": "/admin/composer/save/:hashid",
    "model": "admin/composer/post/save"
  },
  {
    "path": "/admin/composer/delete/:hashid",
    "model": "admin/composer/post/delete"
  },
  {
    "path": "/admin/new/post",
    "model": "admin/newPost/post"
  }
]
