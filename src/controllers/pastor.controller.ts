import { Request, Response } from 'express';
import pastorService from '../services/pastor.service';
import { INTERNAL_SERVER_ERROR, PASTOR_NOT_FOUND } from '../constants/error-messages';

class PastorController {
  async getPastorInfo(req: Request, res: Response): Promise<void> {
    try {
      const pastorId = req.params.pastorId;
      const pastorInfo = await pastorService.getPastorInfo(pastorId);
      res.json(pastorInfo);
    } catch (error) {
      console.error('Error fetching pastor information:', error);
      if (error instanceof Error && error.message === PASTOR_NOT_FOUND) {
        res.status(404).json({ error: PASTOR_NOT_FOUND });
      } else {
        res.status(500).json({ error: INTERNAL_SERVER_ERROR });
      }
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
      if (error instanceof Error && error.message === PASTOR_NOT_FOUND) {
        res.status(404).json({ error: PASTOR_NOT_FOUND });
      } else {
        res.status(500).json({ error: INTERNAL_SERVER_ERROR });
      }
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
      if (error instanceof Error && error.message === PASTOR_NOT_FOUND) {
        res.status(404).json({ error: PASTOR_NOT_FOUND });
      } else {
        res.status(500).json({ error: INTERNAL_SERVER_ERROR });
      }
    }
  }
}

export default new PastorController();
