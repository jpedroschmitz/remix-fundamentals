import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Container } from "~/components/container";
import { prisma } from "~/db.server";

export async function loader(args: LoaderArgs) {
  const collections = await prisma.collection.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();

  return (
    <Container className="py-10 space-y-8">
      {collections.map((collection) => (
        <Link
          to={`/collections/${collection.id}`}
          className="w-full bg-slate-50 shadow rounded-sm p-6 block"
          key={collection.id}
        >
          <h2 className="text-xl text-slate-900">{collection.name}</h2>
          <p className="text-slate-400 mt-1">{collection.description}</p>
        </Link>
      ))}
    </Container>
  );
}
