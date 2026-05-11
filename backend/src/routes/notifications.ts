import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const createNotifications = () => [
  {
    id: uuidv4(),
    title: 'Progress reminder',
    message: 'You have not logged the Bell Gargoyles encounter yet.',
    type: 'progress',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Offline cache ready',
    message: 'Recently viewed guides are available while offline.',
    type: 'system',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

router.get('/', (req, res) => {
  return res.json({
    success: true,
    data: createNotifications(),
    timestamp: new Date().toISOString(),
  });
});

router.put('/:notificationId/read', (req, res) => {
  return res.json({
    success: true,
    data: {
      id: req.params.notificationId,
      read: true,
      updatedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

router.delete('/:notificationId', (req, res) => {
  return res.json({
    success: true,
    data: {
      id: req.params.notificationId,
      deleted: true,
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
