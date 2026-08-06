import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { LegalAIType } from "./legal-ai.server";

const inputSchema = z.object({
  type: z
    .enum([
      "legal_chat",
      "contract_draft",
      "compliance_check",
      "risk_analysis",
      "clause_suggest",
      "nda_review",
    ])
    .default("legal_chat"),
  prompt: z.string().min(1).max(8000),
  context: z
    .object({
      jurisdiction: z.string().max(120).optional(),
      contractType: z.string().max(120).optional(),
      context: z.string().max(500).optional(),
    })
    .optional(),
});

export const askLegalAI = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { result: null, error: "AI service is not configured" };
    }

    const { buildLegalPrompts } = await import("./legal-ai.server");
    const { systemPrompt, userPrompt } = buildLegalPrompts(
      data.type as LegalAIType,
      data.prompt,
      data.context ?? {},
    );

    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Lovable-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        instructions: systemPrompt,
        input: userPrompt,
      }),
    });

    if (response.status === 429) {
      return { result: null, error: "Rate limit reached, please try again shortly" };
    }
    if (response.status === 402) {
      return { result: null, error: "AI credits exhausted for this workspace" };
    }
    if (!response.ok) {
      console.error("Legal AI gateway error", response.status, await response.text());
      return { result: null, error: "AI service temporarily unavailable" };
    }

    const payload = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    };
    const result = payload.output_text ?? (
      payload.output
        ?.flatMap((item) => item.content ?? [])
        .filter((item) => item.type === "output_text")
        .map((item) => item.text ?? "")
        .join("") || null
    );
    return { result, error: result ? null : "Empty AI response" };
  });
