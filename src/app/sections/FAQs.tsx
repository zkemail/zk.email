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
        "We can hide any information or selectively reveal any text, wether that’s the sender, receiver, subject, body etc using Regex. Regex is short for regular expression, this term represents sequence of characters that forms a search pattern, commonly used for string matching within text. It consists of a sequence of characters that define a search pattern, enabling complex searches, substitutions, and string manipulations. For example, in programming and text processing, regex can identify, extract, or replace specific text patterns, such as email addresses, dates, or phone numbers, by defining these patterns through a combination of literal characters and special symbols. In the context of ZK Email it is used to parse email headers and extract relevant information.",
    },
    {
      question: "How can I do it anonymously?",
      answer:
        "ZK Email leverages the principles of Zero Knowledge proofs and serverless execution within the browser to provide a verifiable yet anonymous way to confirm an email's contents and recipients. Zero Knowledge proofs allow provers to prove that they know or possess certain information without revealing the information itself to a verifier. In ZK Email, this technology is used to verify user identity and email content without exposing sensitive data to a server or other users. The serverless architecture means that all proof generation is executed entirely within the user's browser.",
    },
    {
      question: "Why do I need to trust you?",
      answer:
        "The DKIM email signitures do not contain information we can use to sign other emails, all our code is open source and being audited",
    },
    {
      question: "How do you verify the email contents?",
      answer:
        "We use the existing DKIM Signiture, almost all emails are signed by the sending domain server using an algorithm called DKIM. It can be summarized as this rsa_sign(sha256(from:..., to:..., subject:..., <body hash>,...), private key). Every time an email is sent we can verify the sender, receiver, the subject, the body by checking if the corresponding public key of the email address applied on the DKIM signiture returns the sha256(from:..., to:..., subject:..., <body hash>,...) a hash of the from, to subject, email details which we can check by rehashing",
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
