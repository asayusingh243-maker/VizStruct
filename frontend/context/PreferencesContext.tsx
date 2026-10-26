"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type VisualStyle =
  | "classic"
  | "cat"
  | "dog"
  | "objects"
  | "surprise";

export type CompanionPreference =
  | "male"
  | "female"
  | "none";

type PreferencesContextType = {
  visualStyle: VisualStyle;
  setVisualStyle: (style: VisualStyle) => void;

  adaptiveVisualization: boolean;
  setAdaptiveVisualization: (value: boolean) => void;

  companion: CompanionPreference;
  setCompanion: (value: CompanionPreference) => void;
};

const PreferencesContext =
  createContext<PreferencesContextType | undefined>(
    undefined
  );

const STORAGE_KEY = "vizstruct-preferences";
const VALID_VISUAL_STYLES: VisualStyle[] = [
  "classic",
  "cat",
  "dog",
  "objects",
  "surprise",
];
const VALID_COMPANIONS: CompanionPreference[] = [
  "male",
  "female",
  "none",
];

export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [visualStyle, setVisualStyle] =
    useState<VisualStyle>("classic");

  const [adaptiveVisualization, setAdaptiveVisualization] =
    useState(true);

  const [companion, setCompanion] =
    useState<CompanionPreference>("female");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Partial<{
          visualStyle: string;
          adaptiveVisualization: boolean;
          companion: string;
        }>;

        if (
          parsed.visualStyle &&
          VALID_VISUAL_STYLES.includes(
            parsed.visualStyle as VisualStyle
          )
        ) {
          setVisualStyle(parsed.visualStyle as VisualStyle);
        }

        if (
          typeof parsed.adaptiveVisualization === "boolean"
        ) {
          setAdaptiveVisualization(
            parsed.adaptiveVisualization
          );
        }

        if (
          parsed.companion &&
          VALID_COMPANIONS.includes(
            parsed.companion as CompanionPreference
          )
        ) {
          setCompanion(parsed.companion as CompanionPreference);
        }
      }
    } catch (error) {
      console.error(
        "Could not load VizStruct preferences:",
        error
      );
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          visualStyle,
          adaptiveVisualization,
          companion,
        })
      );
    } catch (error) {
      console.error(
        "Could not save VizStruct preferences:",
        error
      );
    }
  }, [
    visualStyle,
    adaptiveVisualization,
    companion,
    loaded,
  ]);

  return (
    <PreferencesContext.Provider
      value={{
        visualStyle,
        setVisualStyle,
        adaptiveVisualization,
        setAdaptiveVisualization,
        companion,
        setCompanion,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error(
      "usePreferences must be used inside PreferencesProvider"
    );
  }

  return context;
}
