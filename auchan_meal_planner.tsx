<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-950 relative overflow-hidden">
    <!-- Animated Background Effects -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div class="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      <div class="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 4s"></div>
    </div>

    <UContainer class="relative z-10">
      <!-- Hero Header -->
      <div class="pt-16 pb-12 text-center">
        <h1 class="text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-600 bg-clip-text text-transparent">
          AUCHAN
        </h1>
        <p class="text-2xl text-primary-200 font-light">Planificateur de Courses Intelligent</p>
      </div>

      <!-- Budget Input Card -->
      <UCard class="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl mb-6">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-banknotes" class="text-primary-300" />
            <h2 class="text-lg font-semibold text-primary-100">Budget Hebdomadaire</h2>
          </div>
        </template>

        <div class="space-y-4">
          <URange v-model="budget" :min="5000" :max="50000" :step="1000" size="lg" />
          <div class="text-center">
            <span class="text-5xl font-bold text-white">{{ budget.toLocaleString() }}</span>
            <span class="text-2xl text-primary-300 ml-2">CFA</span>
          </div>
        </div>
      </UCard>

      <!-- Recipe Selection Card -->
      <UCard class="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl mb-6">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-cake" class="text-primary-300" dynamic />
            <h2 class="text-2xl font-bold text-white">Vos Recettes</h2>
          </div>
        </template>

        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <UCard 
            v-for="(ingredients, recipeName) in recipes" 
            :key="recipeName"
            :class="[
              'cursor-pointer transition-all duration-300',
              selectedRecipes.includes(recipeName)
                ? 'border-primary-400 bg-gradient-to-br from-primary-500/30 to-purple-500/30 shadow-lg shadow-primary-500/50'
                : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'
            ]"
            @click="toggleRecipe(recipeName)"
          >
            <div class="flex items-start justify-between mb-3">
              <span class="font-bold text-white text-lg">{{ recipeName }}</span>
              <UIcon 
                v-if="selectedRecipes.includes(recipeName)"
                name="i-heroicons-check-circle" 
                class="text-primary-300"
                dynamic
              />
            </div>
            <UBadge color="primary" variant="subtle">
              {{ ingredients.length }} ingrédients
            </UBadge>
          </UCard>
        </div>

        <UButton 
          @click="handleGenerate" 
          block
          size="xl"
          icon="i-heroicons-sparkles"
          trailing-icon="i-heroicons-sparkles"
          class="font-bold"
        >
          Générer ma Liste
        </UButton>
      </UCard>

      <!-- Results Section -->
      <template v-if="showResults">
        <!-- Stats Cards -->
        <div class="grid md:grid-cols-3 gap-6 mb-6">
          <UCard class="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
            <div class="flex items-center gap-3 mb-3">
              <UAvatar icon="i-heroicons-banknotes" size="lg" class="bg-primary-500/30" />
              <h3 class="font-semibold text-primary-200">Budget</h3>
            </div>
            <p class="text-4xl font-bold text-white">{{ budget.toLocaleString() }}</p>
            <p class="text-primary-300 text-sm mt-1">CFA</p>
          </UCard>

          <UCard class="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
            <div class="flex items-center gap-3 mb-3">
              <UAvatar icon="i-heroicons-shopping-bag" size="lg" class="bg-purple-500/30" />
              <h3 class="font-semibold text-purple-200">Dépensé</h3>
            </div>
            <p class="text-4xl font-bold text-white">{{ totalCost.toLocaleString() }}</p>
            <p class="text-purple-300 text-sm mt-1">CFA</p>
          </UCard>

          <UCard :class="[
            'backdrop-blur-xl shadow-xl',
            remainingBudget >= 0 
              ? 'bg-green-500/10 border-green-500/20' 
              : 'bg-red-500/10 border-red-500/20'
          ]">
            <div class="flex items-center gap-3 mb-3">
              <UAvatar 
                icon="i-heroicons-trending-up" 
                size="lg" 
                :class="remainingBudget >= 0 ? 'bg-green-500/30' : 'bg-red-500/30'" 
              />
              <h3 :class="['font-semibold', remainingBudget >= 0 ? 'text-green-200' : 'text-red-200']">
                Reste
              </h3>
            </div>
            <p :class="['text-4xl font-bold', remainingBudget >= 0 ? 'text-green-400' : 'text-red-400']">
              {{ remainingBudget.toLocaleString() }}
            </p>
            <p :class="['text-sm mt-1', remainingBudget >= 0 ? 'text-green-300' : 'text-red-300']">
              CFA
            </p>
          </UCard>
        </div>

        <!-- Alert for Budget Exceeded -->
        <UAlert
          v-if="remainingBudget < 0"
          color="red"
          variant="subtle"
          icon="i-heroicons-exclamation-triangle"
          title="Budget Dépassé"
          :description="`Dépassement de ${Math.abs(remainingBudget).toLocaleString()} CFA. Ajustez vos recettes.`"
          class="mb-6"
        />

        <!-- Shopping List -->
        <UCard class="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-shopping-bag" class="text-primary-300" dynamic />
              <h2 class="text-3xl font-bold text-white">Liste de Courses</h2>
            </div>
          </template>

          <!-- Alimentation Section -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-primary-200 mb-4 pb-3 border-b border-white/20">
              🍽️ Alimentation
            </h3>
            <div class="space-y-3">
              <UCard
                v-for="[name, data] in foodItems"
                :key="name"
                class="bg-white/5 hover:bg-white/10 border-white/10 transition-all"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <span class="font-semibold text-white">{{ name }}</span>
                    <UBadge color="primary" variant="subtle" class="ml-3">
                      {{ data.quantity }} {{ data.unit }}
                    </UBadge>
                  </div>
                  <span class="font-bold text-primary-400 text-lg">
                    {{ (data.price * data.quantity).toLocaleString() }} CFA
                  </span>
                </div>
              </UCard>
            </div>
          </div>

          <!-- Hygiene Section -->
          <div>
            <h3 class="text-xl font-bold text-purple-200 mb-4 pb-3 border-b border-white/20">
              🧼 Hygiène & Entretien
            </h3>
            <div class="space-y-3">
              <UCard
                v-for="[name, data] in hygieneItems"
                :key="name"
                class="bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 transition-all"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <span class="font-semibold text-white">{{ name }}</span>
                    <UBadge color="purple" variant="subtle" class="ml-3">
                      {{ data.quantity }} {{ data.unit }}
                    </UBadge>
                  </div>
                  <span class="font-bold text-purple-400 text-lg">
                    {{ (data.price * data.quantity).toLocaleString() }} CFA
                  </span>
                </div>
              </UCard>
            </div>
          </div>
        </UCard>

        <!-- Suggestions -->
        <UCard
          v-if="remainingBudget > 2000"
          class="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 shadow-2xl mt-6"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-light-bulb" class="text-yellow-300" dynamic />
              <h3 class="text-2xl font-bold text-yellow-200">Suggestions avec votre reste</h3>
            </div>
          </template>

          <div class="grid md:grid-cols-2 gap-6">
            <UCard class="bg-white/5 border-white/10">
              <template #header>
                <h4 class="font-bold text-yellow-300">Petit-Déjeuner</h4>
              </template>
              <ul class="text-yellow-100 space-y-2">
                <li>• Pain (500 CFA)</li>
                <li>• Œufs x6 (600 CFA)</li>
                <li>• Lait poudre (1000 CFA)</li>
              </ul>
            </UCard>

            <UCard class="bg-white/5 border-white/10">
              <template #header>
                <h4 class="font-bold text-orange-300">Stock Cuisine</h4>
              </template>
              <ul class="text-orange-100 space-y-2">
                <li>• Cube Maggi (500 CFA)</li>
                <li>• Sucre 0.5kg (450 CFA)</li>
                <li>• Savon lessive (1000 CFA)</li>
              </ul>
            </UCard>
          </div>
        </UCard>
      </template>

      <div class="pb-16"></div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const budget = ref(20000)
const selectedRecipes = ref<string[]>([])
const showResults = ref(false)

const prices: Record<string, { price: number; unit: string }> = {
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
}

const recipes: Record<string, Array<{ name: string; quantity: number; unit: string }>> = {
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
}

const hygieneEssentials = [
  { name: "Savon de toilette", quantity: 1, unit: "pce" },
  { name: "Dentifrice Dentygel", quantity: 1, unit: "tube" },
  { name: "Lingettes Multi-usages", quantity: 1, unit: "pqt" }
]

const shoppingList = computed(() => {
  if (!showResults.value) return {}
  
  const list: Record<string, { quantity: number; unit: string; price: number }> = {}
  
  selectedRecipes.value.forEach(recipeName => {
    recipes[recipeName].forEach(ingredient => {
      if (list[ingredient.name]) {
        list[ingredient.name].quantity += ingredient.quantity
      } else {
        list[ingredient.name] = {
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          price: prices[ingredient.name]?.price || 0
        }
      }
    })
  })
  
  hygieneEssentials.forEach(item => {
    list[item.name] = {
      quantity: item.quantity,
      unit: item.unit,
      price: prices[item.name]?.price || 0
    }
  })
  
  return list
})

const totalCost = computed(() => {
  return Object.entries(shoppingList.value).reduce((total, [_, data]) => {
    return total + (data.price * data.quantity)
  }, 0)
})

const remainingBudget = computed(() => budget.value - totalCost.value)

const foodItems = computed(() => {
  return Object.entries(shoppingList.value)
    .filter(([name]) => !hygieneEssentials.some(h => h.name === name))
})

const hygieneItems = computed(() => {
  return Object.entries(shoppingList.value)
    .filter(([name]) => hygieneEssentials.some(h => h.name === name))
})

const toggleRecipe = (recipeName: string) => {
  if (selectedRecipes.value.includes(recipeName)) {
    selectedRecipes.value = selectedRecipes.value.filter(r => r !== recipeName)
  } else {
    selectedRecipes.value = [...selectedRecipes.value, recipeName]
  }
}

const handleGenerate = () => {
  if (selectedRecipes.value.length === 0) {
    alert("Veuillez sélectionner au moins une recette")
    return
  }
  showResults.value = true
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
</style>