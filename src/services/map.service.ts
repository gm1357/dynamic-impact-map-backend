import fs from 'fs/promises';
import path from 'path';

export class MapService {
  async getUsStatesMapData() {
    try {
      const filePath = path.join(__dirname, '..', 'data', 'us-states-map.json');
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading US states map data:', error);
      throw new Error('Failed to read US states map data');
    }
  }
}
