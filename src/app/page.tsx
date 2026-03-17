"use client";

import { useState } from "react";
import FilterSection from "@/components/FilterSection";
import WeaponSelectSection from "@/components/WeaponSelectSection";
import EssenceResult from "@/components/EssenceResult";
import { filterWeapons, type Weapon } from "@/lib/weapon";
import { weaponsCommonEffect, type StageCommonEffectWeapons } from "@/lib/stage";

export default function Home() {
  const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [essenceResult, setEssenceResult] = useState<StageCommonEffectWeapons[]>([]);

  function handleFiltersChange(filters: { type: string; value: string }[]) {
    setFilteredWeapons(filterWeapons(filters));
    setSelectedWeapon(null);
    setEssenceResult([]);
  }

  function handleWeaponSelect(weapon: Weapon) {
    if (selectedWeapon?.name === weapon.name) return;
    setSelectedWeapon(weapon);
    setEssenceResult(weaponsCommonEffect(weapon.name));
  }

  function handleReset() {
    setFilteredWeapons([]);
    setSelectedWeapon(null);
    setEssenceResult([]);
  }

  return (
    <>
      <header>
        <h1>エンドフィールド 基質周回補助ツール</h1>
      </header>

      <main className="container">
        <section className="card howto">
          <p className="card-title">使い方</p>
          <ul>
            <li>「絞り込み」から基質を狙う武器の性質を選択</li>
            <li>「武器選択」から対象の武器を選択</li>
            <li>「一緒に狙える基質」にステージと効果が一致する武器が表示される</li>
          </ul>
        </section>

        <FilterSection onFiltersChange={handleFiltersChange} onReset={handleReset} />

        <WeaponSelectSection
          weapons={filteredWeapons}
          selectedWeapon={selectedWeapon}
          onSelect={handleWeaponSelect}
        />

        <EssenceResult selectedWeapon={selectedWeapon} stages={essenceResult} />
      </main>

      <footer>
        <a
          href="https://github.com/itsu1140/akef_essence_tool"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="icon" src="/github.png" alt="GitHub" />
        </a>
      </footer>
    </>
  );
}
