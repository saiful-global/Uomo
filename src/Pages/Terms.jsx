import React from "react";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";

// Static sample text from Figma (lorem ipsum is allowed to stay static)
const TEXT =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const SECTIONS = [
  { id: 1, title: "Your use of this is governed by these terms of use" },
  { id: 2, title: "Use of the content on this website" },
  { id: 3, title: "How long will It take to get my package" },
  { id: 4, title: "Will I receive the same product that see the picture" },
  { id: 5, title: "Limitation of liability" },
  { id: 6, title: "Governing Law & Jurisdiction" },
];

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-16 md:pb-35">
        <Container>
          <div className="max-w-232.5 mx-auto">
            <h1 className="font-jost font-bold uppercase text-primary-black leading-tight text-2xl sm:text-3xl md:text-[40px] mb-10 md:mb-13">
              Terms &amp; Conditions
            </h1>

            {SECTIONS.map((item) => (
              <article key={item.id} className="mb-6 md:mb-7.5 last:mb-0">
                <h2 className="font-jost text-base font-medium leading-6 text-primary-black">
                  {item.title}
                </h2>
                <p className="font-jost text-sm leading-7.5 text-primary-black mt-3.75 px-0.5">
                  {TEXT}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Terms;
