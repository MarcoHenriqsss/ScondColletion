import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://xjpzfkthwccritdydjrl.supabase.co"; 
 
const supabasePublishableKey = 
  "sb_publishable_skMmHGmCBhC6vcL4FjT8tg_UN-k7FJp";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);