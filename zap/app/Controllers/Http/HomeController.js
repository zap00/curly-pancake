// app/Controllers/Http/HomeController.js

class HomeController {
  async index({ auth, view }) {
    if (auth.user) {
      // If the user is logged in, redirect to a dashboard or display user-specific content
      return view.render('dashboard/dashboard', { user: auth.user.toJSON() });
    } else {
      // If the user is not logged in, show the login and register options
      return view.render('home');
    }
  }
}

module.exports = HomeController;

