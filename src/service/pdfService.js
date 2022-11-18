module.exports = () => {
    const pdf = require('html-pdf');
    const fs = require('fs');
    // const { v4: uuidv4 } = require('uuid');
    const Client = require('../models/Client');
    const Event = require('../models/Event');
    const EventsClient = require('../models/EventsClients');

    const listStudentsAndBooks = async (filter) => {
        return EventsClient.findAll({
            where: {
                event_id: filter.event_id,
				client_id: filter.client_id
            },
            include: [{
                model: Event,
                attributes: ['name'],
                paranoid: false
            }, {
                model: Client,
                attributes: ['cpf', 'name'],
                paranoid: false
            }],
            raw: true,
            nest: true,
            attributes: []
        });
    };

    const exportPDF = async (filter) => {
			const items = await listStudentsAndBooks(filter);
			const loggedUser = await User.findOne({
				where: {
					id: filter.logged_user_id
				},
				attributes: ['name']
			});
			let htmlBook = '';

			items.forEach(item => {
				htmlBook += `
					<tr>
					<td style="padding-left: 40px;">${item.student.name}</td>
					<td style="padding-left: 40px;">${item.book.name}</td>
					</tr>
						`
			});
			let htmlTemplate = fs.readFileSync('html/pdf.html', 'UTF-8');
			htmlTemplate = htmlTemplate.replace('{{ userName }}', results.findUser.name);
			htmlTemplate = htmlTemplate.replace('{{ htmlBook }}', htmlBook);
			const filePath = `./uploads/booksByStudent-${uuidv4()}.pdf`;
			const filename = await generatePDF(results.htmlInfo, filePath);
			console.log(filePath)
			console.log(filename)
			return results.print;
        }
    const generatePDF = (htmlTemplate, filePath) => {
        return new Promise((resolve, reject) => {
            pdf.create(htmlTemplate, {}).toFile(filePath, (err, result) => {
                if (err) {
                    reject('Deu erro');
                    return;
                }

                resolve(result.filename)
            });
        })
    };

    return {
        exportPDF
    }
}
