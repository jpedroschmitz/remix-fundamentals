import { Container } from "~/components/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const formPayload = Object.fromEntries(await request.formData());
  const { title, content, description, collectionId } = formPayload;

  if (!title || !content || !description || !collectionId) {
    return json(
      {
        error: {
          message: "Todos os campos são obrigatórios",
        },
      },
      { status: 400 }
    );
  }

  const { id } = await prisma.article.create({
    data: {
      title: title as string,
      content: content as string,
      description: description as string,
      collectionId: Number(collectionId),
    },
  });

  return redirect(`/articles/${id}`);
}

export async function loader(args: LoaderArgs) {
  const collections = await prisma.collection.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useTransition();
  const isSubmitting = state === "submitting";

  return (
    <>
      <Container className="py-10">
        <Breadcrumb>
          <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
          <BreadcrumbItem to="/articles/new">Novo Artigo</BreadcrumbItem>
        </Breadcrumb>
      </Container>

      <Container className="prose">
        <h1>Novo Artigo</h1>

        <Form
          method="post"
          className="flex flex-col bg-slate-50 p-6 rounded-md"
        >
          <fieldset disabled={isSubmitting} className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Título"
              className="block w-full px-4 rounded-md py-3 text-slate-900 placeholder:text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="block w-full px-4 rounded-md py-3 text-slate-900 placeholder:text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            />
            <textarea
              name="content"
              placeholder="Content"
              className="block w-full px-4 rounded-md py-3 text-slate-900 placeholder:text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            />
            <select
              name="collectionId"
              className="block w-full px-4 rounded-md py-3 text-slate-900 placeholder:text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
            >
              <option value="">Selecione uma collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            {actionData?.error.message && (
              <span className="block text-sm text-red-400 mb-2">
                {actionData.error.message}
              </span>
            )}
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-30"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </fieldset>
        </Form>
      </Container>
    </>
  );
}
