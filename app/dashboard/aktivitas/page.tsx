"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAktivitas } from "@/app/actions/donatur";

type AktivitasRow = {
  id: string;
  amount: number;
  note: string | null;
  createdAt: string;
  donatur: string;
  user: string | null;
};

export default function AktivitasPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["aktivitas", page],
    queryFn: () => getAllAktivitas({ page, limit: 20 }),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white">Riwayat Aktivitas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent-primary border-t-transparent" />
              <p className="text-white/50 mt-2">Memuat data...</p>
            </div>
          ) : data?.data.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-white/50">Belum ada aktivitas</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/70">No</TableHead>
                    <TableHead className="text-white/70">Tanggal</TableHead>
                    <TableHead className="text-white/70">Donatur</TableHead>
                    <TableHead className="text-white/70">Catatan</TableHead>
                    <TableHead className="text-white/70">Admin</TableHead>
                    <TableHead className="text-white/70 text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((item: AktivitasRow, index: number) => (
                    <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white/50">{(page - 1) * 20 + index + 1}</TableCell>
                      <TableCell className="text-white/70">{formatDate(item.createdAt)}</TableCell>
                      <TableCell className="text-white font-medium">{item.donatur}</TableCell>
                      <TableCell className="text-white/70">{item.note || "-"}</TableCell>
                      <TableCell className="text-white/50">{item.user || "-"}</TableCell>
                      <TableCell className="text-white text-right font-medium">{formatCurrency(item.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {data && data.totalPages > 1 && (
                <div className="p-4 border-t border-white/10">
                  <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
