"use client";

import Image from "next/image";
import { dateFormatter } from "../utils/dateFormatter";
import { useAnimateIn } from "../hooks/useAnimateIn";

type ChangelogType = { date: string; content: string };

const ChangelogsContent = ({ changeLogs }: { changeLogs: ChangelogType[] }) => {
  const [sectionStyles, sectionRef] = useAnimateIn(true, { delay: 0 });

  return (
    <div
      ref={sectionRef}
      className="container-width container-padding m-auto"
      style={{ ...sectionStyles, paddingTop: "10rem", paddingBottom: "10rem" }}
    >
      <div>
        <p className="h3 text-left" style={{ textAlign: "left" }}>
          Changelogs
        </p>
        <p className="sutitle1">Latest updates from team ZK Email</p>
      </div>

      <div className="w-full py-8">
        <div>
          {changeLogs?.map((log: ChangelogType, index: number) => (
            <div
              key={log.date}
              //   ref={index === 0 ? firstDateRef : null}
              className="flex flex-col md:flex-row"
            >
              <div className="mb-24  md:block hidden">
                <div className="w-36 sticky top-20">
                  <div className="mt-1 body1" style={{ color: "#D4D4D4" }}>
                    {dateFormatter(log?.date)}
                  </div>
                  <Image
                    className=" h-4 w-4 max-w-max absolute"
                    style={{
                      left: "calc(100% + 48px)",
                      transform: "translateX(-50%)",
                      top: 6,
                    }}
                    src="/assets/BlueDiamond.svg"
                    alt="◆"
                    height={20}
                    width={20}
                    layout="responsive"
                  />
                </div>
              </div>
              <div
                className={`mx-12 relative md:block hidden ${
                  index === 0 ? "mt-6" : "mt-0"
                }`}
                style={{
                  width: 0,
                  border: "1px solid #272727",
                  zIndex: -1,
                }}
              />
              <div
                className="mt-1 body1 block md:hidden"
                style={{ color: "#D4D4D4" }}
              >
                {dateFormatter(log?.date)}
              </div>
              <div>
                <article
                  className={`prose lg:prose-xl prose-invert dark:prose-invert-xl max-w-full ${
                    index === changeLogs.length - 1 ? "mb-0" : "mb-24"
                  }`}
                  style={{ fontSize: 16 }}
                >
                  {log?.content}
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangelogsContent;
