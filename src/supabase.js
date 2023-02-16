import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulvlkrwnpiuwujxtktxp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdmxrcnducGl1d3VqeHRrdHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyNjE3OTQsImV4cCI6MTk5MDgzNzc5NH0.7djwcqO99wrNPKt3MbmANtS_faalECTnPGGivBGhJDU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
