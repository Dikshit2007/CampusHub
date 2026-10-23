
export interface OrderSuccessDetails {
  order_id?: string;
  orderId?: string;
  student_name?: string;
  student_sic?: string;
  total_amount?: number;
  payment_method?: string;
  payment_id?: string | null;
  razorpay_order_id?: string | null;
  notes?: string;
}
