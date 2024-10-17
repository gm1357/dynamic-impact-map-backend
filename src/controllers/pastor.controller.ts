import { Request, Response } from 'express';
import pastorService from '../services/pastor.service';

class PastorController {
  async getImpactMap(req: Request, res: Response): Promise<void> {
    try {
      const pastorId = req.params.pastorId;
      const impactMapData = await pastorService.getImpactMapData(pastorId);
      res.json(impactMapData);
    } catch (error) {
      console.error('Error fetching impact map data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new PastorController();
