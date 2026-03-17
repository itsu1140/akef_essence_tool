"use client";

import { getWeaponImage } from "@/generated/weaponImages";
import type { Weapon } from "@/lib/weapon";
import type { StageCommonEffectWeapons } from "@/lib/stage";

interface Props {
  selectedWeapon: Weapon | null;
  stages: StageCommonEffectWeapons[];
}

export default function EssenceResult({ selectedWeapon, stages }: Props) {
  return (
    <section className="card">
      <p className="card-title">一緒に狙える基質</p>

      {/* 選択武器の詳細テーブル */}
      {selectedWeapon && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>武器</th>
                <th>基礎効果</th>
                <th>付加効果</th>
                <th>スキル効果</th>
                <th>モチーフ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <WeaponNameCell name={selectedWeapon.name} />
                </td>
                <td>{selectedWeapon.base}</td>
                <td>{selectedWeapon.addition}</td>
                <td>{selectedWeapon.skill}</td>
                <td>{selectedWeapon.motif}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ステージ別結果 */}
      <div className="result-list">
        {stages.map((stage) => (
          <div key={stage.stage} className="result-card">
            <div className="result-card-header">{stage.stage}</div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>武器</th>
                    <th>基礎効果</th>
                    <th>付加効果</th>
                    <th>スキル効果</th>
                    <th>モチーフ</th>
                  </tr>
                </thead>
                <tbody>
                  {stage.common_effect_weapons.map((cew) => (
                    <tr key={cew.name}>
                      <td>
                        <WeaponNameCell name={cew.name} />
                      </td>
                      {cew.effects.map((effect, i) => (
                        <td
                          key={i}
                          className={cew.is_common_effects[i] ? "is-common" : ""}
                        >
                          {effect}
                        </td>
                      ))}
                      <td>{cew.motif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WeaponNameCell({ name }: { name: string }) {
  const imgSrc = getWeaponImage(name);
  return (
    <span className="weapon-name-cell">
      {imgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc} alt={name} className="weapon-icon-sm" />
      )}
      {name}
    </span>
  );
}
