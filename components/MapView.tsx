"use client";
import { useState } from "react";
import Link from "next/link";
import s from "@/styles/pages.module.css";

const COUNTRIES = [
  { code: "NGA", name: "Nigeria",       x: 48, y: 54 },
  { code: "BRA", name: "Brazil",        x: 32, y: 64 },
  { code: "IND", name: "India",         x: 65, y: 48 },
  { code: "IDN", name: "Indonesia",     x: 75, y: 62 },
  { code: "TWN", name: "Taiwan",        x: 77, y: 46 },
  { code: "GHA", name: "Ghana",         x: 46, y: 54 },
  { code: "DEU", name: "Germany",       x: 48, y: 30 },
  { code: "COL", name: "Colombia",      x: 28, y: 55 },
  { code: "KEN", name: "Kenya",         x: 53, y: 58 },
  { code: "USA", name: "United States", x: 20, y: 37 },
  { code: "MEX", name: "Mexico",        x: 22, y: 48 },
  { code: "PHL", name: "Philippines",   x: 78, y: 55 },
  { code: "ZAF", name: "South Africa",  x: 51, y: 72 },
  { code: "EGY", name: "Egypt",         x: 53, y: 45 },
  { code: "VNM", name: "Vietnam",       x: 73, y: 54 },
];

type Work = { id: string; slug: string; title: string; category: string; author: { name: string; countryCode: string } };
type ByCountry = Record<string, { articles: Work[]; letters: Work[] }>;

export function MapView({ byCountry }: { byCountry: ByCountry }) {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const data = byCountry[selected.code] ?? { articles: [], letters: [] };
  const all = [...data.articles, ...data.letters];

  return (
    <div className={s.mapGrid}>
      <div className={s.worldmap}>
        <svg viewBox="0 0 100 65" style={{ width: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet">
          <g fill="#E6DFCC" stroke="#CFC6AE" strokeWidth="0.15">
            <path d="M8,20 L25,18 L28,30 L24,38 L18,42 L12,38 L8,30 Z"/>
            <path d="M24,44 L31,44 L32,56 L28,63 L24,60 L23,52 Z"/>
            <path d="M42,22 L52,20 L53,30 L48,32 L43,30 Z"/>
            <path d="M44,36 L55,34 L57,50 L52,58 L47,56 L44,46 Z"/>
            <path d="M54,18 L82,16 L86,28 L82,38 L72,40 L64,36 L56,30 Z"/>
            <path d="M72,44 L82,42 L84,52 L80,58 L76,56 L72,50 Z"/>
            <path d="M84,58 L92,56 L92,62 L86,62 Z"/>
          </g>
          {COUNTRIES.map((c) => {
            const active = selected.code === c.code;
            return (
              <g key={c.code} onClick={() => setSelected(c)} style={{ cursor: "pointer" }}>
                <circle cx={c.x} cy={c.y} r={active ? 1.6 : 1.0} fill={active ? "#D69E3A" : "#2A6149"} stroke="#FBF9F4" strokeWidth="0.3" />
                {active && (
                  <>
                    <circle cx={c.x} cy={c.y} r="2.6" fill="none" stroke="#D69E3A" strokeWidth="0.3" opacity="0.6" />
                    <text x={c.x} y={c.y - 2.5} textAnchor="middle" fontSize="1.8" fontFamily="monospace" fill="#1A211D" fontWeight="600">{c.code}</text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <aside className={s.mapSide}>
        <span className={s.eyebrow}>Selected</span>
        <h2 className={s.mapCountry}>{selected.name}</h2>
        <div className={s.countryTag}>{selected.code}</div>
        <hr style={{ margin: "16px 0" }} />
        <h5 className={s.mapSideHeading}>Writing from {selected.name}</h5>
        {all.length ? (
          <div className={s.stack} style={{ marginTop: 12 }}>
            {all.map((w) => (
              <Link key={w.id} href={data.articles.includes(w) ? `/articles/${w.slug}` : `/letters/${w.slug}`} className={s.mapWork}>
                <div className={s.eyebrow} style={{ marginBottom: 2 }}>{w.category}</div>
                <div className={s.mapWorkTitle}>{w.title}</div>
                <div className={s.countryTag}>{w.author.name}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={s.mapEmpty}>No writing published from {selected.name} yet.</p>
        )}
      </aside>
    </div>
  );
}
