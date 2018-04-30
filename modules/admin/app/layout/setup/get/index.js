module.exports = [
  {
    "path": "/admin",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": []
  },
  {
    "path": "/admin/posts",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['postCenter']
  },
  {
    "path": "/admin/posts/composer/:hashid",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['composer']
  },
  {
    "path": "/admin/settings",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['settings']
  },
  {
    "path": "/admin/settings/categorizer",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizer']
  },
  {
    "path": "/admin/settings/categorizer/add/child/:parentCategory",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizerAdd']
  }
]
