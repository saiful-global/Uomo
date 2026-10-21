import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";

// Static sample text from Figma (lorem ipsum is allowed to stay static)
const ANSWER =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const QUESTIONS = [
  "Bring of had which their whose you're it own?",
  "Over shall air can't subdue fly divide him?",
  "Waters one you'll creeping?",
];

const FAQ_GROUPS = [
  { id: "orders", title: "Orders" },
  { id: "shipping", title: "Shipping" },
  { id: "payment", title: "Payment" },
];

// One accordion item (question row + collapsible answer)
const FaqItem = ({ id, question, isOpen, onToggle }) => {
  return (
    <div className="mt-7.5 first:mt-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-answer`}
        className={`w-full flex items-center justify-between gap-4 text-left pb-1.5 border-b duration-300 cursor-pointer ${
          isOpen ? "border-primary-black" : "border-bg-footer"
        }`}
      >
        <span className="font-jost text-sm md:text-base font-medium leading-5 text-primary-black">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="font-jost text-base leading-5 text-primary-black shrink-0 w-4 text-center"
        >
          {isOpen ? "-" : "+"}
        </span>
      </button>

      {/* grid-rows trick: animates height from 0 to auto without JS measuring */}
      <div
        id={`${id}-answer`}
        className={`grid duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-jost text-sm leading-7.5 text-primary-black pt-5 md:pt-7.5 pb-4 px-0.5">
            {ANSWER}
          </p>
        </div>
      </div>
    </div>
  );
};

// One group (heading + 3 questions). Only one answer open per group.
const FaqGroup = ({ group }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-12 md:mt-13.5 first:mt-0">
      <h2 className="font-jost text-xl md:text-2xl font-normal leading-8 text-primary-black mb-5 md:mb-6">
        {group.title}
      </h2>
      {QUESTIONS.map((q, index) => (
        <FaqItem
          key={index}
          id={`${group.id}-${index}`}
          question={q}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
};

const Faq = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-16 md:pb-25">
        <Container>
          <div className="max-w-232.5 mx-auto">
            <h1 className="font-jost font-bold uppercase text-primary-black leading-tight text-2xl sm:text-3xl md:text-[40px] mb-10 md:mb-14">
              Frequently Asked Questions
            </h1>

            {FAQ_GROUPS.map((group) => (
              <FaqGroup key={group.id} group={group} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Faq;
