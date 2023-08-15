const PAYMENT_ID = [
  'unverified',
  'need_revision',
  'verified',
  'rejected',
] as const;

const PAYMENT_TEXT = [
  'Menunggu Pembayaran',
  'Menunggu Revisi',
  'Berhasil',
  'Pembayaran Gagal/Dibatalkan',
];

export type PaymentId = (typeof PAYMENT_ID)[number];
export type PaymentText = (typeof PAYMENT_TEXT)[number];

export interface PaymentTagProps {
  id: PaymentId;
  name: PaymentText;
}
