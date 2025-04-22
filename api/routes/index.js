const express = require('express');
const healthRoutes = require('./health');
const collectionRoutes = require('./collection');
const mockRoutes = require('./mock');
const requestResponseRoutes = require('./requestResponse');
const processMock = require('./processMock');

const router = express.Router();

router.use('/api/health', healthRoutes);
router.use('/api/collection', collectionRoutes);
router.use('/api/mock', mockRoutes);
router.use('/api/request-response', requestResponseRoutes);
router.use('/*', processMock);


module.exports = router;
