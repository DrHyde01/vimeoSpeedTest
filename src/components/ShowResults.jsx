const ShowResults = ({ bandwidthSpeed, uploadSpeed }) => {
  const downloadRequiredSpeed = 5; // in Mbps
  const uploadRequiredSpeed = 2; // in Mbps

  const isDownloadSufficient = bandwidthSpeed >= downloadRequiredSpeed;
  const isUploadSufficient = uploadSpeed >= uploadRequiredSpeed;

  return (
    <div>
      <div>
        <p style={{ color: isDownloadSufficient ? "green" : "red" }}>
          Download Speed: {bandwidthSpeed} Mbps
          {isDownloadSufficient ? " - Good" : " - Too Slow"}
        </p>
        <p style={{ color: isUploadSufficient ? "green" : "red" }}>
          Upload Speed: {uploadSpeed} Mbps
          {isUploadSufficient ? " - Good" : " - Too Slow"}
        </p>
      </div>
      {isDownloadSufficient && isUploadSufficient ? (
        <p style={{ color: "green" }}>Your network meets Vimeo&apos;s requirements for streaming.</p>
      ) : (
        <p style={{ color: "red" }}>
          Your network does not meet Vimeo&apos;s requirements for streaming. Please check your internet connection.
        </p>
      )}
    </div>
  );
};

export default ShowResults;
