'use client';

import { createClient } from '@/lib/supabase/client';
// Note: In a real app, these would be Server Actions.
// For this MVP, I'll use client-side calls for simplicity if needed,
// but since I'm using App Router, I'll try to keep them compatible.

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = '/';
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Check your email for confirmation!');
  }
}
