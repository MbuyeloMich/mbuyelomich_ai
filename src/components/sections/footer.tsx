"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LocationIcon from "@/components/icons/location";
import BoltIcon from "@/components/icons/bolt";
import CloudSunIcon from "@/components/icons/cloud-sun";
import SeikoWatchModal from "@/components/watch-modal";
import IconTelescopeTripod from "@/components/icons/telescope-tripod";
import { siteConfig } from "@/site.config";

const SITE_VISIT_COUNT_KEY = "site-visit-count";
const SITE_VISIT_REQUESTED_KEY = "site-visit-requested";

const Footer = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [battery, setBattery] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<any> };
    if (nav.getBattery) {
      nav.getBattery().then((batt: any) => {
        const update = () => setBattery(Math.round(batt.level * 100));
        update();
        batt.addEventListener("levelchange", update);
      });
    }
  }, []);

  useEffect(() => {
    const cachedCount = sessionStorage.getItem(SITE_VISIT_COUNT_KEY);
    if (cachedCount !== null) {
      const count = Number(cachedCount);
      if (Number.isFinite(count)) {
        setVisitorCount(count);
        return;
      }
    }

    if (sessionStorage.getItem(SITE_VISIT_REQUESTED_KEY)) return;
    sessionStorage.setItem(SITE_VISIT_REQUESTED_KEY, "true");

    fetch("/api/visitors", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Visitor counter request failed: ${res.status}`);
        const data = await res.json();
        const count = Number(data.count);
        if (!Number.isFinite(count)) throw new Error("Visitor counter returned an invalid count");
        sessionStorage.setItem(SITE_VISIT_COUNT_KEY, String(count));
        setVisitorCount(count);
      })
      .catch((error) => {
        console.error("Unable to load website visit count:", error);
        sessionStorage.removeItem(SITE_VISIT_REQUESTED_KEY);
      });
  }, []);

  useEffect(() => {
    const setFromServerLocation = async () => {
      try {
        const res = await fetch("/api/location");
        const data = await res.json();
        const city = data.city || "";
        const country = data.country || "";
        if (city && country) {
          setLocation(`${city}, ${country}`);
        } else {
          setLocation(city || country || null);
        }
        if (data.weather) {
          setWeather(`${data.weather.temperature}${data.weather.unit}`);
        }
      } catch {
        setLocation(null);
      }
    };

    const setFromBrowserGeolocation = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  "Accept-Language": "en",
                  "User-Agent": "PortfolioWeb/1.0",
                },
              }
            );
            if (!res.ok) return;
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || "";
            const state = data.address?.state || "";
            const country = data.address?.country || "";
            const formatted = [city || state, country].filter(Boolean).join(", ");
            if (formatted) setLocation(formatted);
          } catch {
            // ignore reverse-geocode failures and keep server-based location values
          }
        },
        () => {
          // Ignore denials and fall back to server-based location detection.
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    };

    setFromServerLocation();
    setFromBrowserGeolocation();
  }, []);

  const formattedDate = time
    ? time.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedTime = time
    ? time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  return (
    <footer className="mx-auto mb-24 w-full max-w-4xl px-6 md:mb-6 md:px-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 font-cera text-xs text-muted-foreground/60">
          {time && (
            <SeikoWatchModal>
              <button
                type="button"
                className="w-fit cursor-pointer text-left transition-colors hover:text-foreground focus:outline-hidden focus-visible:text-foreground"
                aria-label="Open Seiko analog watch"
              >
                {formattedDate} &middot; {formattedTime}
              </button>
            </SeikoWatchModal>
          )}
          {location && (
            <span className="flex items-center gap-1">
              <LocationIcon className="h-3 w-3" />
              {location}
              {weather && (
                <>
                  <span>&middot;</span>
                  <CloudSunIcon className="h-3 w-3" />
                  {weather}
                </>
              )}
            </span>
          )}
          {(battery !== null || visitorCount !== null) && (
            <span className="flex items-center gap-3">
              {visitorCount !== null && (
                <span className="flex items-center gap-1">
                  <IconTelescopeTripod className="h-3 w-3" />
                  {visitorCount.toLocaleString()} website visits
                </span>
              )}
              <span
                className="flex items-center gap-1"
                title="Komarev counts badge image loads, not verified profile opens. The badge can be cached, and loading it here may also affect its count."
              >
                <a
                  href="https://github.com/MbuyeloMich"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
                <Image
                  src="https://komarev.com/ghpvc/?username=MbuyeloMich"
                  alt="GitHub profile views"
                  width={111}
                  height={20}
                  unoptimized
                />
              </span>
              {battery !== null && (
                <span className="flex items-center gap-1">
                  <BoltIcon className="h-3 w-3" />
                  {battery}%
                </span>
              )}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} {siteConfig.identity.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
