import express from 'express';

const router = express.Router();

// Mock guides data
const guides = {
  bosses: [
    {
      id: 'asylum-demon',
      name: 'Asylum Demon',
      location: 'Undead Asylum',
      description: 'The Asylum Demon guards the Undead Asylum. It is a giant demon with a large club.',
      difficultyLevel: 'Easy',
      weaknesses: ['Magic', 'Fire'],
      resistances: ['Physical'],
      drops: [
        { itemId: 'axe-of-demon', itemName: 'Demon\'s Great Axe', probability: 0.4, quantity: 1, rarity: 'rare' },
      ],
      strategies: [
        {
          id: 'strategy-1',
          title: 'Melee Strategy',
          description: 'Use a light weapon and stay behind the demon to avoid its attacks.',
          difficulty: 'Medium',
          steps: ['Stay behind', 'Attack legs', 'Avoid overhead swing'],
          equipment: ['Longsword', 'Heater Shield'],
          spells: [],
        },
      ],
      alternativeRoutes: [],
      rewardSouls: 3000,
      imageUrl: 'https://via.placeholder.com/400x300?text=Asylum+Demon',
    },
    {
      id: 'taurus-demon',
      name: 'Taurus Demon',
      location: 'Undead Parish',
      description: 'A large bull-like demon found on the stairs in Undead Parish.',
      difficultyLevel: 'Medium',
      weaknesses: ['Magic', 'Lightning'],
      resistances: ['Physical'],
      drops: [
        { itemId: 'taurus-helm', itemName: 'Taurus Demon Helm', probability: 0.6, quantity: 1, rarity: 'epic' },
      ],
      strategies: [
        {
          id: 'strategy-1',
          title: 'Backstab Strategy',
          description: 'Circle around and backstab for massive damage.',
          difficulty: 'Hard',
          steps: ['Circle behind', 'Backstab', 'Repeat'],
          equipment: ['Dagger', 'Leather Armor'],
          spells: [],
        },
      ],
      alternativeRoutes: ['Jump attack from ledge'],
      rewardSouls: 5000,
      imageUrl: 'https://via.placeholder.com/400x300?text=Taurus+Demon',
    },
  ],
  areas: [
    {
      id: 'undead-asylum',
      name: 'Undead Asylum',
      type: 'starting',
      description: 'Where your journey begins. A prison for the undead.',
      level: 1,
      imageUrl: 'https://via.placeholder.com/400x300?text=Undead+Asylum',
    },
    {
      id: 'undead-parish',
      name: 'Undead Parish',
      type: 'main',
      description: 'The main hub area with multiple paths.',
      level: 10,
      imageUrl: 'https://via.placeholder.com/400x300?text=Undead+Parish',
    },
  ],
};

// === GUIDE ENDPOINTS ===

// Get all bosses
router.get('/bosses', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  const items = guides.bosses;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);

  return res.json({
    success: true,
    data: {
      data: paginatedItems,
      total: items.length,
      page,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize),
      hasMore: end < items.length,
    },
    timestamp: new Date().toISOString(),
  });
});

// Get boss by ID
router.get('/bosses/:id', (req, res) => {
  const boss = guides.bosses.find((b) => b.id === req.params.id);

  if (!boss) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Boss not found',
        code: 'NOT_FOUND',
      },
      timestamp: new Date().toISOString(),
    });
  }

  return res.json({
    success: true,
    data: boss,
    timestamp: new Date().toISOString(),
  });
});

// Get all areas
router.get('/areas', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  const items = guides.areas;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);

  return res.json({
    success: true,
    data: {
      data: paginatedItems,
      total: items.length,
      page,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize),
      hasMore: end < items.length,
    },
    timestamp: new Date().toISOString(),
  });
});

// Get area by ID
router.get('/areas/:id', (req, res) => {
  const area = guides.areas.find((a) => a.id === req.params.id);

  if (!area) {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Area not found',
        code: 'NOT_FOUND',
      },
      timestamp: new Date().toISOString(),
    });
  }

  return res.json({
    success: true,
    data: area,
    timestamp: new Date().toISOString(),
  });
});

export default router;
