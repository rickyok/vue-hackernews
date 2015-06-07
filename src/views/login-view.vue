<template>
      <form class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" v-model="inputEmail" v-on="keyup:submit | key 13" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" v-model="inputPassword" v-on="keyup:submit | key 13" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me" v-model="rememberMe"> Remember me
          </label>
        </div>
        <div class="errorMessage alert alert-danger" v-if="errorMessage != ''">{{errorMessage}}</div>
        <div class="okMessage alert alert-success" v-if="okMessage != ''">{{okMessage}}</div>
        <button class="btn btn-lg btn-primary btn-block" type="button" v-on="click:submit">Sign In</button>
        <button class="btn btn-lg btn-primary btn-block" type="button" v-on="click:createUser">Sign Up</button>
        <button class="btn btn-lg btn-primary btn-block" type="button" v-on="click:getAuth">Get Auth</button>
        <button class="btn btn-lg btn-primary btn-block" type="button" v-on="click:logout">Log out</button>
      </form>
</template>

<script>
var store = require('../store')

var self = null

authHandler = function(error , authData) {
  if (error) {
    console.log("Login Failed" , error)
    self.errorMessage = error.message
  }
  else {
    console.log("Auth Success" , authData)
    if (authData.provider != null) {
      self.okMessage = "Sign In Successfull"
    }
    else {
      self.okMessage = "Sign Up Successfull , please check your email"
    }
  }
}

module.exports = {
  replace: true,
  props: ['params'],
  data: function () {
    return {
      params: {
        page: 1
      },
      displayPage: 1,
      inputEmail: "",
      inputPassword: "",
      rememberMe: false,
      errorMessage: "",
      okMessage: "",
      items: []
    }
  },
  watch: {
    // 'params.page': function () {
      // this.update(true)
    // }
  },
  compiled: function () {
    self = this
    // this.update()
    // store.on('update', this.update)
  },
  destroyed: function () {
    // store.removeListener('update', this.update)
  },
  components: {
  },
  methods: {
    submit: function(e) {
      this.errorMessage = ""
      this.okMessage = ""
      e.stopPropagation()
      // console.log(this.inputEmail)
      // console.log(this.inputPassword)
      store.login(this.inputEmail , this.inputPassword , authHandler)
    },
    createUser: function(e) {
      this.errorMessage = ""
      this.okMessage = ""
      e.stopPropagation()
      store.createUser(this.inputEmail , this.inputPassword , authHandler)
    },
    getAuth: function(e) {
      console.log(store.getAuth())
    },
    logout: function(e) {
      store.logout()
    }
  }
}
</script>

<style type="text/css">
body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>