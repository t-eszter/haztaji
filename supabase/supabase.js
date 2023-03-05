import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qgvehrcffejjqaprawiz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndmVocmNmZmVqanFhcHJhd2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc5NTYyNjMsImV4cCI6MTk5MzUzMjI2M30.Ll-GYkdKKJAYEz7FpKSteTUV_XGvA0HB4ZtyHtYRF4o'
export const supabase = createClient(supabaseUrl, supabaseKey)