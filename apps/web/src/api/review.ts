// // app/api/event-reviews/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// // import { db } from "@/lib/firebaseConfig"; // Sesuaikan path ke konfigurasi Firebase Anda
// // import { addDoc, collection } from "firebase/firestore";

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const { eventId, rating, comment } = data;

//     // Validasi input (Anda mungkin perlu menambahkan validasi lebih lanjut)
//     if (!eventId || !rating || !comment) {
//       return NextResponse.json(
//         { error: "Missing eventId, rating, or comment" },
//         { status: 400 }
//       );
//     }

//     await addDoc(collection(db, "event_reviews"), {
//       eventId,
//       rating,
//       comment,
//       timestamp: new Date(),
//     });

//     return NextResponse.json({ message: "Review submitted successfully" });
//   } catch (error) {
//     console.error("Error adding review:", error);
//     return NextResponse.json(
//       { error: "Failed to submit review" },
//       { status: 500 }
//     );
//   }
// }
