import pytest
from src.stage import Stage


def test_common_essence():
    weapon = "同類共食"
    stage = Stage()
    stage.common_essence(weapon)
