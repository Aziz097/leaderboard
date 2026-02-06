"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllDonatur } from "@/app/actions/donatur";

type DonaturRow = {
  id: string;
  name: string;
  totalDonasi: number;
  jumlahDonasi: number;
  donasiTerakhir: string | null;
};

export default function DaftarDonaturPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["donatur-list", page, search],
    queryFn: () => getAllDonatur({ page, limit: 10, search }),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(dateStr));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/dashboard/tambah-donatur">
          <Button className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:opacity-90">
            Tambah Donatur
          </Button>
        </Link>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-64 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent-primary border-t-transparent" />
              <p className="text-white/50 mt-2">Memuat data...</p>
            </div>
          ) : data?.data.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-white/50">Belum ada donatur</p>
              <Link href="/dashboard/tambah-donatur">
                <Button variant="link" className="text-accent-primary mt-2">
                  Tambah donatur pertama
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/70">No</TableHead>
                    <TableHead className="text-white/70">Nama</TableHead>
                    <TableHead className="text-white/70 text-right">Total Donasi</TableHead>
                    <TableHead className="text-white/70 text-center">Jumlah</TableHead>
                    <TableHead className="text-white/70">Terakhir</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((donatur: DonaturRow, index: number) => (
                    <TableRow key={donatur.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white/50">{(page - 1) * 10 + index + 1}</TableCell>
                      <TableCell className="text-white font-medium">{donatur.name}</TableCell>
                      <TableCell className="text-white text-right">{formatCurrency(donatur.totalDonasi)}</TableCell>
                      <TableCell className="text-white text-center">{donatur.jumlahDonasi}x</TableCell>
                      <TableCell className="text-white/70">{formatDate(donatur.donasiTerakhir)}</TableCell>
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
