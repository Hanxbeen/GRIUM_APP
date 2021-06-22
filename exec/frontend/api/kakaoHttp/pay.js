import {kakaoPay as kHttp} from '../http';
import {deal as gHttp} from '../http';

// 결제 오청
export function postPaymentReady2() {
  const params = new URLSearchParams();
  params.append('cid', 'TC0ONETIME');
  params.append('partner_order_id', '받는이');
  params.append('partner_user_id', '보낸이');
  params.append('item_name', '부조금');
  params.append('quantity', '1');
  params.append('total_amount', '10000');
  params.append('vat_amount', '0');
  params.append('tax_free_amount', '0');
  params.append('approval_url', 'http://grium.me/pay/success');
  params.append('fail_url', 'http://grium.me/pay/fail');
  params.append('cancel_url', 'http://grium.me/pay/cance');
  return kHttp.post(`/v1/payment/ready`, params);
}

// grium 서버에 결제요청
/*
{
  "partner_order_id": "string",
  "partner_user_id": "string",
  "item_name": "string",
  "quantity": 0,
  "total_amount": 0,
  "tax_free_amount": 0,
  "approval_url": "string",
  "cancel_url": "string",
  "fail_url": "string"
}
 */
export function postPaymentReady(payload) {
  return gHttp.post(`/transaction/kakaopay/ready`, payload);
}

export function postPaymentSuccess(payload) {
  return gHttp.post(`/transaction/kakaopay/success`, payload);
}

// 거래 기록 조회
export function getTransaction(deadId) {
  return gHttp.get(`/transaction/${deadId}`);
}

// 기억 공간의 거래통계 정보조회
// 상주 별 토탈 금액 확인 가능
export function getTransactionStatistics(deadId) {
  return gHttp.get(`/transaction/statistics/${deadId}`);
}
