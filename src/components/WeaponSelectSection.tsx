"use client";

import { getWeaponImage } from "@/generated/weaponImages";
import type { Weapon } from "@/lib/weapon";

interface Props {
  weapons: Weapon[];
  selectedWeapon: Weapon | null;
  onSelect: (weapon: Weapon) => void;
}

export default function WeaponSelectSection({ weapons, selectedWeapon, onSelect }: Props) {
  return (
    <section className="card">
      <p className="card-title">武器選択</p>
      <div className="filter-buttons">
        {weapons.map((weapon) => {
          const imgSrc = getWeaponImage(weapon.name);
          const isActive = selectedWeapon?.name === weapon.name;
          return (
            <button
              key={weapon.name}
              type="button"
              className={`filtered-btn${isActive ? " active" : ""}`}
              onClick={() => onSelect(weapon)}
            >
              {imgSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgSrc} alt={weapon.name} className="weapon-icon" />
              )}
              {weapon.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
