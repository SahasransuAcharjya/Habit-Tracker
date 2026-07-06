const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "sahasransu@example.com" },
    update: {},
    create: {
      name: "Sahasransu Acharjya",
      email: "sahasransu@example.com",
      passwordHash: hashedPassword,
      assistantTone: "STRICT",
    },
  });

  const studyTask = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Study for competitive exam",
      description: "Complete quant practice and revise aptitude notes.",
      category: "Study",
      type: "RECURRING",
      priority: "HIGH",
      isRecurring: true,
      recurrenceDays: [1, 2, 3, 4, 5, 6],
      reminderEnabled: true,
      reminderInterval: 30,
      autoMarkMissed: true,
    },
  });

  const workoutTask = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Workout session",
      description: "45 minutes bodyweight + stretching.",
      category: "Fitness",
      type: "RECURRING",
      priority: "MEDIUM",
      isRecurring: true,
      recurrenceDays: [1, 3, 5, 6],
      reminderEnabled: true,
      reminderInterval: 20,
      autoMarkMissed: true,
    },
  });

  const portfolioTask = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Work on portfolio project",
      description: "Build backend APIs for activity assistant.",
      category: "Development",
      type: "ONE_TIME",
      priority: "HIGH",
      reminderEnabled: true,
      reminderInterval: 45,
      autoMarkMissed: true,
    },
  });

  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  await prisma.taskInstance.createMany({
    data: [
      {
        userId: user.id,
        taskId: studyTask.id,
        scheduledDate: todayOnly,
        status: "COMPLETED",
        completedAt: new Date(),
        scoreAwarded: 20,
        reminderSentCount: 2,
      },
      {
        userId: user.id,
        taskId: workoutTask.id,
        scheduledDate: new Date(todayOnly.getTime() + 24 * 60 * 60 * 1000),
        status: "PENDING",
        scoreAwarded: 0,
        reminderSentCount: 0,
      },
      {
        userId: user.id,
        taskId: portfolioTask.id,
        scheduledDate: todayOnly,
        status: "MISSED",
        missedAt: new Date(),
        scoreAwarded: 0,
        reminderSentCount: 3,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.habit.createMany({
    data: [
      {
        userId: user.id,
        title: "Morning revision",
        description: "Revise key concepts every morning.",
        category: "Study",
        frequency: "DAILY",
        targetDays: [1, 2, 3, 4, 5, 6, 0],
        streakCount: 5,
        longestStreak: 9,
        lastCompletedDate: todayOnly,
      },
      {
        userId: user.id,
        title: "Evening walk",
        description: "20-minute walk after dinner.",
        category: "Health",
        frequency: "DAILY",
        targetDays: [1, 2, 3, 4, 5, 6, 0],
        streakCount: 3,
        longestStreak: 6,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.dailyReport.upsert({
    where: {
      userId_reportDate: {
        userId: user.id,
        reportDate: todayOnly,
      },
    },
    update: {},
    create: {
      userId: user.id,
      reportDate: todayOnly,
      totalTasks: 3,
      completedTasks: 1,
      missedTasks: 1,
      skippedTasks: 0,
      completionRate: 33.33,
      score: 42,
      summary: "You finished some work, but too much was left hanging.",
      praiseMessage: "You did manage to complete one high-value task.",
      warningMessage: "You missed important commitments today.",
      motivationMessage: "Tomorrow needs less delay and more execution.",
      toneUsed: "STRICT",
    },
  });

  await prisma.notificationSubscription.upsert({
    where: {
      endpoint: "https://example.com/push/demo-endpoint",
    },
    update: {},
    create: {
      userId: user.id,
      endpoint: "https://example.com/push/demo-endpoint",
      p256dh: "demo_p256dh_key",
      auth: "demo_auth_key",
      deviceName: "Android Phone",
      isActive: true,
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });