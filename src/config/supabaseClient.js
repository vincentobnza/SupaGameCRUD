import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ggaiswafsjvtvpsyuzrw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYWlzd2Fmc2p2dHZwc3l1enJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4NDMyNzEsImV4cCI6MjAzNDQxOTI3MX0.l1DoIN71KDDZ7jLoXKjZ0lKLQ1R_0Tzs3OxfwPiIeuE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
