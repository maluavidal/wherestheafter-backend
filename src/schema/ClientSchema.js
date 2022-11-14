import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            born_at: Yup.date().required(),
		}).noUnknown(),
	}
}

export default schema;
