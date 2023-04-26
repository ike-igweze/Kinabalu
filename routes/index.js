const express = require('express');
const router = express.Router();
const {
  registerClient,
  loginClient,
  getClientDashboard,
  sendMessageToSupport,
  loginSupport,
  registerSupport,
  getSupportDashboard,
  manageClient,
  sendMessageToClient,
  viewMessages,
  disableClient,
} = require('../controllers');

router.get('/register', registerClient);
router.post('/login', loginClient);
router.get('/dashboard', getClientDashboard);
router.post('/message-support', sendMessageToSupport);

router.get('/support/login', loginSupport);
router.post('/support/register', registerSupport);
router.get('/support/dashboard', getSupportDashboard);
router.get('/support/clients/:id', manageClient);
router.post('/support/messages', sendMessageToClient);
router.get('/support/messages', viewMessages);
router.put('/support/disable-client/:id', disableClient);

module.exports = router;
