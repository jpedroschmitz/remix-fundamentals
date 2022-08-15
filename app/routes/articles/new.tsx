import { Container } from "~/components/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";

export default function Index() {
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

        <form className="flex flex-col space-y-6 bg-slate-50 p-6 rounded-md">
          <input
            type="text"
            placeholder="Título"
            className="block w-full px-4 rounded-md py-3 text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            className="block w-full px-4 rounded-md py-3 text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
          />
          <textarea
            placeholder="Content"
            className="block w-full px-4 rounded-md py-3 text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
          />
          <select
            name="collectionId"
            className="block w-full px-4 rounded-md py-3 text-slate-400 bg-white ring-1 ring-slate-200 transition-colors text-lg focus:text-slate-900 focus:outline-none"
          >
            <option value="">Selecione uma collection</option>
          </select>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Salvar
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
