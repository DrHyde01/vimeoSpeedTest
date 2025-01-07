import { useState } from "react";

const BandwidthTest = ({ videoId, onComplete }) => {
  const [bandwidthSpeed, setBandwidthSpeed] = useState(null);
  const [loading, setLoading] = useState(false);

  const vimeoVideoUrl = `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/${videoId}`;

  const testBandwidth = async () => {
    try {
      setLoading(true);

      // Step 1 : Get metadata for the video
      const res = await fetch(vimeoVideoUrl);
      const data = await res.json();

      const videoUrl = data.thumbnail_url.replace(/_[0-9]+x[0-9]+/, ""); // Placeholder for video URL adjustment

      // Step 2 : Download a chunk of the video
      const startTimestamp = Date.now();
      const videoResponse = await fetch(videoUrl, {
        method: "GET",
        headers: { Range: "bytes=0-999999" },
      });

      const blob = await videoResponse.blob();
      const endTime = Date.now();

      const fileSize = blob.size;
      const downloadDuration = (endTime - startTimestamp) / 1000; // in seconds

      // Step 3 : Calculate bandwidth
      const bandwidthSpeedMbps = fileSize / downloadDuration / 1024 / 1024; // in Mbps

      setBandwidthSpeed(bandwidthSpeedMbps.toFixed(2));
      onComplete(bandwidthSpeedMbps.toFixed(2));
    } catch (error) {
      console.error("Error during bandwidth test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Bandwidth Test</h2>
      <button onClick={testBandwidth} disabled={loading}>
        {loading ? "Testing..." : "Start Test"}
      </button>
      {bandwidthSpeed && <p>Your bandwidth: {bandwidthSpeed} Mbps</p>}
    </div>
  );
};

export default BandwidthTest;
