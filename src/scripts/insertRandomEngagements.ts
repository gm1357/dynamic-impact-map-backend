import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const PASTOR_ID = 1;
const RUN_CADENCE = 60000; // 1 minute

async function insertRandomEngagements() {
  try {
    const pastor = await prisma.pastor.findFirst({
      select: { id: true },
      where: { id: PASTOR_ID }
    });

    if (!pastor) {
      console.error('No pastor found in the database');
      return;
    }

    const numberOfEngagements = Math.floor(Math.random() * 491) + 10; // Random number between 10 and 500
    const engagements = [];

    for (let i = 0; i < numberOfEngagements; i++) {
      // createdAt is a date between 1 minute ago and right now
      const createdAt = new Date(Date.now() - Math.random() * 60 * 1000);
      engagements.push({
        pastorId: pastor.id,
        state: usStates[Math.floor(Math.random() * usStates.length)],
        createdAt
      });
    }

    await prisma.engagement.createMany({
      data: engagements
    });

    console.log(`Inserted ${numberOfEngagements} random engagements`);
  } catch (error) {
    console.error('Error inserting random engagements:', error);
  }
}

async function main() {
  console.log('Starting random engagement insertion script...');

  await insertRandomEngagements();

  setInterval(async () => {
    await insertRandomEngagements();
  }, RUN_CADENCE);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

