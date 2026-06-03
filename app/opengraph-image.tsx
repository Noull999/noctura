import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NÓCTURA — RITO Y CÓDIGO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid de líneas decorativas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.08,
          }}
        >
          <div
            style={{
              width: 800,
              height: 800,
              borderRadius: "50%",
              border: "1px solid #ededed",
              position: "absolute",
            }}
          />
          <div
            style={{
              width: 600,
              height: 600,
              borderRadius: "50%",
              border: "1px solid #ededed",
              position: "absolute",
            }}
          />
          <div
            style={{
              width: 400,
              height: 400,
              borderRadius: "50%",
              border: "1px solid #c0202b",
              position: "absolute",
            }}
          />
        </div>

        {/* Cruz ✠ */}
        <div
          style={{
            fontSize: 72,
            color: "#c0202b",
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          ✠
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#ededed",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          NÓCTURA
        </div>

        {/* Separador */}
        <div
          style={{
            width: 120,
            height: 1,
            background: "#c0202b",
            margin: "28px 0",
          }}
        />

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 18,
            color: "#7a7a7a",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
          }}
        >
          RITO Y CÓDIGO
        </div>

        {/* Coords */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            fontSize: 13,
            color: "#3a3a3a",
            letterSpacing: "0.25em",
          }}
        >
          41,4693° S / 72,9424° O · PUERTO MONTT / CL
        </div>

        {/* MMXXVI */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 13,
            color: "#3a3a3a",
            letterSpacing: "0.25em",
          }}
        >
          MMXXVI
        </div>

        {/* Borde rojo sutil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid #c0202b20",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
