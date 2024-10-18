export interface EngagementData {
  id: string;
  timestamp: string;
  state: string;
}

export interface EngagementStats {
  totalEngagements: number;
  engagementPerState: Record<string, number>;
  startDate?: string;
  endDate?: string;
}
