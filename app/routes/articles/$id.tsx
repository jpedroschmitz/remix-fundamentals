import { Container } from "~/components/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import type { LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useCatch, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  // check if params.id is a number
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

  if (!article) {
    throw new Response("Not found", {
      status: 404,
    });
  }

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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Container>
      Um erro inesperado aconteceu na página de artigo: {error.message}
    </Container>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <Container>Article not found</Container>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
