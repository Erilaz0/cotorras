"use client";
import { useState } from "react";

export default function Home() {
  const [opinion, setOpinion] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(opinion);

    await fetch("/api/opinion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opinion: opinion, email: email }),
    });

    setLoading(false);
    setSent(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F6FFF9, #E8F5EE)",
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* TITULO */}
        <h1
          style={{
            textAlign: "center",
            color: "#219653",
            marginBottom: "12px",
            fontSize: "28px",
          }}
        >
          Encuesta ciudadana sobre el exterminio de cotorras
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Esta página busca visibilizar el rechazo social a políticas de
          exterminio animal y promover soluciones reales, éticas y basadas en
          evidencia.
        </p>

        {/* FORM */}
        {!sent ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label style={{ fontWeight: "600", color: "#333" }}>
                ¿Cuál es tu postura?
              </label>

              <button
                type="button"
                onClick={() => setOpinion("en contra")}
                style={{
                  padding: "14px",
                  borderRadius: "16px",
                  border:
                    opinion === "en contra"
                      ? "2px solid #219653"
                      : "2px solid #ddd",
                  background: opinion === "en contra" ? "#E8F5EE" : "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ❌ En contra del exterminio
              </button>

              <button
                type="button"
                onClick={() => setOpinion("a favor")}
                style={{
                  padding: "14px",
                  borderRadius: "16px",
                  border:
                    opinion === "a favor"
                      ? "2px solid #EB5757"
                      : "2px solid #ddd",
                  background: opinion === "a favor" ? "#FDECEC" : "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ⚠️ A favor del exterminio
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label style={{ fontWeight: "600", color: "#333" }}>Email</label>
              <input
                type="email"
                required
                placeholder="tuemail@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "14px",
                  borderRadius: "14px",
                  border: "1px solid #ccc",
                  fontSize: "15px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!opinion || loading}
              style={{
                marginTop: "10px",
                padding: "16px",
                borderRadius: "18px",
                border: "none",
                background: opinion === "a favor" ? "#EB5757" : "#219653",
                color: "#fff",
                fontWeight: "700",
                fontSize: "16px",
                cursor: opinion ? "pointer" : "not-allowed",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Enviando..." : "Enviar opinión"}
            </button>
          </form>
        ) : (
          <div
            style={{
              background: "#E8F5EE",
              padding: "24px",
              borderRadius: "20px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#219653", marginBottom: "8px" }}>
              Gracias por participar 💚
            </h2>
            <p style={{ color: "#333" }}>Tu opinión fue registrada.</p>
          </div>
        )}

        {/* INFO */}
        <div
          style={{
            background: "#F6FFF9",
            borderRadius: "20px",
            padding: "24px",
            lineHeight: "1.7",
            color: "#333",
          }}
        >
          <h2 style={{ color: "#219653", marginBottom: "12px" }}>
            ¿Por qué el exterminio no es una solución?
          </h2>

          <p>
            El exterminio masivo de cotorras no ataca la causa del problema.
            Estas aves se adaptan rápidamente y su población vuelve a crecer
            cuando hay alimento y hábitat disponibles, generando un ciclo
            infinito de violencia sin resultados duraderos.
          </p>

          <p>
            Además, los métodos utilizados no son selectivos. Afectan a otras
            especies de aves, mamíferos pequeños y animales domésticos,
            generando sufrimiento innecesario y desequilibrios ecológicos.
          </p>

          <h3 style={{ marginTop: "20px", color: "#219653" }}>
            Impacto ambiental
          </h3>

          <p>
            Las cotorras cumplen un rol ecológico: dispersan semillas y forman
            parte de la cadena alimenticia. Eliminar una especie sin estudios
            profundos puede generar plagas nuevas, pérdida de biodiversidad y
            efectos irreversibles.
          </p>

          <h3 style={{ marginTop: "20px", color: "#219653" }}>
            Riesgos sociales y éticos
          </h3>

          <p>
            Normalizar el exterminio animal como política pública debilita los
            valores de convivencia y respeto por la vida. Hoy son cotorras,
            mañana puede ser cualquier especie considerada “molesta”.
          </p>

          <h3 style={{ marginTop: "20px", color: "#219653" }}>
            Soluciones reales y efectivas
          </h3>

          <p>
            ✔ Control reproductivo no letal <br />
            ✔ Estudios poblacionales serios <br />
            ✔ Redes de Cultivos <br />
            ✔ Drones Agrarios <br />
            ✔ Protección de cultivos con métodos preventivos <br />
            ✔ Relocalización en zonas adecuadas <br />✔ Educación ambiental y
            planificación urbana
          </p>

          <p style={{ fontWeight: "600", marginTop: "16px" }}>
            El problema no se soluciona matando. Se soluciona entendiendo,
            planificando y respetando la vida.
          </p>
        </div>
      </div>
    </main>
  );
}
