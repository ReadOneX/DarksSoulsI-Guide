import express from 'express';

const router = express.Router();

// === PROGRESS ENDPOINTS ===

const createProgressData = (userId: string) => ({
  userId,
  profile: {
    characterName: 'Chosen Undead',
    level: 25,
    playtime: 3600,
    currentArea: 'undead-parish',
    currentBonfire: 'firelink-shrine',
    stats: {
      vitality: 15,
      attunement: 10,
      endurance: 14,
      strength: 16,
      dexterity: 13,
      resistance: 12,
      intelligence: 9,
      faith: 8,
    },
  },
  bossesDefeated: [
    {
      bossId: 'asylum-demon',
      defeated: true,
      defeatedDate: new Date(Date.now() - 86400000).toISOString(),
      attempts: 3,
      strategyUsed: 'melee-backstab',
    },
  ],
  bonfireActivated: [
    {
      bonfireId: 'firelink-shrine',
      activated: true,
      activatedDate: new Date(Date.now() - 172800000).toISOString(),
      timesRested: 15,
    },
  ],
  covenantProgress: [],
  weaponUpgrades: [],
  questProgress: [],
  achievements: [
    {
      id: 'first-kill',
      name: 'First Blood',
      description: 'Defeat your first boss',
      rarity: 'common',
      unlockedDate: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  itemsCollected: [],
  areaProgression: [
    {
      areaId: 'undead-asylum',
      explored: 100,
      enemiesDefeated: 20,
      treasuresFound: 5,
    },
    {
      areaId: 'undead-parish',
      explored: 45,
      enemiesDefeated: 8,
      treasuresFound: 2,
    },
  ],
  lastUpdated: new Date().toISOString(),
});

router.get('/', (req, res) => {
  return res.json({
    success: true,
    data: createProgressData('current-user'),
    timestamp: new Date().toISOString(),
  });
});

router.put('/', (req, res) => {
  return res.json({
    success: true,
    data: {
      ...createProgressData('current-user'),
      ...req.body,
      lastUpdated: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

router.post('/bosses/:bossId/complete', (req, res) => {
  return res.json({
    success: true,
    data: {
      bossId: req.params.bossId,
      defeated: true,
      completedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

router.post('/areas/:areaId/discover', (req, res) => {
  return res.json({
    success: true,
    data: {
      areaId: req.params.areaId,
      discovered: true,
      discoveredAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

router.post('/quests/:questId/complete', (req, res) => {
  return res.json({
    success: true,
    data: {
      questId: req.params.questId,
      completed: true,
      completedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

router.post('/items/:itemId/collect', (req, res) => {
  return res.json({
    success: true,
    data: {
      itemId: req.params.itemId,
      quantity: req.body.quantity ?? 1,
      collectedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

// Get user progress
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  return res.json({
    success: true,
    data: createProgressData(userId),
    timestamp: new Date().toISOString(),
  });
});

// Update progress
router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  return res.json({
    success: true,
    data: {
      userId,
      updated: updateData,
      timestamp: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

// Add boss defeat
router.post('/:userId/boss-defeat', (req, res) => {
  const { userId } = req.params;
  const { bossId, attempts, strategyUsed } = req.body;

  return res.json({
    success: true,
    data: {
      userId,
      bossId,
      defeated: true,
      attempts,
      strategyUsed,
      timestamp: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
