import { Request, Response } from 'express';
import pastorService from '../services/pastor.service';

class PastorController {
  async getPastorInfo(req: Request, res: Response): Promise<void> {
    try {
      const pastorId = req.params.pastorId;
      const pastorInfo = await pastorService.getPastorInfo(pastorId);
      res.json(pastorInfo);
    } catch (error) {
      console.error('Error fetching pastor information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getImpactMap(req: Request, res: Response): Promise<void> {
    try {
      const pastorId = req.params.pastorId;
      const startDate = req.query.startDate as string | undefined;
      const endDate = req.query.endDate as string | undefined;
      const limit = parseInt(req.query.limit as string) || 300;
      
      const impactMapData = await pastorService.getImpactMapData(pastorId, startDate, endDate, limit);
      res.json(impactMapData);
    } catch (error) {
      console.error('Error fetching impact map data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getEngagementStats(req: Request, res: Response): Promise<void> {
    try {
      const pastorId = req.params.pastorId;
      const startDate = req.query.startDate as string | undefined;
      const endDate = req.query.endDate as string | undefined;
      
      const engagementStats = await pastorService.getEngagementStats(pastorId, startDate, endDate);
      res.json(engagementStats);
    } catch (error) {
      console.error('Error fetching engagement stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new PastorController();
