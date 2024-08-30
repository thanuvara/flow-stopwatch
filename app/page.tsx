"use client";

import React, { useState, useEffect, useRef } from "react";

const AnimatedStopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [dotPosition, setDotPosition] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
        setDotPosition((prevPosition) => (prevPosition + 1) % 1000);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleStartStop = (): void => {
    setIsRunning(!isRunning);
  };

  const handleReset = (): void => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setDotPosition(0);
  };

  const handleLap = (): void => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  const getPointAtLength = (length: number): { x: number; y: number } => {
    if (pathRef.current) {
      const point = pathRef.current.getPointAtLength(length);
      return { x: point.x, y: point.y };
    }
    return { x: 0, y: 0 };
  };

  const dotPositionOnPath = getPointAtLength(
    (dotPosition / 1000) * (pathRef.current?.getTotalLength() || 0)
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 px-4 py-2 rounded ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <svg viewBox="0 0 100 100" width="200" height="200" className="mb-4 p-4">
        <path
          ref={pathRef}
          d="M93.301,100C92.188,99.829,91.075,99.657,89.826,99.114C88.578,98.572,87.194,97.658,85.724,96.489C84.254,95.32,82.697,93.896,81.057,92.216C79.417,90.536,77.693,88.6,75.901,86.448C74.11,84.297,72.25,81.931,70.337,79.389C68.424,76.848,66.457,74.132,64.452,71.289C62.447,68.446,60.403,65.477,58.338,62.434C56.273,59.392,54.186,56.275,52.094,53.14C50.001,50.004,47.903,46.85,45.816,43.733C43.729,40.617,41.653,37.537,39.604,34.549C37.556,31.561,35.535,28.665,33.557,25.912C31.579,23.159,29.644,20.549,27.768,18.129C25.892,15.708,24.075,13.477,22.33,11.474C20.586,9.472,18.914,7.698,17.329,6.185C15.744,4.671,14.244,3.418,12.843,2.447C11.441,1.476,10.138,0.788,8.943,0.394C7.747,0.001,6.66,-0.099,5.69,0.099C4.719,0.296,3.866,0.79,3.136,1.571C2.406,2.352,1.799,3.421,1.321,4.759C0.843,6.096,0.493,7.703,0.274,9.549C0.055,11.396,-0.033,13.483,0.011,15.773C0.055,18.063,0.23,20.556,0.536,23.209C0.842,25.861,1.279,28.673,1.842,31.594C2.405,34.515,3.095,37.545,3.907,40.631C4.718,43.717,5.652,46.858,6.699,50C7.746,53.142,8.907,56.283,10.174,59.369C11.44,62.455,12.811,65.485,14.276,68.406C15.742,71.327,17.301,74.139,18.943,76.791C20.584,79.444,22.307,81.937,24.099,84.227C25.89,86.517,27.75,88.604,29.663,90.451C31.576,92.297,33.543,93.904,35.548,95.241C37.553,96.579,39.597,97.648,41.662,98.429C43.727,99.21,45.814,99.704,47.906,99.901C49.999,100.099,52.097,99.999,54.184,99.606C56.271,99.212,58.347,98.524,60.396,97.553C62.444,96.582,64.465,95.329,66.443,93.815C68.421,92.302,70.356,90.528,72.232,88.526C74.108,86.523,75.925,84.292,77.67,81.871C79.414,79.451,81.086,76.841,82.671,74.088C84.256,71.335,85.756,68.439,87.157,65.451C88.559,62.463,89.862,59.383,91.057,56.267C92.253,53.15,93.34,49.996,94.31,46.86C95.281,43.725,96.134,40.608,96.864,37.566C97.594,34.523,98.201,31.554,98.679,28.711C99.157,25.868,99.507,23.152,99.726,20.611C99.945,18.069,100.033,15.702,99.989,13.552C99.945,11.401,99.77,9.467,99.464,7.784C99.158,6.1,98.721,4.668,98.158,3.511C97.595,2.355,96.905,1.474,96.093,0.886C95.282,0.297,94.348,0,93.301,0C92.254,0,91.093,0.297,89.826,0.886C88.56,1.474,87.189,2.355,85.724,3.511C84.258,4.668,82.699,6.1,81.057,7.784C79.416,9.467,77.693,11.401,75.901,13.552C74.11,15.702,72.25,18.069,70.337,20.611C68.424,23.152,66.457,25.868,64.452,28.711C62.447,31.554,60.403,34.523,58.338,37.566C56.273,40.608,54.186,43.725,52.094,46.86C50.001,49.996,47.903,53.15,45.816,56.267C43.729,59.383,41.653,62.463,39.604,65.451C37.556,68.439,35.535,71.335,33.557,74.088C31.579,76.841,29.644,79.451,27.768,81.871C25.892,84.292,24.075,86.523,22.33,88.526C20.586,90.528,18.914,92.302,17.329,93.815C15.744,95.329,14.244,96.582,12.843,97.553C11.441,98.524,10.138,99.212,8.943,99.606C7.747,99.999,6.66,100.099,5.69,99.901C4.719,99.704,3.866,99.21,3.136,98.429C2.406,97.648,1.799,96.579,1.321,95.241C0.843,93.904,0.493,92.297,0.274,90.451C0.055,88.604,-0.033,86.517,0.011,84.227C0.055,81.937,0.23,79.444,0.536,76.791C0.842,74.139,1.279,71.327,1.842,68.406C2.405,65.485,3.095,62.455,3.907,59.369C4.718,56.283,5.652,53.142,6.699,50C7.746,46.858,8.907,43.717,10.174,40.631C11.44,37.545,12.811,34.515,14.276,31.594C15.742,28.673,17.301,25.861,18.943,23.209C20.584,20.556,22.307,18.063,24.099,15.773C25.89,13.483,27.75,11.396,29.663,9.549C31.576,7.703,33.543,6.096,35.548,4.759C37.553,3.421,39.597,2.352,41.662,1.571C43.727,0.79,45.814,0.296,47.906,0.099C49.999,-0.099,52.097,0.001,54.184,0.394C56.271,0.788,58.347,1.476,60.396,2.447C62.444,3.418,64.465,4.671,66.443,6.185C68.421,7.698,70.356,9.472,72.232,11.474C74.108,13.477,75.925,15.708,77.67,18.129C79.414,20.549,81.086,23.159,82.671,25.912C84.256,28.665,85.756,31.561,87.157,34.549C88.559,37.537,89.862,40.617,91.057,43.733C92.253,46.85,93.34,50.004,94.31,53.14C95.281,56.275,96.134,59.392,96.864,62.434C97.594,65.477,98.201,68.446,98.679,71.289C99.157,74.132,99.507,76.848,99.726,79.389C99.945,81.931,100.033,84.297,99.989,86.448C99.946,88.6,99.771,90.536,99.464,92.216C99.156,93.896,98.717,95.32,98.158,96.489C97.6,97.658,96.922,98.572,96.093,99.114C95.264,99.657,94.283,99.829,93.301,100"
          stroke={isDarkMode ? "#FFFFFF" : "#151414"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle
          cx={dotPositionOnPath.x}
          cy={dotPositionOnPath.y}
          r="2"
          fill="red"
        />
      </svg>
      <div className="text-4xl font-bold mb-4">{formatTime(elapsedTime)}</div>
      <div className="space-x-2 mb-4">
        <button
          onClick={handleStartStop}
          className={`px-4 py-2 rounded ${
            isDarkMode
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className={`px-4 py-2 rounded ${
            isDarkMode
              ? "bg-red-700 text-white hover:bg-red-800"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Reset
        </button>
        <button
          onClick={handleLap}
          className={`px-4 py-2 rounded ${
            isDarkMode
              ? "bg-green-700 text-white hover:bg-green-800"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Lap
        </button>
      </div>
      <div
        className={`w-64 max-h-48 overflow-y-auto ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {laps.map((lap, index) => (
          <div key={index} className="text-lg">
            Lap {index + 1}: {formatTime(lap)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedStopwatch;
