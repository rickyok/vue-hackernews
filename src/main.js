/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('vue')
var Router = require('director').Router
var app = new Vue(require('./app.vue'))
var router = new Router()

Vue.config.warnExpressionErrors = false

router.on('/main/', function (page) {
  app.view = 'main-view'
})

router.on('/login/', function (page) {
  app.view = 'login-view'
})

router.on('/news/:page', function (page) {
  app.view = 'news-view'
  app.params.page = +page
})

router.on('/user/:id', function (id) {
  window.scrollTo(0, 0)
  app.view = 'user-view'
  app.params.userId = id
})

router.on('/item/:id', function (id) {
  window.scrollTo(0, 0)
  app.view = 'item-view'
  app.params.itemId = id
})

router.configure({
  notfound: function () {
    router.setRoute('/login/')
  }
})

router.init('/login/')