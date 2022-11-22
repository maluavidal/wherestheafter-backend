import pdf from 'html-pdf';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import cep from 'cep-promise';
import moment from 'moment';
import QRCode from 'qrcode';
import { Client, Event, EventsClient, Thumb } from '../models';

export default new(class PdfService {
	async exportPDF(id) {
		const item = await EventsClient.findOne({
            where: {
                id
            },
            include: [{
                model: Event,
                attributes: ['name', 'address_cep', 'starts_at', 'thumb_id', 'number', 'price'],
            }, {
                model: Client,
                attributes: ['cpf', 'name'],
            }],
            raw: true,
            nest: true,
            attributes: []
        });

        if (!item) {
            throw new Error('Ticket not found.')
        }

		const generateQR = await QRCode.toDataURL(`http://localhost:3000/${item.id}`);

		const image = await Thumb.findOne({
			where: {
				id: item.Event.thumb_id,
			},
		})

		const imageToBase64 = readFileSync(image.url, {encoding: 'base64'});

		const options = {
            type: 'pdf',
            format: 'latter',
            orientation: 'portrait'
        }

		let htmlTemplate = readFileSync('src/html/pdf.html', { encoding:'utf8' });

		htmlTemplate = htmlTemplate.replace('{{ event-name }}', item.Event.name);

		const addressInfo = await cep(item.Event.address_cep);

		const datetimeInfo = moment(item.Event.starts_at).locale('pt-BR').format("ddd, D MMM [-] YYYY [-] HH:mm");

		htmlTemplate = htmlTemplate.replace('{{ qrcode }}', generateQR);
		htmlTemplate = htmlTemplate.replace('{{ img_src }}', `data:image/png;base64,${imageToBase64}`);

		htmlTemplate = htmlTemplate.replace('{{ street }}', addressInfo.street);
		htmlTemplate = htmlTemplate.replace('{{ number }}', item.Event.number);
		htmlTemplate = htmlTemplate.replace('{{ neighborhood }}', addressInfo.neighborhood);
		htmlTemplate = htmlTemplate.replace('{{ city }}', addressInfo.city);
		htmlTemplate = htmlTemplate.replace('{{ state }}', addressInfo.state);

		htmlTemplate = htmlTemplate.replace('{{ client_name }}', item.Client.name);
		htmlTemplate = htmlTemplate.replace('{{ price }}', item.Event.price);

		htmlTemplate = htmlTemplate.replace('{{ datetime }}', datetimeInfo);

		const filePath = (resolve(__dirname, '..', 'uploads', 'pdf') + `/ticket-${uuidv4()}.pdf`)

		const pdfFile = await new Promise((resolve, reject) => {
            pdf.create(htmlTemplate, options).toFile(filePath, (err, buffer) => {
                if (err) {
                    reject(err)
                }

               resolve(buffer.filename)
            });
        });

		return pdfFile;
	}
})();
