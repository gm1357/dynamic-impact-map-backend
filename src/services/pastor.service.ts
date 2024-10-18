import { EngagementData, EngagementStats } from '../types/engagementData';
import { PrismaClient, Engagement } from '@prisma/client';

class PastorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getImpactMapData(pastorId: string): Promise<EngagementData[]> {
    const engagements = await this.prisma.engagement.findMany({
      where: {
        pastorId: parseInt(pastorId),
      },
    });

    return engagements.map((engagement: Engagement) => ({
      id: engagement.id.toString(),
      timestamp: engagement.createdAt.toISOString(),
      state: engagement.state,
    }));
  }

  async getEngagementStats(pastorId: string, startDate?: string, endDate?: string): Promise<EngagementStats> {
    const whereClause: any = {
      pastorId: parseInt(pastorId),
    };

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt.lte = new Date(endDate);
      }
    }

    const engagements = await this.prisma.engagement.findMany({
      where: whereClause,
    });

    const totalEngagements = engagements.length;
    const engagementPerState: Record<string, number> = {};

    engagements.forEach((engagement) => {
      if (engagementPerState[engagement.state]) {
        engagementPerState[engagement.state]++;
      } else {
        engagementPerState[engagement.state] = 1;
      }
    });

    return {
      totalEngagements,
      engagementPerState,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate ? new Date(endDate).toISOString() : undefined,
    };
  }
}

export default new PastorService();
