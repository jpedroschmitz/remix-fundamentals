import { Container } from "~/components/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/breadcrumb";
import { HomepageHero } from "~/components/hero";

export default function Index() {
  return (
    <div>
      <HomepageHero showTitle={false} />

      <Container className="py-10">
        <Breadcrumb>
          <BreadcrumbItem to="/">Página Inicial</BreadcrumbItem>
          <BreadcrumbItem to="/collections/1">Collections</BreadcrumbItem>
          <BreadcrumbItem to="/articles/1">Article</BreadcrumbItem>
        </Breadcrumb>
      </Container>

      <Container className="prose">
        <h1>Article</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tristique venenatis ipsum, eget feugiat ligula. Curabitur ultricies
          vitae tellus eu eleifend. Cras volutpat hendrerit ex et porttitor.
          Aenean vestibulum eu nisl vitae tristique. Aenean convallis ex magna,
          vel rutrum mauris facilisis sit amet. Maecenas lacinia, felis sit amet
          cursus molestie, lacus lorem accumsan dolor, et auctor risus elit ut
          ex. Maecenas molestie nec diam vel pretium. Phasellus ultricies arcu
          vehicula, commodo felis vitae, laoreet arcu. Integer sit amet varius
          est. Vivamus tempor pulvinar mauris in porttitor.
        </p>
        <p>
          Fusce at blandit libero. Nunc sed orci malesuada, porta erat eu,
          semper erat. Fusce congue dictum turpis, a convallis tellus sodales
          in. Phasellus sollicitudin odio sit amet lacus sodales tempor. Nullam
          finibus arcu odio, vitae bibendum lacus dignissim id. Suspendisse eu
          turpis elementum, egestas nibh at, ultrices diam. Quisque at convallis
          lacus. Sed rhoncus pharetra sodales. Mauris dignissim, eros semper
          tristique placerat, lectus orci malesuada tortor, vitae aliquet urna
          nisi vel ex. Suspendisse potenti. Phasellus est ligula, sodales sit
          amet lectus sit amet, tempor dapibus sem. Morbi sollicitudin dui vitae
          sagittis volutpat. Integer faucibus, mi sit amet tincidunt tempor,
          magna massa gravida massa, vel lacinia eros nisl nec enim. Nulla
          ultricies est quis porta sodales. Duis lacus mauris, luctus et
          vulputate quis, aliquet et orci.
        </p>
        <p>
          Proin condimentum convallis risus, eget sodales est ultricies nec.
          Maecenas non mauris quis nisi vestibulum porttitor. Duis eget
          tincidunt tellus. Quisque interdum felis ac ex ornare finibus. Fusce
          tristique lectus ut volutpat accumsan. Aliquam ornare sapien augue,
          vitae faucibus sem blandit sed. Duis a mi varius, aliquet ex vel,
          luctus arcu. Fusce eget tincidunt purus.
        </p>
      </Container>
    </div>
  );
}
