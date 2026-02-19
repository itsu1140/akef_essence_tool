from dataclasses import dataclass, field

import numpy as np
import pandas as pd
from flask import Flask, jsonify, render_template, request

from src.stage import Stage
from src.weapon import Weapon

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/weapon_filter", methods=["POST"])
def weapon_filter():
    data = request.json.get("filters")

    filters = {}
    for btn in data:
        if btn["type"] not in filters:
            filters[btn["type"]] = set()
        filters[btn["type"]].add(btn["value"])

    result = Weapon().filter_button(filters)

    return jsonify(result)


@app.route("/essence", methods=["POST"])
def essence():
    weapon = request.json.get("weapon")
    commons = Stage().weapons_common_effect(weapon)
    return jsonify(commons)


if __name__ == "__main__":
    stage = Stage()
    commons = stage.weapons_common_effect("芸術の独裁者")
    for common in commons:
        print(str(common))
    app.run(debug=True)
