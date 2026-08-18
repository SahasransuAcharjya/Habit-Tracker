"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ClockFaceId =
  | "classic"    // dark, red-accent markers (current default)
  | "minimal"    // white face, thin hands, no fill
  | "neon"       // pitch-black, electric cyan glow
  | "slate"      // cool slate-blue dark face
  | "gold"       // deep charcoal with gold accents
  | "custom";    // user-uploaded image as face background

type ClockFaceContextType = {
  face: ClockFaceId;
  customImage: string | null; // base64 data-URL
  setFace: (face: ClockFaceId) => void;
  setCustomImage: (dataUrl: string) => void;
  clearCustomImage: () => void;
};

const ClockFaceContext = createContext<ClockFaceContextType | null>(null);

const FACE_KEY  = "vow_clock_face";
const IMAGE_KEY = "vow_clock_custom_image";

export function ClockFaceProvider({ children }: { children: ReactNode }) {
  const [face, setFaceState] = useState<ClockFaceId>("classic");
  const [customImage, setCustomImageState] = useState<string | null>(null);

  useEffect(() => {
    const savedFace = localStorage.getItem(FACE_KEY) as ClockFaceId | null;
    const savedImg  = localStorage.getItem(IMAGE_KEY);
    if (savedFace) setFaceState(savedFace);
    if (savedImg)  setCustomImageState(savedImg);
  }, []);

  const setFace = (f: ClockFaceId) => {
    setFaceState(f);
    localStorage.setItem(FACE_KEY, f);
  };

  const setCustomImage = (dataUrl: string) => {
    setCustomImageState(dataUrl);
    localStorage.setItem(IMAGE_KEY, dataUrl);
    setFace("custom");
  };

  const clearCustomImage = () => {
    setCustomImageState(null);
    localStorage.removeItem(IMAGE_KEY);
    setFace("classic");
  };

  return (
    <ClockFaceContext.Provider value={{ face, customImage, setFace, setCustomImage, clearCustomImage }}>
      {children}
    </ClockFaceContext.Provider>
  );
}

export function useClockFace() {
  const ctx = useContext(ClockFaceContext);
  if (!ctx) throw new Error("useClockFace must be used within ClockFaceProvider");
  return ctx;
}
