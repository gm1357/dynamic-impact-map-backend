import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const usStates = [
  { code: 'AL', name: 'Alabama', latitude: 32.318230, longitude: -86.902298 },
  { code: 'AK', name: 'Alaska', latitude: 66.160507, longitude: -153.369141 },
  { code: 'AZ', name: 'Arizona', latitude: 34.048927, longitude: -111.093735 },
  { code: 'AR', name: 'Arkansas', latitude: 34.799999, longitude: -92.199997 },
  { code: 'CA', name: 'California', latitude: 36.778259, longitude: -119.417931 },
  { code: 'CO', name: 'Colorado', latitude: 39.113014, longitude: -105.358887 },
  { code: 'CT', name: 'Connecticut', latitude: 41.599998, longitude: -72.699997 },
  { code: 'DE', name: 'Delaware', latitude: 39.000000, longitude: -75.500000 },
  { code: 'FL', name: 'Florida', latitude: 27.994402, longitude: -81.760254 },
  { code: 'GA', name: 'Georgia', latitude: 33.247875, longitude: -83.441162 },
  { code: 'HI', name: 'Hawaii', latitude: 19.741755, longitude: -155.844437 },
  { code: 'ID', name: 'Idaho', latitude: 44.068203, longitude: -114.742043 },
  { code: 'IL', name: 'Illinois', latitude: 40.000000, longitude: -89.000000 },
  { code: 'IN', name: 'Indiana', latitude: 40.273502, longitude: -86.126976 },
  { code: 'IA', name: 'Iowa', latitude: 42.032974, longitude: -93.581543 },
  { code: 'KS', name: 'Kansas', latitude: 38.500000, longitude: -98.000000 },
  { code: 'KY', name: 'Kentucky', latitude: 37.839333, longitude: -84.270020 },
  { code: 'LA', name: 'Louisiana', latitude: 30.391830, longitude: -92.329102 },
  { code: 'ME', name: 'Maine', latitude: 45.367584, longitude: -68.972168 },
  { code: 'MD', name: 'Maryland', latitude: 39.045753, longitude: -76.641273 },
  { code: 'MA', name: 'Massachusetts', latitude: 42.407211, longitude: -71.382439 },
  { code: 'MI', name: 'Michigan', latitude: 44.182205, longitude: -84.506836 },
  { code: 'MN', name: 'Minnesota', latitude: 46.392410, longitude: -94.636230 },
  { code: 'MS', name: 'Mississippi', latitude: 33.000000, longitude: -90.000000 },
  { code: 'MO', name: 'Missouri', latitude: 38.573936, longitude: -92.603760 },
  { code: 'MT', name: 'Montana', latitude: 46.965260, longitude: -109.533691 },
  { code: 'NE', name: 'Nebraska', latitude: 41.500000, longitude: -100.000000 },
  { code: 'NV', name: 'Nevada', latitude: 39.876019, longitude: -117.224121 },
  { code: 'NH', name: 'New Hampshire', latitude: 44.000000, longitude: -71.500000 },
  { code: 'NJ', name: 'New Jersey', latitude: 39.833851, longitude: -74.871826 },
  { code: 'NM', name: 'New Mexico', latitude: 34.307144, longitude: -106.018066 },
  { code: 'NY', name: 'New York', latitude: 43.000000, longitude: -75.000000 },
  { code: 'NC', name: 'North Carolina', latitude: 35.782169, longitude: -80.793457 },
  { code: 'ND', name: 'North Dakota', latitude: 47.650589, longitude: -100.437012 },
  { code: 'OH', name: 'Ohio', latitude: 40.367474, longitude: -82.996216 },
  { code: 'OK', name: 'Oklahoma', latitude: 36.084621, longitude: -96.921387 },
  { code: 'OR', name: 'Oregon', latitude: 44.000000, longitude: -120.500000 },
  { code: 'PA', name: 'Pennsylvania', latitude: 41.203323, longitude: -77.194527 },
  { code: 'RI', name: 'Rhode Island', latitude: 41.742325, longitude: -71.742332 },
  { code: 'SC', name: 'South Carolina', latitude: 33.836082, longitude: -81.163727 },
  { code: 'SD', name: 'South Dakota', latitude: 44.500000, longitude: -100.000000 },
  { code: 'TN', name: 'Tennessee', latitude: 35.860119, longitude: -86.660156 },
  { code: 'TX', name: 'Texas', latitude: 31.000000, longitude: -100.000000 },
  { code: 'UT', name: 'Utah', latitude: 39.419220, longitude: -111.950684 },
  { code: 'VT', name: 'Vermont', latitude: 44.000000, longitude: -72.699997 },
  { code: 'VA', name: 'Virginia', latitude: 37.926868, longitude: -78.024902 },
  { code: 'WA', name: 'Washington', latitude: 47.751076, longitude: -120.740135 },
  { code: 'WV', name: 'West Virginia', latitude: 39.000000, longitude: -80.500000 },
  { code: 'WI', name: 'Wisconsin', latitude: 44.500000, longitude: -89.500000 },
  { code: 'WY', name: 'Wyoming', latitude: 43.075970, longitude: -107.290283 },
];

async function main() {
  await prisma.uSAState.createMany({
    data: usStates.map((state) => ({
      code: state.code,
      name: state.name,
      latitude: state.latitude,
      longitude: state.longitude,
    })),
  });

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
        state: state.code,
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
