import { sendError } from '../app.js';

const handleRequest = async (req, res, serviceMethod) => {
	try {
		const requestData = { ...req.body, params: req.params };
		const requestUserId = req.user;
		const response = await serviceMethod(requestData, requestUserId, req, res);

		if (response?.error) {
			return sendError(res, response.error);
		}

		return res.status(200).json(response);
	} catch (error) {
		return sendError(res, 'internal_error');
	}
};

export default handleRequest;