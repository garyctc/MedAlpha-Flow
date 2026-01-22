import { useContext } from "react";
import { PartnerConfigContext } from "@/contexts/PartnerConfigContext";

export function useSSOProviders() {
  const context = useContext(PartnerConfigContext);
  if (!context) {
    throw new Error("useSSOProviders must be used within PartnerConfigProvider");
  }
  return {
    providers: context.ssoProviders,
    getSSOProvider: context.getSSOProvider,
    isLoading: context.isLoading
  };
}

export function usePrimarySSOProvider() {
  const context = useContext(PartnerConfigContext);
  if (!context) {
    throw new Error("usePrimarySSOProvider must be used within PartnerConfigProvider");
  }
  return context.ssoProviders[0];
}

export function useSecondarySSOProvider() {
  const context = useContext(PartnerConfigContext);
  if (!context) {
    throw new Error("useSecondarySSOProvider must be used within PartnerConfigProvider");
  }
  return context.ssoProviders[1];
}
