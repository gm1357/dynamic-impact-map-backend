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
  await prisma.pastor.create({
    data: {
      name: 'Pastor Test',
    },
  });

  const engagementPoints: { pastorId: number; state: string }[] = [];

  for (const state of usStates) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < randomNumber; i++) {
      engagementPoints.push({
        pastorId: 1,
        state,
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
