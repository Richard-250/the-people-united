import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { BookingRecord, ContactRecord } from "@/lib/submission-types";

export type { BookingRecord, ContactRecord } from "@/lib/submission-types";

type Store = {
  contacts: ContactRecord[];
  bookings: BookingRecord[];
};

const STORE_PATH = path.join(process.cwd(), "storage", "submissions.json");

function readStore(): Store {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const data = JSON.parse(raw) as Partial<Store>;
    return {
      contacts: Array.isArray(data.contacts) ? data.contacts : [],
      bookings: Array.isArray(data.bookings) ? data.bookings : [],
    };
  } catch {
    return { contacts: [], bookings: [] };
  }
}

function writeStore(store: Store) {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export function appendContact(record: Omit<ContactRecord, "id" | "createdAt">) {
  const store = readStore();
  const entry: ContactRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...record,
  };
  store.contacts.unshift(entry);
  writeStore(store);
  return entry;
}

export function appendBooking(
  record: Omit<BookingRecord, "id" | "createdAt">,
) {
  const store = readStore();
  const entry: BookingRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...record,
  };
  store.bookings.unshift(entry);
  writeStore(store);
  return entry;
}

export function getAllSubmissions(): Store {
  return readStore();
}
