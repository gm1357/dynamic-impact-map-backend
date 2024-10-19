import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const usStates = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];

async function main() {
  const pastor = await prisma.pastor.create({
    data: {
      name: 'Pastor Test',
      state: 'CA',
    },
  });

  const engagementPoints: { pastorId: number; state: string; createdAt: Date }[] = [];

  for (const state of usStates) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < randomNumber; i++) {
      // createdAt is a date between 30 days ago and today
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      engagementPoints.push({
        pastorId: pastor.id,
        state,
        createdAt,
      });
    }
  }

  await prisma.engagement.createMany({
    data: engagementPoints,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
