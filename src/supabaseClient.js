// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const supabaseUrl = 'https://mzlltxcwmeykhmybetgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16bGx0eGN3bWV5a2hteWJldGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTM0NjcsImV4cCI6MjA3OTQ4OTQ2N30.PljKqq8WmtHCXXOd6MpZ0X5EdPn0hgZukke7KDQfXBc';

export const supabase = createClient(supabaseUrl, supabaseKey);