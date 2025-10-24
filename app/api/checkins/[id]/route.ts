import { PrismaClient } from "@prisma/client";
import { NextRequest , NextResponse } from "next/server";
const prisma = new PrismaClient();

//update checkin 
export async function PATCH(
    req: NextRequest,
    res: NextResponse,
    {params}: {params: { id: string} }
) { 
    try {
        const body = await req.json();
        const checkinId = await params.id;
        const response = await prisma.checkins.update({
            where: {
                id: checkinId,
            },
            data: body,
        });
        return NextResponse.json(
            {
                message: "อัพเดต checkin สำเร็จ ",
                response: response,
            },
            {
                status: 200,
            }
        );
    } catch(error) { 
        console.log("Cannot update zones: " , error);
        return NextResponse.json({
            message: "ไม่สามาระอัพเดต checkin ได้ ",
            reason: error,
        },{
            status: 500
        });
    }
}

export async function DELETE(
    req: NextRequest,
    res: NextResponse,
    {params}: {params: {id: string} }
) {
    try {
        const checkinId = await params.id;
        const response = await prisma.checkins.delete({
            where: {
                id: checkinId,
            },
        });
        return NextResponse.json({
            message: "ลบข้อมูล checkin สำเร็จ ", 
            response: response,
        },{
            status: 200
        });
    } catch(error) { 
        console.log("Cannot delete checkin: " , error);
        return NextResponse.json({
            message: "ไม่สามารถลบข้อมูล checkin ได้ ",
            reason: error,
        }, {
            status: 500
        });
    }
}

//get by Id 

export async function GET(
    req: NextRequest,
    {params}: {params: { id: string} }
) {
    try {
        const checkinId = await params.id;
        const data = await prisma.checkins.findMany({
            where: {
                id: checkinId,
            },
        });
        return NextResponse.json({
            message: "ดึงข้อมูลด้วย checkinId สำเร็จ",
            data: data,
        }, {
            status: 200
        });
    } catch(error) { 
        console.log("Cannot get checkin by ID " , error);
        return NextResponse.json({
            message: " ไม่สามรถดึงข้อมูลด้วย checkinID ได้",
            reason: error,
        },{
            status: 500
        });
    }
}