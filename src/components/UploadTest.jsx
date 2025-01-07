import { useState } from "react";

const UploadTest = ({ onComplete }) => {
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [uploading, setUploading] = useState(false);

  const testUploadSpeed = async () => {
    try {
      setUploading(true);

      // Step 1 : Create a dummy file
      const blobTestFile = new Blob([new Array(5 * 1024 * 1024).fill("a").join("")]); // 5 MB blob
      const uploadUrl = "https://httpbin.org/post";

      const startTime = Date.now();
      await fetch(uploadUrl, {
        method: "POST",
        body: blobTestFile,
      });
      const endTime = Date.now();

      const fileSizeInBytes = blobTestFile.size;
      const timeTakenInSeconds = (endTime - startTime) / 1000; // in seconds

      // Step 2: Calculate upload speed
      const uploadSpeedMbps = (fileSizeInBytes * 8) / (timeTakenInSeconds * 1_000_000); // Convert to Mbps

      setUploadSpeed(uploadSpeedMbps.toFixed(2));
      onComplete(uploadSpeedMbps.toFixed(2));
    } catch (error) {
      console.error("Error testing upload speed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Speed Test</h2>
      <button onClick={testUploadSpeed} disabled={uploading}>
        {uploading ? "Testing..." : "Start Test"}
      </button>
      {uploadSpeed && <p>Your upload speed: {uploadSpeed} Mbps</p>}
    </div>
  );
};

export default UploadTest;
