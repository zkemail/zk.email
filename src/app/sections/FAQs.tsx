"use client";

import { useRef, useState } from "react";
import Button from "../components/Button";
import Image from "next/image";
import { useAnimateIn } from "../hooks/useAnimateIn";

const AccordianItem = ({
  faq,
  index,
  handleToggle,
  open,
}: {
  faq: { question: string; answer: string };
  index: number;
  handleToggle: (index: number) => void;
  open: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null); // Typing the ref correctly

  return (
    <div key={faq.question}>
      <button
        className="flex items-center justify-between w-full py-3 text-left text-lg font-medium focus:outline-none"
        onClick={() => handleToggle(index)}
      >
        <div className="flex gap-3 items-center">
          <div className="w-3 h-3 rotate-[-45deg] rounded-[2.268px] border border-[#2962A5] bg-[#062E5D]"></div>
          <span className="body1">{faq.question}</span>
        </div>
        <span>
          <Image
            src={"/assets/ChevronDown.svg"}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
            alt="chevron-icon"
            height={20}
            width={20}
          />
        </span>
      </button>
      <div
        className="overflow-y-hidden transition-all ml-6 m-2 text-[#A8A8A8]"
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      >
        <div ref={ref}>{faq.answer}</div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [styles, ref] = useAnimateIn();
  // Function to toggle FAQ open/close
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ content
  const FAQ = [
    {
      question: "How do you selectively reveal content in an email?",
      answer:
        "We can hide any information or selectively reveal any text, whether that's the sender, receiver, subject, or body etc. We do this via zero knowledge proofs of regex, which we invented. Regex is short for regular expression, a kind of search pattern used for string matching within text. It consists of a sequence of characters that define a search pattern, enabling complex searches, substitutions, and string manipulations. In the context of ZK Email, these let us parse email headers and bodies, extract relevant information, and reveal only data that the user wants to publish.",
    },
    {
      question: "How do you keep user data private and users anonymous?",
      answer:
        "ZK Email leverages zero knowledge proofs and client side proving in the browser to provide a verifiable yet anonymous way to confirm an emails contents and recipients. Zero knowledge proofs allow provers to prove that they know or possess certain information, without revealing the full email itself to a verifier or a server. In ZK Email, this technology is used to verify email address ownership, email contents, and more, without exposing sensitive data to other users. We allow browser-only client side proving options where possible, to ensure that users don't need to trust us with their email data to keep their data private. No email data is sent to our servers, unless users opt for server-side proofs.",
    },
    {
      question: "How much do I need to trust you?",
      answer:
        "We have put in significant effort to make our system trust-minimized. The only person who can generate valid ZK Email proof is the email recipient -- even the ZK Email team cannot fake a proof. We have had 4 audits on our code to ensure security, and all of our code is open source.",
    },
    {
      question: "How do you verify the email contents?",
      answer:
        "Almost all emails are signed by the sending domain server, using an algorithm called DKIM. It can be summarized as this rsa_sign(sha256(from:..., to:..., subject:..., <body hash>,...), private key). Every time an email is sent, ZK Email verifies this signature within a zero knowledge proof -- this can verify the sender, receiver, the subject, or parts of the body, while ensuring the public key corresponds to the correct one in DNS."
    },
  ];

  return (
    <section>
      <div
        ref={ref}
        style={styles}
        className="w-full my-10 z-10 container-width container-padding"
      >
        <div className="flex flex-col items-center lg:items-start lg:flex-row justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-3 lg:mb-6 h3 text-center lg:text-left ">
              FAQs
            </h1>
            <p className="text-center lg:text-left mb-6 lg:mb-4 text-[#A8A8A8]">
              Quick answers to the common questions you might have.{" "}
              <br className="hidden md:inline"></br>
              Can’t find what you looking for? Read our docs or{" "}
              <a
                href="https://t.me/zkemail"
                className=" underline text-[#F5F3EF]"
              >
                contact us
              </a>
            </p>
          </div>
          <div>
            <Button
              endIcon={
                <Image
                  height={16}
                  width={16}
                  src="/assets/CaretRight.svg"
                  alt="caret-right"
                />
              }
              href="https://docs.zk.email"
            >
              Read Docs
            </Button>
          </div>
        </div>

        <div className=" py-6 text-white rounded-md text-left">
          {FAQ.map((faq, index) => (
            <AccordianItem
              key={faq.question}
              faq={faq}
              index={index}
              handleToggle={handleToggle}
              open={openIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
