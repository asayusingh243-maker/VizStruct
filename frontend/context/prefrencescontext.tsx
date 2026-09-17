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

export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [visualStyle, setVisualStyle] =
    useState<VisualStyle>("classic");

  const [
    adaptiveVisualization,
    setAdaptiveVisualization,
  ] = useState(true);

  const [companion, setCompanion] =
    useState<CompanionPreference>("female");

  const [loaded, setLoaded] = useState(false);

  // Load preferences from browser storage.
  useEffect(() => {
    try {
      const stored =
        window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (
          ["classic", "cat", "dog", "objects", "surprise"].includes(
            parsed.visualStyle
          )
        ) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setVisualStyle(parsed.visualStyle);
        }

        if (
          typeof parsed.adaptiveVisualization === "boolean"
        ) {
          setAdaptiveVisualization(
            parsed.adaptiveVisualization
          );
        }

        if (
          ["male", "female", "none"].includes(
            parsed.companion
          )
        ) {
          setCompanion(parsed.companion);
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

  // Save changes automatically.
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