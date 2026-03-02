import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqachuzztnpagpaczyzy.supabase.co';
const supabaseKey = 'sb_publishable_FI0iPvoYlJzFZQ8GsWPR2Q_zg_xkyFF'; 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;