// Supabase Edge Function: leekpay-checkout
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, customer_email, customer_name, return_url, accord_affichage, type_don } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Le montant du don doit être supérieur à 0." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Read Secret Key exclusively from Supabase Secrets
    const leekpaySecretKey = Deno.env.get("LEEKPAY_SECRET_KEY");
    if (!leekpaySecretKey) {
      return new Response(
        JSON.stringify({ error: "Configuration LeekPay manquante sur le serveur (LEEKPAY_SECRET_KEY non définie)." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const webhookUrl = `${supabaseUrl}/functions/v1/leekpay-webhook`;
    const defaultReturnUrl = return_url || "https://lisda.vercel.app/faire-un-don/merci";

    // Call LeekPay Checkout REST API
    const leekpayPayload = {
      amount: Number(amount),
      currency: "XOF",
      customer_email: customer_email || "donateur@lisda-ong.org",
      customer_name: customer_name || "Donateur LISDA ONG",
      return_url: defaultReturnUrl,
      webhook_url: webhookUrl,
      metadata: {
        projet: "LISDA ONG - Bassin du Congo & Kribi",
        accord_affichage: accord_affichage ?? true,
        type_don: type_don || "argent",
        timestamp: new Date().toISOString()
      }
    };

    console.log("Appel LeekPay API /checkout pour", amount, "XOF");

    const response = await fetch("https://leekpay.fr/api/v1/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${leekpaySecretKey}`
      },
      body: JSON.stringify(leekpayPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur LeekPay API:", data);
      return new Response(
        JSON.stringify({ 
          error: data.message || data.error || "Échec de l'initialisation du paiement LeekPay.",
          details: data 
        }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // LeekPay returns payment_url / checkout_url
    const paymentUrl = data.payment_url || data.url || data.checkout_url || data.data?.payment_url;

    return new Response(
      JSON.stringify({
        success: true,
        payment_url: paymentUrl,
        session_id: data.id || data.session_id || data.data?.id,
        amount: Number(amount),
        currency: "XOF"
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Erreur leekpay-checkout:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur interne du serveur." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
