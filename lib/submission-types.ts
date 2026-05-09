export type ContactRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  emailed: boolean;
};

export type BookingRecord = {
  id: string;
  createdAt: string;
  courseName: string;
  coursePrice: string;
  payerName: string;
  payerPhone: string;
};
