import React from "react";

export type FeatureFlags = {
  isGooglePayEnabled: boolean;
  isAmazonPayEnabled: boolean;
};

export type FeatureFlagContextType = {
  features: FeatureFlags;
  toggleFeature: (key: keyof FeatureFlags) => void;
};

export const FeatureFlagContext = React.createContext<
  FeatureFlagContextType | undefined
>(undefined);

const FeatureFlagProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [features, setFeatures] = React.useState<FeatureFlags>({
    isGooglePayEnabled: true,
    isAmazonPayEnabled: true,
  });

  const toggleFeature = (key: keyof FeatureFlags) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <FeatureFlagContext.Provider value={{ features, toggleFeature }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export default FeatureFlagProvider;
