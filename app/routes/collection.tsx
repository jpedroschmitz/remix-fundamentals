import { Link } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import { Container } from "~/components/container";
import { HomepageHero } from "~/components/hero";

export default function Index() {
  return (
    <div>
      <HomepageHero showTitle={false} />

      <Container className="py-10 space-y-8">
        <Breadcrumb>
          <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
          <BreadcrumbItem to="/collection">Collections</BreadcrumbItem>
          <BreadcrumbItem to="/article">Article</BreadcrumbItem>
        </Breadcrumb>

        {[...Array(5)].map((_, index) => (
          <Link
            to="/article"
            className="w-full bg-slate-50 shadow rounded-sm p-6 block"
            key={index}
          >
            <h2 className="text-xl text-slate-900">Article {index + 1}</h2>
            <p className="text-slate-400 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Link>
        ))}
      </Container>
    </div>
  );
}
