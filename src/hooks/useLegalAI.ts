import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { askLegalAI } from "@/lib/legal-ai.functions";
import type { LegalAIContext, LegalAIType } from "@/lib/legal-ai.server";

export const useLegalAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const call = useServerFn(askLegalAI);

  const callLegalAI = async (
    type: LegalAIType,
    prompt: string,
    context?: LegalAIContext,
  ): Promise<string | null> => {
    setIsLoading(true);
    try {
      const res = await call({ data: { type, prompt, ...(context ? { context } : {}) } });
      if (!res.result) {
        toast.error(res.error ?? "Failed to get AI response");
        return null;
      }
      return res.result;
    } catch (err) {
      console.error("Legal AI exception:", err);
      toast.error("AI service temporarily unavailable");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const legalChat = (message: string) => callLegalAI("legal_chat", message);

  const draftContract = (
    description: string,
    jurisdiction = "Global",
    contractType = "General Agreement",
  ) => callLegalAI("contract_draft", description, { jurisdiction, contractType });

  const checkCompliance = (description: string) => callLegalAI("compliance_check", description);

  const analyzeRisk = (description: string) => callLegalAI("risk_analysis", description);

  const suggestClauses = (description: string, context = "General contract") =>
    callLegalAI("clause_suggest", description, { context });

  const reviewNDA = (ndaText: string) => callLegalAI("nda_review", ndaText);

  const disputeGuide = (disputeDescription: string) =>
    callLegalAI("dispute_guide", disputeDescription);

  return {
    isLoading,
    callLegalAI,
    legalChat,
    draftContract,
    checkCompliance,
    analyzeRisk,
    suggestClauses,
    reviewNDA,
    disputeGuide,
  };
};
