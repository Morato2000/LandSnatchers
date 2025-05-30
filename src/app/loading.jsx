"use client";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingPage() {
  return (
    <>
      <ClipLoader
        color="#3b82f6"
        cssOverride={{ display: "block", margin: "100px auto" }}
        size={400}
        aria-label="loading"
      />
    </>
  );
}

export default LoadingPage;
