from dataclasses import asdict, dataclass
from pathlib import Path

import pandas as pd

from src.weapon import Weapon


@dataclass
class CommonEffectWeapon:
    name: str
    effects: list[str]  # base, addition, skill
    is_common_effects: list[bool]  # base, addition, skill is common with target
    motif: str

    def __init__(self, target, compare):
        self.name = compare.name
        self.effects = [compare.base, compare.addition, compare.skill]
        self.is_common_effects = [
            target.base == compare.base,
            target.addition == compare.addition,
            target.skill == compare.skill,
        ]
        self.motif = compare.motif

    def __str__(self):
        string = self.name + "\t"
        for eff, iscommon in zip(self.effects, self.is_common_effects):
            string += eff + ("_" if iscommon else "") + "\t"
        return string

    def have_common(self):
        return self.is_common_effects[1] or self.is_common_effects[2]


@dataclass
class StageCommonEffectWeapons:
    stage: str
    common_effect_weapons: list[CommonEffectWeapon]

    def __str__(self):
        string = self.stage + "\n"
        for cew in self.common_effect_weapons:
            string += "\t" + str(cew) + "\n"
        return string


class Stage:
    def __init__(self):
        self.stage_df = pd.read_csv(Path("./data/stage.csv"))
        # remove last ";" and split with ";"
        self.stage_df.weapon = self.stage_df.weapon.str[:-1].str.split(";")

    def weapons_common_effect(self, weapon: str) -> dict:
        # ステージ毎に同時に狙える基質の内容とその武器を返す
        cews: list[StageCommonEffectWeapons] = []
        w_data = Weapon()
        weapon_df = w_data.get_df()
        for st in self.stage_df.itertuples():
            if weapon not in st.weapon:
                continue
            # weapons matching essence dropped from stage
            stage_weapon = weapon_df[weapon_df.name.isin(st.weapon)]
            target_weapon = w_data.get_weapon_data(weapon)
            common_weapons: list[CommonEffectWeapon] = []
            for wp in stage_weapon.itertuples():
                if wp.name == weapon:  # skip target weapon
                    continue
                cw = CommonEffectWeapon(target_weapon, wp)
                if cw.have_common():
                    common_weapons.append(cw)
            cews.append(
                asdict(
                    StageCommonEffectWeapons(
                        stage=st.name,
                        common_effect_weapons=common_weapons,
                    ),
                ),
            )
        return cews
