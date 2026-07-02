import { Router } from 'express';
import * as urlController from '../controllers/urlController.js';
import { validate } from '../middleware/validation.js';
import { createUrlSchema } from '../schemas/urlSchema.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
const router = Router();
router.post('/shorten', rateLimiter, validate(createUrlSchema), urlController.createShortUrl);
router.get('/urls/:code', urlController.getUrlInfo);
router.delete('/urls/:code', urlController.deleteUrl);
export default router;
//# sourceMappingURL=urlRoutes.js.map