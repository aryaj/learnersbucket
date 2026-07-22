import React, { useContext } from "react";
import FeatureFlagProvider, {
  FeatureFlagContext,
  type FeatureFlags,
} from "../contexts/FeatureFlagProvider";

interface FeatureProps {
  feature: keyof FeatureFlags;
  children: React.ReactNode;
}

const Feature = ({ feature, children }: FeatureProps) => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    return null;
  }

  const { features } = context;
  return features[feature] ? <div>{children}</div> : null;
};

const Example = () => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    return null;
  }

  const { features, toggleFeature } = context;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Active Features:</h3>
      
      <div className="space-y-3">
        {/* Google Pay Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-medium text-slate-900">Google Pay</p>
              <p className="text-sm text-slate-600">
                {features.isGooglePayEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleFeature("isGooglePayEnabled")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              features.isGooglePayEnabled
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-slate-300 hover:bg-slate-400 text-slate-700"
            }`}
          >
            Toggle
          </button>
        </div>

        {/* Amazon Pay Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔶</span>
            <div>
              <p className="font-medium text-slate-900">Amazon Pay</p>
              <p className="text-sm text-slate-600">
                {features.isAmazonPayEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleFeature("isAmazonPayEnabled")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              features.isAmazonPayEnabled
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-slate-300 hover:bg-slate-400 text-slate-700"
            }`}
          >
            Toggle
          </button>
        </div>
      </div>

      {/* Rendered Features */}
      <div className="mt-8 pt-6 border-t border-slate-300">
        <h4 className="text-md font-semibold text-slate-900 mb-4">Displayed Features:</h4>
        <div className="space-y-2">
          <Feature feature="isGooglePayEnabled">
            <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-800">
              ✅ Google Pay is available
            </div>
          </Feature>
          <Feature feature="isAmazonPayEnabled">
            <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-800">
              ✅ Amazon Pay is available
            </div>
          </Feature>
        </div>
      </div>
    </div>
  );
};

export function FeatureFlag() {
  return (
    <div className="py-6">
      <FeatureFlagProvider>
        <Example />
      </FeatureFlagProvider>
    </div>
  );
}

export default FeatureFlag;
