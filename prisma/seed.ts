import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Clean up the tables
  await prisma.collection.deleteMany({});
  await prisma.article.deleteMany({});

  // Create the records
  // Unforunately, createMany is not supported for SQLite :(
  const { id: introductionId } = await prisma.collection.create({
    data: {
      name: "O que é a Coders Club?",
    },
  });

  const { id: platformId } = await prisma.collection.create({
    data: {
      name: "A plataforma da Coders Club",
    },
  });

  const { id: paymentId } = await prisma.collection.create({
    data: {
      name: "Pagamentos",
    },
  });

  await prisma.article.create({
    data: {
      title: "O que é a comunidade Coders Club?",
      content: `A Coders Club é uma comunidade de devs que buscam sair da estagnação e crescerem em suas carreiras.`,
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: "O que a comunidade ensina?",
      content: `A comunidade tem aulas e cursos focados em assuntos que você precisará dominar para crescer na sua carreira como dev. Temos conteúdos sobre portfólio, crescimento na carreira, como conseguir as melhores oportunidades, além de conteúdos técnicos sobre Javascript, Typescript e React.`,
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: "Ainda não trabalho como desenvolvedor, a comunidade é para mim?",
      content: `Com certeza. A comunidade te proporcionará o conteúdo e o contato com pessoas que buscam o mesmo objetivo que você.`,
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: `Vou ter conteúdos sobre como me posicionar e crescer na carreira?`,
      content: `Sim, esse é um dos grandes focos da comunidade, não só ensinar a parte técnica, mas ensinar também como você pode usar esses conhecimentos para crescer na sua carreira de uma vez por todas.`,
      collectionId: introductionId,
    },
  });

  await prisma.article.create({
    data: {
      title: `Como vão funcionar as aulas?`,
      content: `Toda semana nós teremos uma nova aula ao vivo, que são divulgadas no nosso grupo privado. Na plataforma de membros você terá acesso a gravação das mais de 32 aulas, além de outros conteúdos exclusivos.`,
      collectionId: platformId,
    },
  });

  await prisma.article.create({
    data: {
      title: `Como vou receber o acesso ao produto?`,
      content: `Em nosso portal, temos um módulo chamado Comece Aqui. Lá eu apresento toda a comunidade e mostro como você pode ter acesso ao nosso grupo privado.`,
      collectionId: platformId,
    },
  });

  await prisma.article.create({
    data: {
      title: "Como funciona a garantia e reembolso?",
      content: `Você tem até 7 dias para pedir o reembolso e será devolvido 100% do seu investimento.`,
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
