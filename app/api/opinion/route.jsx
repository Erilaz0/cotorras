import fs from "fs";
import path from "path";

const basePath = path.join(process.cwd(), "data");
const votesFile = path.join(basePath, "votes.json");
const opinionsFile = path.join(basePath, "opinions.json");

function initStorage() {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  if (!fs.existsSync(votesFile)) {
    fs.writeFileSync(
      votesFile,
      JSON.stringify({ favor: 0, contra: 0 }, null, 2),
    );
  }

  if (!fs.existsSync(opinionsFile)) {
    fs.writeFileSync(opinionsFile, JSON.stringify({ entries: [] }, null, 2));
  }
}

export async function POST(req) {
  try {
    initStorage();

    const body = await req.json();
    const opinion = body.opinion;
    const email = body.email;

    const votes = JSON.parse(fs.readFileSync(votesFile, "utf-8"));
    const opinions = JSON.parse(fs.readFileSync(opinionsFile, "utf-8"));

    if (opinion === "a favor") votes.favor++;
    if (opinion === "en contra") votes.contra++;

    opinions.entries.push({
      opinion,
      email: email || null,
      date: new Date().toISOString(),
    });

    fs.writeFileSync(votesFile, JSON.stringify(votes, null, 2));
    fs.writeFileSync(opinionsFile, JSON.stringify(opinions, null, 2));

    return new Response(JSON.stringify({ success: true, votes }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}

export async function GET() {
  initStorage();
  const votes = JSON.parse(fs.readFileSync(votesFile, "utf-8"));

  return new Response(JSON.stringify(votes), {
    headers: { "Content-Type": "application/json" },
  });
}
