// app/Commands/SendEmail.js

'use strict'

const { Command } = require('@adonisjs/ace');
const Mail = use('Mail');

class SendEmail extends Command {
  static get signature () {
    return 'send:email {email: Email address} {--subject=? : Email subject} {--message=? : Email message}';
  }

  static get description () {
    return 'Send an email to the specified email address';
  }

  async handle (args, options) {
    const email = args.email;
    const subject = options.subject || 'You have a pending deposit from $clinedog56';
    const message = options.message || 'Default Message';

    const data = { subject, message };

    try {
      this.info('Attempting to send email...');
      
      await Mail.send('emails.default', data, (message) => {
        message
          .to(email)
          .from('cash@square.com') // Replace with your email address
          .subject(subject);
      });

      this.success(`Email sent to ${email} with subject: ${subject}`);
    } catch (error) {
      this.error(`Failed to send email. Error: ${error.message}`);
    } 
  }
}

module.exports = SendEmail;
