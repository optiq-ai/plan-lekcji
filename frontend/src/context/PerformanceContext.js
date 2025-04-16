import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Kontekst wydajności aplikacji
 * Zarządza globalnym stanem trybu wydajnościowego aplikacji
 */
const PerformanceContext = createContext();

/**
 * Provider kontekstu wydajności
 * Udostępnia stan i funkcje do zarządzania trybem wydajnościowym
 */
export const PerformanceProvider = ({ children }) => {
  // Stan trybu wydajnościowego
  const [performanceMode, setPerformanceMode] = useState('balanced');
  
  // Poziom szczegółowości danych (0-100)
  const [dataDetailLevel, setDataDetailLevel] = useState(70);
  
  // Priorytet wydajności vs funkcjonalność (0-100)
  const [performancePriority, setPerformancePriority] = useState(50);
  
  // Czy animacje są włączone
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Częstotliwość odświeżania danych (w sekundach)
  const [refreshRate, setRefreshRate] = useState(5);
  
  // Czy ładować dane w tle
  const [backgroundLoading, setBackgroundLoading] = useState(true);
  
  // Czy używać zaawansowanych wizualizacji
  const [advancedVisualizations, setAdvancedVisualizations] = useState(true);
  
  // Czy używać zaawansowanych funkcji AI
  const [advancedAIFeatures, setAdvancedAIFeatures] = useState(true);

  // Efekt zmieniający ustawienia na podstawie trybu wydajnościowego
  useEffect(() => {
    switch (performanceMode) {
      case 'high-performance':
        setDataDetailLevel(30);
        setPerformancePriority(90);
        setAnimationsEnabled(false);
        setRefreshRate(10);
        setBackgroundLoading(false);
        setAdvancedVisualizations(false);
        setAdvancedAIFeatures(false);
        break;
      case 'balanced':
        setDataDetailLevel(70);
        setPerformancePriority(50);
        setAnimationsEnabled(true);
        setRefreshRate(5);
        setBackgroundLoading(true);
        setAdvancedVisualizations(true);
        setAdvancedAIFeatures(true);
        break;
      case 'feature-rich':
        setDataDetailLevel(100);
        setPerformancePriority(10);
        setAnimationsEnabled(true);
        setRefreshRate(3);
        setBackgroundLoading(true);
        setAdvancedVisualizations(true);
        setAdvancedAIFeatures(true);
        break;
      case 'custom':
        // W trybie niestandardowym nie zmieniamy ustawień automatycznie
        break;
      default:
        // Domyślnie używamy trybu zrównoważonego
        setPerformanceMode('balanced');
    }
  }, [performanceMode]);

  // Funkcja do zmiany trybu wydajnościowego
  const changePerformanceMode = (mode) => {
    if (['high-performance', 'balanced', 'feature-rich', 'custom'].includes(mode)) {
      setPerformanceMode(mode);
      return true;
    }
    return false;
  };

  // Funkcja do aktualizacji niestandardowych ustawień wydajności
  const updateCustomSettings = (settings) => {
    if (performanceMode !== 'custom') {
      setPerformanceMode('custom');
    }
    
    if (settings.dataDetailLevel !== undefined) {
      setDataDetailLevel(settings.dataDetailLevel);
    }
    
    if (settings.performancePriority !== undefined) {
      setPerformancePriority(settings.performancePriority);
    }
    
    if (settings.animationsEnabled !== undefined) {
      setAnimationsEnabled(settings.animationsEnabled);
    }
    
    if (settings.refreshRate !== undefined) {
      setRefreshRate(settings.refreshRate);
    }
    
    if (settings.backgroundLoading !== undefined) {
      setBackgroundLoading(settings.backgroundLoading);
    }
    
    if (settings.advancedVisualizations !== undefined) {
      setAdvancedVisualizations(settings.advancedVisualizations);
    }
    
    if (settings.advancedAIFeatures !== undefined) {
      setAdvancedAIFeatures(settings.advancedAIFeatures);
    }
  };

  // Funkcja do sprawdzania, czy dana funkcja powinna być włączona w bieżącym trybie wydajności
  const shouldEnableFeature = (featureType) => {
    switch (featureType) {
      case 'animations':
        return animationsEnabled;
      case 'advanced-visualizations':
        return advancedVisualizations;
      case 'advanced-ai':
        return advancedAIFeatures;
      case 'background-loading':
        return backgroundLoading;
      default:
        return true;
    }
  };

  // Funkcja do uzyskania optymalnej częstotliwości odświeżania dla komponentu
  const getOptimalRefreshRate = (componentType) => {
    // Bazowa częstotliwość odświeżania z ustawień
    let rate = refreshRate;
    
    // Modyfikacja częstotliwości w zależności od typu komponentu
    switch (componentType) {
      case 'critical':
        // Krytyczne komponenty odświeżamy częściej
        return Math.max(1, rate / 2);
      case 'background':
        // Komponenty tła odświeżamy rzadziej
        return rate * 2;
      default:
        return rate;
    }
  };

  // Funkcja do uzyskania poziomu szczegółowości danych dla komponentu
  const getDataDetailLevel = (componentType) => {
    // Bazowy poziom szczegółowości z ustawień
    let level = dataDetailLevel;
    
    // Modyfikacja poziomu w zależności od typu komponentu
    switch (componentType) {
      case 'critical':
        // Krytyczne komponenty zawsze mają pełne dane
        return Math.max(70, level);
      case 'optional':
        // Opcjonalne komponenty mogą mieć mniej szczegółów
        return Math.min(level, 50);
      default:
        return level;
    }
  };

  return (
    <PerformanceContext.Provider
      value={{
        performanceMode,
        dataDetailLevel,
        performancePriority,
        animationsEnabled,
        refreshRate,
        backgroundLoading,
        advancedVisualizations,
        advancedAIFeatures,
        changePerformanceMode,
        updateCustomSettings,
        shouldEnableFeature,
        getOptimalRefreshRate,
        getDataDetailLevel
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

/**
 * Hook do używania kontekstu wydajności
 * Umożliwia komponentom dostęp do stanu i funkcji trybu wydajnościowego
 */
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
