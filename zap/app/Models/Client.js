'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// app/Models/Client.js

const Model = use('Model');

class Client extends Model {
  static get table() {
    return 'clients';
  }

  static get primaryKey() {
    return 'id';
  }

  // Define the fields of the client
  static get fillable() {
    return ['name', 'email', 'phone'];
  }

  // Define relationships
  invoices() {
    return this.hasMany('App/Models/Invoice');
  }
}

module.exports = Client;

