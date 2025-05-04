// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side only!
// );

// export async function POST(req: Request) {
//   const { userId } = await req.json();

//   const { error } = await supabase.from('user_activity_events').insert([
//     {
//       user_id: userId,
//       type: 'heartbeat',
//       timestamp: new Date().toISOString(),
//     },
//   ]);

//   if (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }
