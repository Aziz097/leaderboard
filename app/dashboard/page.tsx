import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Activity } from "lucide-react";
import { format } from "date-fns";

async function getStats() {
  const [totalDonasi, totalDonatur, recentDonasis] = await Promise.all([
    prisma.donasi.aggregate({
      _sum: { amount: true },
    }),
    prisma.donatur.count(),
    prisma.donasi.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { donatur: true, user: true },
    }),
  ]);

  return {
    totalAmount: totalDonasi._sum.amount || 0,
    totalDonatur,
    recentDonasis: recentDonasis as Array<{
      id: string;
      amount: number;
      note: string | null;
      createdAt: Date;
      donatur: { name: string };
      user: { name: string | null };
    }>,
  };
}

export default async function DashboardPage() {
  const { totalAmount, totalDonatur, recentDonasis } = await getStats();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Total Donasi
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-accent-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(totalAmount)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Total Donatur
            </CardTitle>
            <Users className="h-5 w-5 text-accent-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalDonatur}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Rata-rata
            </CardTitle>
            <Activity className="h-5 w-5 text-white/50" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {totalDonatur > 0
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalAmount / totalDonatur)
                : "Rp 0"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {recentDonasis.length === 0 ? (
            <p className="text-white/50 py-8 text-center">Belum ada donasi</p>
          ) : (
            <div className="space-y-4">
              {recentDonasis.map((donasi) => (
                <div
                  key={donasi.id}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 shadow-lg">
                      <span className="text-lg font-semibold text-white">
                        {donasi.donatur.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {donasi.donatur.name}
                      </p>
                      <p className="text-sm text-white/50">
                        {donasi.note || "Donasi"}
                      </p>
                      {donasi.user && (
                        <p className="text-xs text-white/30 mt-1">
                          Ditambahkan oleh {donasi.user.name || "Admin"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(donasi.amount)}
                    </p>
                    <p className="text-sm text-white/50">
                      {format(donasi.createdAt, "dd MMM, HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
