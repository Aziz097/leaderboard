"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createDonasi(data: { nama: string; jumlah: number; note?: string; existingId?: string }) {
  const session = await auth();
  const { nama, jumlah, note, existingId } = data;

  if (!nama || !jumlah) {
    return { error: "Nama dan jumlah wajib diisi" };
  }

  const userId = session?.user?.id;

  if (existingId) {
    const data = {
      amount: jumlah,
      note: note || null,
      donaturId: existingId,
      userId: userId || undefined,
    };
    await prisma.donasi.create({ data: data as any });
  } else {
    const existingDonatur = await prisma.donatur.findFirst({
      where: { name: { equals: nama, mode: "insensitive" } },
    });

    if (existingDonatur) {
      const data = {
        amount: jumlah,
        note: note || null,
        donaturId: existingDonatur.id,
        userId: userId || undefined,
      };
      await prisma.donasi.create({ data: data as any });
    } else {
      const data = {
        name: nama,
        donasis: {
          create: {
            amount: jumlah,
            note: note || null,
            userId: userId || undefined,
          },
        },
      };
      await prisma.donatur.create({ data: data as any });
    }
  }

  return { success: true };
}

export async function searchDonatur(q: string) {
  if (!q || q.length < 2) return [];

  const donaturs = await prisma.donatur.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    include: {
      donasis: {
        select: { amount: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    take: 5,
  });

  return donaturs.map((donatur) => ({
    id: donatur.id,
    name: donatur.name,
    totalDonasi: donatur.donasis.reduce((sum, d) => sum + d.amount, 0),
    donasiTerakhir: donatur.donasis[0]?.createdAt.toISOString() || null,
  }));
}

export async function getLeaderboard() {
  const donaturs = await prisma.donatur.findMany({
    include: { donasis: { select: { amount: true } } },
  });

  return donaturs
    .map((donatur) => ({
      id: donatur.id,
      name: donatur.name,
      totalDonasi: donatur.donasis.reduce((sum, d) => sum + d.amount, 0),
    }))
    .sort((a, b) => b.totalDonasi - a.totalDonasi);
}

export async function getAllDonatur({ page = 1, limit = 10, search = "" }: { page?: number; limit?: number; search?: string }) {
  const skip = (page - 1) * limit;

  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {};

  const [donaturs, total] = await Promise.all([
    prisma.donatur.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donasis: {
          select: { amount: true, createdAt: true },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    prisma.donatur.count({ where }),
  ]);

  const data = donaturs.map((donatur) => ({
    id: donatur.id,
    name: donatur.name,
    totalDonasi: donatur.donasis.reduce((sum, d) => sum + d.amount, 0),
    jumlahDonasi: donatur.donasis.length,
    donasiTerakhir: donatur.donasis[0]?.createdAt.toISOString() || null,
  }));

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getAllAktivitas({ page = 1, limit = 20 }: { page?: number; limit?: number }) {
  const skip = (page - 1) * limit;

  const [donasis, total] = await Promise.all([
    prisma.donasi.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donatur: { select: { name: true } },
        user: { select: { name: true } },
      },
    }),
    prisma.donasi.count(),
  ]);

  const data = donasis.map((donasi) => ({
    id: donasi.id,
    amount: donasi.amount,
    note: donasi.note,
    createdAt: donasi.createdAt.toISOString(),
    donatur: donasi.donatur.name,
    user: donasi.user?.name || null,
  }));

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}
