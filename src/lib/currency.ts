export function formatRupiah(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}
