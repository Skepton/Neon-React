module.exports = [
  {
    "type": "get",
    "path": "/admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['postCenter']
  },
  {
    "type": "get",
    "path": "/admin/settings",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['settings']
  },
  {
    "type": "get",
    "path": "/admin/settings/categorizer",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizer']
  },
  {
    "type": "get",
    "path": "/admin/settings/categorizer/add/child/:parentCategory",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizerAdd']
  },
  {
    "type": "get",
    "path": "/admin/composer/:hashid",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['composer']
  }
]
