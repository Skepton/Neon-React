module.exports = [
  {
    "type": "get",
    "path": "/admin",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['postCenter']
  },
  {
    "type": "get",
    "path": "/admin/settings",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['settings']
  },
  {
    "type": "get",
    "path": "/admin/settings/categorizer",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizer']
  },
  {
    "type": "get",
    "path": "/admin/settings/categorizer/add/child/:parentCategory",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizerAdd']
  },
  {
    "type": "get",
    "path": "/admin/composer/:hashid",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['composer']
  }
]
