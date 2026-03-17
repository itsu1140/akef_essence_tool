import weaponData from "../../data/weapon.json";

export interface Weapon {
  name: string;
  kind: string;
  rarity: string;
  base: string;
  addition: string;
  skill: string;
  motif: string;
}

const weapons: Weapon[] = weaponData as Weapon[];

export function filterWeapons(filters: { type: string; value: string }[]): Weapon[] {
  if (filters.length === 0) return [];

  const filterMap: Record<string, Set<string>> = {};
  for (const f of filters) {
    if (!filterMap[f.type]) filterMap[f.type] = new Set();
    filterMap[f.type].add(f.value);
  }

  return weapons.filter((w) =>
    Object.entries(filterMap).every(([col, vals]) =>
      vals.has(w[col as keyof Weapon])
    )
  );
}

export function getWeaponData(name: string): Weapon | undefined {
  return weapons.find((w) => w.name === name);
}
