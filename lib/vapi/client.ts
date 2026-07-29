import Vapi from "@vapi-ai/web";

export class VapiConfigError extends Error {}

let vapiInstance: Vapi | null = null;

/**
 * Lazy singleton around the Vapi Web SDK client. Lazy so a missing public
 * key only breaks the voice-call feature, not the whole app at import time.
 */
export function getVapiClient(): Vapi {
  if (vapiInstance) return vapiInstance;

  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  if (!publicKey) {
    throw new VapiConfigError(
      "Voice interviews aren't configured yet — NEXT_PUBLIC_VAPI_PUBLIC_KEY is missing."
    );
  }

  vapiInstance = new Vapi(publicKey);
  return vapiInstance;
}
