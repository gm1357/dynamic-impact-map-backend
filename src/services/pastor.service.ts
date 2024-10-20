import { PASTOR_NOT_FOUND } from '../constants/error-messages';
import { EngagementData, EngagementStats } from '../types/engagementData';
import { PrismaClient, Engagement } from '@prisma/client';

class PastorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getPastorInfo(pastorId: string): Promise<{ id: string; name: string, state: string }> {
    const parsedId = parseInt(pastorId);
    if (isNaN(parsedId)) {
      throw new Error(PASTOR_NOT_FOUND);
    }

    const pastor = await this.prisma.pastor.findUnique({
      where: {
        id: parsedId,
      },
      select: {
        id: true,
        name: true,
        state: true,
      },
    });

    if (!pastor) {
      throw new Error(PASTOR_NOT_FOUND);
    }

    return {
      id: pastor.id.toString(),
      name: pastor.name,
      state: pastor.state,
    };
  }

  async getImpactMapData(pastorId: string, startDate?: string, endDate?: string, limit: number = 300): Promise<EngagementData[]> {
    const parsedId = parseInt(pastorId);
    if (isNaN(parsedId)) {
      throw new Error(PASTOR_NOT_FOUND);
    }

    const start = startDate ? new Date(startDate) : new Date(new Date().setHours(0, 0, 0, 0));
    const end = endDate ? new Date(endDate) : new Date();

    const engagements = await this.prisma.engagement.findMany({
      where: {
        pastorId: parsedId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: limit,
    });

    return engagements.map((engagement: Engagement) => ({
      id: engagement.id.toString(),
      timestamp: engagement.createdAt.toISOString(),
      state: engagement.state,
    }));
  }

  async getEngagementStats(pastorId: string, startDate?: string, endDate?: string): Promise<EngagementStats> {
    const parsedId = parseInt(pastorId);
    if (isNaN(parsedId)) {
      throw new Error(PASTOR_NOT_FOUND);
    }

    const whereClause: any = {
      pastorId: parsedId,
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
