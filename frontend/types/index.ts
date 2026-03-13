export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type Status = 'success' | 'error' | 'warning' | 'info';
export type BadgeStatus = 'success' | 'pending' | 'cancelled' | 'info' | 'warning';

export interface SelectOption {
  value: string;
  label: string;
}
