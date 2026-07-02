import { z } from 'zod';
import { HTTP_STATUS } from '../utils/constants.js';
export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((issue) => issue.message);
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: 'Validation failed',
                errors,
            });
            return;
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validation.js.map