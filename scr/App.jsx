import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = {
  Monday: {
    type: "Workout",
    meals: [
      {
        time: "09:00",
        items: ["3 αυγά", "ροδάκινο", "τσάι χωρίς ζάχαρη"],
        macros: { protein: 21, carbs: 10, fat: 15 }
      },
      {
        time: "14:00",
        items: ["μπουτάκια κοτόπουλο χωρίς πέτσα", "πεπόνι"],
        macros: { protein: 40, carbs: 15, fat: 12 }
      },
      {
        time: "19:30",
        items: ["ψαρονέφρι", "καρπούζι"],
        macros: { protein: 35, carbs: 20, fat: 10 }
      }
    ]
  },
  // Προσθέστε εδώ τις υπόλοιπες ημέρες με βάση την προηγούμενη δομή...
};

const hiitWorkout = [
  "20'' Jumping Jacks",
  "20'' High Knees",
  "20'' Bodyweight Squats",
  "20'' Push-ups",
  "20'' Mountain Climbers",
  "20'' Burpees",
  "20'' Plank",
];

const groceryList = [
  "Αυγά", "Foramge blanc 3%", "Κοτόπουλο", "Μοσχάρι", "Ψαρονέφρι",
  "Σαρδέλες", "Σολομός", "Συκώτι μοσχαρίσιο", "Μπακαλιάρος", "Τόνος σε νερό",
  "Whey protein (ουδέτερη γεύση)", "Ροδάκινα", "Βερίκοκα", "Σύκα",
  "Καρπούζι", "Πεπόνι", "Δαμάσκηνα", "Μήλα"
];

export default function FatLossMealPlanner() {
  const [checked, setChecked] = useState({});
  const [weights, setWeights] = useState([{ date: "", kg: "" }]);

  const toggleChecked = (day, index) => {
    const key = `${day}-${index}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleWeightChange = (i, field, value) => {
    const newWeights = [...weights];
    newWeights[i][field] = value;
    setWeights(newWeights);
  };

  const addWeightEntry = () => {
    setWeights([...weights, { date: "", kg: "" }]);
  };

  const chartData = weights.filter(w => w.date && w.kg).map(w => ({ date: w.date, kg: parseFloat(w.kg) }));

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-4">Πρόγραμμα Διατροφής για Απώλεια Λίπους</h1>
      <p className="text-muted-foreground text-sm mb-6">Στόχος: 80–85 κιλά μέχρι τέλος Αυγούστου. Βάρη: Δευτέρα, Τετάρτη, Παρασκευή. Δουλειά: Τρίτη έως Κυριακή (12:45–21:00).</p>

      <Tabs defaultValue="Monday" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          {Object.keys(data).map((day) => (
            <TabsTrigger key={day} value={day}>{day}</TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(data).map(([day, { type, meals }]) => (
          <TabsContent key={day} value={day}>
            <p className="mb-2 text-sm text-muted-foreground">Τύπος Ημέρας: {type === "Workout" ? "Προπόνηση" : "Δουλειά"}</p>
            <div className="space-y-4">
              {meals.map((meal, idx) => (
                <Card key={idx} onClick={() => toggleChecked(day, idx)} className={checked[`${day}-${idx}`] ? "bg-green-100" : ""}>
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-6 h-6 border rounded-full flex items-center justify-center">
                        {checked[`${day}-${idx}`] && <CheckIcon className="w-4 h-4" />}
                      </div>
                      <p className="font-semibold">{meal.time}</p>
                    </div>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {meal.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <p className="text-xs text-right text-muted-foreground">
                      Μακροθρεπτικά: Π {meal.macros.protein}g / Υ {meal.macros.carbs}g / Λ {meal.macros.fat}g
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div>
        <h2 className="text-xl font-bold mb-2">💪 HIIT Προπόνηση 15'</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          {hiitWorkout.map((ex, i) => <li key={i}>{ex}</li>)}
        </ul>
        <p className="text-xs text-muted-foreground mt-1">Εκτέλεσε 3 κύκλους. Διάλειμμα 30–45'' ανάμεσα.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">📦 Λίστα Αγορών</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground columns-2">
          {groceryList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">📈 Παρακολούθηση Βάρους</h2>
        <div className="space-y-2 mb-4">
          {weights.map((entry, i) => (
            <div key={i} className="flex gap-2">
              <input type="date" className="border rounded px-2 py-1 text-sm" value={entry.date} onChange={(e) => handleWeightChange(i, "date", e.target.value)} />
              <input type="number" placeholder="κιλά" className="border rounded px-2 py-1 text-sm w-24" value={entry.kg} onChange={(e) => handleWeightChange(i, "kg", e.target.value)} />
            </div>
          ))}
          <button onClick={addWeightEntry} className="mt-2 text-xs text-blue-600 hover:underline">+ Προσθήκη καταγραφής</button>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[70, 95]} unit="kg" />
            <Tooltip />
            <Line type="monotone" dataKey="kg" stroke="#4f46e5" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
