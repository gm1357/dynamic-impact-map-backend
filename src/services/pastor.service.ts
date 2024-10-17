import { EngagementData } from '../types/engagementData';

class PastorService {
  async getImpactMapData(pastorId: string): Promise<EngagementData[]> {
    return [
      { id: '1', timestamp: new Date().toISOString(), state: 'CA' },
      { id: '2', timestamp: new Date().toISOString(), state: 'NY' },
      // ... more mock data
    ];
  }
}

export default new PastorService();
