import type { LoaderArgs } from "@remix-run/node";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { Container } from "~/components/container";
import { prisma } from "~/db.server";

export async function loader({ params }: LoaderArgs) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      name: true,
      articles: {
        select: {
          id: true,
          title: true,
          description: true,
        },
      },
    },
  });

  if (!collection) {
    throw new Response("Not found", {
      status: 404,
    });
  }

  return {
    collection,
  };
}

export default function Index() {
  const { collection } = useLoaderData<typeof loader>();

  return (
    <Container className="py-10 space-y-8">
      <Breadcrumb>
        <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
        <BreadcrumbItem to={`/collections/${collection?.id}`}>
          {collection?.name}
        </BreadcrumbItem>
      </Breadcrumb>

      {collection?.articles.map((article) => (
        <Link
          to={`/articles/${article.id}`}
          className="w-full bg-slate-50 shadow rounded-sm p-6 block"
          key={article.id}
        >
          <h2 className="text-xl text-slate-900">{article.title}</h2>
          <p className="text-slate-400 mt-1">{article.description}</p>
        </Link>
      ))}
    </Container>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Container>
      Um erro inesperado aconteceu na página de collections: {error.message}
    </Container>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <Container>Collection not found</Container>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
