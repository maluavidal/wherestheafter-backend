import { Thumb } from "../models";

class ThumbService {
	async showAll(){
		 return Thumb.findAll();
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
