import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { PrismaService } from "../modules/prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const prisma = app.get(PrismaService);

  const now = new Date();

  const completedShifts = await prisma.shift.findMany({
    where: {
      workerId: { not: null },
      endAt: { lt: now },
    },
  });

  const workplaceCount: Record<string, number> = {};

  completedShifts.forEach((shift) => {
    if (!workplaceCount[shift.workplaceId]) {
      workplaceCount[shift.workplaceId] = 0;
    }
    workplaceCount[shift.workplaceId]++;
  });

  const workplaces = await prisma.workplace.findMany();

  const result = workplaces
    .map((wp) => ({
      name: wp.name,
      shifts: workplaceCount[wp.id] || 0,
    }))
    .sort((a, b) => b.shifts - a.shifts)
    .slice(0, 3);

  console.log(JSON.stringify(result, null, 2));

  await app.close();
}

bootstrap();