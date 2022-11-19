import pdf from 'html-pdf';
import {readFileSync} from 'fs';
const { v4: uuidv4 } = require('uuid');
import { Client, Event, EventsClients } from '../models';

class pdfService {
	async exportPDF(id) {
		const item = await EventsClients.findOne({
            where: {
                id
            },
            include: [{
                model: Event,
                attributes: ['name'],
            }, {
                model: Client,
                attributes: ['cpf', 'name'],
            }],
            raw: true,
            nest: true,
            attributes: []
        });

		const htmlBook = `
			<tr>
			<td style="padding-left: 40px;">${item.Event.name}</td>
			<td style="padding-left: 40px;">${item.Client.name}</td>
			</tr>
		`;

		const htmlTemplate = readFileSync('../html/pdf.html', { encoding:'utf8' });
		htmlTemplate = htmlTemplate.replace('{{ eventName }}', item.Event.name);

		htmlTemplate = htmlTemplate.replace('{{ clientName }}', htmlBook);

		const filePath = `./uploads/pdf/ticket-${uuidv4()}.pdf`;

		pdf.create(htmlTemplate, {}).toFile(filePath, (err, result) => {
                if (err) {
                    reject('Deu erro');
					console.log(err)
                    return;
                }
				console.log(result)

               return result.filename
        })

		return true
	}
}

export default new pdfService();
