import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";
import Image from "../Components/common/Image";

// Static store info (sample text from Figma)
const STORES = [
  { id: 1, city: "London" },
  { id: 2, city: "Bangladesh" },
];

// Floating-label field (same "peer" pattern used in Login.jsx / ProductTabs.jsx).
// The label sits inside the field and moves up into the border on focus or when filled.
const FloatingField = ({ id, label, type = "text", required = false, multiline = false }) => {
  const fieldClass =
    "peer w-full bg-primary-white border-2 border-bg-footer focus:border-primary-black outline-none font-jost text-sm text-primary-black px-4.25 duration-200";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          placeholder=" "
          className={`${fieldClass} h-45 md:h-53 pt-5 resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder=" "
          className={`${fieldClass} h-13.75`}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-3.25 px-1 bg-primary-white font-jost text-sm text-secondColor pointer-events-none duration-200 peer-focus:top-0 peer-focus:text-primary-black peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-primary-black ${
          multiline ? "top-7 -translate-y-1/2" : "top-1/2 -translate-y-1/2"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const [sent, setSent] = useState(false);

  // No backend: we only clear the form and show a thank-you message
  const handleSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-16 md:pb-25">
        <Container>
          <div className="max-w-232.5 mx-auto">
            <h1 className="font-jost font-bold uppercase text-primary-black leading-tight text-2xl sm:text-3xl md:text-[40px] mb-8 md:mb-9">
              Contact Us
            </h1>
          </div>
        </Container>

        {/* Map image: full width, exported from Figma (sample of store locations).
            File: public/images/contact-map.png (the real map goes to Store Location page) */}
        <div className="w-full h-75 md:h-100 xl:h-137.5 bg-bg-footer">
          <Image
            src="/images/contact-map.png"
            alt="Map showing Uomo store locations"
            className="w-full h-full object-cover"
          />
        </div>

        <Container>
          <div className="max-w-232.5 mx-auto">
            {/* Stores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7.5 gap-y-10 mt-10 md:mt-13">
              {STORES.map((store) => (
                <div key={store.id}>
                  <h2 className="font-jost text-xl md:text-2xl font-normal leading-8 text-primary-black mb-5 md:mb-6">
                    Store in {store.city}
                  </h2>
                  <p className="font-jost text-sm leading-6 text-primary-black">
                    1418 River Drive, Suite 35 Cottonhall, CA 9622
                    <br />
                    United States
                  </p>
                  <p className="font-jost text-sm leading-6 text-primary-black mt-6">
                    sale@uomo.com
                    <br />
                    +1 246-345-0695
                  </p>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <h2 className="font-jost text-xl md:text-2xl font-normal leading-8 text-primary-black mt-12 md:mt-16.5 mb-6 md:mb-9.5">
              Get In Touch
            </h2>

            <form onSubmit={handleSubmit}>
              <FloatingField id="contact-name" label="Name *" required />
              <div className="mt-7.5">
                <FloatingField
                  id="contact-email"
                  label="Email address *"
                  type="email"
                  required
                />
              </div>
              <div className="mt-7.5">
                <FloatingField id="contact-message" label="Your Review" multiline />
              </div>

              <button
                type="submit"
                className="mt-7.5 w-full sm:w-50 h-15 bg-primary-black text-primary-white font-jost text-sm font-medium uppercase hover:bg-thirdColor duration-300 cursor-pointer"
              >
                Submit
              </button>

              {sent && (
                <p role="status" className="font-jost text-sm text-primary-black mt-5">
                  Thank you! Your message has been sent.
                </p>
              )}
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
