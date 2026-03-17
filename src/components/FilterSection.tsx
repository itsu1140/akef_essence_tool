"use client";

import { useState } from "react";

interface Filter {
  type: string;
  value: string;
}

interface Props {
  onFiltersChange: (filters: Filter[]) => void;
  onReset: () => void;
}

const FILTER_GROUPS = [
  {
    label: "レアリティ",
    type: "rarity",
    values: ["6", "5"],
    display: (v: string) => `★${v}`,
  },
  {
    label: "武器種",
    type: "kind",
    values: ["片手剣", "大剣", "長柄武器", "拳銃", "アーツユニット"],
  },
  {
    label: "基礎効果",
    type: "base",
    values: ["敏捷", "筋力", "意志", "知性", "メイン能力"],
  },
  {
    label: "付加効果",
    type: "addition",
    values: [
      "攻撃力", "HP", "物理", "灼熱", "電磁", "寒冷", "自然",
      "会心率", "アーツ強度", "必殺技効率", "アーツダメージ", "回復効率",
    ],
  },
  {
    label: "スキル効果",
    type: "skill",
    values: [
      "強攻", "圧制", "追襲", "破砕", "昂揚", "巧技", "残虐",
      "付術", "治癒", "噴発", "切骨", "流回", "夜幕", "効率", "制圧",
    ],
  },
];

export default function FilterSection({ onFiltersChange, onReset }: Props) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  function toggleFilter(type: string, value: string) {
    const key = `${type}:${value}`;
    const next = new Set(activeFilters);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setActiveFilters(next);

    const filters = Array.from(next).map((k) => {
      const [t, v] = k.split(":");
      return { type: t, value: v };
    });
    onFiltersChange(filters);
  }

  function handleReset() {
    setActiveFilters(new Set());
    onReset();
  }

  return (
    <section className="card">
      <div className="card-header-row">
        <p className="card-title">絞り込み</p>
        <button className="reset-btn" onClick={handleReset}>
          すべて解除
        </button>
      </div>

      {FILTER_GROUPS.map((group) => (
        <div className="filter-group" key={group.type}>
          <div className="filter-group-label">{group.label}</div>
          <div className="filter-buttons">
            {group.values.map((value) => {
              const key = `${group.type}:${value}`;
              const isActive = activeFilters.has(key);
              return (
                <button
                  key={value}
                  type="button"
                  className={`filter-btn${isActive ? " active" : ""}`}
                  onClick={() => toggleFilter(group.type, value)}
                >
                  {group.display ? group.display(value) : value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
