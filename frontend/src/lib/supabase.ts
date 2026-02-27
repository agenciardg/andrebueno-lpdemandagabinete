import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bnyjhvcmasloqunstjoz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJueWpodmNtYXNsb3F1bnN0am96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMTQyNzAsImV4cCI6MjA4Mjg5MDI3MH0.uuc7eLS739XnPXiMYvw8fTYkTtQ-N1YYUQHm5x-5pmM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const STORAGE_BUCKET = 'demandas-anexos'
