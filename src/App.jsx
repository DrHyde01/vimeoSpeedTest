import { useState } from "react";
import BandwidthTest from "./components/BandwidthTest";
import UploadTest from "./components/UploadTest";

import "./App.css";

function App() {
  const [videoId, setVideoId] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentVideoId(videoId);
  };

  return (
    <div className="app">
      <h1>Vimeo Bandwidth Test</h1>

      <form className="video-form" onSubmit={handleSubmit}>
        <label>
          Enter the Vimeo video ID here
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="e.g., 12345678"
          />
        </label>
        <button type="submit">Load video</button>
      </form>
      {currentVideoId && <BandwidthTest videoId={currentVideoId} />}
      <UploadTest />
    </div>
  );
}

export default App;
