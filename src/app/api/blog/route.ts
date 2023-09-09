import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました")
    }
}

//ブログの全記事取得
export const GET = async (req: Request, res: NextResponse) => {
    try {

        await main();

        const posts = await prisma.post.findMany({
            orderBy:{
                date: "desc"
            }
        });
        return NextResponse.json({ msg: "Success", posts }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};


//ブログの投稿用
export const POST = async (req: Request, res: NextResponse) => {
    try {

        const { title, description } = await req.json();

        await main();

        const post = await prisma.post.create({
            data:{ 
                title,
                description
            }
        });

        return NextResponse.json({ msg: "Success", post }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ msg: "Error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};