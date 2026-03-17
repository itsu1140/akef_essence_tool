import stageData from "../../data/stage.json";
import { getWeaponData } from "./weapon";

export interface CommonEffectWeapon {
  name: string;
  effects: string[];
  is_common_effects: boolean[];
  motif: string;
}

export interface StageCommonEffectWeapons {
  stage: string;
  common_effect_weapons: CommonEffectWeapon[];
}

export function weaponsCommonEffect(weaponName: string): StageCommonEffectWeapons[] {
  const target = getWeaponData(weaponName);
  if (!target) return [];

  const result: StageCommonEffectWeapons[] = [];

  for (const stage of stageData) {
    if (!stage.weapons.includes(weaponName)) continue;

    const commonWeapons: CommonEffectWeapon[] = [];

    for (const wName of stage.weapons) {
      if (wName === weaponName) continue;
      const w = getWeaponData(wName);
      if (!w) continue;

      const isCommon = [
        target.base === w.base,
        target.addition === w.addition,
        target.skill === w.skill,
      ];

      // 付加効果またはスキル効果が一致するもののみ
      if (!isCommon[1] && !isCommon[2]) continue;

      commonWeapons.push({
        name: w.name,
        effects: [w.base, w.addition, w.skill],
        is_common_effects: isCommon,
        motif: w.motif,
      });
    }

    result.push({ stage: stage.name, common_effect_weapons: commonWeapons });
  }

  return result;
}
