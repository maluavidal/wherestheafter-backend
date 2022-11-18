import { Thumb } from "../models";

class ThumbService {
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
