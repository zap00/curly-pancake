'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index').as('index');

// Invoice Routes
Route.group(() => {
  Route.get('/', 'InvoiceController.index').as('index')
  Route.get('/invoice','InvoiceController.create').as('invoices.create')
  Route.post('/invoice','InvoiceController.store').as('invoices.store').validator('Invoice')
  Route.get('/invoice/:id','InvoiceController.edit').as('invoices.edit')
  Route.post('/invoice/:id','InvoiceController.update').as('invoices.update')
  Route.get('/invoice/:id','InvoiceController.destroy').as('invoices.delete')
  Route.get('/invoice/:id','InvoiceController.show').as('invoices.view')
}).middleware(['auth']);

// Client Routes
Route.group(() => {
  Route.get('/','ClientController.create').as('clients.create')
  Route.post('/client','ClientController.store').as('clients.store').validator('Client')
  Route.get('/client/:id','ClientController.edit').as('clients.edit')
  Route.post('/client/:id','ClientController.update').as('clients.update')
  Route.get('/client/:id','ClientController.destroy').as('clients.delete')
  Route.get('/client/:id','ClientController.show').as('clients.show')
}).middleware(['auth']);

// Authentication Routes
Route.group(() => {
  Route.get('/login','AuthController.loginView').as('login.create')
  Route.post('/login-store','AuthController.postLogin').as('login.store')
  Route.post('logout', 'AuthController.logout').as('logout');
}).prefix('api/auth');

// Register Routes
Route.group(() => {
  Route.get('/register','AuthController.registrationView').as('register.create')
  Route.post('/register-store','AuthController.postRegister').as('register.store').validator('Register')
}).prefix('api/auth');

// Dashboard Routes
Route.group(() => {
  Route.get('/dashboard/home', 'DashboardController.home').as('dashboard.home')
  Route.get('/dashboard/settings', 'DashboardController.settings').as('dashboard.settings')
  Route.get('/dashboard/clients', 'DashboardController.clients').as('dashboard.clients')
  Route.get('/dashboard/deposits', 'DashboardController.deposits').as('dashboard.deposits')
  Route.get('/dashboard/invoices', 'DashboardController.invoices').as('dashboard.invoices')
  // Add more routes for other sections
}).middleware(['auth']);

// Serve static files
Route.get('/uploads/*', 'FileController.show').as('file.show');