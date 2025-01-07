import { useState, useEffect } from "react";
import BandwidthTest from "./components/BandwidthTest";
import UploadTest from "./components/UploadTest";
import ShowResults from "./components/ShowResults";

import "./App.css";

function App() {
  const [videoId, setVideoId] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [bandwidthSpeed, setBandwidthSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [testsCompleted, setTestsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentVideoId(videoId);
    setTestsCompleted(false);
    setBandwidthSpeed(null);
    setUploadSpeed(null);
  };

  const handleBandwidthTestComplete = (speed) => {
    setBandwidthSpeed(speed);
  };

  const handleUploadTestComplete = (speed) => {
    setUploadSpeed(speed);
  };

  useEffect(() => {
    if (bandwidthSpeed !== null || uploadSpeed !== null) {
      setTestsCompleted(true);
    }
  }, [bandwidthSpeed, uploadSpeed]);

  return (
    <div className="app">
      <h1>Vimeo Bandwidth Test</h1>

      <form className="video-form" onSubmit={handleSubmit}>
        <label>
          Enter the Vimeo video ID here
          <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} placeholder="12345678" />
        </label>
        <button type="submit" disabled={!videoId}>
          Load video
        </button>
      </form>
      {currentVideoId && <BandwidthTest videoId={currentVideoId} onComplete={handleBandwidthTestComplete} />}
      <UploadTest onComplete={handleUploadTestComplete} />
      {testsCompleted && <ShowResults bandwidthSpeed={bandwidthSpeed} uploadSpeed={uploadSpeed} />}
    </div>
  );
}

export default App;
