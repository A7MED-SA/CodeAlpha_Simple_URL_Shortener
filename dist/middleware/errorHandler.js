import { HTTP_STATUS } from '../utils/constants.js';
export function errorHandler(err, _req, res, _next) {
    console.error('Unhandled error:', err);
    const statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = process.env['NODE_ENV'] === 'production'
        ? 'Internal server error'
        : err.message;
    res.status(statusCode).json({
        success: false,
        message,
    });
}
//# sourceMappingURL=errorHandler.js.map