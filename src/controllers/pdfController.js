module.exports = () => {
    const pdfService = require('../services/pdfService')();

    const index = async (req, res) => {
        try {
            const response = await pdfService.exportPDF({
                id: req.params.student_id,
                logged_user_id: req.userId
            });

			res.type('pdf');
			res.download(response)
        }
        catch (e) {
            return res.status(500).json({ error: "The reservation does not exist." });
        }
    };

    return {
        index
    };
}
