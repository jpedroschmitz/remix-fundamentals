import { Container } from "~/components/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import type { LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const article = await prisma.article.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      Collection: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    article,
  };
}

export default function Index() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <>
      <Container className="py-10">
        <Breadcrumb>
          <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
          <BreadcrumbItem to={`/collections/${article?.Collection?.id}`}>
            {article?.Collection?.name}
          </BreadcrumbItem>
          <BreadcrumbItem to={`/articles/${article?.id}`}>
            {article?.title}
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>

      <Container className="prose">
        <h1>{article?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article?.content as string }} />
      </Container>
    </>
  );
}
