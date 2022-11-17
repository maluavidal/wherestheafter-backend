import { Thumb } from "../models";

class ThumbService {
	async list() {
		return Thumb.findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		const thumb = {
			where: {
				id
			}
		};

		return Thumb.findOne(thumb);
	};

	async store(data) {
		return Thumb.create(data);
	};

	async update({ changes, filter }) {
		return Thumb.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			returning: true
		})
	};

	async delete(id) {
		const thumb = {
			where: {
				id
			}
		}
		await Thumb.destroy(thumb);

		return true;
	};
}


export default new ThumbService();
