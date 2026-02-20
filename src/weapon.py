from pathlib import Path

import pandas as pd


class Weapon:
    def __init__(self) -> None:
        data_path = Path("./data/weapon.csv")
        # NaN -> ""
        self.weapon_df = pd.read_csv(data_path, dtype=str, keep_default_na=False)

    def get_df(self) -> pd.DataFrame:
        return self.weapon_df.copy()

    def filter_button(self, data: dict) -> dict:
        filters = {}
        for btn in data:
            if btn["type"] not in filters:
                filters[btn["type"]] = set()
            filters[btn["type"]].add(btn["value"])

        masks = [
            self.weapon_df[col].isin(vals) for col, vals in filters.items() if vals
        ]
        if masks:
            mask = pd.concat(masks, axis=1).all(axis=1)
            result = self.weapon_df[mask]
        else:
            result = self.weapon_df.iloc[0:0]
        return result.to_dict(orient="records")
