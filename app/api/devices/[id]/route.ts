import { PrismaClient } from "@prisma/client/extension";
import { NextRequest , NextResponse } from "next/server";
prisma = new PrismaClient();

//update devices
async function PATCH(
    req: NextRequest,
    res: NextResponse,
    {params}: {params: {id: string}}
) {
    try { 
        const body = await req.json();
        const devicesId = await params.id;
        const response = await prisma.devices.update({
            where: {
                id: devicesId,
            },
            data: body,
        });
        return NextResponse.json(
            {
                
            }
        )
    }
}
