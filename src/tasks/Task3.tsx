import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    // The new Worker constructor points to our separate worker file.
    // This syntax is supported by modern bundlers (Vite, CRA).
    const worker = new Worker(
      new URL("./computation.worker.ts", import.meta.url)
    );

    // Listen for messages (results) from the worker
    worker.onmessage = (event: MessageEvent<number>) => {
      console.log("Main Thread: Received data from worker.");
      setData(event.data);
      worker.terminate(); // Clean up the worker once done
    };

    // Add an error handler for good measure
    worker.onerror = (error) => {
      console.error("Worker error:", error);
      worker.terminate();
    };

    // Send a message to the worker to kick off the computation
    console.log("Main Thread: Posting message to worker.");
    worker.postMessage("start");

    // Cleanup function: ensure the worker is terminated if the component unmounts
    return () => {
      console.log("Main Thread: Terminating worker on component unmount.");
      worker.terminate();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        {data === null
          ? "Calculating data in the background..."
          : `Computed Result: ${data}`}
      </p>
    </div>
  );
}
