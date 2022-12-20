import { Thumb } from "../models";

class ThumbService {
	async showAll(){
		 return Thumb.findAll();
	};

	async create(data) {
		return Thumb.create(data)
	}

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
