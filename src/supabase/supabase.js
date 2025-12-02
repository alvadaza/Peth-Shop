import { createClient } from "@supabase/supabase-js";

// Usa tus credenciales directamente
const supabaseUrl = "https://dedztwbflzgislpsyraw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZHp0d2JmbHpnaXNscHN5cmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODEwNTksImV4cCI6MjA2OTQ1NzA1OX0.mr8N_SLAWRjC8cSG28CVnBDl4ot6QK7SGXa0ZU339E4";

// Verificar credenciales
console.log("🔍 Verificando Supabase:");
console.log("URL:", supabaseUrl ? "✅" : "❌");
console.log("Key:", supabaseAnonKey ? "✅" : "❌");

// Crear cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar conexión
supabase
  .from("productos")
  .select("count", { count: "exact" })
  .then(({ count, error }) => {
    if (error) {
      console.error("❌ Error conectando a Supabase:", error.message);
    } else {
      console.log("✅ Supabase conectado correctamente");
      console.log("📊 Total productos en BD:", count);
    }
  });
