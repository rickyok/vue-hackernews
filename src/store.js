var Firebase = require('firebase')
var api = new Firebase('https://radiant-fire-882.firebaseio.com/utang')
var Emitter = require('events').EventEmitter
var store = module.exports = new Emitter()
var login_uid = null


store.login = function(username , password , authHandler) {
  api.authWithPassword({
    email: username,
    password: password
  } , function(error , authData) {
    if (error == null) {
      login_uid = authData.uid
      api.child('users').child(login_uid).update({
        username: username,
        lastLogin: Date()
      })
      api.child('users').child(login_uid).once('value' , function(s) {
        var row = s.val()
        if (row.balanceHutang == null) {
          api.child('users').child(login_uid).update('balanceHutang').set(0)
        }
      })
    }
    authHandler(error , authData)
  })
}

store.createUser = function(username , password , authHandler) {
  api.createUser({
    email: username,
    password: password
  } , function(error , authData) {
    if (error == null) {
      api.child('users').child(authData.uid).set({
        username: username,
        lastLogin: null,
        balanceHutang: 0
      })
    }
      authHandler(error , authData)
  })
}

store.getAuth = function() {
  return api.getAuth()
}

store.logout = function() {
  api.unauth()
}

// /**
//  * Subscribe to real time updates of the top 100 stories,
//  * and cache the IDs locally.
//  */

// // api.child('topstories').on('value', function (snapshot) {
// //   cachedStoryIds = snapshot.val()
// //   store.emit('update')
// // })

// /**
//  * Fetch an item data with given id.
//  *
//  * @param {Number} id
//  * @param {Function} cb(item)
//  */

// store.fetchItem = function (id, cb) {
//   if (cachedStories[id]) {
//     cb(cachedStories[id])
//   } else {
//     api.child('item/' + id).once('value', function (snapshot) {
//       var story = snapshot.val()
//       cachedStories[id] = story
//       cb(story)
//     })
//   }
// }

// /**
//  * Fetch the given list of items.
//  *
//  * @param {Array<Number>} ids
//  * @param {Function} cb(items)
//  */

// store.fetchItems = function (ids, cb) {
//   if (!ids || !ids.length) return cb([])
//   var items = []
//   ids.forEach(function (id) {
//     store.fetchItem(id, addItem)
//   })
//   function addItem (item) {
//     items.push(item)
//     if (items.length >= ids.length) {
//       cb(items)
//     }
//   }
// }

// /**
//  * Fetch items for the given page.
//  *
//  * @param {Number} page
//  * @param {Function} cb(stories)
//  */

// store.fetchItemsByPage = function (page, cb) {
//   var start = (page - 1) * storiesPerPage
//   var end = page * storiesPerPage
//   var ids = cachedStoryIds.slice(start, end)
//   store.fetchItems(ids, cb)
// }

// /**
//  * Fetch a user data with given id.
//  *
//  * @param {Number} id
//  * @param {Function} cb(user)
//  */

// store.fetchUser = function (id, cb) {
//   api.child('user/' + id).once('value', function (snapshot) {
//     cb(snapshot.val())
//   })
// }