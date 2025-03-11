"use client";
import { useEffect, useRef, useState } from "react";
import SlideHolder from "./components/SlideHolder";
import { PlaneAnimation } from "./components/PlaneAnimation";
import { haversineDistance } from "./lib/haversine";

const CENTER_LAT = parseFloat(process.env.NEXT_PUBLIC_CENTER_LAT || "0");
const CENTER_LON = parseFloat(process.env.NEXT_PUBLIC_CENTER_LON || "0");
const RADIUS_KM = parseFloat(process.env.NEXT_PUBLIC_RADIUS_KM || "0");

export default function Home() {
  const [statePlaneData, setStatePlaneData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const currentCallsign = useRef<string>("");
  const splideRef = useRef<any>(null);

  const planeSlide = [
    {
      title: "Origin City",
      stat: statePlaneData?.origin?.municipality,
      width: "w-7/12",
    },
    {
      title: "Airport Code",
      stat: statePlaneData?.origin?.iata_code,
      width: "w-5/12",
    },
  ];

  const slides = [
    {
      title: "Current Time",
      stat: currentTime,
      width: "w-full",
    },
  ];

  const getPlanesAround = async () => {
    try {
      const planesAround = await fetch("/api/aircraft");
      const response = await planesAround.json();

      const planeDistances = response.aircraft
        .map((plane: any) => {
          if (!plane.flight || !plane.lat || !plane.lon) {
            return null;
          }
          const distance = haversineDistance(
            CENTER_LAT,
            CENTER_LON,
            plane.lat,
            plane.lon
          );
          if (distance > RADIUS_KM) {
            return null;
          }
          return { ...plane, distance };
        })
        .filter((plane: any) => plane !== null);

      if (planeDistances.length === 0) {
        setStatePlaneData(null);
        return;
      }

      try {
        const nearestPlaneCallsign = planeDistances[0]?.flight.trim();
        if (currentCallsign.current === nearestPlaneCallsign) {
          return;
        }
        currentCallsign.current = nearestPlaneCallsign;
        const flightDetails = await fetch(
          `/api/getroute?callsign=${nearestPlaneCallsign}`
        );
        const flightInfo = await flightDetails.json();

        if (flightDetails.ok) {
          const flightRoute = flightInfo.response.flightroute;
          console.log("Flight route:", flightRoute);
          setStatePlaneData(flightRoute);
        } else {
          console.error("Error fetching flight details:", flightInfo.error);
        }
      } catch (error) {
        console.error("Failed to fetch aircraft data", error);
      }
    } catch (error) {
      console.error("Failed to fetch aircraft data", error);
    }
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    getPlanesAround();
    // Fetch aircraft data every 10 seconds
    const planeInterval = setInterval(() => {
      getPlanesAround();
    }, 10000);
    return () => clearInterval(planeInterval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black">
      {statePlaneData && <PlaneAnimation />}
      <SlideHolder
        slides={statePlaneData ? planeSlide : slides}
        splideRef={splideRef}
      />
    </div>
  );
}
