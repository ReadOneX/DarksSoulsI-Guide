import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface BookmarkRecord {
  id: string;
  userId: string;
  contentId: string;
  contentType: string;
  title: string;
  description: string;
  createdAt: string;
}

// === BOOKMARKS ENDPOINTS ===

const createBookmarks = (userId: string): BookmarkRecord[] => [
  {
    id: uuidv4(),
    userId,
    contentId: 'asylum-demon',
    contentType: 'boss',
    title: 'Asylum Demon Guide',
    description: 'Helpful strategy for defeating Asylum Demon',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    userId,
    contentId: 'undead-parish',
    contentType: 'area',
    title: 'Undead Parish Map',
    description: 'Interactive map of Undead Parish',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

router.get('/', (req, res) => {
  return res.json({
    success: true,
    data: createBookmarks('current-user'),
    timestamp: new Date().toISOString(),
  });
});

router.post('/', (req, res) => {
  const { contentId, contentType, title, description } = req.body;

  if (!contentId || !contentType || !title) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Missing required fields',
        code: 'VALIDATION_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(201).json({
    success: true,
    data: {
      id: uuidv4(),
      userId: 'current-user',
      contentId,
      contentType,
      title,
      description,
      createdAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

// Get user bookmarks
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const contentType = req.query.contentType as string | undefined;

  let bookmarks = createBookmarks(userId);

  if (contentType) {
    bookmarks = bookmarks.filter((b) => b.contentType === contentType);
  }

  return res.json({
    success: true,
    data: {
      items: bookmarks,
      total: bookmarks.length,
    },
    timestamp: new Date().toISOString(),
  });
});

// Create bookmark
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { contentId, contentType, title, description } = req.body;

  if (!contentId || !contentType || !title) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Missing required fields',
        code: 'VALIDATION_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }

  const bookmark = {
    id: uuidv4(),
    userId,
    contentId,
    contentType,
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  return res.status(201).json({
    success: true,
    data: bookmark,
    timestamp: new Date().toISOString(),
  });
});

// Delete bookmark
router.delete('/:userId/:bookmarkId', (req, res) => {
  const { userId, bookmarkId } = req.params;

  return res.json({
    success: true,
    data: {
      userId,
      bookmarkId,
      deleted: true,
    },
    timestamp: new Date().toISOString(),
  });
});

router.delete('/:bookmarkId', (req, res) => {
  return res.json({
    success: true,
    data: {
      bookmarkId: req.params.bookmarkId,
      deleted: true,
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
