import { PrismaClient } from "@prisma/client/extension";
import { NextRequest , NextResponse } from "next/server";
const prisma = new PrismaClient();

//update devices
async function PATCH(
    req: NextRequest,
    res: NextResponse,
    {params}: {params: {id: string}}
) {
    try { 
        const body = await req.json();
        const {id} = await params;
        const response = await prisma.devices.update({
            where: {
                id: id,
            },
            data: body,
        });
        return NextResponse.json(
            {
                message: "อัพเดต devices สำเร็จ ", 
                response: response,
            },
            {
                status: 200,
            }
        );
    } catch(error) { 
        console.log("Cannot update devices: " , error);
        return NextResponse.json({
            message: "ไม่สามารถอัพเดต devices ได้",
            reason: error,
        },{
            status: 500
        });
    }
}

//
export async function DELETE(
    req: NextRequest,
    {params}: {params: { id: string} }
) {
    try {
        const {id} = await params;
        const response = await prisma.devices.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({
            message: "ลบข้อมูล device สำเร็จ ",
            response: response,
        },{
            status: 200
        });
    } catch (error) { 
        console.log("Cannot delete device " , error  );
        return NextResponse.json({
            message: "ไม่สามารถลบข้อมูล device ได้ ",
            reason: error,
        },{
            status: 500
        });
    }
}

//get by id 
export async function Get(
    req: NextRequest,
    { params }: {params: {id: string} }
) {
    try {
        const {id} = await params;
        const data = await prisma.devices.findUnique({
            where: {
                id: id,
            },
        })
        return NextResponse.json({
            message: "ดึงข้อมูลด้วย devicesID สำเร็จ ",
            data: data,
        },{
            status: 200
        });
    } catch (error) { 
        console.log("Cannot get devices by ID ", error);
        return NextResponse.json({
            message: " ไม่สามารถดึงข้อมูลด้วย devicesID ได้ ", 
            reason: error,
        },{
            status: 500
        });
    }
    
}