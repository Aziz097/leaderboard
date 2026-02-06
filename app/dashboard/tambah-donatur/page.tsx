"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, DollarSign } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createDonasi, searchDonatur } from "@/app/actions/donatur";

export default function TambahDonaturPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [note, setNote] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: existingDonaturs, isLoading: isSearching } = useQuery({
    queryKey: ["donatur-search", nama],
    queryFn: () => searchDonatur(nama),
    enabled: nama.length >= 2,
  });

  const mutation = useMutation({
    mutationFn: () =>
      createDonasi({
        nama,
        jumlah: parseFloat(jumlah),
        note: note || undefined,
        existingId: selectedId || undefined,
      }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Donasi berhasil ditambahkan!");
        queryClient.invalidateQueries({ queryKey: ["donatur-search"] });
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } else {
        toast.error(result.error || "Gagal menambahkan donasi");
      }
    },
    onError: () => {
      toast.error("Terjadi kesalahan");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const isExistingMode = selectedId !== null;
  const existingDonatur = existingDonaturs?.find((d) => d.id === selectedId);

  return (
<div className="flex items-center justify-center h-full">
  <Card className="max-w-2xl w-full bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <UserPlus className="h-5 w-5 text-accent-secondary" />
            {isExistingMode ? "Tambah Donasi" : "Donatur Baru"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isExistingMode && (
              <div className="space-y-3">
                <Label htmlFor="nama" className="text-white/70">
                  Nama Donatur
                </Label>
                <Input
                  id="nama"
                  placeholder="Cari atau masukkan nama..."
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                    setSelectedId(null);
                  }}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent-primary"
                />

                {isSearching && (
                  <p className="text-sm text-white/50 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mencari...
                  </p>
                )}

                {existingDonaturs && existingDonaturs.length > 0 && !selectedId && (
                  <div className="border border-white/10 rounded-lg p-3 space-y-2 bg-white/5">
                    <p className="text-sm font-medium text-white/50">
                      Donatur ditemukan:
                    </p>
                    {existingDonaturs.map((donatur) => (
                      <button
                        key={donatur.id}
                        type="button"
                        onClick={() => {
                          setNama(donatur.name);
                          setSelectedId(donatur.id);
                        }}
                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">
                            {donatur.name}
                          </span>
                          <span className="text-sm text-white/50">
                            Total:{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(donatur.totalDonasi)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {nama.length >= 2 && existingDonaturs?.length === 0 && (
                  <p className="text-sm text-white/50">
                    Donatur belum ada. Membuat baru dengan donasi ini.
                  </p>
                )}
              </div>
            )}

            {isExistingMode && (
              <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30">
                    <span className="text-lg font-semibold text-white">
                      {existingDonatur?.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {existingDonatur?.name}
                    </p>
                    <p className="text-sm text-white/50">
                      Total sebelumnya:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(existingDonatur?.totalDonasi || 0)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="mt-2 p-0 h-auto text-white/50 hover:text-white"
                  onClick={() => {
                    setNama("");
                    setSelectedId(null);
                  }}
                >
                  Batal, tambah donatur lain
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="jumlah" className="text-white/70">
                Jumlah Donasi (Rp)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  id="jumlah"
                  type="number"
                  placeholder="100000"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white border-0"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : isExistingMode ? (
                "Tambah Donasi"
              ) : (
                "Buat Donatur & Donasi"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
