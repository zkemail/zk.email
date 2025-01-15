"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function RecoveryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const redirect = async () => {
      await router.replace("https://docs.google.com/presentation/d/149zdRpk5ImtJjJqHmtri8rBBobApoqSGq8vwvzcIJoU/edit?usp=drivesdk");
      setIsLoading(false);
    };
    redirect();
  }, [router]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "100vw",
      }}
    >
      {isLoading && (
        <p>
          Redirecting to{" "}
          <a
            href="https://docs.google.com/presentation/d/149zdRpk5ImtJjJqHmtri8rBBobApoqSGq8vwvzcIJoU/edit?usp=drivesdk"
            style={{ textDecoration: "underline" }}
          >
            https://docs.google.com/presentation/d/149zdRpk5ImtJjJqHmtri8rBBobApoqSGq8vwvzcIJoU/edit?usp=drivesdk
          </a>
          ...
        </p>
      )}
    </div>
  );
}
