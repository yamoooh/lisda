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

    // Read Secret / Private Key from all possible variations in Supabase Secrets
    const leekpaySecretKey = 
      Deno.env.get("LEEKPAY_SECRET_KEY_privee") ||
      Deno.env.get("LEEKPAY_SECRET_KEY_prive") ||
      Deno.env.get("LEEKPAY_SECRET_KEY_private") ||
      Deno.env.get("LEEKPAY_SECRET_KEY") ||
      Deno.env.get("LEEKPAY_PRIVATE_KEY") ||
      Deno.env.get("LEEKPAY_SECRET") ||
      "";

    if (!leekpaySecretKey) {
      console.error("Clé secrète LeekPay introuvable dans les variables d'environnement.");
      return new Response(
        JSON.stringify({ 
          error: "Clé secrète LeekPay (LEEKPAY_SECRET_KEY_privee ou LEEKPAY_SECRET_KEY) manquante dans les Secrets Supabase." 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://neqnbrhmacperiinpstp.supabase.co";
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

    console.log("Appel LeekPay API /checkout pour montant:", amount, "XOF");

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
      console.error("Erreur retournée par LeekPay:", data);
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
