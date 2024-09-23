"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from "react";

const path: string =
  "M90,96.5C88.9,96.3,87.8,96.1,86.6,95.6C85.4,95.1,84.1,94.2,82.7,93.1C81.3,92,79.8,90.6,78.2,89C76.6,87.4,75,85.5,73.3,83.5C71.6,81.5,69.8,79.2,68,76.8C66.2,74.4,64.3,71.8,62.4,69.1C60.5,66.4,58.6,63.6,56.6,60.7C54.6,57.8,52.6,54.9,50.6,51.9C48.6,49,46.6,46,44.6,43.1C42.6,40.2,40.6,37.3,38.7,34.5C36.8,31.7,34.9,29,33,26.4C31.1,23.8,29.3,21.3,27.5,19C25.7,16.7,24,14.6,22.3,12.7C20.6,10.8,19,9.1,17.5,7.7C16,6.3,14.6,5.1,13.2,4.2C11.9,3.3,10.6,2.6,9.5,2.3C8.3,1.9,7.3,1.8,6.4,2C5.5,2.2,4.7,2.6,4,3.4C3.3,4.1,2.7,5.1,2.3,6.4C1.8,7.6,1.5,9.1,1.3,10.9C1.1,12.6,1,14.6,1.1,16.8C1.1,18.9,1.3,21.3,1.6,23.8C1.9,26.3,2.3,28.9,2.8,31.7C3.3,34.4,4,37.3,4.7,40.2C5.5,43.1,6.4,46.1,7.4,49C8.4,52,9.5,55,10.7,57.9C11.9,60.8,13.2,63.7,14.6,66.4C16,69.2,17.5,71.8,19,74.3C20.6,76.8,22.2,79.2,23.9,81.3C25.6,83.5,27.4,85.5,29.2,87.2C31,89,32.9,90.5,34.8,91.8C36.7,93.1,38.6,94.1,40.6,94.8C42.6,95.6,44.6,96,46.6,96.2C48.6,96.4,50.6,96.3,52.6,95.9C54.6,95.5,56.6,94.9,58.5,93.9C60.5,93,62.4,91.8,64.3,90.4C66.2,88.9,68,87.2,69.8,85.3C71.6,83.4,73.3,81.3,75,79C76.7,76.7,78.3,74.2,79.8,71.6C81.3,69,82.7,66.2,84.1,63.4C85.4,60.6,86.7,57.6,87.8,54.6C89,51.7,90,48.7,90.9,45.7C91.8,42.7,92.6,39.7,93.3,36.8C94,33.9,94.5,31,95,28.2C95.5,25.5,95.8,22.9,96,20.4C96.2,18,96.3,15.7,96.2,13.6C96.2,11.6,96,9.8,95.7,8.2C95.4,6.6,95,5.3,94.5,4.2C93.9,3.1,93.3,2.3,92.5,1.7C91.7,1.2,90.8,0.9,89.8,0.9C88.8,0.9,87.7,1.2,86.5,1.7C85.3,2.3,84,3.1,82.6,4.2C81.2,5.3,79.7,6.6,78.2,8.2C76.6,9.8,75,11.6,73.3,13.6C71.6,15.7,69.8,18,68,20.4C66.2,22.9,64.3,25.5,62.4,28.2C60.5,30.9,58.6,33.8,56.6,36.8C54.6,39.7,52.6,42.7,50.6,45.7C48.6,48.7,46.6,51.7,44.6,54.6C42.6,57.6,40.6,60.6,38.7,63.4C36.8,66.2,34.9,69,33,71.6C31.1,74.2,29.3,76.7,27.5,79C25.7,81.3,24,83.4,22.3,85.3C20.6,87.2,19,88.9,17.5,90.4C16,91.8,14.6,93,13.2,93.9C11.9,94.9,10.6,95.5,9.5,95.9C8.3,96.3,7.3,96.4,6.4,96.2C5.5,96,4.7,95.6,4,94.8C3.3,94.1,2.7,93.1,2.3,91.8C1.8,90.5,1.5,89,1.3,87.2C1.1,85.5,1,83.5,1.1,81.3C1.1,79.2,1.3,76.8,1.6,74.3C1.9,71.8,2.3,69.2,2.8,66.4C3.3,63.7,4,60.8,4.7,57.9C5.5,55,6.4,52,7.4,49C8.4,46.1,9.5,43.1,10.7,40.2C11.9,37.3,13.2,34.4,14.6,31.7C16,28.9,17.5,26.3,19,23.8C20.6,21.3,22.2,18.9,23.9,16.8C25.6,14.6,27.4,12.6,29.2,10.9C31,9.1,32.9,7.6,34.8,6.4C36.7,5.1,38.6,4.1,40.6,3.4C42.6,2.6,44.6,2.2,46.6,2C48.6,1.8,50.6,1.9,52.6,2.3C54.6,2.6,56.6,3.3,58.5,4.2C60.5,5.1,62.4,6.3,64.3,7.7C66.2,9.1,68,10.8,69.8,12.7C71.6,14.6,73.3,16.7,75,19C76.7,21.3,78.3,23.8,79.8,26.4C81.3,29,82.7,31.7,84.1,34.5C85.4,37.3,86.7,40.2,87.8,43.1C89,46,90,49,90.9,51.9C91.8,54.9,92.6,57.8,93.3,60.7C94,63.6,94.5,66.4,95,69.1C95.5,71.8,95.8,74.4,96,76.8C96.2,79.2,96.3,81.5,96.2,83.5C96.2,85.5,96,87.4,95.7,89C95.4,90.6,95,92,94.5,93.1C94,94.2,93.3,95.1,92.5,95.6C91.7,96.1,90.8,96.3,90,96.5";

const AnimatedStopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [dotPosition, setDotPosition] = useState<number | null>(null); // Initialize to null
  const [revolutions, setRevolutions] = useState<number>(0); // Track the number of revolutions
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      setDotPosition(0); // Set initial position to the start of the path
    }
  }, [pathRef.current]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
        setDotPosition((prevPosition) => {
          if (prevPosition === null) return null;
          const totalLength = pathRef.current?.getTotalLength() || 0;
          const increment = totalLength / (10 * 100); // 10 seconds * 100 intervals per second
          const newPosition = (prevPosition + increment) % totalLength;
          if (newPosition < prevPosition) {
            setRevolutions((prevRevolutions) => prevRevolutions + 1);
          }
          return newPosition;
        });
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
    setDotPosition(0); // Reset to the start of the path
    setRevolutions(0); // Reset revolutions
  };

  const handleLap = (): void => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, elapsedTime]);
    }
  };

  const handleStartStopOrLap = (event: React.MouseEvent): void => {
    event.stopPropagation();
    if (isRunning) {
      handleLap();
    } else {
      handleStartStop();
    }
  };

  const getPointAtLength = (length: number): { x: number; y: number } => {
    if (pathRef.current) {
      const point = pathRef.current.getPointAtLength(length);
      return { x: point.x, y: point.y };
    }
    return { x: 0, y: 0 };
  };

  const dotPositionOnPath =
    dotPosition !== null ? getPointAtLength(dotPosition) : { x: 0, y: 0 };

  const totalLength = pathRef.current?.getTotalLength() || 0;
  const safeDotPosition = dotPosition ?? 0; // Provide a default value of 0 if dotPosition is null
  const dashArray = `${safeDotPosition}, ${totalLength - safeDotPosition}`;
  const dashOffset = -safeDotPosition;

  const pathStrokeColor =
    revolutions % 2 === 0 ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)";
  const pathAheadStrokeColor =
    revolutions % 2 === 0 ? "rgba(255, 255, 255, 0.2)" : "#FFFFFF";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col sm:flex-row max-w-3xl gap-6 p-6">
        <div className="flex flex-col h-[28rem] items-center bg-gray-800 p-6 rounded-xl sm:col-span-3">
          <svg
            viewBox="-2 -2 104 104"
            width="300"
            height="300"
            className="mb-4 p-8"
          >
            <path
              ref={pathRef}
              d={path}
              stroke={pathAheadStrokeColor}
              opacity={0.2}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d={path}
              stroke={pathStrokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              className="path"
              style={{ opacity: 0, animation: "fadeIn 0.5s forwards 0.5s" }}
            />
            <circle
              cx={dotPositionOnPath.x}
              cy={dotPositionOnPath.y}
              r="3"
              fill="white"
              style={{ opacity: 0, animation: "fadeIn 0.25s forwards 0.25s" }}
            />
            <style jsx>{`
              @keyframes fadeIn {
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </svg>
          <div className="text-4xl font-medium mb-4 font-mono">
            {formatTime(elapsedTime)}
          </div>
          <div className="space-x-2 mb-4">
            <button
              onClick={handleStartStop}
              className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              onClick={handleReset}
              className={`px-4 py-2 rounded ${
                elapsedTime > 0
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={elapsedTime === 0}
            >
              Reset
            </button>
            <button
              onClick={handleLap}
              className={`px-4 py-2 rounded ${
                isRunning
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!isRunning}
            >
              Lap
            </button>
          </div>
        </div>
        <div
          className="flex flex-col w-full h-48 sm:w-60 sm:h-[28rem] overflow-y-auto hover:bg-gray-800/80 bg-gray-800 p-4 rounded-xl mx-auto items-center cursor-pointer sm:col-span-1"
          onClick={handleStartStopOrLap}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1)",
          }}
        >
          {laps.length === 0 ? (
            <div className="text-center sm:pb-8 my-auto items-center h-auto flex flex-col cursor-pointer">
              <PlusIcon className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-base font-medium text-gray-300">
                No lap times
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start the timer and click &apos;Lap&apos;<br></br>to record
                times.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-3">Lap Times</h2>
              {[...laps].reverse().map((lap, index) => (
                <div
                  key={laps.length - index}
                  className="w-full flex flex-row items-center space-x-2 mb-1 justify-between"
                >
                  <span className="flex items-center justify-center text-xs bg-gray-700 text-gray-50 w-16 text-center py-0.5 rounded-md font-mono">
                    Lap {laps.length - index}
                  </span>
                  <span className="text-lg text-right w-full font-mono">
                    {formatTime(lap)}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedStopwatch;
