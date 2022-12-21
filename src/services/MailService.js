import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
	  user: "ef036c0c5d3c00",
	  pass: "4bf6bc042dbc7e"
	}
});

const options = {
  viewEngine: {
    extName: '.hbs',
    layoutsDir: path.resolve('./src/email'),
    defaultLayout: 'index',
  },
  viewPath: path.resolve('./src/email'),
  extName: '.hbs',
};

transport.use('compile', hbs(options));

export default transport;
