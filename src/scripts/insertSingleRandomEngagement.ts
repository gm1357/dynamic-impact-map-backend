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

async function insertSingleRandomEngagement(state?: string) {
  try {
    const pastor = await prisma.pastor.findFirst({
      select: { id: true },
      where: { id: PASTOR_ID }
    });

    if (!pastor) {
      console.error('No pastor found in the database');
      return;
    }

    let selectedState = state;
    if (!selectedState || !usStates.includes(selectedState.toUpperCase())) {
      selectedState = usStates[Math.floor(Math.random() * usStates.length)];
    } else {
      selectedState = selectedState.toUpperCase();
    }

    const createdAt = new Date();
    const engagement = {
      pastorId: pastor.id,
      state: selectedState,
      createdAt
    };

    await prisma.engagement.create({
      data: engagement
    });

    console.log(`Inserted 1 engagement for state: ${selectedState}`);
  } catch (error) {
    console.error('Error inserting engagement:', error);
  }
}

async function main() {
  console.log('Starting single engagement insertion script...');

  const inputState = process.argv[2];
  await insertSingleRandomEngagement(inputState);

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
