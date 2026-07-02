import * as urlService from '../services/urlService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
export async function createShortUrl(req, res) {
    const { url } = req.body;
    const result = await urlService.createShortUrl(url);
    res.status(HTTP_STATUS.CREATED).json(successResponse(result, 'Short URL created successfully'));
}
export async function redirectToUrl(req, res) {
    const code = req.params['code'];
    const url = await urlService.getUrlByCode(code);
    if (!url) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Short URL not found'));
        return;
    }
    await urlService.trackClick(code);
    res.redirect(301, url.originalUrl);
}
export async function getUrlInfo(req, res) {
    const code = req.params['code'];
    const info = await urlService.getUrlInfo(code);
    if (!info) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Short URL not found'));
        return;
    }
    res.json(successResponse(info));
}
export async function deleteUrl(req, res) {
    const code = req.params['code'];
    const deleted = await urlService.deleteUrl(code);
    if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Short URL not found'));
        return;
    }
    res.json(successResponse(null, 'Short URL deleted successfully'));
}
//# sourceMappingURL=urlController.js.map