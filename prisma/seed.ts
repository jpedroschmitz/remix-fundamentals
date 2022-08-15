import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function fakeContent() {
  const randomNumber = Math.floor(Math.random() * 7) + 1;
  return faker.lorem.paragraphs(randomNumber, "<br/>");
}

async function seed() {
  // Clean up the tables
  await prisma.collection.deleteMany({});
  await prisma.article.deleteMany({});

  // Create the records
  // Unforunately, createMany is not supported for SQLite :(
  const { id: introductionId } = await prisma.collection.create({
    data: {
      name: "O que é a Coders Club?",
      description: faker.lorem.lines(1),
    },
  });

  const { id: platformId } = await prisma.collection.create({
    data: {
      name: "A plataforma da Coders Club",
      description: faker.lorem.lines(1),
    },
  });

  const { id: paymentId } = await prisma.collection.create({
    data: {
      name: "Pagamentos",
      description: faker.lorem.lines(1),
    },
  });

  await prisma.article.create({
    data: {
      title: "O que é a comunidade Coders Club?",
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: "O que a comunidade ensina?",
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: "Ainda não trabalho como desenvolvedor, a comunidade é para mim?",
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: `Vou ter conteúdos sobre como me posicionar e crescer na carreira?`,
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: `Como vão funcionar as aulas?`,
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: platformId,
    },
  });

  await prisma.article.create({
    data: {
      title: `Como vou receber o acesso ao produto?`,
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: platformId,
    },
  });

  await prisma.article.create({
    data: {
      title: "Como funciona a garantia e reembolso?",
      description: faker.lorem.lines(1),
      content: fakeContent(),
      collectionId: paymentId,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
