import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.devices.createMany({
    data: [
      {
        email: "kittipong01@nu.ac.th",
        name: "กิตติพงศ์ สมหมาย",
        password: "$2b$10$9yWOL0bvI6bbajSWJdbWzOiY7MZ1OcnMZlFIRRt8OnU/fhPKAebAy",
        student_id: "653000001",
      },
      {
        email: "panida02@nu.ac.th",
        name: "พนิดา ศรีสุข",
        password: "$2b$10$GSRf0TE1AaZxOoO9eQUA6e4kM2lKsnAF6x79J3w6X/dNErYjQOcvW",
        student_id: "653000002",
      },
      {
        email: "watchara03@nu.ac.th",
        name: "วัชระ อ่อนจันทร์",
        password: "$2b$10$byOjEAvLKNtXz9GAgHnmmOAtW8byo21Rfy7xcn2fn7d7kA9sT7/3a",
        student_id: "653000003",
      },
      {
        email: "siriluk04@nu.ac.th",
        name: "ศิริลักษณ์ วงศ์คำ",
        password: "$2b$10$hXjBBy7OZxHplVRK2AYHOuA/pPDPDbZJbUVCnJPWTTqlG2ASni.km",
        student_id: "653000004",
      },
      {
        email: "anucha05@nu.ac.th",
        name: "อนุชา ใจดี",
        password: "$2b$10$M1d9gWOnJWxZ8rZC9OHfcuO/h0nXcoR7iVANFXT3oBNHEka/KfWRC",
        student_id: "653000005",
      },
    ],
  });

  console.log("✅ Inserted mock data 5 users successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
