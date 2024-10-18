import { EngagementData } from '../types/engagementData';
import { PrismaClient, Engagement } from '@prisma/client';

class PastorService {
  async getImpactMapData(pastorId: string): Promise<EngagementData[]> {
    const prisma = new PrismaClient();

    const engagements = await prisma.engagement.findMany({
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
}

export default new PastorService();
