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

  const workerCount: Record<string, number> = {};

  completedShifts.forEach((shift) => {
    if (!shift.workerId) return;

    if (!workerCount[shift.workerId]) {
      workerCount[shift.workerId] = 0;
    }
    workerCount[shift.workerId]++;
  });

  const workers = await prisma.worker.findMany();

  const result = workers
    .map((worker) => ({
      name: worker.name,
      shifts: workerCount[worker.id] || 0,
    }))
    .sort((a, b) => b.shifts - a.shifts)
    .slice(0, 3);

  console.log(JSON.stringify(result, null, 2));

  await app.close();
}

bootstrap();