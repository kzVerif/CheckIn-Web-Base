import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function getAllDevices() {
    try {
        const devices = await prisma.devices.findMany()
        return devices
    } catch (error) {
        
    }
}