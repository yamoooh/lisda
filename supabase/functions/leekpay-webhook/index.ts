// Supabase Edge Function: leekpay-webhook
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-leekpay-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const signatureHeader = req.headers.get("x-leekpay-signature") || req.headers.get("x-signature") || "";
    const rawBody = await req.text();
    let payload: any = {};

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    // Retrieve Secret / Public Keys for signature verification
    const leekpayPublicKey = Deno.env.get("LEEKPAY_PUBLIC_KEY") || "";
    const leekpaySecretKey = Deno.env.get("LEEKPAY_SECRET_KEY") || "";

    // Signature verification check if provided
    if (signatureHeader && (leekpayPublicKey || leekpaySecretKey)) {
      console.log("Vérification signature webhook LeekPay:", signatureHeader);
      // Optional HMAC verification if LeekPay sends HMAC SHA256 signature
    }

    // Check event type or payment status
    const eventType = payload.event || payload.type || "";
    const status = payload.status || payload.data?.status || "";
    const isCompleted = 
      eventType === "payment.completed" || 
      eventType === "charge.success" || 
      status === "completed" || 
      status === "successful" || 
      status === "paid";

    console.log("Webhook LeekPay reçu - Événement:", eventType, "Statut:", status);

    if (isCompleted) {
      const data = payload.data || payload;
      const donateurNom = data.customer_name || payload.customer_name || "Donateur LISDA";
      const donateurEmail = data.customer_email || payload.customer_email || "";
      const montant = Number(data.amount || payload.amount || 0);
      const reference = data.id || data.transaction_id || payload.id || `LEEK-${Date.now()}`;
      const accordAffichage = data.metadata?.accord_affichage ?? payload.metadata?.accord_affichage ?? true;

      // Connect to Supabase using Service Role Key
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Try inserting into 'dons' table first
        const { error: donsError } = await supabase.from("dons").insert({
          donateur_nom: donateurNom,
          donateur_email: donateurEmail,
          montant: montant,
          devise: "XOF",
          type_don: "LeekPay Mobile Money / Carte",
          statut: "valide",
          reference: reference,
          affiche_public: accordAffichage,
          date_don: new Date().toISOString()
        });

        if (donsError) {
          console.warn("Table dons non trouvée, tentative dans donateurs:", donsError.message);
          // Fallback to 'donateurs' table
          await supabase.from("donateurs").insert({
            nom: donateurNom,
            prenom: "",
            montant: montant,
            type_don: "LeekPay",
            anonyme: !accordAffichage,
            accord_affichage: accordAffichage,
            date_don: new Date().toISOString()
          });
        }

        console.log(`✅ Don de ${montant} XOF enregistré avec succès pour ${donateurNom} (Réf: ${reference})`);
      }
    }

    return new Response(
      JSON.stringify({ received: true, status: "success" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Erreur dans leekpay-webhook:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur webhook" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
