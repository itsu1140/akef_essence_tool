import os
from dataclasses import dataclass

from dotenv import load_dotenv
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

    result = Weapon().filter_button(data)

    return jsonify(result)


@app.route("/essence", methods=["POST"])
def essence():
    weapon = request.json.get("weapon")
    commons = Stage().weapons_common_effect(weapon)
    return jsonify(commons)


@app.route("/weapon_data", methods=["POST"])
def weapon_data():
    weapon = request.json.get("name")
    return jsonify(Weapon().get_weapon_data(weapon).to_dict())


if __name__ == "__main__":
    load_dotenv(".env")
    app.run(debug=os.environ["DEBUG"] == "true")
