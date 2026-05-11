import express from 'express';

const router = express.Router();

router.get('/status', (req, res) => {
  return res.json({
    success: true,
    data: {
      mode: 'guest',
      cloudSyncEnabled: false,
      localQueue: 0,
      lastSyncAt: null,
      services: ['auth', 'guide', 'progress', 'notification', 'sync'],
    },
    timestamp: new Date().toISOString(),
  });
});

router.post('/progress', (req, res) => {
  return res.json({
    success: true,
    data: {
      accepted: true,
      queued: false,
      receivedKeys: Object.keys(req.body ?? {}),
      syncedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
