import React, { useState, useEffect } from "react";

const days = ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"];

const defaultData = days.map((day, i) => ({
  day,
  meals: [
    { title: "Γεύμα 1", protein: "Αυγά", fruit: "Μήλο", kcal: 350 },
    { title: "Γεύμα 2", protein: "Μπούτι κοτόπουλο", fruit: "Ροδάκινο", kcal: 500 },
    { title: "Γεύμα 3", protein: "Ψάρι", fruit: "Καρπούζι", kcal: 400 },
  ],
  weight: "",
}));

export default function FatLossMealPlanner() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("fatLossData");
    return stored ? JSON.parse(stored) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("fatLossData", JSON.stringify(data));
  }, [data]);

  const handleWeightChange = (index, value) => {
    const newData = [...data];
    newData[index].weight = value;
    setData(newData);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Εβδομαδιαίο Meal Planner + Καταγραφή Βάρους</h1>
      {data.map((dayData, index) => (
        <div key={index} className="mb-6 border rounded-xl p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">{dayData.day}</h2>
          <div className="space-y-2">
            {dayData.meals.map((meal, i) => (
              <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 bg-gray-50 p-2 rounded">
                <div>{meal.title}</div>
                <div>Πρωτεΐνη: <strong>{meal.protein}</strong></div>
                <div>Φρούτο: <strong>{meal.fruit}</strong></div>
                <div>Θερμίδες: <strong>{meal.kcal}</strong> kcal</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <label className="text-sm font-medium">Βάρος ημέρας (kg):</label>
            <input
              type="number"
              step="0.1"
              value={dayData.weight}
              onChange={(e) => handleWeightChange(index, e.target.value)}
              className="border p-1 rounded w-24"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
