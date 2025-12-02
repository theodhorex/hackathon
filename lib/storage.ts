type ScanRecord = {
  id: string;
  createdAt: number;
  payload: any;
  lastYakoaResponse?: any;
  status?: string;
};

const scans: ScanRecord[] = [];

export function addScan(record: ScanRecord) {
  scans.unshift(record);
}

export function updateScan(id: string, updates: Partial<ScanRecord>) {
  const idx = scans.findIndex((s) => s.id === id);
  if (idx !== -1) scans[idx] = { ...scans[idx], ...updates };
}

export function listScans() {
  return scans;
}

export function getScan(id: string) {
  return scans.find((s) => s.id === id);
}
