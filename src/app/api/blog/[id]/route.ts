import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

//ブログの1記事取得
export const GET = async (req: Request, res: NextResponse) => {
    try {

        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();

        const post = await prisma.post.findUnique({
            where:{
                id: id
            }
        });
        return NextResponse.json({ msg: "Success", post }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};


//ブログ編集用
export const PUT = async (req: Request, res: NextResponse) => {
    try {

        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();

        const { title, description } = await req.json();

        const post = await prisma.post.update({
            where:{
                id: id
            },
            data:{
                title,
                description
            }
        });
        return NextResponse.json({ msg: "Success", post }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};


//ブログ削除用
export const DELETE = async (req: Request, res: NextResponse) => {
    try {

        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();


        const post = await prisma.post.delete({
            where:{
                id: id
            },
        });
        return NextResponse.json({ msg: "Success", post }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};
