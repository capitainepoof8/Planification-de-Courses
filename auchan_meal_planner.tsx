import React, { useState } from 'react';
import { ShoppingCart, ChefHat, Package, AlertCircle, CheckCircle, TrendingUp, DollarSign, Sparkles } from 'lucide-react';

const AuchanMealPlanner = () => {
  const [budget, setBudget] = useState(20000);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const prices = {
    "Poulet entier": { price: 3500, unit: "kg" },
    "Poisson frais": { price: 2500, unit: "kg" },
    "Viande /kg": { price: 4090, unit: "kg" },
    "Oignons /kg": { price: 550, unit: "kg" },
    "Citron /kg": { price: 690, unit: "kg" },
    "Huile /L": { price: 1900, unit: "L" },
    "Arachides /kg": { price: 1800, unit: "kg" },
    "Riz blanc 1kg": { price: 850, unit: "kg" },
    "Chou blanc /kg": { price: 1290, unit: "kg" },
    "Carotte /kg": { price: 1690, unit: "kg" },
    "Manioc /kg": { price: 800, unit: "kg" },
    "Tomate concentrée /kg": { price: 2000, unit: "kg" },
    "Ail /kg": { price: 1490, unit: "kg" },
    "Piment /kg": { price: 3500, unit: "kg" },
    "Poisson sec": { price: 2000, unit: "kg" },
    "Sel iodé /kg": { price: 590, unit: "kg" },
    "Aubergine /kg": { price: 1400, unit: "kg" },
    "Tomate /kg": { price: 2000, unit: "kg" },
    "Savon de toilette": { price: 500, unit: "pce" },
    "Dentifrice Dentygel": { price: 675, unit: "tube" },
    "Lingettes Multi-usages": { price: 875, unit: "pqt" }
  };

  const recipes = {
    "Poulet Yassa": [
      { name: "Poulet entier", quantity: 1.5, unit: "kg" },
      { name: "Oignons /kg", quantity: 1, unit: "kg" },
      { name: "Citron /kg", quantity: 0.5, unit: "kg" },
      { name: "Piment /kg", quantity: 0.01, unit: "kg" },
      { name: "Huile /L", quantity: 0.1, unit: "L" },
      { name: "Ail /kg", quantity: 0.05, unit: "kg" }
    ],
    "Thiéboudienne": [
      { name: "Riz blanc 1kg", quantity: 0.5, unit: "kg" },
      { name: "Poisson frais", quantity: 0.5, unit: "kg" },
      { name: "Poisson sec", quantity: 0.1, unit: "kg" },
      { name: "Chou blanc /kg", quantity: 1, unit: "kg" },
      { name: "Carotte /kg", quantity: 0.15, unit: "kg" },
      { name: "Manioc /kg", quantity: 0.3, unit: "kg" },
      { name: "Oignons /kg", quantity: 0.15, unit: "kg" },
      { name: "Aubergine /kg", quantity: 0.25, unit: "kg" },
      { name: "Citron /kg", quantity: 0.2, unit: "kg" },
      { name: "Huile /L", quantity: 0.25, unit: "L" },
      { name: "Tomate concentrée /kg", quantity: 0.1, unit: "kg" },
      { name: "Ail /kg", quantity: 0.01, unit: "kg" },
      { name: "Piment /kg", quantity: 0.01, unit: "kg" }
    ],
    "Sauce Arachide": [
      { name: "Arachides /kg", quantity: 0.15, unit: "kg" },
      { name: "Viande /kg", quantity: 0.2, unit: "kg" },
      { name: "Tomate /kg", quantity: 0.1, unit: "kg" },
      { name: "Oignons /kg", quantity: 0.05, unit: "kg" },
      { name: "Piment /kg", quantity: 0.005, unit: "kg" },
      { name: "Huile /L", quantity: 0.02, unit: "L" },
      { name: "Sel iodé /kg", quantity: 0.002, unit: "kg" }
    ]
  };

  const hygieneEssentials = [
    { name: "Savon de toilette", quantity: 1, unit: "pce" },
    { name: "Dentifrice Dentygel", quantity: 1, unit: "tube" },
    { name: "Lingettes Multi-usages", quantity: 1, unit: "pqt" }
  ];

  const calculateShoppingList = () => {
    const shoppingList = {};
    selectedRecipes.forEach(recipeName => {
      recipes[recipeName].forEach(ingredient => {
        if (shoppingList[ingredient.name]) {
          shoppingList[ingredient.name].quantity += ingredient.quantity;
        } else {
          shoppingList[ingredient.name] = {
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            price: prices[ingredient.name]?.price || 0
          };
        }
      });
    });
    hygieneEssentials.forEach(item => {
      shoppingList[item.name] = {
        quantity: item.quantity,
        unit: item.unit,
        price: prices[item.name]?.price || 0
      };
    });
    return shoppingList;
  };

  const calculateTotal = (list) => {
    return Object.entries(list).reduce((total, [name, data]) => {
      return total + (data.price * data.quantity);
    }, 0);
  };

  const handleGenerate = () => {
    if (selectedRecipes.length === 0) {
      alert("Veuillez sélectionner au moins une recette");
      return;
    }
    setShowResults(true);
  };

  const toggleRecipe = (recipeName) => {
    setSelectedRecipes(prev => 
      prev.includes(recipeName) 
        ? prev.filter(r => r !== recipeName)
        : [...prev, recipeName]
    );
  };

  const shoppingList = showResults ? calculateShoppingList() : {};
  const totalCost = calculateTotal(shoppingList);
  const remainingBudget = budget - totalCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <div className="pt-16 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
                AUCHAN
              </h1>
              <p className="text-2xl text-blue-200 font-light tracking-wide">Planificateur de Courses Intelligent</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-16">
          {/* Budget Input - Glass Morphism */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl">
            <label className="block text-blue-100 font-semibold mb-4 text-lg flex items-center gap-2">
              <DollarSign size={24} className="text-blue-300" />
              Budget Hebdomadaire
            </label>
            <input
              type="range"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              min="5000"
              max="50000"
              step="1000"
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mb-4"
              style={{
                background: `linear-gradient(to right, rgb(96, 165, 250) 0%, rgb(96, 165, 250) ${((budget - 5000) / 45000) * 100}%, rgba(255,255,255,0.2) ${((budget - 5000) / 45000) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="text-5xl font-bold text-white text-center">
              {budget.toLocaleString()} <span className="text-2xl text-blue-300">CFA</span>
            </div>
          </div>

          {/* Recipe Cards - Modern Cards */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <ChefHat className="text-blue-300" size={32} />
              <h2 className="text-3xl font-bold text-white">Vos Recettes</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.keys(recipes).map(recipeName => (
                <button
                  key={recipeName}
                  onClick={() => toggleRecipe(recipeName)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    selectedRecipes.includes(recipeName)
                      ? 'border-blue-400 bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-lg shadow-blue-500/50'
                      : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-bold text-white text-lg">{recipeName}</span>
                      {selectedRecipes.includes(recipeName) && (
                        <CheckCircle className="text-blue-300 flex-shrink-0" size={24} />
                      )}
                    </div>
                    <div className="text-sm text-blue-200">
                      {recipes[recipeName].length} ingrédients
                    </div>
                  </div>
                  {selectedRecipes.includes(recipeName) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/50 flex items-center justify-center gap-3 group"
            >
              <Sparkles className="group-hover:rotate-12 transition-transform" size={24} />
              Générer ma Liste
              <Sparkles className="group-hover:-rotate-12 transition-transform" size={24} />
            </button>
          </div>

          {/* Results Section */}
          {showResults && (
            <>
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-500/30 rounded-xl">
                      <DollarSign className="text-blue-300" size={24} />
                    </div>
                    <h3 className="font-semibold text-blue-200">Budget</h3>
                  </div>
                  <p className="text-4xl font-bold text-white">{budget.toLocaleString()}</p>
                  <p className="text-blue-300 text-sm mt-1">CFA</p>
                </div>

                <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-purple-500/30 rounded-xl">
                      <Package className="text-purple-300" size={24} />
                    </div>
                    <h3 className="font-semibold text-purple-200">Dépensé</h3>
                  </div>
                  <p className="text-4xl font-bold text-white">{totalCost.toLocaleString()}</p>
                  <p className="text-purple-300 text-sm mt-1">CFA</p>
                </div>

                <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-xl ${
                  remainingBudget >= 0 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-xl ${
                      remainingBudget >= 0 ? 'bg-green-500/30' : 'bg-red-500/30'
                    }`}>
                      <TrendingUp className={remainingBudget >= 0 ? 'text-green-300' : 'text-red-300'} size={24} />
                    </div>
                    <h3 className={`font-semibold ${remainingBudget >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                      Reste
                    </h3>
                  </div>
                  <p className={`text-4xl font-bold ${remainingBudget >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {remainingBudget.toLocaleString()}
                  </p>
                  <p className={`text-sm mt-1 ${remainingBudget >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    CFA
                  </p>
                </div>
              </div>

              {/* Alerts */}
              {remainingBudget < 0 && (
                <div className="backdrop-blur-xl bg-red-500/20 border-2 border-red-500/50 rounded-2xl p-6 mb-6 flex items-start gap-4">
                  <AlertCircle className="text-red-300 flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="font-bold text-red-200 mb-2 text-xl">Budget Dépassé</h3>
                    <p className="text-red-100">
                      Dépassement de {Math.abs(remainingBudget).toLocaleString()} CFA. Ajustez vos recettes.
                    </p>
                  </div>
                </div>
              )}

              {/* Shopping List */}
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Package className="text-blue-300" />
                  Liste de Courses
                </h2>

                {/* Alimentation */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-blue-200 mb-4 pb-3 border-b border-white/20">
                    🍽️ Alimentation
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(shoppingList)
                      .filter(([name]) => !hygieneEssentials.some(h => h.name === name))
                      .map(([name, data]) => (
                        <div key={name} className="flex justify-between items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10">
                          <div>
                            <span className="font-semibold text-white">{name}</span>
                            <span className="text-blue-300 ml-3 text-sm">
                              {data.quantity} {data.unit}
                            </span>
                          </div>
                          <span className="font-bold text-blue-400 text-lg">
                            {(data.price * data.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Hygiène */}
                <div>
                  <h3 className="text-xl font-bold text-purple-200 mb-4 pb-3 border-b border-white/20">
                    🧼 Hygiène & Entretien
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(shoppingList)
                      .filter(([name]) => hygieneEssentials.some(h => h.name === name))
                      .map(([name, data]) => (
                        <div key={name} className="flex justify-between items-center p-4 bg-purple-500/10 rounded-xl hover:bg-purple-500/20 transition-all border border-purple-500/20">
                          <div>
                            <span className="font-semibold text-white">{name}</span>
                            <span className="text-purple-300 ml-3 text-sm">
                              {data.quantity} {data.unit}
                            </span>
                          </div>
                          <span className="font-bold text-purple-400 text-lg">
                            {(data.price * data.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {remainingBudget > 2000 && (
                <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl p-8 mt-6 border border-yellow-500/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-yellow-200 mb-6 flex items-center gap-2">
                    <Sparkles className="text-yellow-300" />
                    Suggestions avec votre reste
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="font-bold text-yellow-300 mb-3 text-lg">Petit-Déjeuner</h4>
                      <ul className="text-yellow-100 space-y-2">
                        <li>• Pain (500 CFA)</li>
                        <li>• Œufs x6 (600 CFA)</li>
                        <li>• Lait poudre (1000 CFA)</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="font-bold text-orange-300 mb-3 text-lg">Stock Cuisine</h4>
                      <ul className="text-orange-100 space-y-2">
                        <li>• Cube Maggi (500 CFA)</li>
                        <li>• Sucre 0.5kg (450 CFA)</li>
                        <li>• Savon lessive (1000 CFA)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.8);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.8);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AuchanMealPlanner;
