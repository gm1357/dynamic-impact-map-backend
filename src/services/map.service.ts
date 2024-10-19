import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export class MapService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUSAStatesMapData() {
    try {
      const filePath = path.join(__dirname, '..', 'data', 'us-states-map.json');
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading US states map data:', error);
      throw new Error('Failed to read US states map data');
    }
  }

  async getUSAStates() {
    try {
      const states = await this.prisma.uSAState.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return states;
    } catch (error) {
      console.error('Error fetching US states from database:', error);
      throw new Error('Failed to fetch US states');
    }
  }
}
