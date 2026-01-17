import { connectMongoDB } from "../connection";
import Opinion from "../cot.model";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { opinion, email } = await req.json();

    if (!opinion || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Faltan datos" }),
        { status: 400 },
      );
    }

    await Opinion.create({ opinion, email });

    // Conteo dinámico
    const enContra = await Opinion.countDocuments({
      opinion: "en contra",
    });
    const aFavor = await Opinion.countDocuments({
      opinion: "a favor",
    });

    return new Response(
      JSON.stringify({
        success: true,
        total: {
          aFavor,
          enContra,
        },
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectMongoDB;

  const enContra = await Opinion.countDocuments({
    opinion: "en contra",
  });
  const aFavor = await Opinion.countDocuments({
    opinion: "a favor",
  });

  return new Response(JSON.stringify({ aFavor, enContra }), {
    headers: { "Content-Type": "application/json" },
  });
}
