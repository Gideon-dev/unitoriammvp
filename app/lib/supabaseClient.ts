import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key for full access
);
// console.log('supabaseUrl', process.env.NEXT_PUBLIC_SUPABASE_URL )
// console.log('supabaseServerRoleKey', process.env.SUPABASE_SERVICE_ROLE_KEY)