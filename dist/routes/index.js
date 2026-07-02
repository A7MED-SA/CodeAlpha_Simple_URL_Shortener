import { Router } from 'express';
import urlRoutes from './urlRoutes.js';
const router = Router();
router.use('/api/v1', urlRoutes);
export default router;
//# sourceMappingURL=index.js.map