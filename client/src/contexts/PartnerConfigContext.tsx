import React, { createContext, useEffect, useState } from "react";
import {
  PartnerConfig,
  SSOProvider,
  loadPartnerConfig,
  applyPartnerConfigColors,
  getSSOProviders
} from "@/lib/partner-config";

type PartnerConfigContextType = {
  config: PartnerConfig | null;
  ssoProviders: SSOProvider[];
  getSSOProvider: (id: string) => SSOProvider | undefined;
  isLoading: boolean;
};

export const PartnerConfigContext = createContext<PartnerConfigContextType>({
  config: null,
  ssoProviders: [],
  getSSOProvider: () => undefined,
  isLoading: true
});

export function PartnerConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<PartnerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const loadedConfig = await loadPartnerConfig();
        setConfig(loadedConfig);
        if (loadedConfig?.colors) {
          applyPartnerConfigColors(loadedConfig.colors);
        }
      } catch (err) {
        console.error("Failed to load partner config:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadConfig();
  }, []);

  const ssoProviders = getSSOProviders(config);

  const getSSOProvider = (id: string): SSOProvider | undefined => {
    return ssoProviders.find(p => p.id === id);
  };

  return (
    <PartnerConfigContext.Provider
      value={{
        config,
        ssoProviders,
        getSSOProvider,
        isLoading
      }}
    >
      {children}
    </PartnerConfigContext.Provider>
  );
}
