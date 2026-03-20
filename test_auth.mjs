import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envContent = fs.readFileSync('.env', 'utf-8');
const supabaseUrl = envContent.match(/EXPO_PUBLIC_SUPABASE_URL=(.+)/)?.[1]?.trim();
const supabaseKey = envContent.match(/EXPO_PUBLIC_SUPABASE_KEY=(.+)/)?.[1]?.trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  console.log('Registering User...');
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: '691232678@ptech.app',
    password: 'Password@123',
    options: {
      data: {
        first_name: 'rindah',
        last_name: 'luanga',
        phone_number: '691232678'
      }
    }
  });

  if (signUpError) {
    console.error('Sign Up Error:', signUpError.message);
    return;
  }
  
  if (signUpData.user) {
     console.log('Registered User ID:', signUpData.user.id);
  } else {
     console.log('Registration succeeded but no user object was returned.');
  }
}

testAuth();
