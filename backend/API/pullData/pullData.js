const { getTexts } = require("../../services/mongo/actions");

/***
 * Pull data from our server.
 *
 * @since 0.1.4
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express middleware next function
 *
 * @returns {Object | undefined} Request data on success; undefined on fail
 */
async function pullData(req, res, next) {
	try {
		const { fileId, pageId } = req.data;
		const content = await getTexts(fileId);
		if (pageId) {
			content.pages = [content.pages[pageId] || {}];
		}

		next({ code: 0, content });
		return content;
	} catch (e) {
		const err = { e };
		next(err);
		return;
	}
}

module.exports = pullData;
