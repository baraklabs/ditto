const express = require('express');
const healthRoutes = require('./health');
const collectionRoutes = require('./collection');
const mockRoutes = require('./mock');
const requestResponseRoutes = require('./requestResponse');
const processMock = require('./processMock');
const authRoutes = require('./auth');
const userRoutes = require('./user');

const router = express.Router();

router.use('/api/ditto/health', healthRoutes);
router.use('/api/ditto/collection', collectionRoutes);
router.use('/api/ditto/mock', mockRoutes);
router.use('/api/ditto/request-response', requestResponseRoutes);
router.use('/api/ditto/auth', authRoutes);
router.use('/api/ditto/user', userRoutes); 
router.use('/*', processMock);


module.exports = router;
