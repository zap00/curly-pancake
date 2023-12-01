'use strict'

// app/Controllers/Http/InvoiceController.js

const Invoice = use('App/Models/Invoice');
const Database = use('Database');
const InvoiceValidator = use('App/Validators/Invoice');

class InvoiceController {
  async index({ view }) {
    const invoices = await Invoice.query().with('client').fetch();
    return view.render('invoices.index', { invoices: invoices.toJSON() });
  }

  async create({ view }) {
    // You may want to fetch clients to populate a dropdown in the create view
    const clients = await Database.table('clients').select('id', 'name');
    return view.render('invoices.create', { clients });
  }

  async store({ request, response, session }) {
    const data = request.only(['client_id', 'amount', 'description', 'due_date']);

    try {
      await request.validate(InvoiceValidator);
      const invoice = await Invoice.create(data);
      session.flash({ notification: 'Invoice created successfully!' });

      return response.redirect(`/invoices/${invoice.id}`);
    } catch (error) {
      session.withErrors(error.messages).flashAll();
      return response.redirect('back');
    }
  }

  async show({ params, view }) {
    const invoice = await Invoice.find(params.id);
    return view.render('invoices.show', { invoice: invoice.toJSON() });
  }

  async edit({ params, view }) {
    const invoice = await Invoice.find(params.id);
    const clients = await Database.table('clients').select('id', 'name');
    return view.render('invoices.edit', { invoice: invoice.toJSON(), clients });
  }

  async update({ params, request, response, session }) {
    const data = request.only(['client_id', 'amount', 'description', 'due_date']);
    const invoice = await Invoice.find(params.id);

    try {
      await request.validate(InvoiceValidator);
      invoice.merge(data);
      await invoice.save();
      session.flash({ notification: 'Invoice updated successfully!' });

      return response.redirect(`/invoices/${invoice.id}`);
    } catch (error) {
      session.withErrors(error.messages).flashAll();
      return response.redirect('back');
    }
  }

  async destroy({ params, response, session }) {
    const invoice = await Invoice.find(params.id);
    await invoice.delete();
    session.flash({ notification: 'Invoice deleted successfully!' });

    return response.redirect('/invoices');
  }
}

module.exports = InvoiceController;

