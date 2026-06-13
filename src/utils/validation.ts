export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email format';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  if (phone.replace(/\D/g, '').length < 7) return 'Phone number is too short';
  return null;
}

export function validateRequired(value: string, field: string): string | null {
  if (!value.trim()) return `${field} is required`;
  return null;
}
