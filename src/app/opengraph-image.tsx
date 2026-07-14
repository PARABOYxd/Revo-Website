import { ImageResponse } from "next/og";

export const alt = "REVO — Leave Your Mark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A2E",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "#FF5A1F",
            filter: "blur(180px)",
            opacity: 0.28,
            top: -120,
            left: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "#FF5A1F",
            filter: "blur(160px)",
            opacity: 0.18,
            bottom: -140,
            right: -60,
          }}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 24px",
            borderRadius: 999,
            background: "rgba(255,90,31,0.12)",
            border: "1px solid rgba(255,90,31,0.35)",
            color: "#FF8A5B",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Mumbai&apos;s Live Active Grid
        </span>
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          Leave your&nbsp;
          <span style={{ color: "#FF5A1F" }}>mark.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.55)",
            marginTop: 30,
            fontWeight: 400,
          }}
        >
          You showed up. Now the city sees it.
        </div>
      </div>
    ),
    { ...size }
  );
}
