
import { useState } from "react";
import { CryptoGrid } from "./CryptoGrid";
import { TodaysLearn } from "./TodaysLearn";
import { SuggestedActions } from "./SuggestedActions";
import { Sparkles, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";

interface HomeScreenProps {
  onStartZenFlow: () => void;
}

export const HomeScreen = ({ onStartZenFlow }: HomeScreenProps) => {
  return (
    <div className="px-6 space-y-8">
      {/* Zen Start CTA */}
      <div className="glass-card rounded-2xl p-6 border border-ios-blue/20 bg-gradient-to-r from-ios-blue/5 to-ios-purple/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-ios-blue to-ios-purple rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Ready to start your crypto journey?</h3>
              <p className="text-ios-gray-400 text-base mt-1">Let's find the perfect path for you</p>
            </div>
          </div>
          <button
            onClick={onStartZenFlow}
            className="bg-gradient-to-r from-ios-blue to-ios-purple text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <span>Zen Start</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Today's Learn */}
      <TodaysLearn />

      {/* Suggested Actions */}
      <SuggestedActions />

      {/* Top Coins */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-ios-green" />
            <span>Top Coins</span>
          </h2>
          <button className="text-ios-blue text-base font-medium hover:text-ios-blue/80">
            View all
          </button>
        </div>
        <CryptoGrid />
      </div>
    </div>
  );
};
