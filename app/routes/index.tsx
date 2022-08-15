import { Link } from "@remix-run/react";
import { Container } from "~/components/container";

export default function Index() {
  return (
    <Container className="py-10 space-y-8">
      {[...Array(5)].map((_, index) => (
        <Link
          to="/collections/1"
          className="w-full bg-slate-50 shadow rounded-sm p-6 block"
          key={index}
        >
          <h2 className="text-xl text-slate-900">Collection {index + 1}</h2>
          <p className="text-slate-400 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Link>
      ))}
    </Container>
  );
}
