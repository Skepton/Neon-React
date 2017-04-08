module.exports = [
  {
    "type": "post",
    "path": "/admin/settings/categorizer/add/child/:parentCategory",
    "model": "admin/settings/categorizer/add/post",
    "handles": ['admin','admin/settings/categorizer/add/post']
  },
  {
    "type": "post",
    "path": "/admin/composer/save/:hashid",
    "model": "admin/composer/post/save"
  },
  {
    "type": "post",
    "path": "/admin/composer/delete/:hashid",
    "model": "admin/composer/post/delete"
  },
  {
    "type": "post",
    "path": "/admin/new/post",
    "model": "admin/newPost/setupRedirects"
  }
]
